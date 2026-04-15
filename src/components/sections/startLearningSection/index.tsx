import { useEffect, useRef, useState } from "react";
import { getFeaturedCourses, type FeaturedCourse } from "../../../api/courses";
import SectionHeader from "../../ui/sectionHeader";
import CourseCard from "../../cards/courseCard";
import "./index.css";

export default function StartLearningSection() {
  const [courses, setCourses] = useState<FeaturedCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getFeaturedCourses();
        setCourses(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to fetch featured courses", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <section className="start-learning-section">
        <SectionHeader
          title="Start Learning Today"
          subtitle="Choose from our most popular courses and begin your journey"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="start-learning-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                image={course.image}
                lecturer={course.instructor?.name || "Unknown instructor"}
                rating={course.avgRating}
                title={course.title}
                description={course.description}
                price={Number(course.basePrice)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
