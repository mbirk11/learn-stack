import "./index.css";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionClick,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-header-title">{title}</h2>
        {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      </div>

      {actionText && (
        <button
          type="button"
          className="section-header-action"
          onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
