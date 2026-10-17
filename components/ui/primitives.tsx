import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      {arrow && <Icon name="arrow" size={18} />}
    </Link>
  );
}
export function Eyebrow({
  children,
  gold = false,
}: {
  children: ReactNode;
  gold?: boolean;
}) {
  return (
    <p className={`eyebrow ${gold ? "text-gold" : ""}`}>
      <span className="eyebrow-line" />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function IconTile({
  name,
  gold = false,
  large = false,
}: {
  name: IconName;
  gold?: boolean;
  large?: boolean;
}) {
  return (
    <span
      className={`icon-tile ${gold ? "icon-tile-gold" : ""} ${large ? "icon-tile-large" : ""}`}
    >
      <Icon name={name} size={large ? 30 : 23} />
    </span>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <Icon name="chevron" size={13} />
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function Metric({
  label,
  value,
  note,
  gold = false,
}: {
  label: string;
  value: string;
  note: string;
  gold?: boolean;
}) {
  return (
    <div className="metric">
      <p>{label}</p>
      <strong className={gold ? "text-gold" : ""}>{value}</strong>
      <span>{note}</span>
    </div>
  );
}
