/** Shared semantic vocabulary for all four visualization systems. */
export const visualizationTheme = {
  salary: "var(--gold)",
  milestone: "var(--gold)",
  achievement: "var(--gold)",
  interaction: "var(--emerald)",
  employment: "var(--emerald)",
  pathway: "var(--emerald)",
  opportunity: "var(--emerald)",
  skill: "var(--emerald)",
  grid: "var(--border)",
  label: "var(--text-secondary)",
  surface: "var(--surface)",
  durationMs: 220,
} as const;

export type ThemePreference = "light" | "dark" | "system";
