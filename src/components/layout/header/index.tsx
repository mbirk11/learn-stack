import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import "./index.css";
import SparkleIcon from "../../../assets/icons/sparkle.svg?react";
import BookIcon from "../../../assets/icons/book.svg?react";
import UserProfileIcon from "../../../assets/icons/defaulte_profile.svg?react";
import Modal from "../../ui/modal";
import Sidebar from "../../ui/sideBar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

          <span className="nav-item" onClick={() => setSidebarOpen(true)}>
            <BookIcon className="icon" />
            <span className="link">Enrolled Courses</span>
          </span>

          <UserProfileIcon
            className="profile-icon"
            onClick={() => setOpen(true)}
          />
        </nav>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Account"
      >
        <p>Content here</p>
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
