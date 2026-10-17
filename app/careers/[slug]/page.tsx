import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareerCard } from "@/components/career-card";
import { Icon } from "@/components/ui/icon";
import {
  Breadcrumbs,
  ButtonLink,
  Eyebrow,
  IconTile,
  Metric,
  SectionHeading,
} from "@/components/ui/primitives";
import { getField, getOccupation, occupations } from "@/lib/data/occupations";
import { currency, educationLabels, growth, number } from "@/lib/format";

export function generateStaticParams() {
  return occupations.map((occupation) => ({ slug: occupation.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const occupation = getOccupation((await params).slug);
  return occupation
    ? { title: occupation.title, description: occupation.summary }
    : { title: "Career not found" };
}

export default async function OccupationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const occupation = getOccupation((await params).slug);
  if (!occupation) notFound();
  const field = getField(occupation.fieldId);
  const source = occupation.sources[0];
  return (
    <main id="main-content" className="container page-main detail-main">
      <Breadcrumbs
        items={[
          { label: "Explore careers", href: "/careers" },
          { label: occupation.title },
        ]}
      />
      <header className="detail-heading">
        <div>
          <div className="detail-category">
            <IconTile name={field.icon} />
            <span>
              {field.name}
              <span className="classification">
                SOC {occupation.classification.code}
              </span>
            </span>
          </div>
          <h1>
            {occupation.title}
            <span className="text-gold">.</span>
          </h1>
          <p>{occupation.summary}</p>
          <div className="alternate-titles">
            Also known as: {occupation.alternateTitles.join(" · ")}
          </div>
        </div>
        <ButtonLink href={`/careers?field=${field.id}`} secondary arrow>
          Explore this field
        </ButtonLink>
      </header>
      <div className="metrics-grid">
        <Metric
          label="Median annual pay"
          value={currency(occupation.wage.medianAnnual)}
          note={`U.S. · May ${occupation.wage.year}`}
          gold
        />
        <Metric
          label="Projected employment change"
          value={growth(occupation.projection.growthPercent)}
          note={`${occupation.projection.startYear}–${occupation.projection.endYear} · U.S.`}
        />
        <Metric
          label="Jobs in this occupation"
          value={number(occupation.employment.employment)}
          note={`${occupation.employment.year} employment level · U.S.`}
        />
        <Metric
          label="Typical entry education"
          value={educationLabels[occupation.typicalEducation]}
          note="Explore other routes below"
        />
      </div>
      <p className="data-caption">
        <Icon name="shield" size={15} />
        BLS Occupational Outlook Handbook · Verified October 16, 2026 · National
        snapshot{" "}
        <a href="#sources">
          See sources <Icon name="down" size={13} />
        </a>
      </p>
      <nav className="detail-navigation" aria-label="Career sections">
        <a href="#overview">The work</a>
        <a href="#outlook">Pay & outlook</a>
        <a href="#education">Ways in</a>
        <a href="#knowledge">What to learn</a>
        <a href="#related">Related careers</a>
        <a href="#sources">Sources</a>
      </nav>
      <section className="detail-section detail-overview" id="overview">
        <div>
          <Eyebrow>The everyday picture</Eyebrow>
          <h2>
            What does the work <em>look like?</em>
          </h2>
          <p className="detail-intro">{occupation.overview}</p>
          <h3>Typical responsibilities</h3>
          <ul className="task-list">
            {occupation.tasks.map((task) => (
              <li key={task}>
                <span className="tiny-check">
                  <Icon name="check" size={12} />
                </span>
                {task}
              </li>
            ))}
          </ul>
        </div>
        <aside className="info-card">
          <h3>
            <Icon name="briefcase" size={19} />
            Working life
          </h3>
          <p>{occupation.workLife}</p>
          <h4>Physical demands & setting</h4>
          <p>{occupation.physicalDemands}</p>
          <div className="tag-list">
            {occupation.interests.map((interest) => (
              <span className="tag" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </aside>
      </section>
      <section className="detail-section" id="outlook">
        <SectionHeading
          eyebrow="Make an informed decision"
          title={
            <>
              The numbers, <em>in context.</em>
            </>
          }
        />
        <div className="context-grid">
          <article className="info-card">
            <IconTile name="chart" gold />
            <h3>Understanding pay</h3>
            <p>
              The national annual median is{" "}
              {currency(occupation.wage.medianAnnual)}: half of workers earn
              more and half earn less. It is not an entry-level salary.
            </p>
            <dl className="fact-list">
              <div>
                <dt>Median hourly pay</dt>
                <dd>{currency(occupation.wage.medianHourly, 2)}</dd>
              </div>
              <div>
                <dt>Reference period</dt>
                <dd>May {occupation.wage.year}</dd>
              </div>
              <div>
                <dt>Regional pay</dt>
                <dd>Not in this snapshot</dd>
              </div>
            </dl>
          </article>
          <article className="info-card">
            <IconTile name="briefcase" />
            <h3>Understanding demand</h3>
            <p>
              Projected employment change is{" "}
              {growth(occupation.projection.growthPercent)} over{" "}
              {occupation.projection.startYear}–{occupation.projection.endYear}.
              This is an occupation forecast, not a personal chance of finding
              work.
            </p>
            <dl className="fact-list">
              <div>
                <dt>Average annual openings</dt>
                <dd>{number(occupation.projection.averageAnnualOpenings)}</dd>
              </div>
              <div>
                <dt>Geographic coverage</dt>
                <dd>United States</dd>
              </div>
              <div>
                <dt>Projection period</dt>
                <dd>
                  {occupation.projection.startYear}–
                  {occupation.projection.endYear}
                </dd>
              </div>
            </dl>
          </article>
        </div>
        {occupation.projection.notes && (
          <div className="notice">
            <Icon name="info" size={19} />
            <p>{occupation.projection.notes}</p>
          </div>
        )}
        <p className="data-caption">
          Openings include replacement needs and are not current vacancies.
          Employment counts are not employment rates.
        </p>
      </section>
      <section className="detail-section" id="education">
        <SectionHeading
          eyebrow="Understand your options"
          title={
            <>
              More than one <em>way in.</em>
            </>
          }
          description="Typical preparation, alternative entry routes, and specialization options. Check program and local credential requirements before committing."
        />
        <div className="pathway-grid">
          {occupation.pathways.map((pathway) => (
            <article className="pathway-card" key={pathway.id}>
              <div className="pathway-header">
                <Icon name="route" size={24} />
                <span
                  className={`pill ${pathway.kind === "typical" ? "pill-emerald" : ""}`}
                >
                  {pathway.kind === "typical"
                    ? "Typical route"
                    : pathway.kind === "alternative"
                      ? "Alternative route"
                      : "Specialization"}
                </span>
              </div>
              <h3>{pathway.title}</h3>
              <p>{pathway.description}</p>
              <ol className="pathway-steps">
                {pathway.steps.map((step, index) => (
                  <li key={step}>
                    <span>{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <details>
                <summary>
                  Credentials & requirements <Icon name="down" size={14} />
                </summary>
                <p>{pathway.credentialNote}</p>
                <a
                  href={`${source.url}#tab-4`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Read BLS preparation guidance{" "}
                  <Icon name="arrow-up" size={14} />
                </a>
              </details>
            </article>
          ))}
        </div>
      </section>
      <section className="detail-section" id="knowledge">
        <SectionHeading
          eyebrow="Build your foundation"
          title={
            <>
              Knowledge that <em>opens doors.</em>
            </>
          }
          description="Editorial learning suggestions to help you ask better questions about courses and projects. These are not official competency ratings or a complete qualification checklist."
        />
        <div className="knowledge-grid">
          {(["foundation", "intermediate", "advanced"] as const).map(
            (stage, index) => (
              <article className="knowledge-card" key={stage}>
                <span className="knowledge-stage">
                  0{index + 1}{" "}
                  <span>
                    {stage === "foundation"
                      ? "Start here"
                      : stage === "intermediate"
                        ? "Go deeper"
                        : "Find a focus"}
                  </span>
                </span>
                <h3>
                  {stage === "foundation"
                    ? "Foundations"
                    : stage === "intermediate"
                      ? "Applied knowledge"
                      : "Optional specializations"}
                </h3>
                <ul>
                  {occupation.competencies
                    .filter((item) => item.stage === stage)
                    .map((item) => (
                      <li key={item.id}>
                        <Icon name="book" size={15} />
                        {item.name}
                      </li>
                    ))}
                </ul>
              </article>
            ),
          )}
        </div>
        <p className="data-caption">
          Related areas of study: {occupation.majors.join(" · ")}. Course
          requirements differ by program.
        </p>
      </section>
      <section className="detail-section" id="related">
        <SectionHeading
          eyebrow="Keep your options open"
          title={
            <>
              Another direction <em>to consider.</em>
            </>
          }
        />
        <div className="related-grid">
          {occupation.related.map((related) => {
            const item = getOccupation(related.occupationId)!;
            return (
              <div key={item.id}>
                <CareerCard occupation={item} field={getField(item.fieldId)} />
                <p className="related-reason">{related.reason}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="detail-section sources-section" id="sources">
        <Eyebrow>Transparent by design</Eyebrow>
        <h2>
          Know where the information <em>comes from.</em>
        </h2>
        {occupation.sources.map((reference) => (
          <article className="source-card" key={reference.id}>
            <Icon name="shield" size={24} />
            <div>
              <h3>
                <a href={reference.url} target="_blank" rel="noreferrer">
                  {reference.title} <Icon name="arrow-up" size={15} />
                </a>
              </h3>
              <p>
                {reference.organization} · {reference.geography}
              </p>
              <dl className="source-dates">
                <div>
                  <dt>Data year</dt>
                  <dd>{reference.referenceYear}</dd>
                </div>
                <div>
                  <dt>Publication year</dt>
                  <dd>{reference.publicationYear}</dd>
                </div>
                <div>
                  <dt>Verified</dt>
                  <dd>{reference.retrievedAt}</dd>
                </div>
              </dl>
              <details>
                <summary>
                  Coverage & limitations <Icon name="down" size={14} />
                </summary>
                <ul>
                  {reference.limitations.map((limit) => (
                    <li key={limit}>{limit}</li>
                  ))}
                </ul>
              </details>
            </div>
          </article>
        ))}
        <Link className="text-link" href="/resources">
          Our sourcing and methodology <Icon name="arrow" size={17} />
        </Link>
      </section>
    </main>
  );
}
