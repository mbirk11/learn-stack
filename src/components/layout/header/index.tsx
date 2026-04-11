import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./index.css";
import SparkleIcon from "../../../assets/icons/sparkle.svg?react";
import BookIcon from "../../../assets/icons/book.svg?react";
import UserProfileIcon from "../../../assets/icons/defaulte_profile.svg?react";
import Button from "../../ui/button";
import { useAuth } from "../../../context/AuthContext";
type ModalView = "login" | "profile" | "signup" | null;

interface HeaderProps {
  setModalType: (type: ModalView) => void;
  setSidebarOpen: (value: boolean) => void;
}

export default function Header({ setModalType, setSidebarOpen }: HeaderProps) {
  const { isAuthenticated } = useAuth();

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
    </header>
  );
}
