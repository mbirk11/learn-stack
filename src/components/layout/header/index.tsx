import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import "./index.css";
import SparkleIcon from "../../../assets/icons/sparkle.svg?react";
import BookIcon from "../../../assets/icons/book.svg?react";
import UserProfileIcon from "../../../assets/icons/defaulte_profile.svg?react";
import Modal from "../../ui/modal";
import Sidebar from "../../ui/sideBar";
import Button from "../../ui/button";
import { LoginForm, SignupForm, UserProfile } from "../../ui/forms";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setauthed] = useState(true);
  const [modalType, setModalType] = useState<
    "login" | "signup" | "profile" | null
  >(null);

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
          {!authed ? (
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
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={
          modalType === "login"
            ? "Log In"
            : modalType === "signup"
              ? "Create Account"
              : modalType === "profile"
                ? "User Profile"
                : ""
        }
        showBackButton={modalType === "signup"} // optional
        onBack={() => setModalType("login")}
      >
        {modalType === "login" && <LoginForm />}
        {modalType === "signup" && <SignupForm />}
        {modalType === "profile" && <UserProfile />}
      </Modal>
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
