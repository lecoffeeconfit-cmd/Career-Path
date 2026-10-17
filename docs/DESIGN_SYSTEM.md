# Career Path design system

All pages and future visualization systems share the variables in `app/globals.css`, the primitives in `components/ui/`, and the semantic chart vocabulary in `lib/theme.ts`.

## Palette

| Role | Dark / default | Light |
| --- | --- | --- |
| Page | `#0F1E17` | `#F6F8F3` |
| Card | `#183328` | `#FFFFFF` |
| Emerald interaction | `#1FA971` | `#138455` |
| Accessible accent text | `#6CD9AC` | `#08744A` |
| Champagne emphasis | `#E6C98B` | `#80601B` |
| Primary text | `#F4FBF7` | `#163B2A` |
| Secondary text | `#A9C1B4` | `#526B5D` |

Gold marks salary, milestones, achievements, and important emphasis. Emerald marks interactive controls, active filters, navigation, data series, and relationships. Do not introduce unrelated blue/violet themes for individual modules.

Light/dark/system options apply through `data-theme`; system uses `prefers-color-scheme`. Default first-visit appearance is dark. Preference storage is optional and guarded; appearance controls still work when storage is unavailable. Theme setup runs before painting to reduce flashing.

## Shared rules

- Geist for interface text; Georgia italic for restrained editorial emphasis.
- Shared container width, spacing rhythm, subtle borders, 12–20px card radii, 9px buttons, and modest shadows.
- 220ms interaction timing. Short entrance motion accompanies a changed career selection. Honor reduced motion everywhere.
- Semantic headings, visible keyboard focus, skip link, explicit form labels, native select controls, native credential disclosures, status announcements, and meaningful error/empty states.
- Responsive navigation and grids; no information should require horizontal page scrolling. Career-section navigation may scroll inside its own region.
- Reusable buttons, headings, metrics, icon tiles, breadcrumbs, career cards, and source disclosures. Keep data/calculation logic outside UI components.

## Four shared visualization systems

1. **Career analytics:** gold salary highlights, emerald employment/growth series, consistent grid/label/tooltip styles, units and source years, accessible tables, and animation only between real observations.
2. **Career pathways:** emerald relationships and selected nodes, gold milestones, clear prerequisites and alternate routes, keyboard selection, branching/zoom/pan with text alternatives.
3. **Geographic opportunity maps:** emerald sequential layers, explicit legends and unavailable regions, occupation/location/year identifiers, keyboard-accessible region selection, zoom, filters, and tables.
4. **Skills and aptitude:** emerald occupational profiles and networks, gold achievements, clearly labeled O*NET scales, separate user self-reports, accessible summaries, and no fabricated ratings.

`visualizationTheme` provides CSS-variable-backed role names, so charts automatically adapt to all appearance settings. The four homepage SVG systems now use these shared semantics. Add heavy chart/map dependencies only when a functioning sourced-data slice requires them.
