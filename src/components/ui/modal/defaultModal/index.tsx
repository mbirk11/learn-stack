import type { ReactNode } from "react";
import "./index.css";
import { IoClose, IoChevronBackOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  showBackButton = false,
  onBack,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {showBackButton && (
            <button
              type="button"
              className="modal-icon-button modal-back-button"
              onClick={onBack}
            >
              <IoChevronBackOutline className="modal-icon" />
            </button>
          )}

          <button
            type="button"
            className="modal-icon-button modal-close-button"
            onClick={onClose}
          >
            <IoClose className="modal-icon" />
          </button>

          <div className="modal-header-content">
            {title && <h2 className="modal-title">{title}</h2>}
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
          </div>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
