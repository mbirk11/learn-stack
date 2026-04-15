import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BrowseCourseCard from "../../components/browse/courseCardBrowse";
import CoursesPagination from "../../components/browse/coursesPagination";
import FilterSidebar from "../../components/browse/filterSideBar";
import {
  getCourses,
  type CourseListItem,
  type CoursesMeta,
} from "../../api/browseCourses";
import {
  getCategories,
  getInstructors,
  getTopics,
  type CategoryItem,
  type InstructorItem,
  type TopicItem,
} from "../../api/caurseFilters";
import "./index.css";
import CourseSorter from "../../components/browse/courseSorter";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [meta, setMeta] = useState<CoursesMeta>({
    currentPage: 1,
    lastPage: 1,
    perPage: 9,
    total: 0,
  });

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [instructors, setInstructors] = useState<InstructorItem[]>([]);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [selectedInstructorIds, setSelectedInstructorIds] = useState<number[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("newest");

  function toggleItem(items: number[], id: number) {
    return items.includes(id)
      ? items.filter((item) => item !== id)
      : [...items, id];
  }

  const handleToggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) => toggleItem(prev, id));
    setSelectedTopicIds([]);
    setCurrentPage(1);
  };

  const handleToggleTopic = (id: number) => {
    setSelectedTopicIds((prev) => toggleItem(prev, id));
    setCurrentPage(1);
  };

  const handleToggleInstructor = (id: number) => {
    setSelectedInstructorIds((prev) => toggleItem(prev, id));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategoryIds([]);
    setSelectedTopicIds([]);
    setSelectedInstructorIds([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [categoriesData, instructorsData] = await Promise.all([
          getCategories(),
          getInstructors(),
        ]);

        setCategories(categoriesData);
        setInstructors(instructorsData);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    }

    fetchFilterData();
  }, []);

  useEffect(() => {
    async function fetchTopicsData() {
      try {
        const topicsData = await getTopics(selectedCategoryIds);
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    }

    fetchTopicsData();
  }, [selectedCategoryIds]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);

        const response = await getCourses({
          categories: selectedCategoryIds,
          topics: selectedTopicIds,
          instructors: selectedInstructorIds,
          sort: "newest",
          page: currentPage,
        });

        setCourses(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [
    selectedCategoryIds,
    selectedTopicIds,
    selectedInstructorIds,
    currentPage,
  ]);
  const sortedCourses = [...courses].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.basePrice - b.basePrice;
      case "price-desc":
        return b.basePrice - a.basePrice;
      case "popular":
        return b.avgRating - a.avgRating;
      case "title":
        return a.title.localeCompare(b.title);
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="container">
      <div className="browse-page">
        <nav className="browse-breadcrumb">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "breadcrumb-link active" : "breadcrumb-link"
            }
          >
            Home
          </NavLink>

          <span>›</span>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "breadcrumb-link active" : "breadcrumb-link"
            }
          >
            Browse
          </NavLink>
        </nav>

        <div className="browse-layout">
          <aside className="browse-sidebar">
            <FilterSidebar
              categories={categories}
              topics={topics}
              instructors={instructors}
              selectedCategoryIds={selectedCategoryIds}
              selectedTopicIds={selectedTopicIds}
              selectedInstructorIds={selectedInstructorIds}
              onToggleCategory={handleToggleCategory}
              onToggleTopic={handleToggleTopic}
              onToggleInstructor={handleToggleInstructor}
              onClearFilters={handleClearFilters}
              showClear
            />
          </aside>

          <section className="browse-content">
            <div className="courses-header">
              <CourseSorter value={sort} onChange={setSort} />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="courses-grid">
                {sortedCourses.map((course) => (
                  <BrowseCourseCard
                    key={course.id}
                    id={course.id}
                    image={course.image}
                    instructorName={course.instructor.name}
                    durationWeeks={course.durationWeeks}
                    rating={course.avgRating}
                    title={course.title}
                    categoryName={course.category.name}
                    price={course.basePrice}
                  />
                ))}
              </div>
            )}

            <div className="pagination-wrapper">
              <CoursesPagination
                currentPage={meta.currentPage}
                total={meta.total}
                perPage={meta.perPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
