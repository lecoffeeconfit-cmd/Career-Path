"""Extract the six supported SOC occupations from the official May 2025 workbook.

Usage: <bundled-python> scripts/import-regional-data.py /path/to/oesm25st.zip
Read-only source processing; the workbook is never modified.
"""
import hashlib
import json
import math
import sys
import zipfile
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[1]
archive = Path(sys.argv[1])
codes = {record["soc"] for record in json.loads((ROOT / "lib/data/bls-snapshot.json").read_text())["records"]}

def numeric(value):
    if isinstance(value, (int, float)) and math.isfinite(value) and value >= 0:
        return value
    return None

with zipfile.ZipFile(archive) as source:
    name = next(name for name in source.namelist() if name.endswith("state_M2025_dl.xlsx"))
    with source.open(name) as file:
        workbook = openpyxl.load_workbook(file, read_only=True, data_only=True)
        rows = workbook["state_M2025_dl"].iter_rows(values_only=True)
        headers = next(rows)
        required = {"AREA", "AREA_TITLE", "PRIM_STATE", "OCC_CODE", "OWN_CODE", "NAICS", "TOT_EMP", "A_MEDIAN", "LOC_QUOTIENT"}
        assert required.issubset(headers), "Unexpected BLS schema"
        records = []
        for values in rows:
            row = dict(zip(headers, values))
            soc = row["OCC_CODE"]
            if soc not in codes or row["NAICS"] != "000000" or str(row["OWN_CODE"]) != "1235":
                continue
            fips = str(row["AREA"]).zfill(2)
            if int(fips) > 56:
                continue  # This map covers 50 states and DC; not territories.
            records.append({
                "fips": fips, "name": row["AREA_TITLE"], "abbreviation": row["PRIM_STATE"], "soc": soc,
                "employment": numeric(row["TOT_EMP"]), "medianAnnual": numeric(row["A_MEDIAN"]),
                "meanAnnual": numeric(row["A_MEAN"]), "locationQuotient": numeric(row["LOC_QUOTIENT"]),
                "employmentRse": numeric(row["EMP_PRSE"]), "wageRse": numeric(row["MEAN_PRSE"]),
                "wageFlag": None if numeric(row["A_MEDIAN"]) is not None else str(row["A_MEDIAN"] or "unavailable"),
            })
        workbook.close()

keys = {(record["soc"], record["fips"]) for record in records}
assert len(keys) == len(records), "Duplicate occupation/state observations"
assert len({record["fips"] for record in records}) == 51, "Expected 50 states plus DC"
assert {record["soc"] for record in records} == codes
output = {
    "source": "U.S. Bureau of Labor Statistics · Occupational Employment and Wage Statistics",
    "sourceUrl": "https://www.bls.gov/oes/2025/may/oessrcst.htm",
    "downloadUrl": "https://www.bls.gov/oes/special-requests/oesm25st.zip",
    "sourceFile": name, "sourceSha256": hashlib.sha256(archive.read_bytes()).hexdigest(),
    "referenceYear": 2025, "retrievedAt": "2026-10-16", "coverage": "50 U.S. states and District of Columbia; cross-industry; ownership 1235",
    "notes": ["OEWS employment counts exclude self-employed workers and differ from the OOH Employment Projections series.",
              "Wages are nominal U.S. dollars, not adjusted for regional living costs. Suppressed, top-coded, and unavailable values remain null.",
              "Location quotient compares an occupation's share of state employment with its national share. It does not measure current vacancies."],
    "records": sorted(records, key=lambda record: (record["soc"], record["fips"]))
}
(ROOT / "lib/data/regional-snapshot.json").write_text(json.dumps(output, separators=(",", ":")) + "\n")
print(f"Imported {len(records)} official state observations; {sum(r['medianAnnual'] is None for r in records)} unpublished median wages.")
