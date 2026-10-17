import type { Metadata } from "next";
import { Breadcrumbs, ButtonLink, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Product Roadmap",
  description:
    "What is available in Career Path today, and what comes next in its phased development.",
};
const phases = [
  {
    number: "01",
    title: "A thoughtful foundation",
    status: "Available now",
    description:
      "A working exploration experience built around shared, transparent occupational records.",
    features: [
      [
        "One visual language",
        "Emerald & Champagne design tokens, responsive components, accessible controls, light/dark/system appearance, and reduced-motion support.",
      ],
      [
        "Explore real careers",
        "Homepage, navigation, six sourced profiles, working search, combined filters, sorting, and shareable directory URLs.",
      ],
      [
        "Understand the work",
        "Pay and employment metrics, responsibilities, work settings, education options, learning suggestions, and related careers.",
      ],
      [
        "Know the source",
        "SOC normalization, source and date metadata, transparent missing data, and public methodology.",
      ],
    ],
  },
  {
    number: "02",
    title: "Career intelligence",
    status: "Core visuals available",
    description:
      "The homepage now has four connected, sourced visualization systems and a working three-career comparison page. Deeper education planning and financial tools remain to be built.",
    features: [
      [
        "Career analytics dashboard",
        "Available: salary, employment, and projected-growth bars; connected career selection; three-career comparison. Next: verified historical trends and wage distributions. Missing history remains missing.",
      ],
      [
        "Interactive career pathways",
        "Available: interactive branches for documented typical, alternative, and optional specialization routes, with preparation steps and credentials. Next: full prerequisites, programs, coursework, and editable milestones.",
      ],
      [
        "Geographic opportunity maps",
        "Available: median pay, employment, and concentration across 50 states plus DC, with selection, zoom, legends, tooltips, and a table alternative. Next: metropolitan and education-program layers.",
      ],
      [
        "Skills and aptitude visualizations",
        "Available: attributed O*NET essential skill radar comparisons, importance/level scales, rating details, and tables. Next: skill networks, activity links, and separate user self-reports.",
      ],
      [
        "Education planning",
        "Program and major mappings, multiple preparation routes, official program links, and clear distinctions between required and optional credentials.",
      ],
      [
        "Financial scenarios",
        "User-editable education cost, debt, opportunity cost, career-change, and break-even tools. Keep assumptions separate from official observations.",
      ],
    ],
  },
  {
    number: "03",
    title: "Your direction, your progress",
    status: "Planned",
    description:
      "Personal guidance and saved plans will build on the foundation, with optional browser storage first and an architecture for later account synchronization.",
    features: [
      [
        "Career Finder",
        "Skippable questions about interests, strengths, work preferences, budget, location, education, and priorities. Transparent adjustable weights and explanations; no success probabilities.",
      ],
      [
        "Activities, habits, and transferable skills",
        "Connect sports, hobbies, volunteering, practice, and experience to skills and occupations, with evidence levels, sources, accessible alternatives, and correlation-versus-causation guidance.",
      ],
      [
        "Editable career roadmaps",
        "Use current education, credentials, experience, budget, and available study time. Add prerequisite-aware milestones, resources, completion states, target dates, zoom, and panning.",
      ],
      [
        "My Career Plan",
        "Save careers, comparisons, and several plans. Record knowledge and skill progress, extracurricular activities, achievements, and next actions locally, with export and future sync support.",
      ],
      [
        "A broader directory",
        "Expand occupational coverage across education, public service, science, law, logistics, construction, environment, hospitality, entrepreneurship, and the other master-prompt fields.",
      ],
      [
        "Polish and performance",
        "Meaningful transitions on data changes, lazy-loaded maps and graphs, keyboard and screen-reader alternatives, responsive layouts, and accessibility and performance checks.",
      ],
    ],
  },
];
export default function RoadmapPage() {
  return (
    <main id="main-content" className="container page-main">
      <Breadcrumbs items={[{ label: "Product roadmap" }]} />
      <header className="page-heading">
        <Eyebrow gold>Built one useful step at a time</Eyebrow>
        <h1>
          A clear foundation.
          <br />
          <em>A bigger vision.</em>
        </h1>
        <p>
          Career Path is being built in working phases. The directory is
          available today, together with the four-panel homepage, state map,
          skill comparisons, preparation branches, and career comparison.
          Personalized discovery, full education planning, and saved plans
          remain future development work.
        </p>
      </header>
      <div className="roadmap-section">
        {phases.map((phase) => (
          <section className="roadmap-phase" key={phase.number}>
            <header className="roadmap-phase-header">
              <span>{phase.number}</span>
              <h2>{phase.title}</h2>
              <span
                className={`pill ${phase.number === "01" ? "pill-emerald" : ""}`}
              >
                {phase.status}
              </span>
            </header>
            <p>{phase.description}</p>
            <div className="roadmap-feature-grid">
              {phase.features.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ButtonLink href="/careers" arrow>
        Explore what’s available
      </ButtonLink>
    </main>
  );
}
