import Link from "next/link";
import type { CareerField, Occupation } from "@/lib/domain/occupation";
import { currency, educationLabels, growth } from "@/lib/format";
import { Icon } from "./ui/icon";
import { IconTile } from "./ui/primitives";
export function CareerCard({
  occupation,
  field,
}: {
  occupation: Occupation;
  field: CareerField;
}) {
  return (
    <article className="career-card">
      <div className="career-card-top">
        <IconTile name={field.icon} />
        <span
          className={`growth-badge ${occupation.projection.growthPercent !== null && occupation.projection.growthPercent < 0 ? "growth-decline" : ""}`}
        >
          <Icon name="chart" size={13} />
          {growth(occupation.projection.growthPercent)} projected
        </span>
      </div>
      <p className="card-category">{field.name}</p>
      <h3>
        <Link href={`/careers/${occupation.slug}`}>{occupation.title}</Link>
      </h3>
      <p className="card-description">{occupation.summary}</p>
      <div className="career-card-metrics">
        <div>
          <span>Median annual pay</span>
          <strong>{currency(occupation.wage.medianAnnual)}</strong>
        </div>
        <span className="card-arrow">
          <Icon name="arrow-up" size={21} />
        </span>
      </div>
      <div className="career-card-footer">
        <span>
          <Icon name="book" size={14} />
          {educationLabels[occupation.typicalEducation]}
        </span>
        <span>BLS · {occupation.wage.year}</span>
      </div>
    </article>
  );
}
