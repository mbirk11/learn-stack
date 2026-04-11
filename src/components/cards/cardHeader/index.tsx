import "./index.css";

interface CardHeaderProps {
  lecturer: string;
  rating: number;
}

export default function CardHeader({ lecturer, rating }: CardHeaderProps) {
  return (
    <div className="card-header">
      <span className="card-header-lecturer">{lecturer}</span>
      <span className="card-header-rating">⭐ {rating}</span>
    </div>
  );
}
