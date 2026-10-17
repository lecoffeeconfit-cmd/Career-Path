"use client";

import { useSearchParams } from "next/navigation";
import type { CareerField, Occupation } from "@/lib/domain/occupation";
import { filterCareers } from "@/lib/careers/search";
import { educationLabels } from "@/lib/format";
import { CareerCard } from "./career-card";
import { Icon } from "./ui/icon";

export function CareerDirectory({
  careers,
  fields,
}: {
  careers: Occupation[];
  fields: CareerField[];
}) {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const field = params.get("field") ?? "";
  const education = params.get("education") ?? "";
  const environment = params.get("environment") ?? "";
  const salary = Number(params.get("salary")) || 0;
  const outlook =
    params.get("outlook") === "growing"
      ? "growing"
      : params.get("outlook") === "declining"
        ? "declining"
        : "any";
  const sort =
    params.get("sort") === "salary"
      ? "salary"
      : params.get("sort") === "growth"
        ? "growth"
        : "name";
  const results = filterCareers(careers, {
    query,
    field,
    education,
    environment,
    minSalary: salary,
    outlook,
    sort,
  });
  const activeCount = [
    field,
    education,
    environment,
    salary,
    outlook !== "any",
  ].filter(Boolean).length;

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const search = next.toString();
    window.history.replaceState(
      null,
      "",
      `/careers${search ? `?${search}` : ""}`,
    );
  }
  function reset() {
    window.history.replaceState(null, "", "/careers");
  }

  return (
    <>
      <div className="directory-search" role="search">
        <Icon name="search" size={22} />
        <label className="sr-only" htmlFor="career-search">
          Search by career, skill, interest, major, or SOC code
        </label>
        <input
          id="career-search"
          type="search"
          placeholder="Search careers, skills, subjects, or interests…"
          value={query}
          onChange={(event) => update("q", event.target.value)}
        />
        <span className="search-hint">Find your starting point</span>
      </div>
      <div className="field-pills" aria-label="Filter by career field">
        <button aria-pressed={!field} onClick={() => update("field", "")}>
          All fields <span>{careers.length}</span>
        </button>
        {fields.map((item) => (
          <button
            key={item.id}
            aria-pressed={field === item.id}
            onClick={() => update("field", item.id)}
          >
            <Icon name={item.icon} size={15} />
            {item.name}
          </button>
        ))}
      </div>
      <div className="directory-layout">
        <aside className="filter-panel" aria-label="Career filters">
          <div className="filter-heading">
            <h2>
              <Icon name="filter" size={18} />
              Refine your direction
            </h2>
            {activeCount > 0 && (
              <button className="text-button" onClick={reset}>
                Reset
              </button>
            )}
          </div>
          <label>
            Education route
            <select
              value={education}
              onChange={(event) => update("education", event.target.value)}
            >
              <option value="">Any education route</option>
              {Object.entries(educationLabels).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <p className="filter-help">
            Includes alternative routes, not just typical entry education.
          </p>
          <label>
            Minimum median annual pay
            <select
              value={salary || ""}
              onChange={(event) => update("salary", event.target.value)}
            >
              <option value="">Any salary</option>
              <option value="60000">$60,000+</option>
              <option value="90000">$90,000+</option>
              <option value="120000">$120,000+</option>
            </select>
          </label>
          <label>
            Projected employment trend
            <select
              value={outlook === "any" ? "" : outlook}
              onChange={(event) => update("outlook", event.target.value)}
            >
              <option value="">Any outlook</option>
              <option value="growing">Projected to grow</option>
              <option value="declining">Projected to decline</option>
            </select>
          </label>
          <label>
            Typical work setting
            <select
              value={environment}
              onChange={(event) => update("environment", event.target.value)}
            >
              <option value="">Any setting</option>
              <option value="office">Office / studio</option>
              <option value="clinical">Clinical / patient care</option>
              <option value="hands-on">Hands-on / worksites</option>
            </select>
          </label>
          <div className="filter-note">
            <Icon name="globe" size={18} />
            <div>
              <strong>A national starting point</strong>
              <p>
                Figures cover the United States. Local wages and job
                opportunities can differ.
              </p>
            </div>
          </div>
        </aside>
        <section className="directory-results" aria-label="Career results">
          <div className="results-heading">
            <p role="status">
              <strong>{results.length}</strong>{" "}
              {results.length === 1 ? "career" : "careers"}
              {query ? <> for “{query}”</> : " to explore"}
            </p>
            <label>
              Sort by{" "}
              <select
                value={sort}
                onChange={(event) => update("sort", event.target.value)}
              >
                <option value="name">Career name</option>
                <option value="salary">Highest median pay</option>
                <option value="growth">Highest projected growth</option>
              </select>
            </label>
          </div>
          {results.length > 0 ? (
            <div className="directory-card-grid">
              {results.map((occupation) => (
                <CareerCard
                  key={occupation.id}
                  occupation={occupation}
                  field={fields.find((item) => item.id === occupation.fieldId)!}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="compass" size={40} />
              <h2>A different direction might help.</h2>
              <p>
                No careers in this six-record starting collection match your
                choices. Try a broader search or clear your filters.
              </p>
              <button className="button button-primary" onClick={reset}>
                Clear search and filters <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
          <p className="data-caption">
            Curated BLS snapshot · Wages {careers[0].wage.year} · Projections{" "}
            {careers[0].projection.startYear}–{careers[0].projection.endYear}
          </p>
        </section>
      </div>
    </>
  );
}
