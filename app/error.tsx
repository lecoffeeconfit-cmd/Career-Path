"use client";
import { ButtonLink } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="container empty-page">
      <Icon name="compass" size={48} />
      <p className="eyebrow">A small detour</p>
      <h1>
        Let’s get you <em>back on track.</em>
      </h1>
      <p>
        This page couldn’t load. Try again, or return to the career directory.
      </p>
      <div className="error-actions">
        <button className="button button-primary" onClick={reset}>
          Try again <Icon name="arrow" size={18} />
        </button>
        <ButtonLink href="/careers" secondary>
          Explore careers
        </ButtonLink>
      </div>
    </main>
  );
}
