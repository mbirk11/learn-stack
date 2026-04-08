import type { ReactNode } from "react";
import "./index.css";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Sidebar({
  isOpen,
  onClose,
  title,
  children,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* overlay */}
      <div className="sidebar-overlay" onClick={onClose} />

      {/* sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {title && <h2 className="sidebar-title">{title}</h2>}

          <button type="button" className="sidebar-close" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="sidebar-body">{children}</div>
      </aside>
    </>
  );
}
