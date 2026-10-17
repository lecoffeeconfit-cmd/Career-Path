"use client";
import { useState } from "react";
import Link from "next/link";
import type { Occupation } from "@/lib/domain/occupation";
import { currency, educationLabels, growth, number } from "@/lib/format";
import { AnalyticsChart } from "./dashboard/analytics-chart";
import { Icon } from "./ui/icon";

export function CareerComparison({ careers }: { careers: Occupation[] }) {
  const [ids, setIds] = useState(
    careers.slice(0, 3).map((career) => career.id),
  );
  const [focusedId, setFocusedId] = useState(ids[0]);
  const chosen = ids.map((id) => careers.find((career) => career.id === id)!);
  const focused = chosen.find((career) => career.id === focusedId) ?? chosen[0];
  function choose(slot: number, id: string) {
    setIds((previous) => {
      const next = [...previous];
      const existing = next.indexOf(id);
      if (existing >= 0) next[existing] = next[slot];
      next[slot] = id;
      return next;
    });
  }
  return (
    <>
      <div className="comparison-selectors">
        {chosen.map((career, index) => (
          <label key={index}>
            <span>Career {index + 1}</span>
            <select
              value={career.id}
              onChange={(event) => choose(index, event.target.value)}
            >
              {careers.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="comparison-overview">
        <AnalyticsChart
          careers={chosen}
          selected={focused}
          onSelect={setFocusedId}
          linkedDashboard={false}
        />
        <aside className="comparison-context info-card">
          <span className="eyebrow">Different paths, different tradeoffs</span>
          <h2>Compare what matters to you.</h2>
          <p>
            The chart compares one measurement at a time. Salary, growth, and
            employment counts answer different questions; they are not combined
            into a fit score.
          </p>
          <p>
            National medians are not starting salaries. Projected growth does
            not measure your chance of getting a job.
          </p>
          <p>
            Education costs and preparation time are unavailable in this
            snapshot. They have not been estimated from a degree title.
          </p>
          <Link className="text-link" href="/resources">
            Read our methodology <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
      <div className="comparison-cards">
        {chosen.map((career) => (
          <article key={career.id} className="comparison-career-card">
            <h2>
              <Link href={`/careers/${career.slug}`}>
                {career.title} <Icon name="arrow-up" size={17} />
              </Link>
            </h2>
            <p>{career.summary}</p>
            <dl className="fact-list">
              <div>
                <dt>Median annual pay</dt>
                <dd className="text-gold">
                  {currency(career.wage.medianAnnual)}
                </dd>
              </div>
              <div>
                <dt>Projected change, 2025–2035</dt>
                <dd>{growth(career.projection.growthPercent)}</dd>
              </div>
              <div>
                <dt>Employment, 2025</dt>
                <dd>{number(career.employment.employment)}</dd>
              </div>
              <div>
                <dt>Average annual openings</dt>
                <dd>{number(career.projection.averageAnnualOpenings)}</dd>
              </div>
              <div>
                <dt>Typical entry education</dt>
                <dd>{educationLabels[career.typicalEducation]}</dd>
              </div>
              <div>
                <dt>Education cost / time</dt>
                <dd>Not available</dd>
              </div>
            </dl>
            <h3>Preparation options</h3>
            <ul>
              {career.pathways.map((pathway) => (
                <li key={pathway.id}>
                  {pathway.title}
                  <small>
                    {pathway.kind === "specialization"
                      ? "Optional specialization"
                      : pathway.kind === "alternative"
                        ? "Alternative route"
                        : "Typical route"}
                  </small>
                </li>
              ))}
            </ul>
            <h3>Working life</h3>
            <p>{career.workLife}</p>
            <h3>Typical tasks</h3>
            <ul>
              {career.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
            <Link className="text-link" href={`/careers/${career.slug}`}>
              Explore the full profile <Icon name="arrow" size={16} />
            </Link>
            <a
              className="comparison-source"
              href={career.sources[0].url}
              target="_blank"
              rel="noreferrer"
            >
              BLS OOH · 2025 data · Source ↗
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
