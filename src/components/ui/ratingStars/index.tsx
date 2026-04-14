import { useState } from "react";
import "./index.css";

interface RatingStarsProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}

export default function RatingStars({
  value = 0,
  onChange,
  max = 5,
}: RatingStarsProps) {
  const [hoveredValue, setHoveredValue] = useState(0);

  const activeValue = hoveredValue || value;

  return (
    <div className="rating-stars">
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= activeValue;

        return (
          <button
            key={starValue}
            type="button"
            className={`rating-stars__star ${isActive ? "active" : ""}`}
            onMouseEnter={() => setHoveredValue(starValue)}
            onMouseLeave={() => setHoveredValue(0)}
            onClick={() => onChange?.(starValue)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
