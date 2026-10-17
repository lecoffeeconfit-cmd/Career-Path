"use client";
import { useState } from "react";
import Link from "next/link";
import type { CareerField, Occupation } from "@/lib/domain/occupation";
import type {
  RegionalObservation,
  SkillRating,
  StateGeometry,
} from "@/lib/domain/dashboard";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/primitives";
import { AnalyticsChart } from "./analytics-chart";
import { PathwayChart } from "./pathway-chart";
import { OpportunityMap } from "./opportunity-map";
import { SkillsChart } from "./skills-chart";

export function CareerDashboard({
  careers,
  fields,
  observations,
  ratings,
  states,
}: {
  careers: Occupation[];
  fields: CareerField[];
  observations: RegionalObservation[];
  ratings: SkillRating[];
  states: StateGeometry[];
}) {
  const [careerId, setCareerId] = useState(careers[0].id);
  const career = careers.find((item) => item.id === careerId)!;
  const field = fields.find((item) => item.id === career.fieldId)!;
  return (
    <section
      className="career-dashboard container"
      aria-label="Interactive career dashboard"
    >
      <header className="dashboard-intro">
        <div>
          <Eyebrow gold>Your next chapter starts with knowledge</Eyebrow>
          <h1>
            Discover your <em>future.</em>
          </h1>
          <p>
            Explore careers. Understand the work. Build a path that’s yours.
          </p>
        </div>
        <form className="dashboard-search" action="/careers" role="search">
          <label className="sr-only" htmlFor="dashboard-search">
            Search careers, skills, or interests
          </label>
          <Icon name="search" size={18} />
          <input
            id="dashboard-search"
            name="q"
            type="search"
            placeholder="Search a career or interest…"
          />
          <button type="submit" aria-label="Search careers">
            <Icon name="arrow" size={19} />
          </button>
        </form>
      </header>
      <div className="dashboard-selection">
        <div className="dashboard-career-control">
          <span className="dashboard-selected-icon">
            <Icon name={field.icon} size={23} />
          </span>
          <div>
            <label htmlFor="dashboard-career">Explore a career</label>
            <select
              id="dashboard-career"
              value={careerId}
              onChange={(event) => setCareerId(event.target.value)}
            >
              {careers.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="dashboard-data-status">
          <span className="status-dot" />
          <span>
            6 careers<span className="status-divider">/</span>50 states + DC
            <span className="status-divider">/</span>Published source data
          </span>
        </div>
        <Link
          className="dashboard-profile-link"
          href={`/careers/${career.slug}`}
        >
          Full career profile <Icon name="arrow-up" size={16} />
        </Link>
      </div>
      <nav className="dashboard-section-links" aria-label="Dashboard sections">
        <a href="#career-analytics">
          <Icon name="chart" size={15} />
          Analytics
        </a>
        <a href="#career-pathways">
          <Icon name="route" size={15} />
          Pathways
        </a>
        <a href="#opportunity-map">
          <Icon name="map" size={15} />
          Opportunities
        </a>
        <a href="#skill-profiles">
          <Icon name="compass" size={15} />
          Skills
        </a>
        <Link href="/compare">
          Compare careers <Icon name="arrow" size={14} />
        </Link>
      </nav>
      <div className="dashboard-grid">
        <AnalyticsChart
          careers={careers}
          selected={career}
          onSelect={setCareerId}
        />
        <PathwayChart career={career} />
        <OpportunityMap
          career={career}
          observations={observations}
          states={states}
        />
        <SkillsChart career={career} careers={careers} ratings={ratings} />
      </div>
      <div className="dashboard-provenance">
        <Icon name="shield" size={17} />
        <p>
          Published snapshots, not a live feed. National and state wages: May
          2025. National outlook: 2025–2035. Skills: O*NET® 31.0, with
          observation dates.{" "}
          <Link href="/resources">Sources & limitations ↗</Link>
        </p>
      </div>
    </section>
  );
}
