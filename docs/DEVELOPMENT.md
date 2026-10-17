# Development status

The Phase 1 foundation and the first Phase 2 dashboard slice are implemented. See `DASHBOARD.md` for the latest follow-up status. The full master specification is preserved in `MASTER_SPEC.md`; this document records delivery boundaries and the next working slices.

## Requirement precedence

The final palette is Emerald & Champagne: background `#0F1E17`, cards `#183328`, emerald `#1FA971`, champagne `#E6C98B`, text `#F4FBF7`, secondary text `#A9C1B4`. Light appearance uses darker emerald/gold and dark text for contrast. The requested three-phase sequence supersedes the older five-phase sequence in the master specification.

## Phase 1 — implemented

- Cohesive shared layout, theme system, component primitives, mobile navigation, accessible controls, reduced motion, and preserved book/olive favicon branding.
- Homepage and fully functional six-record career directory, URL-based filters, sorting, empty states, and search by aliases, interests, skills/learning subjects, majors, and SOC codes.
- Generated occupation detail pages covering real observations, work, education options, learning suggestions, related careers, and sources.
- Verified May 2025 national wage data, 2025 employment, and 2025–2035 projections from official BLS OOH pages. Static snapshot with explicit provenance and a normalization layer; no live-refresh claim.
- Methodology and product-roadmap pages, honest missing-data states, friendly 404 and error boundary.
- Extensible TypeScript contracts for the remaining product systems; pure search/filter logic with automated tests.

No career quiz, comparison engine, map, quantitative skill chart, saved dashboard, or editable roadmap is presented as implemented. Preparation options on detail pages are sourced introductory content, not the future interactive planning engine.

## Verification

Run `npm run lint`, `npm test`, `npm run typecheck`, and `npm run build`. The restricted execution environment prevents Turbopack's internal port binding; verification uses the documented `npm run build -- --webpack` alternative. The app retains the default Next.js scripts for ordinary deployment environments.

Eight automated tests cover SOC/O*NET code normalization, invalid inputs, null measurements, subgroup statistics, declining employment, alias/subject search, alternative education routes, combined filters, sorting immutability, and dataset reference integrity.

Browser QA covers homepage-to-directory search, interactive career selection, alternative-route and salary filters, sorting, empty-state recovery, generated detail pages and credential disclosures, desktop/mobile navigation, light/dark/system appearance, theme persistence, and horizontal overflow at responsive sizes. This is a targeted functional and visual check, not an independent WCAG audit.

## Phase 2 — priority working slices

1. Expand the ingestion layer with versioned provider adapters and source-preserving caches. Use documented BLS OEWS/Employment Projections data, O*NET release files/web services, and educational mappings. Validate licenses, units, dates, SOC/CIP/FIPS identifiers, and group-versus-occupation scope. Never infer unavailable numeric data.
2. Add side-by-side comparison of at least three careers using the existing repository. Label each measure and keep incomparable dimensions separate. Persist the selected comparison in a shareable URL before introducing saved accounts.
3. Add analytics with meaningful salary/employment charts, accessible tables, source/year labels, and explicit missing history. No fake time series or invented percentile distributions.
4. Build a branching education/pathway engine on the existing pathway and competency contracts. Add programs, degrees, prerequisites, certifications, licensing distinctions, multiple valid routes, meaningful transitions, and text alternatives.
5. Add geographic maps using verified state observations first. Include filters, legends, tooltip/keyboard interactions, zoom, region selection, and a table alternative. Do not label employment concentration as live vacancies.
6. Import attributed O*NET skill importance/level data. Build occupational radar/network views without treating those ratings as a user's abilities.
7. Add education investment and career-change scenarios with editable official-data/user-assumption distinctions, costs, time, debt, opportunity cost, earnings comparisons, and uncertainty.

## Phase 3 — priority working slices

1. Implement Career Finder: skippable preferences, adjustable weights, transparent explanations, configurable matching, and no demographic exclusion or success-probability claims.
2. Model activities, habits, sports, hobbies, projects, volunteering, mentoring, and work experience as optional skill-building opportunities. Include relationship-specific evidence, confidence category, sources, selection/confounding limitations, correlation-versus-causation guidance, and accessible alternatives.
3. Generate editable personalized roadmaps using education, existing credentials/skills/experience, location, budget, study time, and route choice. Support branching, prerequisites, resources, defensible effort estimates, completion states, target dates, zoom/pan, and text views.
4. Introduce versioned browser storage through a repository interface, then save careers, pathways, comparisons, several plans, skills, activities, progress, achievements, and next actions. Add export and migration logic before optional authenticated synchronization.
5. Expand to all career fields in the master specification; add richer local labor-market and educational data without losing provenance.
6. Lazy-load graph/map libraries when introduced. Add meaningful data-change animation, reduced-motion behavior, responsive polish, keyboard/screen-reader testing, and performance measurement.

## Integration research

- BLS OOH: https://www.bls.gov/ooh/
- BLS API access: https://www.bls.gov/developers/
- BLS reuse policy: https://www.bls.gov/opub/copyright-information.htm
- O*NET database/release and license guidance: https://www.onetcenter.org/database.html

No protected service is currently connected. Future secrets belong in server-side modules only; no `NEXT_PUBLIC_` secrets. `.env.example` does not imply an active integration.

## Final verification results — October 16, 2026

- `npm run lint`: passed; generated `.test-build/` output is explicitly excluded from linting.
- `npm test`: all 8 tests passed.
- `npm run typecheck`: passed.
- `npm run build -- --webpack`: passed; all six occupation pages and the home, directory, resources, roadmap, and not-found routes generated successfully.
- Generated-page smoke check: all six profiles contain their title, SOC code, official source URL, and data year.
- Browser checks: homepage search, live/combined filters, salary sorting, empty-state reset, career selection, detail navigation, credential disclosures, resources/roadmap links, and all three appearance modes worked. No runtime JavaScript errors were observed during these flows.
- Responsive checks: no horizontal page overflow at 320px, 390px, 768px, 1200px, and 1440px. Mobile hero sizing was adjusted after visual inspection.
- Core text/button contrast checks: all checked dark/light pairs exceeded 4.5:1; the lowest checked ratio was the light primary button at 4.71:1. This targeted check is not a complete accessibility audit.

The temporary QA server was stopped after verification. Use the README's run commands to start the app locally. No production deployment was performed.
