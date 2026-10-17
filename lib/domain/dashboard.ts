export type AnalyticsMetric = "salary" | "growth" | "employment";
export type MapMetric = "salary" | "employment" | "concentration";
export type SkillScale = "IM" | "LV";
export interface RegionalObservation {
  fips: string;
  name: string;
  abbreviation: string;
  soc: string;
  employment: number | null;
  medianAnnual: number | null;
  meanAnnual: number | null;
  locationQuotient: number | null;
  employmentRse: number | null;
  wageRse: number | null;
  wageFlag: string | null;
}
export interface SkillRating {
  soc: string;
  onetSoc: string;
  skillId: string;
  name: string;
  scale: string;
  value: number | null;
  updatedAt: string;
  domainSource: string;
  sampleSize: number | null;
  lowerBound: number | null;
  upperBound: number | null;
  suppressed: boolean;
  notRelevant: boolean;
}
export interface StateGeometry {
  fips: string;
  name: string;
  d: string;
  bounds: number[];
}
