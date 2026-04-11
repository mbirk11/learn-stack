import type { ReactNode } from "react";
import "./index.css";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  subtitle?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  title,
  children,
  subtitle,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-text">
            {title && <h2 className="sidebar-title">{title}</h2>}
          </div>
          {subtitle && <span className="sidebar-subtitle">{subtitle}</span>}
        </div>

        <div className="sidebar-body">{children}</div>
      </aside>
    </>
  );
}
