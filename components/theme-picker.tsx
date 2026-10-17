"use client";
import { useSyncExternalStore } from "react";
import { Icon } from "./ui/icon";
import type { ThemePreference } from "@/lib/theme";

const key = "career-path-theme";
function readTheme(): ThemePreference {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "system" ? value : "dark";
}
function subscribe(callback: () => void) {
  const sync = () => {
    try {
      document.documentElement.dataset.theme =
        localStorage.getItem(key) ?? "dark";
    } catch {
      /* Storage is optional. */
    }
    callback();
  };
  window.addEventListener("storage", sync);
  window.addEventListener("career-path-theme", callback);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener("career-path-theme", callback);
  };
}
export function ThemePicker() {
  const preference = useSyncExternalStore(
    subscribe,
    readTheme,
    () => "dark" as const,
  );
  return (
    <label className="theme-picker">
      <Icon name="sun" size={17} />
      <span className="sr-only">Appearance</span>
      <select
        aria-label="Appearance"
        value={preference}
        onChange={(event) => {
          const theme = event.target.value as ThemePreference;
          document.documentElement.dataset.theme = theme;
          try {
            localStorage.setItem(key, theme);
          } catch {
            /* Appearance still works without persistence. */
          }
          window.dispatchEvent(new Event("career-path-theme"));
        }}
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </label>
  );
}
