import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { FiCalendar, FiClock, FiCode, FiUser } from "react-icons/fi";
import { getCourseDetails } from "../../api/courses";
import { getEnrollments, type SessionType } from "../../api/enrollment";
import {
  getSessionTypes,
  getTimeSlots,
  getWeeklySchedules,
} from "../../api/schedule";
import { useAuth } from "../../context/AuthContext";
import { useCourseDetailMutations } from "../../hooks/useCourseDetailMutations";
import CourseDetailsSidebar from "./CourseSidebar";
import CourseDetailPopups from "./CourseDetailPopups";
import "./index.css";
import StarIcon from "../../assets/icons/star.svg?react";

type ModalView = "login" | "profile" | "signup" | null;

type LayoutOutletContext = {
  setModalType: React.Dispatch<React.SetStateAction<ModalView>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Review = {
  userId: number;
  rating: number;
};

function calculateAverageRating(reviews: Review[]) {
  if (!reviews.length) {
    return 0;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

export default function CourseDetail() {
  const { id } = useParams();
  const courseId = Number(id);

  const { user, isAuthenticated } = useAuth();
  const { setModalType } = useOutletContext<LayoutOutletContext>();

  const [selectedWeeklyScheduleId, setSelectedWeeklyScheduleId] = useState<
    number | null
  >(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
    null,
  );
  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState<
    number | null
  >(null);

  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isConflictPopupOpen, setIsConflictPopupOpen] = useState(false);
  const [isEnrollSuccessPopupOpen, setIsEnrollSuccessPopupOpen] =
    useState(false);
  const [isCompletedPopupOpen, setIsCompletedPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: ["course-details", courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: Number.isFinite(courseId) && courseId > 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const currentEnrollment = useMemo(() => {
    return enrollments.find((item) => item.course.id === courseId) ?? null;
  }, [enrollments, courseId]);

  const { data: weeklySchedules = [] } = useQuery({
    queryKey: ["weekly-schedules", courseId],
    queryFn: () => getWeeklySchedules(courseId),
    enabled: Boolean(course) && !currentEnrollment,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { data: timeSlots = [] } = useQuery({
    queryKey: ["time-slots", courseId, selectedWeeklyScheduleId],
    queryFn: () => getTimeSlots(courseId, selectedWeeklyScheduleId as number),
    enabled: Boolean(selectedWeeklyScheduleId) && !currentEnrollment,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { data: sessionTypes = [] } = useQuery({
    queryKey: [
      "session-types",
      courseId,
      selectedWeeklyScheduleId,
      selectedTimeSlotId,
    ],
    queryFn: () =>
      getSessionTypes(
        courseId,
        selectedWeeklyScheduleId as number,
        selectedTimeSlotId as number,
      ),
    enabled:
      Boolean(selectedWeeklyScheduleId) &&
      Boolean(selectedTimeSlotId) &&
      !currentEnrollment,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const selectedSessionType = useMemo<SessionType | null>(() => {
    return (
      sessionTypes.find((item) => item.id === selectedSessionTypeId) ?? null
    );
  }, [sessionTypes, selectedSessionTypeId]);

  const totalPrice =
    Number(course?.basePrice ?? 0) +
    Number(selectedSessionType?.priceModifier ?? 0);

  const conflictingEnrollment = useMemo(() => {
    if (!selectedWeeklyScheduleId || !selectedTimeSlotId) {
      return null;
    }

    return (
      enrollments.find((item) => {
        if (item.course.id === courseId) {
          return false;
        }

        return (
          item.schedule.weeklySchedule.id === selectedWeeklyScheduleId &&
          item.schedule.timeSlot.id === selectedTimeSlotId
        );
      }) ?? null
    );
  }, [courseId, enrollments, selectedTimeSlotId, selectedWeeklyScheduleId]);

  const userReview = useMemo(() => {
    const reviews = course?.reviews ?? [];
    return reviews.find((r: Review) => r.userId === user?.id) ?? null;
  }, [course?.reviews, user?.id]);

  const hasUserRated = Boolean(userReview);
  const displayedRating = userReview?.rating ?? rating;

  const averageRating = useMemo(() => {
    const reviews: Review[] = course?.reviews ?? [];

    if (!reviews.length && !rating) return 0;
    if (hasUserRated) {
      return calculateAverageRating(reviews);
    }
    if (rating) {
      const total =
        reviews.reduce((sum, review) => sum + review.rating, 0) + rating;

      const count = reviews.length + 1;

      return total / count;
    }
    return calculateAverageRating(reviews);
  }, [course?.reviews, rating, hasUserRated]);

  const { enrollMutation, completeMutation, retakeMutation, reviewMutation } =
    useCourseDetailMutations({
      courseId,
      onEnrollSuccess: () => {
        setIsConflictPopupOpen(false);
        setIsEnrollSuccessPopupOpen(true);
      },
      onCompleteSuccess: () => {
        setIsCompletedPopupOpen(true);
      },
      onRetakeSuccess: () => {
        setRating(0);
        setSelectedWeeklyScheduleId(null);
        setSelectedTimeSlotId(null);
        setSelectedSessionTypeId(null);
      },
      onReviewSuccess: () => {
        setRating(0);
      },
    });

  const handleSelectWeeklySchedule = (weeklyScheduleId: number) => {
    setSelectedWeeklyScheduleId(weeklyScheduleId);
    setSelectedTimeSlotId(null);
    setSelectedSessionTypeId(null);
  };

  const handleSelectTimeSlot = (timeSlotId: number) => {
    setSelectedTimeSlotId(timeSlotId);
    setSelectedSessionTypeId(null);
  };

  const handleSubmitRating = (value: number) => {
    if (!value || hasUserRated) return;

    setRating(value);
    reviewMutation.mutate(value);
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setModalType("login");
      return;
    }

    if (!user?.profileComplete) {
      setIsProfilePopupOpen(true);
      return;
    }

    if (
      !selectedWeeklyScheduleId ||
      !selectedTimeSlotId ||
      !selectedSessionType
    ) {
      return;
    }

    if (Number(selectedSessionType.availableSeats) === 0) {
      return;
    }

    if (conflictingEnrollment) {
      setIsConflictPopupOpen(true);
      return;
    }

    enrollMutation.mutate({
      courseId,
      courseScheduleId: selectedSessionType.courseScheduleId,
      force: false,
    });
  };

  const handleContinueAnyway = () => {
    if (!selectedSessionType) {
      return;
    }

    enrollMutation.mutate({
      courseId,
      courseScheduleId: selectedSessionType.courseScheduleId,
      force: true,
    });
  };

  const handleCompleteCourse = () => {
    if (!currentEnrollment) {
      return;
    }

    completeMutation.mutate(currentEnrollment.id);
  };

  const handleRetakeCourse = () => {
    if (!currentEnrollment) {
      return;
    }

    retakeMutation.mutate(currentEnrollment.id);
  };

  if (isCourseLoading) {
    return <div className="course-detail-page container">Loading...</div>;
  }

  if (!course) {
    return (
      <div className="course-detail-page container">Course not found.</div>
    );
  }

  return (
    <div className="container">
      <section className="course-detail-page">
        <div className="course-detail-layout">
          <div className="course-detail-main">
            <nav className="course-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/courses">Browse</Link>
              <span>›</span>
              <span className="current">{course.topic.name}</span>
            </nav>

            <h1 className="course-title">{course.title}</h1>

            <img
              className="course-image"
              src={course.image}
              alt={course.title}
            />

            <div className="course-meta">
              <span>
                <MetaPill
                  icon={<FiCalendar />}
                  text={`${course.durationWeeks} Weeks`}
                />
                <MetaPill icon={<FiClock />} text={`${course.hours} Hours`} />
              </span>

              <span>
                <MetaPill icon={<StarIcon />} text={averageRating.toFixed(1)} />
                <span className="course-meta-pill__course">
                  <MetaPill icon={<FiCode />} text={course.topic.name} />
                </span>
              </span>
            </div>

            <div className="course-instructor">
              {course.instructor.avatar ? (
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="course-instructor-avatar"
                />
              ) : (
                <div className="course-instructor-avatar fallback-avatar">
                  <FiUser />
                </div>
              )}

              <span>{course.instructor.name}</span>
            </div>

            <div className="course-description">
              <h3>Course Description</h3>
              <p>{course.description}</p>
            </div>
          </div>

          <aside className="course-sidebar">
            <CourseDetailsSidebar
              enrollment={currentEnrollment}
              weeklySchedules={weeklySchedules}
              timeSlots={timeSlots}
              sessionTypes={sessionTypes}
              selectedWeeklyScheduleId={selectedWeeklyScheduleId}
              selectedTimeSlotId={selectedTimeSlotId}
              selectedSessionTypeId={selectedSessionTypeId}
              selectedSessionType={selectedSessionType}
              totalPrice={totalPrice}
              basePrice={Number(course.basePrice)}
              rating={displayedRating}
              onSelectWeeklySchedule={handleSelectWeeklySchedule}
              onSelectTimeSlot={handleSelectTimeSlot}
              onSelectSessionType={setSelectedSessionTypeId}
              onEnroll={handleEnroll}
              onComplete={handleCompleteCourse}
              onRetake={handleRetakeCourse}
              isEnrolling={enrollMutation.isPending}
              isCompleting={completeMutation.isPending}
              isRetaking={retakeMutation.isPending}
              hasUserRated={hasUserRated}
              isAuthenticated={isAuthenticated}
              onGoToLogin={() => setModalType("login")}
              isProfileComplete={Boolean(user?.profileComplete)}
              onCompleteProfile={() => setModalType("profile")}
              onSubmitRating={handleSubmitRating}
            />
          </aside>
        </div>
      </section>

      <CourseDetailPopups
        hasUserRated={hasUserRated}
        courseTitle={course.title}
        isProfilePopupOpen={isProfilePopupOpen}
        isConflictPopupOpen={isConflictPopupOpen}
        isEnrollSuccessPopupOpen={isEnrollSuccessPopupOpen}
        isCompletedPopupOpen={isCompletedPopupOpen}
        conflictingEnrollment={conflictingEnrollment}
        rating={displayedRating}
        onSubmitRating={handleSubmitRating}
        setRating={setRating}
        onCloseProfilePopup={() => setIsProfilePopupOpen(false)}
        onCompleteProfile={() => {
          setIsProfilePopupOpen(false);
          setModalType("profile");
        }}
        onCloseConflictPopup={() => setIsConflictPopupOpen(false)}
        onContinueAnyway={handleContinueAnyway}
        onCloseEnrollSuccessPopup={() => setIsEnrollSuccessPopupOpen(false)}
        onCloseCompletedPopup={() => setIsCompletedPopupOpen(false)}
      />
    </div>
  );
}

function MetaPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="course-meta-pill">
      {icon}
      <span>{text}</span>
    </span>
  );
}
