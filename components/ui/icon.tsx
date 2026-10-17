import type { SVGProps } from "react";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  "arrow-up": "M7 17 17 7M7 7h10v10",
  search: "m21 21-4.5-4.5M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  tool: "M14 6a5 5 0 0 0-6 6L2.5 17.5a2.8 2.8 0 0 0 4 4L12 16a5 5 0 0 0 6-6l-3 3-4-4 3-3Z",
  gear: "m9 3-.7 3-2.6 1.5L3 7l-2 3 2 2-2 2 2 3 2.7-.5L8.3 18l.7 3h4l.7-3 2.6-1.5L19 17l2-3-2-2 2-2-2-3-2.7.5L13.7 6 13 3H9Zm7 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  pen: "m16 3 5 5-12 12-6 1 1-6L16 3Zm-2 2 5 5M4 15l5 5",
  chart: "M4 20V10m8 10V4m8 16v-7",
  book: "M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1Zm0 0v16",
  compass: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-6-4-3 5-5 3 3-5 5-3Z",
  check: "m5 12 4 4L19 6",
  shield: "M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm-4 9 3 3 5-5",
  globe:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c6 5 6 15 0 20-6-5-6-15 0-20Z",
  map: "m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17",
  route:
    "M6 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm12 18a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM6 6v8a4 4 0 0 0 4 4h4M9 3h7a4 4 0 0 1 4 4v5",
  spark: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  chevron: "m9 5 7 7-7 7",
  down: "m6 9 6 6 6-6",
  sun: "M12 3V1m0 22v-2M3 12H1m22 0h-2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
  briefcase: "M8 6V3h8v3M3 6h18v15H3V6Zm0 6c6 3 12 3 18 0M10 12h4",
  filter: "M4 6h16M7 12h10m-7 6h4",
  info: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 11v6m0-10v.1",
} as const;

export type IconName = keyof typeof paths;
export function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
