import type { Access, FieldAccess, PayloadRequest } from "payload";

// Role-based access helpers. Every collection/global MUST use these —
// never write `() => true` for anything other than public reads.
//   admin  — full control, including user management
//   editor — create/edit/publish content and media; cannot manage users

type Role = "admin" | "editor";

const hasRole = (req: PayloadRequest, ...roles: Role[]) => {
  const user = req.user as { roles?: Role[] } | null | undefined;
  return Boolean(user?.roles?.some((r) => roles.includes(r)));
};

export const isAdmin: Access = ({ req }) => hasRole(req, "admin");

export const isAdminOrEditor: Access = ({ req }) =>
  hasRole(req, "admin", "editor");

export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  hasRole(req, "admin");

// Admins see/manage every user; everyone else may only read/update themselves.
export const isAdminOrSelf: Access = ({ req }) => {
  if (hasRole(req, "admin")) return true;
  if (req.user) return { id: { equals: req.user.id } };
  return false;
};

// Public visitors only ever see published documents; signed-in staff see drafts.
export const publishedOrStaff: Access = ({ req }) => {
  if (hasRole(req, "admin", "editor")) return true;
  return { _status: { equals: "published" } };
};

export const anyone: Access = () => true;
