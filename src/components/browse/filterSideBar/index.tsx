import "./index.css";
import DevelopmentIcon from "../../../assets/icons/development.svg?react";
import BusinessIcon from "../../../assets/icons/business.svg?react";
import MarketingIcon from "../../../assets/icons/marketing.svg?react";
import DataScienceIcon from "../../../assets/icons/data-set.svg?react";
import DesignIcon from "../../../assets/icons/design.svg?react";

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

export interface TopicItem {
  id: number;
  name: string;
}

export interface InstructorItem {
  id: number;
  name: string;
  avatar: string;
}

interface FilterSidebarProps {
  categories: CategoryItem[];
  topics: TopicItem[];
  instructors: InstructorItem[];
  selectedCategoryIds: number[];
  selectedTopicIds: number[];
  selectedInstructorIds: number[];
  onToggleCategory: (id: number) => void;
  onToggleTopic: (id: number) => void;
  onToggleInstructor: (id: number) => void;
  onClearFilters: () => void;
  showClear?: boolean;
}
const categoryIconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  development: DevelopmentIcon,
  design: DesignIcon,
  business: BusinessIcon,
  marketing: MarketingIcon,
  "data-science": DataScienceIcon,
};
export default function FilterSidebar({
  categories,
  topics,
  instructors,
  selectedCategoryIds,
  selectedTopicIds,
  selectedInstructorIds,
  onToggleCategory,
  onToggleTopic,
  onToggleInstructor,
  onClearFilters,
  showClear = true,
}: FilterSidebarProps) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-header">
        <h2 className="filter-sidebar-title">Filters</h2>

        {showClear && (
          <button
            type="button"
            className="filter-clear-button"
            onClick={onClearFilters}
          >
            Clear All Filters ×
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3 className="filter-section-title">Categories</h3>

        <div className="filter-chip-list filter-chip-list--categories">
          {categories.map((category) => {
            const isActive = selectedCategoryIds.includes(category.id);
            const Icon = categoryIconMap[category.icon];

            return (
              <button
                key={category.id}
                type="button"
                className={`filter-chip ${isActive ? "active" : ""}`}
                onClick={() => onToggleCategory(category.id)}
              >
                {Icon ? <Icon className="filter-chip-icon" /> : null}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-section-title">Topics</h3>

        <div className="filter-chip-list filter-chip-list--topics">
          {topics.map((topic) => {
            const isActive = selectedTopicIds.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                className={`filter-chip ${isActive ? "active" : ""}`}
                onClick={() => onToggleTopic(topic.id)}
              >
                <span>{topic.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-section-title">Instructor</h3>

        <div className="filter-instructor-list">
          {instructors.map((instructor) => {
            const isActive = selectedInstructorIds.includes(instructor.id);

            return (
              <button
                key={instructor.id}
                type="button"
                className={`filter-instructor-item ${isActive ? "active" : ""}`}
                onClick={() => onToggleInstructor(instructor.id)}
              >
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="filter-instructor-avatar"
                />
                <span>{instructor.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
