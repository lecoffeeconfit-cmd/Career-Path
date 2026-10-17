import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icon";

export function DashboardPanel({
  id,
  number,
  title,
  subtitle,
  icon,
  children,
  footer,
}: {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: IconName;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section
      className="dashboard-panel"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <header className="dashboard-panel-heading">
        <div>
          <span className="dashboard-panel-number">{number}</span>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="dashboard-panel-icon">
          <Icon name={icon} size={24} />
        </span>
      </header>
      <div className="dashboard-panel-content">{children}</div>
      <footer className="dashboard-panel-footer">{footer}</footer>
    </section>
  );
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="chart-segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
