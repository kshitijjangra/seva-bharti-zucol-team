import { APIError, ValidationError, type CollectionConfig, type PayloadRequest } from "payload";
import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from "@/access";

const isProd = process.env.NODE_ENV === "production";

const PASSWORD_MIN = 12;
const PASSWORD_MAX = 128;

// One generic message for unknown email, wrong password and locked account,
// so the login form cannot be used to discover which staff emails exist.
const GENERIC_LOGIN_ERROR = "The email or password provided is incorrect.";

const clientIp = (req: PayloadRequest) =>
  req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "roles"],
    group: "Admin",
    // Staff accounts must never be linkable from rich text.
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  auth: {
    // Short-lived session token; the admin panel refreshes it while active.
    tokenExpiration: 60 * 15, // 15 minutes
    // Server-side sessions: logout, password reset and password change revoke tokens.
    useSessions: true,
    // Brute-force protection: lock the account after repeated failures.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes
    // The JWT lives only in the HttpOnly cookie — never in JSON bodies.
    removeTokenFromResponses: true,
    cookies: {
      secure: isProd,
      sameSite: "Strict",
    },
  },
  access: {
    // No public sign-up. Only admins create accounts. The one-time
    // "create first user" route is disabled unless ALLOW_FIRST_REGISTER=true
    // (see beforeOperation) — production creates the first admin via the seed.
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    unlock: isAdmin,
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", maxLength: 120 },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      saveToJWT: true,
      // Editors cannot promote themselves.
      access: { create: isAdminFieldLevel, update: isAdminFieldLevel },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args, operation, req }) => {
        // Block anonymous account creation over HTTP (first-register takeover).
        if (
          operation === "create" &&
          !req.user &&
          req.payloadAPI !== "local" &&
          process.env.ALLOW_FIRST_REGISTER !== "true"
        ) {
          req.payload.logger.warn({ msg: "auth.first_register.blocked", ip: clientIp(req) });
          throw new APIError("Account creation is disabled.", 403);
        }

        // Password policy (also covers first-register and reset-password).
        const pw = (args as { data?: { password?: unknown } } | undefined)?.data?.password;
        if (
          ["create", "update", "resetPassword"].includes(operation) &&
          typeof pw === "string" &&
          (pw.length < PASSWORD_MIN || pw.length > PASSWORD_MAX)
        ) {
          throw new ValidationError({
            errors: [{ path: "password", message: `Password must be ${PASSWORD_MIN}–${PASSWORD_MAX} characters.` }],
          });
        }
        if (operation === "update" && typeof pw === "string") req.context.passwordChanged = true;
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first account is always an admin, so someone can manage users.
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users", req, overrideAccess: true });
          if (totalDocs === 0) data.roles = ["admin"];
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Password change ⇒ revoke every other session (stolen cookies stop working).
        if (operation !== "update" || !req.context.passwordChanged) return doc;
        const user = await req.payload.db.findOne<{ id: number | string; sessions?: { id: string }[] }>({
          collection: "users",
          where: { id: { equals: doc.id } },
          req,
        });
        if (user) {
          const keep = req.user?.id === doc.id ? (req.user as { _sid?: string })._sid : undefined;
          await req.payload.db.updateOne({
            collection: "users",
            id: doc.id,
            data: { ...user, sessions: (user.sessions ?? []).filter((s) => s.id === keep) },
            req,
          });
        }
        req.payload.logger.info({ msg: "auth.password.changed", userId: doc.id, ip: clientIp(req) });
        return doc;
      },
    ],
    afterLogin: [
      ({ req, user }) => {
        req.payload.logger.info({ msg: "auth.login.success", userId: user.id, ip: clientIp(req) });
      },
    ],
    afterError: [
      ({ error, req }) => {
        // Match on status + route, not error.name (class names are minified in
        // production builds). Covers wrong password, unknown email and locked.
        const status = (error as { status?: number })?.status;
        const isLogin = /\/users\/login\/?$/.test(new URL(req.url ?? "http://x/").pathname);
        if (status === 401 && isLogin) {
          req.payload.logger.warn({ msg: "auth.login.failed", ip: clientIp(req) });
          return { response: { errors: [{ message: GENERIC_LOGIN_ERROR }] }, status: 401 };
        }
      },
    ],
  },
};
