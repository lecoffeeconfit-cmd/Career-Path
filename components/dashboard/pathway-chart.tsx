"use client";
import { useState } from "react";
import Link from "next/link";
import type { Occupation } from "@/lib/domain/occupation";
import { DashboardPanel } from "./panel";

function lines(text: string, max = 19) {
  const output: string[] = [];
  for (const word of text.split(" ")) {
    const index = output.length - 1;
    if (index < 0 || output[index].length + word.length + 1 > max)
      output.push(word);
    else output[index] += ` ${word}`;
  }
  return output;
}

export function PathwayChart({ career }: { career: Occupation }) {
  const [pathwayId, setPathwayId] = useState(career.pathways[0].id);
  const selected =
    career.pathways.find((pathway) => pathway.id === pathwayId) ??
    career.pathways[0];
  const routes = career.pathways.slice(0, 2);
  const optional = routes[1]?.kind === "specialization";
  return (
    <DashboardPanel
      id="career-pathways"
      number="02"
      title="Career pathways"
      subtitle="Understand your options. Choose a route."
      icon="route"
      footer={
        <>
          <span>BLS preparation guidance · Requirements vary</span>
          <Link href={`/careers/${career.slug}#education`}>
            Education details ↗
          </Link>
        </>
      }
    >
      <div className="pathway-legend">
        <span>
          <i className="legend-dot emerald-dot" />
          Preparation route
        </span>
        <span>
          <i className="legend-dot gold-dot" />
          Career goal
        </span>
      </div>
      <svg
        viewBox="0 0 540 244"
        className="pathway-svg"
        role="group"
        aria-label={`Preparation routes to ${career.title}. ${optional ? "The lower branch is optional specialization following the typical route." : "Two documented routes are available."}`}
      >
        <path
          d="M118 120H142Q155 120 155 104V73Q155 60 176 60"
          className={`pathway-connector ${selected.id === routes[0].id ? "active" : ""}`}
        />
        <path
          d="M341 60H365Q378 60 378 78V104Q378 120 400 120"
          className={`pathway-connector ${selected.id === routes[0].id ? "active" : ""}`}
        />
        <path
          d={
            optional
              ? "M258 91V149"
              : "M118 120H142Q155 120 155 136V167Q155 181 176 181"
          }
          className={`pathway-connector ${selected.id === routes[1]?.id ? "active" : ""} ${optional ? "optional-connector" : ""}`}
        />
        <path
          d="M341 181H365Q378 181 378 163V136Q378 120 400 120"
          className={`pathway-connector ${selected.id === routes[1]?.id ? "active" : ""}`}
        />
        <g className="pathway-origin">
          <rect x="7" y="94" width="111" height="52" rx="12" />
          <text x="62" y="116" textAnchor="middle">
            Your starting
          </text>
          <text x="62" y="132" textAnchor="middle">
            point
          </text>
        </g>
        {routes.map((route, index) => {
          const y = index === 0 ? 29 : 150;
          const label = lines(route.title);
          return (
            <g
              key={route.id}
              className={`pathway-node ${selected.id === route.id ? "is-selected" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={selected.id === route.id}
              aria-label={`${route.title}, ${route.kind}. Show preparation requirements.`}
              onClick={() => setPathwayId(route.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setPathwayId(route.id);
                }
              }}
            >
              <title>{route.title}</title>
              <rect x="176" y={y} width="165" height="62" rx="12" />
              {label.map((line, lineIndex) => (
                <text
                  key={lineIndex}
                  x="258.5"
                  y={y + 32 - (label.length - 1) * 7 + lineIndex * 14}
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
              <text
                x="258.5"
                y={index === 0 ? 17 : 228}
                textAnchor="middle"
                className="pathway-route-label"
              >
                {route.kind === "typical"
                  ? "TYPICAL ROUTE"
                  : route.kind === "alternative"
                    ? "ALTERNATIVE ROUTE"
                    : "OPTIONAL SPECIALIZATION"}
              </text>
            </g>
          );
        })}
        <g className="pathway-goal">
          <rect x="400" y="88" width="132" height="64" rx="13" />
          {lines(career.title, 17).map((line, index, label) => (
            <text
              key={index}
              x="466"
              y={120 - (label.length - 1) * 7 + index * 14}
              textAnchor="middle"
            >
              {line}
            </text>
          ))}
        </g>
      </svg>
      <div
        className={`pathway-mobile-tree ${optional ? "is-specialization" : ""}`}
      >
        <span className="pathway-mobile-origin">Your starting point</span>
        <div className="pathway-mobile-branches">
          {routes.map((route) => (
            <button
              key={route.id}
              aria-pressed={selected.id === route.id}
              onClick={() => setPathwayId(route.id)}
            >
              <small>
                {route.kind === "typical"
                  ? "Typical route"
                  : route.kind === "alternative"
                    ? "Alternative route"
                    : "Optional specialization"}
              </small>
              <span>{route.title}</span>
            </button>
          ))}
        </div>
        {optional && (
          <p>
            Specialization is optional and follows foundational preparation.
          </p>
        )}
        <span className="pathway-mobile-goal">{career.title}</span>
      </div>
      <div className="selected-pathway" aria-live="polite">
        <div>
          <span className="pill pill-emerald">
            {selected.kind === "specialization"
              ? "Optional specialization"
              : selected.kind === "alternative"
                ? "Alternative route"
                : "Typical route"}
          </span>
          <h3>{selected.title}</h3>
        </div>
        <ol>
          {selected.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p>{selected.credentialNote}</p>
      </div>
    </DashboardPanel>
  );
}
