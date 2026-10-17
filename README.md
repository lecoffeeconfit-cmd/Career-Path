# Career Path

A working career exploration product with the Phase 1 foundation and the first Phase 2 intelligence slice, built directly in the existing Next.js 16.3.6, React 19, TypeScript, and Tailwind application.

## Run locally

```bash
npm ci
npm run dev
```

Open the Local URL printed by Next.js (normally http://localhost:3000). No API credentials or accounts are needed for Phase 1. The existing Geist font is downloaded by Next.js at build time; a clean build needs access to Google Fonts.

In environments that restrict Turbopack's internal port binding, use the supported Webpack alternative without changing the application configuration:

```bash
npm run dev -- --webpack
npm run build -- --webpack
```

## Completed in Phase 1

- Emerald & Champagne design system with centralized semantic tokens, reusable UI components, light/dark/system appearance, persisted theme preference, responsive layouts, keyboard controls, and reduced-motion support.
- Homepage with working search and field navigation, now centered on four connected, sourced visualization systems (see below).
- Shared desktop/mobile navigation, breadcrumbs, footer, branded book-and-olive-branches favicon, and page metadata.
- `/careers`: live search by title, alias, SOC, skill/knowledge topic, major, and interest; combined field, education, salary, outlook, and work-setting filters; sorting; shareable URLs; reset and empty states.
- Six statically generated `/careers/[slug]` profiles: software developer, registered nurse, electrician, mechanical engineer, graphic designer, and accountant/auditor.
- Profiles include sourced national pay, employment counts, projected growth, available annual openings, typical work, multiple preparation options, credential disclosures, editorial learning topics, related careers, and dated source references.
- `/resources`: public methodology, metric definitions, missing-data policy, evidence standards, and a source library.
- `/roadmap`: clear product status and the remaining phases. No links imply that future tools are already available.
- Shared domain types for occupations, classifications, observations, projections, education, programs, competencies, activities, geography, recommendations, and saved plans.
- Data normalization and validation, search/filter tests, missing-data handling, 404 page, and recoverable route error boundary.

## Available in the Phase 2 dashboard update

- The main page follows the four-panel visual reference: career analytics, branching pathways, a U.S. opportunity map, and occupational skill radar comparisons.
- One career selector and clickable salary/growth/employment bars update all four systems.
- Preparation branches distinguish typical and alternative entry routes from optional specialization, with actual steps and credential guidance.
- 306 observations from the official May 2025 BLS state workbook cover six occupations across 50 states and DC. The map supports median pay, employment, concentration, state selection, hover/focus details, zoom/reset, and a table alternative. One unpublished median stays null.
- 120 original O*NET® 31.0 Essential Skills ratings support importance (1–5), level (0–7), career overlays, rating inspection, observation dates, and exact-value tables. These are occupational demands, not personal aptitude scores.
- `/compare` supports three distinct careers, measurement charts, education options, work, and transparent missing costs/time. Duplicate selections swap positions rather than create a misleading duplicate comparison.
- All visualizations are SVG-based and share CSS tokens; no chart or mapping runtime dependency was needed. Source preparation scripts and regression tests are included.

See `docs/DASHBOARD.md` for import steps, licenses, boundaries, and verification.

## Data provenance and limitations

`lib/data/bls-snapshot.json` is a **curated, manually verified BLS Occupational Outlook Handbook snapshot**, checked October 16, 2026. It is not an automated live integration. Wage and employment observations refer to **2025**; projections cover **2025–2035**. Every record includes its official URL. `lib/data/normalize.ts` validates and normalizes the snapshot; `lib/data/occupations.ts` joins it to editorial profile content by SOC code.

BLS permits reuse of its public-domain text and statistics with attribution: https://www.bls.gov/opub/copyright-information.htm. No BLS photographs are copied. The application does not imply government endorsement.

- National medians are not starting salaries or local estimates.
- Employment counts, projected growth, and average annual openings are distinct measurements. No employment rate or career-success probability is invented.
- Software developer openings are null because the reviewed OOH page reports openings for a broader group. The subgroup's own pay, employment, and growth values are used.
- Missing hourly, regional, percentile, and historical observations are not inferred or replaced with synthetic numbers. Wage data excludes self-employed workers.
- Learning topics, keyword mappings, work-setting categories, and related-career explanations are editorial summaries/suggestions, not numerical O*NET ratings or complete credential checklists.
- State observations are extracted from BLS OEWS May 2025. Skill ratings are filtered from O*NET® 31.0 under CC BY 4.0. Source attribution, observation dates, release metadata, and modification notices are included in the app and data files.

The existing official BLS public API is designed for time series; do not assume an OOH profile is a directly interchangeable API series. A future provider adapter needs documented endpoints, mappings, validation, caching, and failure behavior. `.env.example` reserves server-side credential names for future BLS and College Scorecard adapters; the current app never reads them or sends secrets to the client.

## Project structure

```text
app/                         App Router pages, metadata, styles, and route states
components/                  Shared navigation, career cards, directory, comparison
components/dashboard/        Four connected SVG visualization systems
components/ui/               Buttons, metrics, headings, breadcrumbs, icon primitives
lib/domain/occupation.ts      Shared current and future domain contracts
lib/data/bls-snapshot.json    Verified national observations and source URLs
lib/data/regional-snapshot.json 306 official state/occupation observations
lib/data/skills-snapshot.json 120 O*NET essential skill observations
lib/data/us-state-paths.json  Census-derived state SVG geometry
scripts/                     Reproducible source data preparation
lib/data/normalize.ts         SOC and measurement validation
lib/data/occupations.ts       Shared occupation repository and editorial content
lib/careers/search.ts         Pure composable search/filter/sort logic
lib/theme.ts                 Shared visualization color semantics and timing
lib/format.ts                Formatting and education labels
tests/                       Domain and search regression tests
docs/MASTER_SPEC.md           Original product requirements, preserved in full
docs/DEVELOPMENT.md           Phase status, verification, and implementation priorities
docs/DESIGN_SYSTEM.md         Shared visual rules and visualization contracts
```

## Checks

```bash
npm run lint
npm test
npm run typecheck
npm run build
```

Tests use the installed TypeScript compiler and Node's built-in test runner; no testing dependency was added. They compile to ignored `.test-build/`. Next.js generates route type helpers during development and builds.

## Next priorities

**Phase 2 next:** expand the working four-system dashboard and comparison with verified wage distributions and history, metropolitan data, full education/program/major mappings, prerequisite-aware pathways, skill networks, and financial scenarios with explicit user assumptions.

**Phase 3:** transparent Career Finder preference matching; evidence-informed activity/habit/sport-to-skill relationships; editable roadmaps; local saved careers, comparisons, plans and progress; then performance, animation, and accessibility refinement. Optional account synchronization must preserve the anonymous exploration experience.

The complete master specification remains in `docs/MASTER_SPEC.md`; deferred features are still required. The user's final Emerald & Champagne tokens and three-phase implementation order supersede the master document's earlier palette and phase numbering.

## Deployment

Keep the existing GitHub workflow and deploy as a standard Next.js application. A Netlify deployment should use its current Next.js support, `npm run build`, and the repository root as the base directory. No hosting migration, static-export configuration, deployment, commit, or push was performed as part of Phase 1.
