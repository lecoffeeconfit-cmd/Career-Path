import test from "node:test";
import assert from "node:assert/strict";
import regional from "../lib/data/regional-snapshot.json";
import skills from "../lib/data/skills-snapshot.json";
import geography from "../lib/data/us-state-paths.json";
import { occupations } from "../lib/data/occupations";
import {
  analyticsValue,
  chartDomain,
  mapBucket,
  radarPoint,
  radarSkillIds,
  regionalValue,
} from "../lib/dashboard/metrics";

test("chart axes preserve negative growth, zero baselines, and unavailable measurements", () => {
  const domain = chartDomain([-2, 11, null]);
  assert(domain.min <= -2);
  assert(domain.max >= 11);
  assert(domain.ticks.includes(0));
  assert.deepEqual(chartDomain([null]), { min: 0, max: 1, ticks: [0, 1] });
  assert.equal(analyticsValue(occupations[4], "growth"), -2);
});
test("map metrics and bins preserve missing values and distinguish concentration", () => {
  const record = regional.records[0];
  assert.equal(regionalValue(record, "salary"), record.medianAnnual);
  assert.equal(regionalValue(record, "employment"), record.employment);
  assert.equal(regionalValue(record, "concentration"), record.locationQuotient);
  assert.equal(regionalValue(undefined, "salary"), null);
  assert.equal(mapBucket(null, [1, 2]), null);
  assert.equal(mapBucket(1, [1, 2, 3, 4]), 0);
  assert.equal(mapBucket(4, [1, 2, 3, 4]), 3);
  assert.equal(mapBucket(2, [2, 2]), 2);
});
test("regional source has unique observations for 50 states plus DC and retains suppression", () => {
  assert.equal(regional.referenceYear, 2025);
  assert.equal(regional.records.length, 306);
  assert.equal(
    new Set(regional.records.map((record) => `${record.soc}:${record.fips}`))
      .size,
    306,
  );
  assert.equal(new Set(regional.records.map((record) => record.fips)).size, 51);
  assert(
    regional.records.some(
      (record) => record.medianAnnual === null && record.wageFlag,
    ),
  );
  for (const record of regional.records) {
    assert(
      occupations.some((career) => career.classification.code === record.soc),
    );
    assert(geography.states.some((state) => state.fips === record.fips));
    assert(record.employment === null || Number.isInteger(record.employment));
    assert(record.medianAnnual === null || record.medianAnnual > 0);
  }
});
test("O*NET ratings use matching occupational codes, original scales, and update dates", () => {
  assert.equal(skills.records.length, 120);
  for (const career of occupations) {
    for (const scale of ["IM", "LV"] as const) {
      const ratings = skills.records.filter(
        (record) =>
          record.soc === career.classification.code && record.scale === scale,
      );
      assert.equal(ratings.length, 10);
      for (const id of radarSkillIds)
        assert(ratings.some((rating) => rating.skillId === id));
      for (const rating of ratings) {
        assert.equal(rating.onetSoc, `${career.classification.code}.00`);
        assert(/^\d{4}-\d{2}-\d{2}$/.test(rating.updatedAt));
        assert(
          rating.value === null ||
            (rating.value >= skills.scales[scale].min &&
              rating.value <= skills.scales[scale].max),
        );
        if (rating.suppressed || rating.notRelevant)
          assert.equal(rating.value, null);
      }
    }
  }
});
test("map boundaries are valid and radar coordinates stay within the published scale", () => {
  assert.equal(geography.states.length, 51);
  assert.equal(new Set(geography.states.map((state) => state.fips)).size, 51);
  for (const state of geography.states) {
    assert(state.d.startsWith("M"));
    assert(!state.d.includes("NaN"));
    assert(state.bounds.every(Number.isFinite));
    assert(
      state.bounds[0] < state.bounds[2] && state.bounds[1] < state.bounds[3],
    );
  }
  const point = radarPoint(0, 5, 5);
  assert.deepEqual(point, [180, 50]);
  assert.deepEqual(radarPoint(0, 10, 5), point);
});
