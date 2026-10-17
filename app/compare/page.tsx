import type { Metadata } from "next";
import { CareerComparison } from "@/components/career-comparison";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { occupations } from "@/lib/data/occupations";

export const metadata: Metadata = {
  title: "Compare Careers",
  description:
    "Compare three careers using sourced salary, employment, outlook, education, and working-life information.",
};
export default function ComparePage() {
  return (
    <main id="main-content" className="container page-main">
      <Breadcrumbs items={[{ label: "Compare careers" }]} />
      <header className="page-heading">
        <Eyebrow gold>Look at the possibilities side by side</Eyebrow>
        <h1>
          Make room for <em>comparison.</em>
        </h1>
        <p>
          Choose three different careers. Explore the numbers and the work, then
          weigh the tradeoffs that matter to you.
        </p>
      </header>
      <CareerComparison careers={occupations} />
    </main>
  );
}
