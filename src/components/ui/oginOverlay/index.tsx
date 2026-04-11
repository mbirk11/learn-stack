import Button from "../button";
import "./index.css";
import { CiLock } from "react-icons/ci";

interface LoginOverlayProps {
  onLogin?: () => void;
}

export default function LoginOverlay({ onLogin }: LoginOverlayProps) {
  return (
    <div className="login-overlay">
      <div className="login-overlay-card">
        <div className="login-overlay-icon-wrapper">
          <CiLock className="login-overlay-icon" />
        </div>

        <p className="login-overlay-text">
          Sign in to track your learning progress
        </p>

        <Button onClick={onLogin} width="83px" height="42px">
          Log In
        </Button>
      </div>
    </div>
  );
}
