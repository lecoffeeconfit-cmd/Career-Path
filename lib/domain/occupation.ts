/** Shared domain contracts. Missing measurements are null, never invented zeros. */
export type CareerFieldId =
  | "technology"
  | "healthcare"
  | "trades"
  | "engineering"
  | "creative"
  | "finance";
export type EducationLevel =
  | "high-school"
  | "certificate"
  | "associate"
  | "bachelor"
  | "graduate";
export type WorkEnvironment = "office" | "clinical" | "hands-on";
export type CompletionStatus = "not-started" | "in-progress" | "completed";
export type EvidenceLevel =
  | "demonstrated"
  | "correlational"
  | "expert-reasoning"
  | "hypothesis";

export interface ResearchReference {
  id: string;
  organization: string;
  title: string;
  url: string;
  publicationYear: number;
  referenceYear: number;
  retrievedAt: string;
  geography: string;
  limitations: string[];
}

export interface CareerField {
  id: CareerFieldId;
  name: string;
  description: string;
  icon: "code" | "heart" | "tool" | "gear" | "pen" | "chart";
}

export interface OccupationClassification {
  system: "SOC" | "O*NET-SOC";
  code: string;
}

export interface GeographicArea {
  id: string;
  name: string;
  level: "national" | "state" | "metro";
  parentId?: string;
}

export interface WageObservation {
  medianAnnual: number | null;
  medianHourly: number | null;
  currency: "USD";
  year: number;
  geographyId: string;
  sourceId: string;
  percentiles?: { percentile: number; annual: number }[];
}

export interface EmploymentObservation {
  employment: number | null;
  year: number;
  geographyId: string;
  sourceId: string;
}

export interface EmploymentProjection {
  growthPercent: number | null;
  averageAnnualOpenings: number | null;
  startYear: number;
  endYear: number;
  geographyId: string;
  sourceId: string;
  scope: "occupation" | "occupation-group";
  notes?: string;
}

export interface DegreeProgram {
  id: string;
  title: string;
  level: EducationLevel;
  cipCode?: string;
  provider?: string;
  url?: string;
  /** Costs must identify a source or be an explicitly user-entered assumption. */
  cost?: {
    amount: number;
    currency: "USD";
    basis: "official" | "user-assumption";
    sourceId?: string;
  };
}

export interface EducationPathway {
  id: string;
  title: string;
  level: EducationLevel;
  kind: "typical" | "alternative" | "specialization";
  description: string;
  steps: string[];
  credentialNote: string;
  sourceId: string;
  programIds?: string[];
}

export interface Competency {
  id: string;
  name: string;
  kind: "skill" | "knowledge";
  stage: "foundation" | "intermediate" | "advanced";
  importance: "essential" | "recommended" | "optional";
  prerequisiteIds: string[];
  sourceId?: string;
  /** Editorial suggestions do not imply official O*NET ratings. */
  basis: "source-summary" | "editorial-suggestion";
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  relationships: {
    competencyId: string;
    explanation: string;
    evidence: EvidenceLevel;
    sourceIds: string[];
    accessibleAlternatives: string[];
  }[];
}

export interface Occupation {
  id: string;
  slug: string;
  title: string;
  pluralTitle: string;
  fieldId: CareerFieldId;
  classification: OccupationClassification;
  alternateTitles: string[];
  summary: string;
  overview: string;
  tasks: string[];
  workEnvironment: WorkEnvironment;
  workLife: string;
  physicalDemands: string;
  interests: string[];
  majors: string[];
  typicalEducation: EducationLevel;
  wage: WageObservation;
  employment: EmploymentObservation;
  projection: EmploymentProjection;
  pathways: EducationPathway[];
  competencies: Competency[];
  related: { occupationId: string; reason: string }[];
  sources: ResearchReference[];
}

export interface PersonalizedRecommendation {
  occupationId: string;
  /** Preference alignment only; never a probability of success. */
  alignment: number;
  reasons: string[];
  dimensions: { name: string; weight: number; alignment: number }[];
}

export interface SavedCareerPlan {
  id: string;
  version: number;
  title: string;
  occupationId: string;
  pathwayId: string;
  createdAt: string;
  updatedAt: string;
  milestones: {
    id: string;
    title: string;
    description: string;
    prerequisiteIds: string[];
    status: CompletionStatus;
    targetDate: string | null;
    resourceUrls: string[];
  }[];
}
