import type { Occupation } from "../domain/occupation";

export interface CareerFilters {
  query?: string;
  field?: string;
  education?: string;
  minSalary?: number;
  outlook?: "any" | "growing" | "declining";
  environment?: string;
  sort?: "name" | "salary" | "growth";
}

export function filterCareers(
  occupations: Occupation[],
  filters: CareerFilters,
): Occupation[] {
  const words = (filters.query ?? "")
    .trim()
    .toLocaleLowerCase("en-US")
    .split(/\s+/)
    .filter(Boolean);
  const filtered = occupations.filter((occupation) => {
    const searchable = [
      occupation.title,
      occupation.pluralTitle,
      occupation.summary,
      occupation.fieldId,
      occupation.classification.code,
      ...occupation.alternateTitles,
      ...occupation.interests,
      ...occupation.majors,
      ...occupation.competencies.map((competency) => competency.name),
    ]
      .join(" ")
      .toLocaleLowerCase("en-US");
    const tokens = searchable.split(/[^a-z0-9]+/);
    return (
      words.every((word) =>
        word.length <= 2 ? tokens.includes(word) : searchable.includes(word),
      ) &&
      (!filters.field || occupation.fieldId === filters.field) &&
      (!filters.education ||
        occupation.typicalEducation === filters.education ||
        occupation.pathways.some(
          (pathway) => pathway.level === filters.education,
        )) &&
      (!filters.minSalary ||
        (occupation.wage.medianAnnual !== null &&
          occupation.wage.medianAnnual >= filters.minSalary)) &&
      (!filters.environment ||
        occupation.workEnvironment === filters.environment) &&
      (filters.outlook !== "growing" ||
        (occupation.projection.growthPercent !== null &&
          occupation.projection.growthPercent > 0)) &&
      (filters.outlook !== "declining" ||
        (occupation.projection.growthPercent !== null &&
          occupation.projection.growthPercent < 0))
    );
  });
  return filtered.sort((a, b) => {
    if (filters.sort === "salary")
      return (
        (b.wage.medianAnnual ?? -Infinity) -
          (a.wage.medianAnnual ?? -Infinity) || a.title.localeCompare(b.title)
      );
    if (filters.sort === "growth")
      return (
        (b.projection.growthPercent ?? -Infinity) -
          (a.projection.growthPercent ?? -Infinity) ||
        a.title.localeCompare(b.title)
      );
    return a.title.localeCompare(b.title);
  });
}
