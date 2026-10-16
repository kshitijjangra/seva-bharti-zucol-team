"use client";

import { useEffect, type ReactNode } from "react";

// Adds a "Show / Hide" button to every password input in the admin
// (login, reset password, change password, create user). Registered as an
// admin provider, so it also covers the login screen. Styles: (payload)/custom.scss.
//
// On screens where a NEW password is set (not login), it also shows the
// password rule up front: Payload's built-in Change Password panel collapses
// after a failed save and drops the server's "12–128 characters" message.
const EYE =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>';

function enhance(input: HTMLInputElement) {
  if (input.dataset.pwToggle) return;
  const wrap = input.parentElement;
  if (!wrap) return;
  input.dataset.pwToggle = "1";
  wrap.classList.add("pw-toggle-wrap");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pw-toggle";
  const render = (shown: boolean) => {
    btn.innerHTML = shown ? EYE_OFF : EYE;
    btn.setAttribute("aria-label", shown ? "Hide password" : "Show password");
    btn.setAttribute("aria-pressed", String(shown));
    btn.title = shown ? "Hide password" : "Show password";
  };
  render(false);
  btn.addEventListener("click", () => {
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    render(show);
    input.focus();
  });
  wrap.appendChild(btn);

  // Password policy hint (rule enforced server-side in collections/Users.ts).
  const isLogin = /\/login\/?$/.test(window.location.pathname);
  const field = input.closest(".field-type");
  if (!isLogin && field && !field.querySelector(".pw-hint")) {
    const hint = document.createElement("p");
    hint.className = "pw-hint";
    hint.textContent = "Password must be 12–128 characters.";
    field.appendChild(hint);
  }
}

export function PasswordToggle({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const scan = () =>
      document.querySelectorAll<HTMLInputElement>('input[type="password"]:not([data-pw-toggle])').forEach(enhance);
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
