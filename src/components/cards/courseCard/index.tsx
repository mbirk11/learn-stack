import { useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import CardHeader from "../cardHeader";
import "./index.css";

interface CourseCardProps {
  id: number;
  image: string;
  lecturer: string;
  rating: number;
  title: string;
  description: string;
  price: number;
}

export default function CourseCard({
  id,
  image,
  lecturer,
  rating,
  title,
  description,
  price,
}: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-card-image" />

      <div className="course-card-body">
        <CardHeader lecturer={lecturer} rating={rating} />
        <h3 className="course-card-title">{title}</h3>
        <p className="course-card-description">{description}</p>

        <div className="course-card-footer">
          <div className="course-card-price-block">
            <span className="course-card-price-label">Starting from</span>
            <strong className="course-card-price">${price}</strong>
          </div>

          <Button
            height="48px"
            width="103px"
            onClick={() => navigate(`/courses/${id}`)}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
