import RatingStars from "../ratingStars";

interface RatingCardProps {
  rating: number;
  onChange: (value: number) => void;
  onClose?: () => void;
  title?: string;
}

export default function RatingCard({
  rating,
  onChange,
  onClose,
  title = "Rate your experience",
}: RatingCardProps) {
  return (
    <div className="rating-card">
      {onClose && (
        <button className="rating-card__close" onClick={onClose}>
          ×
        </button>
      )}

      <p className="rating-card__title">{title}</p>

      <RatingStars value={rating} onChange={onChange} />
    </div>
  );
}
