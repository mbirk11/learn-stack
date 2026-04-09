import type { InputHTMLAttributes, ReactNode } from "react";
import "./index.css";

type InputVariant = "default" | "filled";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
  rightIcon?: ReactNode;
  variant?: InputVariant;
}

export default function FormInput({
  label,
  wrapperClassName = "",
  rightIcon,
  variant = "default",
  ...rest
}: FormInputProps) {
  return (
    <div className={`form-field ${wrapperClassName}`}>
      <label className="form-label">{label}</label>

      <div className="form-input-wrapper">
        <input
          className={`form-input form-input-${variant} ${
            rightIcon ? "form-input-with-icon" : ""
          }`}
          {...rest}
        />

        {rightIcon && (
          <span className="form-input-icon-wrapper">{rightIcon}</span>
        )}
      </div>
    </div>
  );
}
