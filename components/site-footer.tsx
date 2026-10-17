import Link from "next/link";
import { Icon } from "./ui/icon";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="brand footer-brand">
            <Icon name="book" size={24} />
            <span>
              Career<span className="brand-light">Path</span>
              <span className="brand-dot">.</span>
            </span>
          </Link>
          <p>A little knowledge. A clearer direction.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/careers">Explore careers</Link>
          <Link href="/compare">Compare careers</Link>
          <Link href="/resources">Sources & methodology</Link>
          <Link href="/roadmap">Product roadmap</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>Built for your next chapter.</span>
        <span>U.S. occupational data · No account needed to explore</span>
      </div>
    </footer>
  );
}
