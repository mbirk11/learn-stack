import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import SectionHeader from "../../ui/sectionHeader";
import CourseProgressCard from "../../cards/courseProgressCard";
import LoginOverlay from "../../ui/oginOverlay";
import {
  getContinueLearningCourses,
  type ContinueLearningCourse,
} from "../../../api/courses";
import { fakeContinueLearningCourses } from "../../../utils/fakeCourses";
import "./index.css";
import { useNavigate } from "react-router-dom";

interface Props {
  onSeeAll?: () => void;
  onLogin?: () => void;
}

export default function ContinueLearningSection({ onSeeAll, onLogin }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<ContinueLearningCourse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchContinueLearningCourses = async () => {
      try {
        setLoading(true);
        const response = await getContinueLearningCourses();
        setCourses(response);
      } catch (error) {
        console.error("Failed to fetch continue learning courses", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContinueLearningCourses();
  }, [isAuthenticated]);

  if (isAuthenticated && !loading && courses.length === 0) {
    return null;
  }

  const data = isAuthenticated
    ? courses.map((item) => ({
        id: item.id,
        image: item.course.image,
        lecturer: item.course.instructor.name ?? "Unknown Instructor",
        rating: item.course.avgRating,
        title: item.course.title,
        progress: item.progress,
      }))
    : fakeContinueLearningCourses.map((item, index) => ({
        id: index,
        image: item.image,
        lecturer: item.instructor.name,
        rating: item.avgRating,
        title: item.title,
        progress: 65,
      }));

  return (
    <div className="container">
      <section className="continue-learning-section">
        <SectionHeader
          title="Continue Learning"
          subtitle="Pick up where you left"
          actionText="See All"
          onActionClick={onSeeAll}
        />

        <div className="continue-learning-wrapper">
          <div className={!isAuthenticated ? "blurred" : ""}>
            <div className="continue-learning-grid">
              {data.map((course) => (
                <CourseProgressCard
                  key={course.id}
                  image={course.image}
                  lecturer={course.lecturer}
                  rating={course.rating}
                  title={course.title}
                  progress={course.progress}
                  onView={() => {
                    navigate(`/courses/${course.id}`);
                  }}
                />
              ))}
            </div>
          </div>

          {!isAuthenticated && <LoginOverlay onLogin={onLogin} />}
        </div>
      </section>
    </div>
  );
}
