"use client";
import { useState } from "react";
import Link from "next/link";
import type { CareerField, Occupation } from "@/lib/domain/occupation";
import { currency, educationLabels, growth } from "@/lib/format";
import { Icon } from "./ui/icon";
import { IconTile } from "./ui/primitives";
export function CareerSpotlight({
  careers,
  fields,
}: {
  careers: Occupation[];
  fields: CareerField[];
}) {
  const [selected, setSelected] = useState(0);
  const occupation = careers[selected];
  const field = fields.find((item) => item.id === occupation.fieldId)!;
  return (
    <div className="spotlight-wrap">
      <div className="spotlight-orbit orbit-one" />
      <div className="spotlight-orbit orbit-two" />
      <div className="orbit-dot" />
      <div className="spotlight-floating">
        <span className="status-dot" />
        Knowledge opens doors
      </div>
      <section className="spotlight-card" aria-label="Career spotlight">
        <div className="spotlight-header">
          <span>
            <Icon name="spark" size={14} />A possibility worth exploring
          </span>
          <span>
            0{selected + 1} / 0{careers.length}
          </span>
        </div>
        <div
          className="spotlight-content"
          key={occupation.id}
          aria-live="polite"
        >
          <div className="spotlight-icon-row">
            <IconTile name={field.icon} large />
            <span className="pill">{field.name}</span>
          </div>
          <h2>{occupation.title}</h2>
          <p>{occupation.summary}</p>
          <div className="spotlight-metrics">
            <div>
              <span>Median annual pay</span>
              <strong className="text-gold">
                {currency(occupation.wage.medianAnnual)}
              </strong>
            </div>
            <div>
              <span>Projected growth</span>
              <strong>
                {growth(occupation.projection.growthPercent)}
                <Icon name="arrow-up" size={18} />
              </strong>
            </div>
          </div>
          <div className="spotlight-route">
            <span>
              <Icon name="book" size={16} />
              {educationLabels[occupation.typicalEducation]}
            </span>
            <span className="route-dots" />
            <Icon name="briefcase" size={18} />
          </div>
          <Link href={`/careers/${occupation.slug}`} className="spotlight-link">
            See the full picture <Icon name="arrow" size={18} />
          </Link>
          <p className="spotlight-source">
            BLS · U.S. wages {occupation.wage.year} · Outlook{" "}
            {occupation.projection.startYear}–{occupation.projection.endYear}
          </p>
        </div>
        <div
          className="spotlight-selector"
          aria-label="Choose a spotlight career"
        >
          {careers.map((career, index) => (
            <button
              key={career.id}
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
            >
              {fields.find((item) => item.id === career.fieldId)!.name}
            </button>
          ))}
        </div>
      </section>
      <div className="spotlight-bottom-note">
        <Icon name="shield" size={16} />
        <span>Real data. More informed decisions.</span>
      </div>
    </div>
  );
}
