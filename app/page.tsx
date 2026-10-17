import Link from "next/link";
import { CareerDashboard } from "@/components/dashboard/career-dashboard";
import regionalSnapshot from "@/lib/data/regional-snapshot.json";
import skillsSnapshot from "@/lib/data/skills-snapshot.json";
import stateGeometry from "@/lib/data/us-state-paths.json";
import { CareerCard } from "@/components/career-card";
import {
  ButtonLink,
  Eyebrow,
  IconTile,
  SectionHeading,
} from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { careerFields, getField, occupations } from "@/lib/data/occupations";

export default function Home() {
  const featured = occupations.slice(0, 3);
  return (
    <main id="main-content">
      <CareerDashboard
        careers={occupations}
        fields={careerFields}
        observations={regionalSnapshot.records}
        ratings={skillsSnapshot.records}
        states={stateGeometry.states}
      />

      <section className="section container" id="explore-fields">
        <SectionHeading
          eyebrow="Follow your curiosity"
          title={
            <>
              There’s more than one <em>way forward.</em>
            </>
          }
          description="Start with a field that interests you. See where it could lead."
          action={
            <Link className="text-link" href="/careers">
              Explore all careers <Icon name="arrow" size={18} />
            </Link>
          }
        />
        <div className="field-grid">
          {careerFields.map((field, index) => (
            <Link
              href={`/careers?field=${field.id}`}
              className="field-card"
              key={field.id}
            >
              <IconTile name={field.icon} gold={index === 4} />
              <div>
                <h3>{field.name}</h3>
                <p>{field.description}</p>
              </div>
              <Icon name="arrow-up" className="field-card-arrow" size={19} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-tinted" id="how-it-works">
        <div className="container">
          <SectionHeading
            eyebrow="From curiosity to clarity"
            title={
              <>
                A big decision. <em>Smaller steps.</em>
              </>
            }
            description="Get to know the work before deciding where you want to go."
          />
          <div className="steps-grid">
            {[
              {
                number: "01",
                icon: "compass" as const,
                title: "Explore the possibilities",
                text: "Follow an interest, a skill, or a subject you enjoy. Discover careers you might not have considered.",
              },
              {
                number: "02",
                icon: "chart" as const,
                title: "Understand the whole picture",
                text: "Look beyond a job title. Learn about pay, daily work, education, and the outlook ahead.",
              },
              {
                number: "03",
                icon: "route" as const,
                title: "Find your way in",
                text: "Explore typical and alternative entry routes, then identify the knowledge you can start building.",
              },
            ].map((step) => (
              <article className="step-card" key={step.number}>
                <div className="step-top">
                  <IconTile name={step.icon} />
                  <span>{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="Open a new door"
          title={
            <>
              Different careers. <em>Real possibilities.</em>
            </>
          }
          description="Three starting points from our growing, carefully sourced directory."
          action={
            <Link className="text-link" href="/careers">
              View the directory <Icon name="arrow" size={18} />
            </Link>
          }
        />
        <div className="career-grid">
          {featured.map((occupation) => (
            <CareerCard
              key={occupation.id}
              occupation={occupation}
              field={getField(occupation.fieldId)}
            />
          ))}
        </div>
        <p className="data-caption">
          <Icon name="info" size={15} />
          National median wages, May 2025. Growth projections, 2025–2035.
          Medians are not starting salaries.{" "}
          <Link href="/resources">
            About the data <Icon name="arrow-up" size={12} />
          </Link>
        </p>
      </section>

      <section className="container">
        <div className="knowledge-banner">
          <div className="banner-book">
            <Icon name="book" size={46} />
          </div>
          <div>
            <Eyebrow gold>Knowledge is a good place to start</Eyebrow>
            <h2>
              You don’t need it all figured out.
              <br />
              <em>Just take the next step.</em>
            </h2>
            <p>
              A future in healthcare, technology, a trade, or something
              unexpected. Give yourself room to explore.
            </p>
          </div>
          <ButtonLink href="/careers" arrow>
            Explore your possibilities
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
