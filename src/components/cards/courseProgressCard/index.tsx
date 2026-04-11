import CardHeader from "../cardHeader";
import "./index.css";

interface CourseProgressCardProps {
  image: string;
  lecturer: string;
  rating: number;
  title: string;
  progress: number;
  onView?: () => void;
}

export default function CourseProgressCard({
  image,
  lecturer,
  rating,
  title,
  progress,
  onView,
}: CourseProgressCardProps) {
  return (
    <div className="course-progress-card">
      <div className="course-progress-card-top">
        <img src={image} alt={title} className="course-progress-card-image" />

        <div className="course-progress-card-content">
          <CardHeader lecturer={lecturer} rating={rating} />
          <h3 className="course-progress-card-title">{title}</h3>
        </div>
      </div>

      <div className="course-progress-card-footer">
        <div className="course-progress-card-progress-block">
          <span className="course-progress-card-progress-text">
            {progress}% Complete
          </span>

          <div className="course-progress-card-progress-bar">
            <div
              className="course-progress-card-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="course-progress-card-button"
          onClick={onView}
        >
          View
        </button>
      </div>
    </div>
  );
}
