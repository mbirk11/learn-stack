import { useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import "./index.css";

interface BrowseCourseCardProps {
  id: number;
  image: string;
  instructorName: string;
  durationWeeks: number;
  rating: number;
  title: string;
  categoryName: string;
  price: number;
}

export default function BrowseCourseCard({
  id,
  image,
  instructorName,
  durationWeeks,
  rating,
  title,
  categoryName,
  price,
}: BrowseCourseCardProps) {
  const navigate = useNavigate();

  return (
    <div className="browse-card">
      {/* IMAGE */}
      <img src={image} alt={title} className="browse-card-image" />

      {/* CONTENT */}
      <div className="browse-card-body">
        {/* TOP LINE */}
        <div className="browse-card-top">
          <span className="browse-card-instructor">
            {instructorName} | {durationWeeks} Weeks
          </span>

          <span className="browse-card-rating">⭐ {rating}</span>
        </div>

        {/* TITLE */}
        <h3 className="browse-card-title">{title}</h3>

        {/* CATEGORY PILL */}
        <div className="browse-card-pill">
          {"</>"} {categoryName}
        </div>

        {/* FOOTER */}
        <div className="browse-card-footer">
          <div className="browse-card-price-block">
            <span className="browse-card-price-label">Starting from</span>
            <strong className="browse-card-price">${price}</strong>
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
