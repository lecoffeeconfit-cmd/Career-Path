import { ButtonLink } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
export default function NotFound() {
  return (
    <main id="main-content" className="container empty-page">
      <Icon name="compass" size={48} />
      <p className="eyebrow">A change of direction</p>
      <h1>
        This path isn’t here <em>yet.</em>
      </h1>
      <p>
        The page may have moved, or this career may not be in our starting
        collection.
      </p>
      <ButtonLink href="/careers" arrow>
        Explore available careers
      </ButtonLink>
    </main>
  );
}
