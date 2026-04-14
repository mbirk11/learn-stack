import "./index.css";
import Button from "../button";

type PopupVariant = "profile" | "conflict" | "success" | "completed" | "custom";

type PopupAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
  variant?: PopupVariant;
  actions?: PopupAction[];
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Popup({
  isOpen,
  onClose,
  title,
  description,
  variant = "custom",
  actions = [],
  children,
  icon,
}: PopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup popup--${variant}`}
        onClick={(event) => event.stopPropagation()}
      >
        {icon ? <div className="popup__icon">{icon}</div> : null}

        <h2 className="popup__title">{title}</h2>

        {description ? (
          <div className="popup__description">{description}</div>
        ) : null}

        {children ? <div className="popup__content">{children}</div> : null}

        {actions.length > 0 ? (
          <div className="popup__actions">
            {actions.map((action, index) => (
              <Button
                key={`${action.label}-${index}`}
                onClick={action.onClick}
                disabled={action.disabled}
                btnType={
                  action.variant === "secondary" ? "default-outline" : "primary"
                }
                width="174px"
                height="56px"
                className="popup__button"
              >
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
