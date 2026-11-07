import type { ReactNode } from "react";

export default function Header({
  title,
  subtitle,
  left,
  right,
}: {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="header">
      <div className="header-slot">{left}</div>

      <div className="header-center">
        <div className={`header-title ${subtitle ? "small" : ""}`}>{title}</div>
        {subtitle && <div className="header-subtitle">{subtitle}</div>}
      </div>

      <div className="header-slot">{right}</div>
    </header>
  );
}
