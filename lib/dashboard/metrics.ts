import type { Occupation } from "../domain/occupation";
import type {
  AnalyticsMetric,
  MapMetric,
  RegionalObservation,
} from "../domain/dashboard";

export function analyticsValue(career: Occupation, metric: AnalyticsMetric) {
  return metric === "salary"
    ? career.wage.medianAnnual
    : metric === "growth"
      ? career.projection.growthPercent
      : career.employment.employment;
}
export function regionalValue(
  observation: RegionalObservation | undefined,
  metric: MapMetric,
) {
  if (!observation) return null;
  return metric === "salary"
    ? observation.medianAnnual
    : metric === "employment"
      ? observation.employment
      : observation.locationQuotient;
}
/** A shared linear axis includes zero and preserves negative projections. */
export function chartDomain(values: (number | null)[]) {
  const finite = values.filter(
    (value): value is number => value !== null && Number.isFinite(value),
  );
  if (!finite.length) return { min: 0, max: 1, ticks: [0, 1] };
  const low = Math.min(0, ...finite),
    high = Math.max(0, ...finite);
  const rawStep = (high - low || 1) / 4;
  const power = 10 ** Math.floor(Math.log10(rawStep));
  const step =
    ([1, 2, 2.5, 5, 10].find((value) => value * power >= rawStep) ?? 10) *
    power;
  const min = Math.floor(low / step) * step;
  const max = Math.ceil(high / step) * step || step;
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 10; value += step)
    ticks.push(+value.toFixed(8));
  return { min, max, ticks };
}
export function mapBucket(
  value: number | null,
  values: (number | null)[],
): number | null {
  if (value === null || !Number.isFinite(value)) return null;
  const finite = values.filter(
    (value): value is number => value !== null && Number.isFinite(value),
  );
  if (!finite.length) return null;
  const min = Math.min(...finite),
    max = Math.max(...finite);
  return max === min
    ? 2
    : Math.min(3, Math.max(0, Math.floor(((value - min) / (max - min)) * 4)));
}
export const radarSkillIds = [
  "2.A.1.a",
  "2.A.1.b",
  "2.A.1.d",
  "2.A.1.e",
  "2.A.2.a",
  "2.A.2.b",
];
export function radarPoint(
  index: number,
  value: number,
  max: number,
  radius = 80,
  cx = 180,
  cy = 130,
) {
  const angle = (index * Math.PI) / 3 - Math.PI / 2;
  const bounded = Math.max(0, Math.min(max, value));
  return [
    cx + (Math.cos(angle) * radius * bounded) / max,
    cy + (Math.sin(angle) * radius * bounded) / max,
  ];
}
