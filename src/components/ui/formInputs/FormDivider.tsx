import "./index.css";

interface FormDividerProps {
  text?: string;
}

export default function FormDivider({ text = "or" }: FormDividerProps) {
  return (
    <div className="form-divider">
      <span className="form-divider-line" />
      <span className="form-divider-text">{text}</span>
      <span className="form-divider-line" />
    </div>
  );
}
