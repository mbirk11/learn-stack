import Button from "../../ui/button";
import { useNavigate } from "react-router-dom";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoStar,
} from "react-icons/io5";
import "./index.css";

interface EnrolledCourseSidebarCardProps {
  enrollmentId: number;
  courseId: number;
  image: string;
  instructor: string;
  rating: number;
  title: string;
  progress: number;
  weeklySchedule: string;
  timeSlot: string;
  sessionType: string;
  location?: string;
}

export default function EnrolledCourseSidebarCard({
  courseId,
  image,
  instructor,
  rating,
  title,
  progress,
  weeklySchedule,
  timeSlot,
  sessionType,
  location,
}: EnrolledCourseSidebarCardProps) {
  const navigate = useNavigate();

  return (
    <div className="enrolled-sidebar-card">
      <div className="enrolled-sidebar-card-top">
        <img src={image} alt={title} className="enrolled-sidebar-card-image" />

        <div className="enrolled-sidebar-card-content">
          <div className="enrolled-sidebar-card-meta">
            <span className="enrolled-sidebar-card-instructor">
              Instructor {instructor}
            </span>

            <span className="enrolled-sidebar-card-rating">
              <IoStar />
              {rating}
            </span>
          </div>

          <h3 className="enrolled-sidebar-card-title">{title}</h3>

          <div className="enrolled-sidebar-card-details">
            <span>
              <IoCalendarOutline />
              {weeklySchedule}
            </span>

            <span>
              <IoTimeOutline />
              {timeSlot}
            </span>

            <span>
              <IoPeopleOutline />
              {sessionType}
            </span>

            <span>
              <IoLocationOutline />
              {location}
            </span>
          </div>
        </div>
      </div>

      <div className="enrolled-sidebar-card-footer">
        <div className="enrolled-sidebar-card-progress-block">
          <span className="enrolled-sidebar-card-progress-text">
            {progress}% Complete
          </span>

          <div className="enrolled-sidebar-card-progress-bar">
            <div
              className="enrolled-sidebar-card-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Button
          width="90px"
          height="40px"
          btnType="default-outline"
          onClick={() => navigate(`/courses/${courseId}`)}
        >
          View
        </Button>
      </div>
    </div>
  );
}
