import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Eyebrow, IconTile } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { occupations } from "@/lib/data/occupations";

export const metadata: Metadata = {
  title: "Resources & Methodology",
  description:
    "Understand Career Path’s data sources, coverage, education guidance, and evidence standards.",
};
export default function ResourcesPage() {
  return (
    <main id="main-content" className="container page-main">
      <Breadcrumbs items={[{ label: "Resources & methodology" }]} />
      <header className="page-heading">
        <Eyebrow gold>Clarity starts with transparency</Eyebrow>
        <h1>
          Better information.
          <br />
          <em>More thoughtful decisions.</em>
        </h1>
        <p>
          You should know where a number comes from, what it means, and where
          its limits are. Here’s how we approach the information on Career Path.
        </p>
      </header>
      <div className="prose-grid">
        <article className="prose-card">
          <IconTile name="shield" gold />
          <h2>A small, sourced starting collection</h2>
          <p>
            The directory includes six U.S. occupations, normalized by Standard
            Occupational Classification (SOC) code. Financial and employment
            figures are a verified snapshot of the{" "}
            <a href="https://www.bls.gov/ooh/" target="_blank" rel="noreferrer">
              BLS Occupational Outlook Handbook
            </a>
            , checked October 16, 2026.
          </p>
          <p>
            Wages refer to May 2025. Employment counts refer to 2025.
            Projections cover 2025–2035. This is a curated starting collection,
            not a complete directory or live API feed.
          </p>
          <p>
            BLS text and statistics are public-domain material;{" "}
            <a
              href="https://www.bls.gov/opub/copyright-information.htm"
              target="_blank"
              rel="noreferrer"
            >
              BLS’s reuse policy
            </a>{" "}
            requests source attribution. Career Path is independent and is not
            endorsed by BLS.
          </p>
        </article>
        <article className="prose-card">
          <IconTile name="chart" />
          <h2>Different numbers answer different questions</h2>
          <ul>
            <li>
              <strong>Median wage:</strong> half of workers earn more and half
              earn less. It is not a starting salary or a promise of earnings.
            </li>
            <li>
              <strong>Employment level:</strong> a count of jobs in an
              occupation, not an employment or unemployment rate.
            </li>
            <li>
              <strong>Projected growth:</strong> estimated change across a
              stated period, not a chance of career success.
            </li>
            <li>
              <strong>Annual openings:</strong> an average projection including
              replacements, not current job vacancies.
            </li>
          </ul>
          <p>
            National figures do not describe a specific state, city, employer,
            or individual. OEWS wage figures exclude self-employed workers.
          </p>
        </article>
        <article className="prose-card">
          <IconTile name="book" />
          <h2>Preparation is more than a degree title</h2>
          <p>
            Entry education and training routes summarize BLS guidance.
            “Typical” describes a usual route; “alternative” describes another
            documented option; “specialization” describes further preparation
            rather than a universal entry requirement.
          </p>
          <p>
            Learning topics, search keywords, related-career explanations, and
            areas of study are editorial guidance. They are not official O*NET
            scores, accredited curricula, or a complete list of qualification
            requirements. Verify programs, licensing, and employer requirements
            at the source.
          </p>
          <p>
            We do not estimate training costs, preparation time, or career
            readiness without supporting data or explicitly labeled user
            assumptions.
          </p>
        </article>
        <article className="prose-card">
          <IconTile name="info" />
          <h2>Missing data stays visible</h2>
          <p>
            Unavailable values display “Not available.” We do not calculate an
            hourly median by dividing annual pay, mix occupation-group openings
            with a specific occupation, or create artificial skill scores.
          </p>
          <p>
            Software developer openings are omitted because the reviewed BLS
            page reports openings for a broader group that also includes quality
            assurance analysts and testers.
          </p>
          <p>
            State wages and occupational skill ratings now come from the
            datasets described below. One state median wage is unpublished and
            stays unavailable. Historical trends and wage distributions have not
            been imported; no artificial time series is drawn.
          </p>
        </article>
        <article className="prose-card" id="regional-data">
          <IconTile name="map" />
          <h2>State opportunity data</h2>
          <p>
            The map uses 306 occupation/state observations extracted from the
            official{" "}
            <a
              href="https://www.bls.gov/oes/2025/may/oessrcst.htm"
              target="_blank"
              rel="noreferrer"
            >
              May 2025 BLS Occupational Employment and Wage Statistics state
              workbook
            </a>
            . It covers the six careers across all 50 states and DC, with source
            medians, employment counts, and location quotients. It is a
            downloaded snapshot, not a live vacancy feed.
          </p>
          <p>
            A location quotient of 1 means the occupation has the same share of
            state employment as it has nationally. Pay is not adjusted for
            living costs. OEWS employment excludes self-employed workers and is
            a different series from the national OOH Employment Projections
            counts; the two are not summed or treated as identical.
          </p>
          <p>
            Suppressed, top-coded, and unavailable source values remain null.
            Map geometry uses{" "}
            <a
              href="https://github.com/topojson/us-atlas"
              target="_blank"
              rel="noreferrer"
            >
              Census-derived us-atlas boundaries
            </a>{" "}
            under the ISC license; Alaska and Hawaii use standard map insets.
          </p>
        </article>
        <article className="prose-card" id="onet-data">
          <IconTile name="compass" gold />
          <h2>O*NET® occupational skill ratings</h2>
          <p>
            The radar uses the{" "}
            <a
              href="https://www.onetcenter.org/database.html"
              target="_blank"
              rel="noreferrer"
            >
              O*NET® 31.0 Database
            </a>{" "}
            Essential Skills file, checked October 16, 2026. Importance uses the
            original 1–5 scale; level uses 0–7. Each source observation keeps
            its own update date, occupational code, and suppression flags.
          </p>
          <p>
            The chart shows six common skills; its table includes all ten
            essential skills. Analyst ratings describe an occupation’s demands,
            not an individual’s aptitude, progress, or probability of success. A
            missing or suppressed rating is never converted to zero.
          </p>
          <p>
            This page includes information from the O*NET® 31.0 Database by the
            U.S. Department of Labor, Employment and Training Administration
            (USDOL/ETA), used under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 4.0
            </a>
            . Career Path filtered the data and shortened chart labels;
            published rating values are retained. USDOL/ETA has not approved,
            endorsed, or tested these modifications. O*NET® is a trademark of
            USDOL/ETA.
          </p>
        </article>
        <article className="prose-card">
          <IconTile name="compass" />
          <h2>Discovery should expand your options</h2>
          <p>
            Directory search matches career names, alternate titles, SOC codes,
            learning topics, areas of study, and interest keywords. Filters
            combine rather than override each other. Education filters include
            documented alternative routes.
          </p>
          <p>
            Work settings are broad summaries, not guarantees of remote work or
            accessibility. Career Finder’s preference matching is planned for
            Phase 3; there are no personalized fit or aptitude scores in this
            version.
          </p>
        </article>
        <article className="prose-card">
          <IconTile name="spark" gold />
          <h2>Evidence before promises</h2>
          <p>
            The planned activities module will distinguish demonstrated
            findings, correlations, expert reasoning, and hypotheses. An
            association is not proof that an activity causes career success:
            selection effects and other factors can explain a relationship.
          </p>
          <p>
            Sports, hobbies, volunteering, and practice will be described as
            optional skill-building opportunities with accessible alternatives.
            We will not invent selection probabilities, predictive percentages,
            or mandatory activities.
          </p>
          <p>
            <Link href="/roadmap">See the phased product roadmap</Link> for the
            remaining visualization, planning, and progress features.
          </p>
        </article>
      </div>
      <section className="resources-sources">
        <Eyebrow>Follow the information</Eyebrow>
        <h2>Occupation source library</h2>
        {occupations.map((occupation) => (
          <article className="reference-row" key={occupation.id}>
            <div>
              <h3>{occupation.title}</h3>
              <p>
                SOC {occupation.classification.code} · BLS OOH · Data 2025 ·
                Projections 2025–2035 · Verified 2026-10-16
              </p>
            </div>
            <a
              href={occupation.sources[0].url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read the BLS source for ${occupation.title}`}
            >
              Read source <Icon name="arrow-up" size={15} />
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
