/** Prepare small, versioned browser payloads from official public source files.
 * node scripts/prepare-dashboard-data.mjs /path/essential_skills.json /path/states-albers-10m.json
 * No network requests; no source values are invented or interpolated.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsBytes = await fs.readFile(process.argv[2]);
const atlasBytes = await fs.readFile(process.argv[3]);
const skills = JSON.parse(skillsBytes);
const atlas = JSON.parse(atlasBytes);
const snapshot = JSON.parse(
  await fs.readFile(path.join(root, "lib/data/bls-snapshot.json")),
);
const codes = new Set(snapshot.records.map((record) => `${record.soc}.00`));
const records = skills.row
  .filter(
    (row) => codes.has(row.onetsoc_code) && ["IM", "LV"].includes(row.scale_id),
  )
  .map((row) => ({
    soc: row.onetsoc_code.slice(0, 7),
    onetSoc: row.onetsoc_code,
    skillId: row.element_id,
    name: row.element_name,
    scale: row.scale_id,
    value:
      row.recommend_suppress === "Y" || row.not_relevant === "Y"
        ? null
        : row.data_value,
    updatedAt: row.date_updated,
    domainSource: row.domain_source,
    sampleSize: row.n,
    lowerBound: row.lower_ci_bound,
    upperBound: row.upper_ci_bound,
    suppressed: row.recommend_suppress === "Y",
    notRelevant: row.not_relevant === "Y",
  }));
if (records.length !== codes.size * 20)
  throw new Error("Incomplete essential skill profiles");
await fs.writeFile(
  path.join(root, "lib/data/skills-snapshot.json"),
  JSON.stringify(
    {
      release: "31.0",
      source: "O*NET® 31.0 Database · Essential Skills",
      sourceUrl: "https://www.onetcenter.org/database.html",
      downloadUrl:
        "https://www.onetcenter.org/dl_files/database/db_31_0_json/essential_skills.json",
      sourceSha256: createHash("sha256").update(skillsBytes).digest("hex"),
      retrievedAt: "2026-10-16",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      modifications:
        "Filtered to six occupations and essential skills; source ratings retained. Suppressed/not-relevant ratings displayed as unavailable. Labels shortened only in the chart.",
      scales: {
        IM: { min: 1, max: 5, name: "Importance" },
        LV: { min: 0, max: 7, name: "Level" },
      },
      records,
    },
    null,
    2,
  ) + "\n",
);

// Decode the published TopoJSON arcs once at preparation time. Runtime receives SVG paths.
const decoded = atlas.arcs.map((arc) => {
  let x = 0,
    y = 0;
  return arc.map((delta) => {
    x += delta[0];
    y += delta[1];
    return [
      x * atlas.transform.scale[0] + atlas.transform.translate[0],
      y * atlas.transform.scale[1] + atlas.transform.translate[1],
    ];
  });
});
function ring(indices) {
  const points = [];
  for (const index of indices) {
    const arc = index < 0 ? [...decoded[~index]].reverse() : decoded[index];
    points.push(...(points.length ? arc.slice(1) : arc));
  }
  return points;
}
const states = atlas.objects.states.geometries
  .filter((geometry) => Number(geometry.id) <= 56)
  .map((geometry) => {
    const polygons =
      geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
    const rings = polygons.flatMap((polygon) => polygon.map(ring));
    const points = rings.flat();
    const bounds = [
      Math.min(...points.map((p) => p[0])),
      Math.min(...points.map((p) => p[1])),
      Math.max(...points.map((p) => p[0])),
      Math.max(...points.map((p) => p[1])),
    ].map((n) => +n.toFixed(1));
    const d = rings
      .map(
        (points) =>
          points
            .map(
              (p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`,
            )
            .join("") + "Z",
      )
      .join("");
    return {
      fips: String(geometry.id).padStart(2, "0"),
      name: geometry.properties.name,
      d,
      bounds,
    };
  });
if (states.length !== 51 || states.some((state) => state.d.includes("NaN")))
  throw new Error("Invalid U.S. state geometry");
await fs.writeFile(
  path.join(root, "lib/data/us-state-paths.json"),
  JSON.stringify({
    source: "U.S. Census Bureau 2017 cartographic boundaries, via us-atlas 3",
    sourceUrl: "https://github.com/topojson/us-atlas",
    downloadUrl:
      "https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json",
    license: "ISC",
    width: 975,
    height: 610,
    states,
  }) + "\n",
);
console.log(
  `Prepared ${records.length} source skill ratings and ${states.length} state boundaries.`,
);
