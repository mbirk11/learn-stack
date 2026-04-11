import { useNavigate } from "react-router-dom";
import boxOpen from "../../../assets/icons/PackageOpen.svg";
import Button from "../button";
import "./index.css";
interface EmptyEnrollmentsProps {
  onCloseSidebar?: () => void;
}
export default function EmptyEnrollments({
  onCloseSidebar,
}: EmptyEnrollmentsProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onCloseSidebar?.();
    navigate("/courses");
  };

  return (
    <div className="empty-enrollments">
      <div className="empty-enrollments-icon-wrapper">
        <img src={boxOpen} />
      </div>

      <h3 className="empty-enrollments-title">No Enrolled Courses Yet</h3>

      <p className="empty-enrollments-text">
        Your learning journey starts here!
      </p>

      <p className="empty-enrollments-text">Browse courses to get started.</p>

      <Button width="175px" height="58px" onClick={handleClick}>
        Browse Courses
      </Button>
    </div>
  );
}
