"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemePicker } from "./theme-picker";
import { Icon } from "./ui/icon";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore careers", href: "/careers" },
  { label: "Compare careers", href: "/compare" },
  { label: "Resources", href: "/resources" },
];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Career Path home"
          onClick={() => setOpen(false)}
        >
          <Image src="/icon.svg" alt="" width={38} height={38} priority />
          <span>
            Career<span className="brand-light">Path</span>
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                (
                  link.href === "/"
                    ? pathname === "/"
                    : link.href === "/careers"
                      ? pathname.startsWith("/careers")
                      : pathname === link.href
                )
                  ? "active"
                  : ""
              }
              aria-current={
                link.href === pathname ||
                (link.href === "/careers" && pathname.startsWith("/careers/"))
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/careers#career-search"
            className="icon-button search-link"
            aria-label="Search careers"
          >
            <Icon name="search" size={19} />
          </Link>
          <ThemePicker />
          <Link
            href="/careers"
            className="button button-small button-primary header-cta"
          >
            Find your direction <Icon name="arrow-up" size={16} />
          </Link>
          <button
            className="icon-button mobile-menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <Icon name="arrow" size={17} />
            </Link>
          ))}
          <Link href="/roadmap" onClick={() => setOpen(false)}>
            What’s next <Icon name="arrow" size={17} />
          </Link>
        </nav>
      )}
    </header>
  );
}
