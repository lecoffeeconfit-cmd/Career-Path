import type { Metadata } from "next";
import { Suspense } from "react";
import { CareerDirectory } from "@/components/career-directory";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { careerFields, occupations } from "@/lib/data/occupations";

export const metadata: Metadata = {
  title: "Explore Careers",
  description:
    "Search sourced career profiles by interests, skills, education routes, pay, and employment outlook.",
};
export default function CareersPage() {
  return (
    <main id="main-content" className="container page-main">
      <Breadcrumbs items={[{ label: "Explore careers" }]} />
      <div className="page-heading">
        <Eyebrow gold>Curiosity is a good compass</Eyebrow>
        <h1>
          Find a career worth <em>exploring.</em>
        </h1>
        <p>
          A job title is only the beginning. Get to know the work, the
          possibilities, and the paths that could take you there.
        </p>
        <span className="collection-note">
          <span className="status-dot" />6 sourced career profiles · 6 fields ·
          A growing collection
        </span>
      </div>
      <Suspense
        fallback={
          <div className="loading-panel" role="status">
            Loading the career directory…
          </div>
        }
      >
        <CareerDirectory careers={occupations} fields={careerFields} />
      </Suspense>
    </main>
  );
}
