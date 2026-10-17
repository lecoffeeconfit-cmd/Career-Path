# Four-system homepage update

The main page now uses the user's four-panel reference as a functional dashboard, with Emerald & Champagne tokens and real source observations. The existing directory, detail pages, education summaries, knowledge suggestions, methodology, and master specification are preserved. This is the first Phase 2 intelligence slice; it does not claim completion of the entire master product.

## Available now

- Career analytics: six-career salary, employment, and projected-growth bars; shared career selection; exact-value tables; genuine zero baselines and negative growth.
- Career pathways: clickable documented routes, preparation steps, credentials, and optional specialization branches. Specialization follows typical preparation instead of being mislabeled as an alternative entry route.
- Geographic opportunities: 50 states plus DC; median pay, employment, and location-quotient layers; state dropdown and keyboard/click selection; hover/focus values; zoom/reset; legend with missing-data and selection indicators; exact-value table.
- Occupational skills: O*NET® Essential Skills radar; six shared axes, ten-skill table; importance and level scales; a comparison occupation; per-point inspection; source observation dates.
- Career comparison: three distinct occupations, chart measurements, salary/outlook/employment, preparation options, working life, and tasks. Unavailable costs, duration, and openings remain unavailable.

## Data provenance

### State observations

Source: U.S. Bureau of Labor Statistics, May 2025 Occupational Employment and Wage Statistics, `state_M2025_dl.xlsx`.

- Source index: https://www.bls.gov/oes/2025/may/oessrcst.htm
- Download: https://www.bls.gov/oes/special-requests/oesm25st.zip
- Imported 306 unique SOC/FIPS observations: six occupations × 51 jurisdictions.
- Filter: cross-industry NAICS `000000`, ownership `1235`, 50 states plus DC. Territories are not included in this map.
- Preserved source medians, employment, mean wages, location quotients, suppression markers, and available relative standard errors. The map uses medians, never silently substitutes means.
- Alaska's software developer median is suppressed (`*`), so it stays null and the map retains a missing-data pattern even when selected.
- OEWS employment and OOH Employment Projections employment are different populations/series. They are labeled separately, never summed into a misleading total.
- Wages are not cost-of-living adjusted. Concentration does not imply a current vacancy or personal employment probability.

The downloaded source archive's SHA-256 and original workbook name are stored in `regional-snapshot.json`.

Reproduce with the bundled Python runtime (requires `openpyxl` for read-only extraction):

```bash
python scripts/import-regional-data.py /path/to/oesm25st.zip
```

### Skills

Source: O*NET® 31.0 Database, Essential Skills JSON, USDOL/ETA.

- Download: https://www.onetcenter.org/dl_files/database/db_31_0_json/essential_skills.json
- Dictionary: https://www.onetcenter.org/dictionary/31.0/json/essential_skills.html
- License: https://creativecommons.org/licenses/by/4.0/
- Imported 120 ratings: six occupations × ten essential skills × two scales.
- Importance (IM): original 1–5. Level (LV): original 0–7. No invented skill percentages or user scores.
- Each record retains its O*NET-SOC code, element ID, source update date, analyst source, sample size, confidence bounds, and suppression/not-relevant flags.
- Display modification: select a subset, shorten chart labels, and hide suppressed/not-relevant numeric ratings; original published ratings are otherwise retained.
- This is an occupational profile, not an aptitude test, readiness measurement, or success probability. Personal activity relationships and progress tracking remain Phase 3 work.

Required source/license/modification notices appear on `/resources#onet-data` and in the snapshot metadata. USDOL/ETA does not endorse the display.

### Geography

Source: us-atlas 3, Census Bureau 2017 cartographic state boundaries, Albers USA projection.

- Download: https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json
- Source: https://github.com/topojson/us-atlas
- License notice: `docs/licenses/us-atlas-LICENSE.txt` (ISC).
- TopoJSON is decoded once during preparation into SVG paths. Runtime does not fetch map tiles or load a large mapping package. Alaska and Hawaii are insets.

Reproduce skill and geographic payloads:

```bash
node scripts/prepare-dashboard-data.mjs /path/essential_skills.json /path/states-albers-10m.json
```

## Implementation and performance

The server passes the versioned source subsets into a client dashboard. React state owns user selections; pure helpers own measurements, axes, color bins, and radar coordinates. SVG, CSS semantic tokens, and shared panel/control primitives provide one visual identity across the four systems. There are no fabricated trend lines or numeric timers.

Exact-value tables, native selects, keyboard-operable SVG controls, visible focus, descriptive labels, and reduced-motion styles provide alternatives to visual inspection. This targeted implementation is not a complete independent accessibility audit.

An SVG-title hydration mismatch found during browser QA was corrected by rendering each SVG title as one text string; clean page hydration is part of final verification.

## Remaining original master requirements

The full master specification is still authoritative. Next Phase 2 priorities include wage distributions and history, metropolitan data, education/program/CIP mappings, full coursework/prerequisite networks, skill relationships, and financial scenario tools. Phase 3 still includes Career Finder, research-informed activities/habits/sports relationships, user-entered competencies, editable roadmaps, local saved plans/comparisons/careers, dashboards and progress, optional synchronization, and further polish.

None of those remaining features is represented by a fake working control or a fabricated statistic on the homepage.

## Verification — October 16, 2026

- Lint and TypeScript checks passed.
- All 13 domain/data tests passed, including source cardinality, SOC/FIPS relationships, original O*NET scales, missing data, negative chart domains, and valid map geometry.
- `npm run build -- --webpack` passed, including the home, comparison, source/methodology, roadmap, and six occupation routes.
- The production server was started and tested: clean hydration, no new browser errors or warnings, and working connected career selection.
- Browser flows verified career changes across all four panels, typical/alternative route selection, negative growth, state concentration, map zoom/reset, suppressed Alaska wage display, skill level/comparison/point inspection, full skill tables, and three-career selection swaps.
- Responsive checks found no horizontal page overflow at 320px, 390px, 768px, and 1200px. Phone charts use native horizontal bars and readable route controls; tablet cards stack to preserve chart readability.
- Light appearance was checked; existing dark/system controls and reduced-motion support are retained. Source and license targets are present in generated production HTML.

QA preview servers are temporary. Start the project with `npm run dev -- --webpack` in restricted environments, or `npm run dev` normally. No production deployment, commit, or push was performed by the agent.
