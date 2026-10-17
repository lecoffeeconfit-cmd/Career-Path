import type {
  EmploymentObservation,
  EmploymentProjection,
  ResearchReference,
  WageObservation,
} from "../domain/occupation";

export interface BlsRecord {
  soc: string;
  title: string;
  url: string;
  medianAnnual: number | null;
  medianHourly: number | null;
  employment: number | null;
  growthPercent: number | null;
  averageAnnualOpenings: number | null;
  notes: string | null;
}

export interface SnapshotContext {
  retrievedAt: string;
  publicationYear: number;
  referenceYear: number;
  projectionEndYear: number;
  geographyId: string;
}

export function normalizeSoc(code: string): string {
  const cleaned = code.trim();
  const match = /^(\d{2})-?(\d{4})(?:\.\d{2})?$/.exec(cleaned);
  if (!match) throw new Error(`Invalid SOC code: ${code}`);
  return `${match[1]}-${match[2]}`;
}

function measurement(
  value: number | null,
  field: string,
  allowNegative = false,
) {
  if (
    value !== null &&
    (!Number.isFinite(value) || (!allowNegative && value < 0))
  ) {
    throw new Error(`Invalid ${field}: ${value}`);
  }
  return value;
}

export function normalizeBlsRecord(
  record: BlsRecord,
  context: SnapshotContext,
): {
  soc: string;
  wage: WageObservation;
  employment: EmploymentObservation;
  projection: EmploymentProjection;
  source: ResearchReference;
} {
  const soc = normalizeSoc(record.soc);
  const url = new URL(record.url);
  if (url.protocol !== "https:" || url.hostname !== "www.bls.gov")
    throw new Error("Expected an official BLS source");
  if (context.projectionEndYear <= context.referenceYear)
    throw new Error("Invalid projection period");
  const sourceId = `bls-${soc}`;
  const shared = {
    year: context.referenceYear,
    geographyId: context.geographyId,
    sourceId,
  };
  return {
    soc,
    wage: {
      ...shared,
      medianAnnual: measurement(record.medianAnnual, "annual median wage"),
      medianHourly: measurement(record.medianHourly, "hourly median wage"),
      currency: "USD",
    },
    employment: {
      ...shared,
      employment: measurement(record.employment, "employment level"),
    },
    projection: {
      growthPercent: measurement(record.growthPercent, "growth", true),
      averageAnnualOpenings: measurement(
        record.averageAnnualOpenings,
        "annual openings",
      ),
      startYear: context.referenceYear,
      endYear: context.projectionEndYear,
      geographyId: context.geographyId,
      sourceId,
      scope: "occupation",
      notes: record.notes ?? undefined,
    },
    source: {
      id: sourceId,
      organization: "U.S. Bureau of Labor Statistics",
      title: `Occupational Outlook Handbook: ${record.title}`,
      url: record.url,
      publicationYear: context.publicationYear,
      referenceYear: context.referenceYear,
      retrievedAt: context.retrievedAt,
      geography: "United States · national",
      limitations: [
        "A curated, verified snapshot; not a live data feed. National medians are not starting salaries or local estimates.",
        "Employment is a count of jobs, not an employment rate. Openings are projected annual averages, not current vacancies.",
        "OEWS wages exclude self-employed workers. Projections are estimates, not promises.",
        ...(record.notes ? [record.notes] : []),
      ],
    },
  };
}
