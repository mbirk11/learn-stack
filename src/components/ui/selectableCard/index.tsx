import type { ReactNode } from "react";
import "./index.css";

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  onClick?: () => void;
}

export default function SelectableCard({
  title,
  subtitle,
  extra,
  icon,
  selected = false,
  disabled = false,
  width = "100%",
  height = "auto",
  onClick,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      className={`select-card ${selected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      style={{ width, height }}
    >
      {icon && <div className="select-card__icon">{icon}</div>}

      <div className="select-card__content">
        <span className="select-card__title">{title}</span>
        {subtitle && <span className="select-card__subtitle">{subtitle}</span>}
        {extra && <div className="select-card__extra">{extra}</div>}
      </div>
    </button>
  );
}
