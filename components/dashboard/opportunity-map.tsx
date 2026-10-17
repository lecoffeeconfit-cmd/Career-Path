"use client";
import { useId, useState } from "react";
import type { Occupation } from "@/lib/domain/occupation";
import type {
  MapMetric,
  RegionalObservation,
  StateGeometry,
} from "@/lib/domain/dashboard";
import { mapBucket, regionalValue } from "@/lib/dashboard/metrics";
import { currency, number } from "@/lib/format";
import { Icon } from "@/components/ui/icon";
import { compactNumber } from "./analytics-chart";
import { DashboardPanel, SegmentedControl } from "./panel";

function formatMapValue(value: number | null, metric: MapMetric) {
  return value === null
    ? "Not published"
    : metric === "salary"
      ? currency(value)
      : metric === "employment"
        ? number(value)
        : `${value.toFixed(2)}×`;
}

export function OpportunityMap({
  career,
  observations,
  states,
}: {
  career: Occupation;
  observations: RegionalObservation[];
  states: StateGeometry[];
}) {
  const [metric, setMetric] = useState<MapMetric>("salary");
  const [stateId, setStateId] = useState("06");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const patternId = useId();
  const records = observations.filter(
    (record) => record.soc === career.classification.code,
  );
  const current = records.find((record) => record.fips === stateId);
  const hovered = records.find((record) => record.fips === hoverId) ?? current;
  const geometry = states.find((state) => state.fips === stateId)!;
  const values = records.map((record) => regionalValue(record, metric));
  const available = values.filter((value): value is number => value !== null);
  const viewBox = zoomed
    ? `${geometry.bounds[0] - 30} ${geometry.bounds[1] - 30} ${Math.max(geometry.bounds[2] - geometry.bounds[0] + 60, 100)} ${Math.max(geometry.bounds[3] - geometry.bounds[1] + 60, 100)}`
    : "-65 0 1045 620";
  const measure =
    metric === "salary"
      ? "median annual pay"
      : metric === "employment"
        ? "employment"
        : "employment concentration";
  return (
    <DashboardPanel
      id="opportunity-map"
      number="03"
      title="Geographic opportunities"
      subtitle="Explore what changes from state to state."
      icon="map"
      footer={
        <>
          <span>BLS OEWS · May 2025 · 50 states + DC</span>
          <a
            href="https://www.bls.gov/oes/2025/may/oessrcst.htm"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </>
      }
    >
      <div className="chart-toolbar">
        <SegmentedControl
          label="Map measurement"
          value={metric}
          onChange={setMetric}
          options={[
            { value: "salary", label: "Median pay" },
            { value: "employment", label: "Employment" },
            { value: "concentration", label: "Concentration" },
          ]}
        />
        <button
          className="map-zoom-button"
          onClick={() => setZoomed(!zoomed)}
          aria-label={zoomed ? "Reset map zoom" : "Zoom to selected state"}
        >
          <Icon name={zoomed ? "globe" : "search"} size={17} />
        </button>
      </div>
      <div className="map-context" aria-live="polite">
        <span>{hovered?.name ?? geometry.name}</span>
        <strong>
          {formatMapValue(regionalValue(hovered, metric), metric)}
        </strong>
      </div>
      <svg
        className="opportunity-svg"
        viewBox={viewBox}
        role="group"
        aria-label={`U.S. state ${measure} map for ${career.title}. Select a state, or use the state selector below.`}
      >
        <defs>
          <pattern
            id={patternId}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <rect width="8" height="8" fill="var(--surface-subtle)" />
            <path d="M0 8L8 0" stroke="var(--border)" strokeWidth="1.5" />
          </pattern>
        </defs>
        {states.map((state) => {
          const record = records.find((record) => record.fips === state.fips);
          const value = regionalValue(record, metric);
          const bucket = mapBucket(value, values);
          const selected = state.fips === stateId;
          return (
            <path
              key={state.fips}
              d={state.d}
              fill={
                bucket === null
                  ? `url(#${patternId})`
                  : `var(--map-${bucket + 1})`
              }
              className={`map-state ${selected ? "is-selected" : ""} ${bucket === null ? "is-missing" : ""} ${hoverId === state.fips ? "is-hovered" : ""}`}
              vectorEffect="non-scaling-stroke"
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              aria-label={`${state.name}, ${measure}: ${formatMapValue(value, metric)}`}
              onMouseEnter={() => setHoverId(state.fips)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(state.fips)}
              onBlur={() => setHoverId(null)}
              onClick={() => setStateId(state.fips)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setStateId(state.fips);
                }
              }}
            >
              <title>{`${state.name}: ${formatMapValue(value, metric)}`}</title>
            </path>
          );
        })}
      </svg>
      <div className="map-legend">
        <span>
          {available.length
            ? metric === "salary"
              ? `$${compactNumber(Math.min(...available))}`
              : metric === "employment"
                ? compactNumber(Math.min(...available))
                : `${Math.min(...available).toFixed(2)}×`
            : "Unavailable"}
        </span>
        <div>
          {[1, 2, 3, 4].map((bucket) => (
            <i key={bucket} style={{ background: `var(--map-${bucket})` }} />
          ))}
        </div>
        <span>
          {available.length
            ? metric === "salary"
              ? `$${compactNumber(Math.max(...available))}`
              : metric === "employment"
                ? compactNumber(Math.max(...available))
                : `${Math.max(...available).toFixed(2)}×`
            : ""}
        </span>
        <span className="legend-missing">
          <i />
          Not published
        </span>
        <span className="legend-selection">
          <i className="legend-dot gold-dot" />
          Selected state
        </span>
      </div>
      <div className="map-state-picker">
        <label htmlFor={`state-${patternId}`}>Selected state</label>
        <select
          id={`state-${patternId}`}
          value={stateId}
          onChange={(event) => {
            setStateId(event.target.value);
            setHoverId(null);
          }}
        >
          {states
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((state) => (
              <option value={state.fips} key={state.fips}>
                {state.name}
              </option>
            ))}
        </select>
      </div>
      <div className="map-state-facts">
        <div>
          <span>Median pay</span>
          <strong>{currency(current?.medianAnnual ?? null)}</strong>
        </div>
        <div>
          <span>Employment</span>
          <strong>{number(current?.employment ?? null)}</strong>
        </div>
        <div>
          <span>Concentration</span>
          <strong>
            {current?.locationQuotient === null ||
            current?.locationQuotient === undefined
              ? "Not published"
              : `${current.locationQuotient.toFixed(2)}×`}
          </strong>
        </div>
      </div>
      <p className="chart-guidance">
        1× concentration = the national employment share. These are job counts,
        not vacancies; pay is not adjusted for living costs.
      </p>
      <details className="chart-data-disclosure">
        <summary>View state data in a table</summary>
        <div className="chart-table-scroll">
          <table className="chart-data-table">
            <caption>{career.title} · BLS OEWS May 2025</caption>
            <thead>
              <tr>
                <th scope="col">State</th>
                <th scope="col">Median pay</th>
                <th scope="col">Employment</th>
                <th scope="col">Concentration</th>
              </tr>
            </thead>
            <tbody>
              {records
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((record) => (
                  <tr key={record.fips}>
                    <th scope="row">
                      <button
                        className="table-career-button"
                        onClick={() => setStateId(record.fips)}
                      >
                        {record.name}
                      </button>
                    </th>
                    <td>{currency(record.medianAnnual)}</td>
                    <td>{number(record.employment)}</td>
                    <td>
                      {record.locationQuotient === null
                        ? "Not published"
                        : `${record.locationQuotient.toFixed(2)}×`}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </DashboardPanel>
  );
}
