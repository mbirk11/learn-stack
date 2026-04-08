import type { ReactNode } from "react";
import "./index.css";
import { IoClose, IoChevronBackOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
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

          {title && <h2 className="modal-title">{title}</h2>}

          <button
            type="button"
            className="modal-icon-button modal-close-button"
            onClick={onClose}
          >
            <IoClose className="modal-icon" />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
