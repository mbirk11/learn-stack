import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import "./index.css";

interface FormPasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  wrapperClassName?: string;
  showIcon?: ReactNode;
}

export default function FormPasswordInput({
  label,
  wrapperClassName = "",
  showIcon,
  ...rest
}: FormPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`form-field ${wrapperClassName}`}>
      <label className="form-label">{label}</label>

      <div className="form-input-wrapper">
        <input
          className="form-input form-input-with-icon"
          type={showPassword ? "text" : "password"}
          {...rest}
        />

        <button
          type="button"
          className="form-input-icon-button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showIcon}
        </button>
      </div>
    </div>
  );
}
