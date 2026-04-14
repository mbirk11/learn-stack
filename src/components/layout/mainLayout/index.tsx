import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Modal from "../../ui/modal/defaultModal";
import SignupModal from "../../ui/modal/signupModal";
import LoginForm from "../../ui/forms/login";
import UserProfile from "../../ui/forms/profile";
import Sidebar from "../../ui/sideBar";
import EmptyEnrollments from "../../ui/emptyEnrollments";
import EnrolledCourseSidebarCard from "../../cards/sidebarCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEnrollments, type Enrollment } from "../../../api/enrollment";
import { useAuth } from "../../../context/AuthContext";

type ModalView = "login" | "profile" | "signup" | null;

export default function MainLayout() {
  const [modalType, setModalType] = useState<ModalView>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { data: enrollments = [] } = useQuery<Enrollment[]>({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
    enabled: isAuthenticated,
  });

  return (
    <div className="main-layout">
      <Header setModalType={setModalType} setSidebarOpen={setSidebarOpen} />

      <main className="main-layout__content">
        <Outlet context={{ setModalType, setSidebarOpen }} />
      </main>

      <Footer />

      <Modal
        title="Welcome Back"
        subtitle="Log in to continue your learning"
        isOpen={modalType === "login" || modalType === "profile"}
        onClose={() => setModalType(null)}
      >
        {modalType === "login" && (
          <LoginForm
            onSuccess={() => setModalType(null)}
            onGoToSignup={() => setModalType("signup")}
          />
        )}
        {modalType === "profile" && <UserProfile />}
      </Modal>

      <SignupModal
        isOpen={modalType === "signup"}
        onClose={() => setModalType(null)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Enrolled Courses"
        subtitle={`Total Enrollments ${enrollments.length}`}
      >
        {enrollments.length === 0 ? (
          <EmptyEnrollments onCloseSidebar={() => setSidebarOpen(false)} />
        ) : (
          <div className="flex flex-col gap-4">
            {enrollments.map((item) => (
              <EnrolledCourseSidebarCard
                key={item.id}
                enrollmentId={item.id}
                courseId={item.course.id}
                image={item.course.image}
                instructor={item.course.instructor.name}
                rating={item.course.avgRating}
                title={item.course.title}
                progress={item.progress}
                weeklySchedule={item.schedule.weeklySchedule.label}
                timeSlot={item.schedule.timeSlot.label}
                sessionType={item.schedule.sessionType.name}
                location={item.schedule.location}
              />
            ))}
          </div>
        )}
      </Sidebar>
    </div>
  );
}
