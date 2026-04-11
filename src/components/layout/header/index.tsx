import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import "./index.css";
import SparkleIcon from "../../../assets/icons/sparkle.svg?react";
import BookIcon from "../../../assets/icons/book.svg?react";
import UserProfileIcon from "../../../assets/icons/defaulte_profile.svg?react";
import Modal from "../../ui/modal/defaultModal";
import SignupModal from "../../ui/modal/signupModal";
import Sidebar from "../../ui/sideBar";
import Button from "../../ui/button";
import LoginForm from "../../ui/forms/login";
import UserProfile from "../../ui/forms/profile";
import { useAuth } from "../../../context/AuthContext";

type ModalView = "login" | "profile" | "signup" | null;

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalView>(null);
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-link">
          <img className="logo" src={logo} alt="logo" />
        </Link>

        <nav className="nav">
          <Link to="/courses" className="nav-item">
            <SparkleIcon className="icon" />
            <span className="link">Browse Courses</span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Button
                btnType="default-outline"
                onClick={() => setModalType("login")}
              >
                Log In
              </Button>

              <Button onClick={() => setModalType("signup")}>Sign Up</Button>
            </>
          ) : (
            <>
              <span className="nav-item" onClick={() => setSidebarOpen(true)}>
                <BookIcon className="icon" />
                <span className="link">Enrolled Courses</span>
              </span>

              <UserProfileIcon
                className="profile-icon"
                onClick={() => setModalType("profile")}
              />
            </>
          )}
        </nav>
      </div>

      <Modal
        isOpen={modalType === "login" || modalType === "profile"}
        onClose={() => setModalType(null)}
        title={modalType === "login" ? "Log In" : "User Profile"}
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
        onGoToLogin={() => setModalType("login")}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Enrolled Courses"
      >
        <p>Course 1</p>
        <p>Course 2</p>
        <p>Course 3</p>
      </Sidebar>
    </header>
  );
}
