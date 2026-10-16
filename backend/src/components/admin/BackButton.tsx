"use client";

import { Button, useConfig } from "@payloadcms/ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// "← Back" in the admin top bar (admin.components.actions).
// Goes to the previous admin screen, tracked per browser tab in
// sessionStorage (document.referrer does not change on client-side
// navigation). Falls back to the dashboard when there is no history.
const KEY = "sb-admin-history";
const MAX = 50;

const readStack = (): string[] => {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};

const writeStack = (stack: string[]) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(stack.slice(-MAX)));
  } catch {
    // storage unavailable (private mode) — Back falls back to the dashboard
  }
};

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();
  const dashboard = adminRoute || "/admin";

  // Record every admin screen visited (including the dashboard).
  useEffect(() => {
    if (!pathname) return;
    const stack = readStack();
    if (stack[stack.length - 1] !== pathname) writeStack([...stack, pathname]);
  }, [pathname]);

  // Nothing to go back to from the dashboard itself.
  if (pathname === dashboard || pathname === `${dashboard}/`) return null;

  const goBack = () => {
    const stack = readStack();
    // Drop the current screen (and any duplicates of it at the top).
    while (stack.length && stack[stack.length - 1] === pathname) stack.pop();
    const target = stack.pop();
    writeStack(stack);
    router.push(target && target.startsWith(dashboard) ? target : dashboard);
  };

  return (
    <Button buttonStyle="secondary" size="small" margin={false} onClick={goBack} aria-label="Go back">
      ← Back
    </Button>
  );
}
