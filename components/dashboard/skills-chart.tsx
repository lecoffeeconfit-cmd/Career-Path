"use client";
import { useState } from "react";
import Link from "next/link";
import type { Occupation } from "@/lib/domain/occupation";
import type { SkillRating, SkillScale } from "@/lib/domain/dashboard";
import { radarPoint, radarSkillIds } from "@/lib/dashboard/metrics";
import { DashboardPanel, SegmentedControl } from "./panel";

const skillLabels = [
  "Reading",
  "Listening",
  "Speaking",
  "Mathematics",
  "Critical thinking",
  "Active learning",
];

export function SkillsChart({
  career,
  careers,
  ratings,
}: {
  career: Occupation;
  careers: Occupation[];
  ratings: SkillRating[];
}) {
  const [scale, setScale] = useState<SkillScale>("IM");
  const [compareId, setCompareId] = useState("registered-nurse");
  const [skillId, setSkillId] = useState("2.A.2.a");
  const compare = careers.find(
    (item) => item.id === compareId && item.id !== career.id,
  );
  const max = scale === "IM" ? 5 : 7;
  const profile = ratings.filter(
    (rating) =>
      rating.soc === career.classification.code && rating.scale === scale,
  );
  const comparison = ratings.filter(
    (rating) =>
      rating.soc === compare?.classification.code && rating.scale === scale,
  );
  const ordered = radarSkillIds.map((id) =>
    profile.find((rating) => rating.skillId === id),
  );
  const selected = profile.find((rating) => rating.skillId === skillId);
  const compareSelected = comparison.find(
    (rating) => rating.skillId === skillId,
  );
  function polygon(rows: SkillRating[]) {
    const points = radarSkillIds.map((id, index) => {
      const row = rows.find((rating) => rating.skillId === id);
      return row?.value === null || row?.value === undefined
        ? null
        : radarPoint(index, row.value, max).join(",");
    });
    return points.every(Boolean) ? points.join(" ") : null;
  }
  const points = polygon(profile),
    comparePoints = polygon(comparison);
  return (
    <DashboardPanel
      id="skill-profiles"
      number="04"
      title="Skills & knowledge"
      subtitle="Understand the skills the work calls for."
      icon="compass"
      footer={
        <>
          <span>O*NET® 31.0 · Analyst occupational ratings</span>
          <Link href="/resources#onet-data">Source & license ↗</Link>
        </>
      }
    >
      <div className="chart-toolbar">
        <SegmentedControl
          label="Skill rating scale"
          value={scale}
          onChange={setScale}
          options={[
            { value: "IM", label: "Importance" },
            { value: "LV", label: "Level" },
          ]}
        />
        <span className="chart-unit">
          {scale === "IM" ? "1–5 scale" : "0–7 scale"}
        </span>
      </div>
      <div className="skill-comparison-control">
        <label htmlFor="skill-compare-career">Compare with</label>
        <select
          id="skill-compare-career"
          value={compare?.id ?? ""}
          onChange={(event) => setCompareId(event.target.value)}
        >
          <option value="">No comparison</option>
          {careers
            .filter((item) => item.id !== career.id)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
        </select>
      </div>
      <svg
        className="skills-svg"
        viewBox="0 0 360 255"
        role="group"
        aria-label={`${scale === "IM" ? "Importance" : "Level"} ratings for ${career.title}${compare ? ` compared with ${compare.title}` : ""}. Occupational ratings, not an individual's aptitude.`}
      >
        {[1, 2, 3, 4].map((ring) => (
          <polygon
            key={ring}
            points={radarSkillIds
              .map((_, index) => radarPoint(index, ring, 4).join(","))
              .join(" ")}
            className="radar-grid"
          />
        ))}
        {radarSkillIds.map((id, index) => {
          const [x, y] = radarPoint(index, 1, 1);
          const [tx, ty] = radarPoint(index, 1, 1, 113);
          return (
            <g key={id} aria-hidden="true">
              <line x1="180" y1="130" x2={x} y2={y} className="radar-axis" />
              <text
                x={tx}
                y={ty + (skillLabels[index].includes(" ") ? -2 : 4)}
                textAnchor={
                  index === 1 || index === 2
                    ? "start"
                    : index === 4 || index === 5
                      ? "end"
                      : "middle"
                }
                className="radar-axis-label"
              >
                {skillLabels[index].split(" ").map((word, wordIndex) => (
                  <tspan key={wordIndex} x={tx} dy={wordIndex === 0 ? 0 : 11}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
        {compare && comparePoints && (
          <polygon
            key={`${compare.id}-${scale}`}
            points={comparePoints}
            className="radar-comparison"
          />
        )}
        {points && (
          <polygon
            key={`${career.id}-${scale}`}
            points={points}
            className="radar-primary"
          />
        )}
        {ordered.map((rating, index) => {
          if (!rating || rating.value === null) return null;
          const [x, y] = radarPoint(index, rating.value, max);
          return (
            <g
              key={rating.skillId}
              className="radar-point"
              role="button"
              tabIndex={0}
              aria-pressed={skillId === rating.skillId}
              aria-label={`${rating.name}: ${rating.value} out of ${max}. Show rating details.`}
              onClick={() => setSkillId(rating.skillId)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSkillId(rating.skillId);
                }
              }}
            >
              <title>{`${rating.name}: ${rating.value}/${max}`}</title>
              <circle cx={x} cy={y} r="11" className="radar-hit-area" />
              <circle
                cx={x}
                cy={y}
                r={skillId === rating.skillId ? 5 : 3.5}
                className="radar-dot"
              />
            </g>
          );
        })}
      </svg>
      <div className="radar-legend">
        <span>
          <i className="legend-dot gold-dot" />
          {career.title}
        </span>
        {compare && (
          <span>
            <i className="legend-dot emerald-dot" />
            {compare.title}
          </span>
        )}
      </div>
      <div className="skill-rating-detail" aria-live="polite">
        <div>
          <strong>{selected?.name}</strong>
          <span>
            {selected?.value === null || selected?.value === undefined
              ? "Not published"
              : `${selected.value.toFixed(2)} / ${max}`}
          </span>
        </div>
        <p>
          {compare && compareSelected
            ? `${compare.title}: ${compareSelected.value === null ? "Not published" : `${compareSelected.value.toFixed(2)} / ${max}`}. `
            : ""}
          Source observation updated {selected?.updatedAt}. Select a point to
          inspect another skill.
        </p>
      </div>
      <p className="chart-guidance">
        Ratings describe the occupation, not your ability or likelihood of
        success.{" "}
        <Link href={`/careers/${career.slug}#knowledge`}>
          Explore learning topics ↗
        </Link>
      </p>
      <details className="chart-data-disclosure">
        <summary>View all essential skill ratings</summary>
        <div className="chart-table-scroll">
          <table className="chart-data-table">
            <caption>
              O*NET® 31.0 · {scale === "IM" ? "Importance, 1–5" : "Level, 0–7"}
            </caption>
            <thead>
              <tr>
                <th scope="col">Skill</th>
                <th scope="col">{career.title}</th>
                {compare && <th scope="col">{compare.title}</th>}
              </tr>
            </thead>
            <tbody>
              {profile.map((rating) => (
                <tr key={rating.skillId}>
                  <th scope="row">
                    <button
                      className="table-career-button"
                      onClick={() => setSkillId(rating.skillId)}
                    >
                      {rating.name}
                    </button>
                  </th>
                  <td>
                    {rating.value === null
                      ? "Not published"
                      : rating.value.toFixed(2)}
                  </td>
                  {compare && (
                    <td>
                      {comparison
                        .find((item) => item.skillId === rating.skillId)
                        ?.value?.toFixed(2) ?? "Not published"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </DashboardPanel>
  );
}
