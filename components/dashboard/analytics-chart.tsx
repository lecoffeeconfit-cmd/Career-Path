"use client";
import { useState, type CSSProperties } from "react";
import type { Occupation } from "@/lib/domain/occupation";
import type { AnalyticsMetric } from "@/lib/domain/dashboard";
import { analyticsValue, chartDomain } from "@/lib/dashboard/metrics";
import { currency, growth, number } from "@/lib/format";
import { DashboardPanel, SegmentedControl } from "./panel";

export const shortCareerNames: Record<string, string> = {
  "software-developer": "Software",
  "registered-nurse": "Nursing",
  electrician: "Electrical",
  "mechanical-engineer": "Mechanical",
  "graphic-designer": "Design",
  accountant: "Accounting",
};
export function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
function formatValue(value: number | null, metric: AnalyticsMetric) {
  return metric === "salary"
    ? currency(value)
    : metric === "growth"
      ? growth(value)
      : number(value);
}

export function AnalyticsChart({
  careers,
  selected,
  onSelect,
  linkedDashboard = true,
}: {
  careers: Occupation[];
  selected: Occupation;
  onSelect: (id: string) => void;
  linkedDashboard?: boolean;
}) {
  const [metric, setMetric] = useState<AnalyticsMetric>("salary");
  const values = careers.map((career) => analyticsValue(career, metric));
  const domain = chartDomain(values);
  const y = (value: number) =>
    19 + ((domain.max - value) / (domain.max - domain.min)) * 166;
  const zero = y(0);
  const title =
    metric === "salary"
      ? "Median annual pay"
      : metric === "growth"
        ? "Projected employment change"
        : "National employment level";
  const period =
    metric === "growth" ? "2025–2035 projection" : "2025 national data";
  return (
    <DashboardPanel
      id="career-analytics"
      number="01"
      title="Career analytics"
      subtitle="See how the numbers compare."
      icon="chart"
      footer={
        <>
          <span>BLS OOH · {period}</span>
          <a href={selected.sources[0].url} target="_blank" rel="noreferrer">
            Source ↗
          </a>
        </>
      }
    >
      <div className="chart-toolbar">
        <SegmentedControl
          label="Analytics measurement"
          value={metric}
          onChange={setMetric}
          options={[
            { value: "salary", label: "Salary" },
            { value: "growth", label: "Growth" },
            { value: "employment", label: "Employment" },
          ]}
        />
        <span className="chart-unit">
          {metric === "salary"
            ? "USD / year"
            : metric === "growth"
              ? "Change, %"
              : "Jobs"}
        </span>
      </div>
      <div
        className="chart-headline"
        key={`${selected.id}-${metric}`}
        aria-live="polite"
      >
        <strong className="text-gold">
          {formatValue(analyticsValue(selected, metric), metric)}
        </strong>
        <span>
          {title}
          <small>{selected.title}</small>
        </span>
      </div>
      <svg
        className="analytics-svg"
        viewBox="0 0 550 238"
        role="group"
        aria-label={`${title} for ${careers.length} careers. Select a bar to explore that career.`}
      >
        {domain.ticks.map((tick) => (
          <g key={tick} aria-hidden="true">
            <line
              x1="49"
              x2="540"
              y1={y(tick)}
              y2={y(tick)}
              className={tick === 0 ? "chart-zero" : "chart-grid-line"}
            />
            <text
              x="41"
              y={y(tick) + 3}
              textAnchor="end"
              className="chart-axis-label"
            >
              {metric === "salary"
                ? `$${compactNumber(tick)}`
                : metric === "growth"
                  ? `${tick}%`
                  : compactNumber(tick)}
            </text>
          </g>
        ))}
        {careers.map((career, index) => {
          const value = values[index];
          const slot = 480 / careers.length;
          const x = 54 + index * slot + (slot - 47) / 2;
          const active = career.id === selected.id;
          return (
            <g
              key={career.id}
              className={`analytics-bar-group ${active ? "is-selected" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`${career.title}: ${formatValue(value, metric)} ${title}. Select career.`}
              onClick={() => onSelect(career.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(career.id);
                }
              }}
            >
              <title>{`${career.title}: ${formatValue(value, metric)}`}</title>
              <rect
                x={x - 9}
                y="5"
                width="66"
                height="226"
                rx="9"
                className="bar-hit-area"
              />
              <rect
                x={x}
                y={value === null ? zero : Math.min(zero, y(value))}
                width="47"
                height={value === null ? 0 : Math.abs(zero - y(value))}
                rx="6"
                className="analytics-bar"
              />
              <text
                x={x + 23.5}
                y={
                  value === null
                    ? zero - 9
                    : value >= 0
                      ? y(value) - 9
                      : y(value) + 15
                }
                textAnchor="middle"
                className="chart-value-label"
              >
                {value === null
                  ? "—"
                  : metric === "salary"
                    ? `$${compactNumber(value)}`
                    : metric === "growth"
                      ? growth(value)
                      : compactNumber(value)}
              </text>
              <text
                x={x + 23.5}
                y="219"
                textAnchor="middle"
                className="chart-axis-label career-axis-label"
              >
                {shortCareerNames[career.id]}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        className="analytics-mobile-chart"
        aria-label={`${title} comparison`}
      >
        {careers.map((career, index) => {
          const value = values[index];
          const span = domain.max - domain.min;
          return (
            <button
              key={career.id}
              className="mobile-career-bar"
              aria-pressed={career.id === selected.id}
              onClick={() => onSelect(career.id)}
            >
              <span className="mobile-bar-label">
                <span>{career.title}</span>
                <strong>{formatValue(value, metric)}</strong>
              </span>
              <span
                className="mobile-bar-track"
                style={
                  {
                    "--zero": `${(-domain.min / span) * 100}%`,
                  } as CSSProperties
                }
              >
                {value !== null && (
                  <span
                    className="mobile-bar-fill"
                    style={{
                      left: `${((Math.min(0, value) - domain.min) / span) * 100}%`,
                      width: `${(Math.abs(value) / span) * 100}%`,
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
        <p className="mobile-chart-axis-note">
          Bars use a shared zero baseline.
        </p>
      </div>
      <p className="chart-guidance">
        {linkedDashboard
          ? "Select a bar to update all four panels."
          : "Select a bar to inspect that career’s value."}{" "}
        {metric === "salary"
          ? "Medians are not starting salaries."
          : metric === "growth"
            ? "A forecast of jobs, not a chance of career success."
            : "Job counts, not an employment rate or current vacancies."}
      </p>
      <details className="chart-data-disclosure">
        <summary>View exact values in a table</summary>
        <div className="chart-table-scroll">
          <table className="chart-data-table">
            <caption>
              {title} · {period}
            </caption>
            <thead>
              <tr>
                <th scope="col">Career</th>
                <th scope="col">{title}</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career.id}>
                  <th scope="row">
                    <button
                      className="table-career-button"
                      onClick={() => onSelect(career.id)}
                    >
                      {career.title}
                    </button>
                  </th>
                  <td>{formatValue(analyticsValue(career, metric), metric)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </DashboardPanel>
  );
}
