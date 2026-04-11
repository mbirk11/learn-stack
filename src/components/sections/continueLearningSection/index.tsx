import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import SectionHeader from "../../ui/sectionHeader";
import CourseProgressCard from "../../cards/courseProgressCard";
import LoginOverlay from "../../ui/oginOverlay";
import { getEnrollments, type Enrollment } from "../../../api/enrollment";
import { fakeContinueLearningCourses } from "../../../utils/fakeCourses";
import "./index.css";
interface Props {
  onSeeAll?: () => void;
  onLogin?: () => void;
}

export default function ContinueLearningSection({ onSeeAll, onLogin }: Props) {
  const { isAuthenticated } = useAuth();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await getEnrollments();
        setEnrollments(response);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [isAuthenticated]);

  if (isAuthenticated && !loading && enrollments.length === 0) {
    return null;
  }

  const data = isAuthenticated
    ? enrollments.map((item) => ({
        id: item.id,
        image: item.course.image,
        lecturer: item.course.instructor.name,
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
              />
            ))}
          </div>
        </div>

        {!isAuthenticated && <LoginOverlay onLogin={onLogin} />}
      </div>
    </section>
  );
}
