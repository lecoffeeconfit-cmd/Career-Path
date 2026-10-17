import test from "node:test";
import assert from "node:assert/strict";
import { normalizeBlsRecord, normalizeSoc } from "../lib/data/normalize";
import { occupations, careerFields } from "../lib/data/occupations";
import snapshot from "../lib/data/bls-snapshot.json";
import { filterCareers } from "../lib/careers/search";

test("SOC normalization accepts SOC and O*NET-SOC forms and rejects invalid codes", () => {
  for (const code of ["15-1252", "151252", " 15-1252.00 "])
    assert.equal(normalizeSoc(code), "15-1252");
  for (const code of ["15-12", "software", "15-1252.000"])
    assert.throws(() => normalizeSoc(code));
});
test("missing measurements remain null and subgroup openings are never substituted", () => {
  const result = normalizeBlsRecord(snapshot.records[0], snapshot);
  assert.equal(result.wage.medianHourly, null);
  assert.equal(result.projection.averageAnnualOpenings, null);
  assert.equal(result.employment.employment, 1717800);
  assert.equal(result.projection.scope, "occupation");
});
test("decline is valid but negative wages and invalid source URLs are rejected", () => {
  assert.equal(
    normalizeBlsRecord(snapshot.records[4], snapshot).projection.growthPercent,
    -2,
  );
  assert.throws(() =>
    normalizeBlsRecord({ ...snapshot.records[0], medianAnnual: -1 }, snapshot),
  );
  assert.throws(() =>
    normalizeBlsRecord(
      { ...snapshot.records[0], url: "https://example.com/data" },
      snapshot,
    ),
  );
  assert.throws(() =>
    normalizeBlsRecord({ ...snapshot.records[0], employment: NaN }, snapshot),
  );
});
test("search finds alternate titles, SOC codes, subjects, and multi-word queries", () => {
  assert.deepEqual(
    filterCareers(occupations, { query: "RN" }).map((item) => item.id),
    ["registered-nurse"],
  );
  assert.deepEqual(
    filterCareers(occupations, { query: "15-1252" }).map((item) => item.id),
    ["software-developer"],
  );
  assert.equal(
    filterCareers(occupations, { query: "calculus" })[0].id,
    "mechanical-engineer",
  );
  assert.equal(
    filterCareers(occupations, { query: " software engineer " })[0].id,
    "software-developer",
  );
});
test("education filtering includes documented alternative pathways", () => {
  assert.deepEqual(
    filterCareers(occupations, { education: "associate" }).map(
      (item) => item.id,
    ),
    ["registered-nurse"],
  );
  assert.deepEqual(
    filterCareers(occupations, { education: "high-school" }).map(
      (item) => item.id,
    ),
    ["electrician"],
  );
});
test("filters compose and an incompatible combination has no results", () => {
  assert.deepEqual(
    filterCareers(occupations, {
      minSalary: 90000,
      outlook: "growing",
      environment: "office",
    }).map((item) => item.id),
    ["mechanical-engineer", "software-developer"],
  );
  assert.equal(
    filterCareers(occupations, { field: "trades", minSalary: 120000 }).length,
    0,
  );
  assert.deepEqual(
    filterCareers(occupations, { outlook: "declining" }).map((item) => item.id),
    ["graphic-designer"],
  );
});
test("sorting uses real measurements without mutating the source list", () => {
  const original = occupations.map((item) => item.id);
  assert.equal(
    filterCareers(occupations, { sort: "salary" })[0].id,
    "software-developer",
  );
  assert.equal(
    filterCareers(occupations, { sort: "growth" })[0].id,
    "mechanical-engineer",
  );
  assert.deepEqual(
    occupations.map((item) => item.id),
    original,
  );
});
test("every record, relationship, pathway, and prerequisite resolves consistently", () => {
  assert.equal(
    new Set(occupations.map((item) => item.id)).size,
    occupations.length,
  );
  assert.equal(
    new Set(occupations.map((item) => item.classification.code)).size,
    occupations.length,
  );
  for (const occupation of occupations) {
    assert(careerFields.some((field) => field.id === occupation.fieldId));
    assert(occupation.pathways.length >= 2);
    for (const relation of occupation.related)
      assert(occupations.some((item) => item.id === relation.occupationId));
    for (const pathway of occupation.pathways)
      assert(
        occupation.sources.some((source) => source.id === pathway.sourceId),
      );
    for (const competency of occupation.competencies) {
      for (const prerequisite of competency.prerequisiteIds)
        assert(
          occupation.competencies.some((item) => item.id === prerequisite),
        );
    }
    assert.equal(occupation.wage.geographyId, "US");
    assert.equal(occupation.wage.year, occupation.sources[0].referenceYear);
  }
});
