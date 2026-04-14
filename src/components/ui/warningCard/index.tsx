import type { ReactNode } from "react";
import Button from "../button";
import WarningIcon from "../../../assets/icons/warning-icons.svg?react";
import "./index.css";

interface WarningCardProps {
  title: string;
  btnText: ReactNode;
  description: string;
  onClick: () => void;
  icon?: ReactNode;
}

export default function WarningCard({
  title,
  btnText,
  description,
  onClick,
  icon,
}: WarningCardProps) {
  return (
    <div className="warning-card">
      <div className="warning-card__content">
        <div className="warning-card__header">
          <span className="warning-card__icon">
            {icon ?? <WarningIcon width={21} height={21} />}
          </span>
          <h2 className="warning-card__title">{title}</h2>
        </div>

        <p className="warning-card__description">{description}</p>
      </div>

      <Button
        onClick={onClick}
        className="warning-card__button"
        width="110px"
        height="40px"
        btnType="default-ghost"
      >
        {btnText}
      </Button>
    </div>
  );
}
