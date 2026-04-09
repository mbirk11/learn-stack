import type { ReactNode, SelectHTMLAttributes } from "react";
import "./index.css";

type InputVariant = "default" | "filled";

interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  wrapperClassName?: string;
  rightIcon?: ReactNode;
  variant?: InputVariant;
}

export default function FormSelect({
  label,
  options,
  wrapperClassName = "",
  rightIcon,
  variant = "default",
  ...rest
}: FormSelectProps) {
  return (
    <div className={`form-field ${wrapperClassName}`}>
      <label className="form-label">{label}</label>

      <div className="form-input-wrapper">
        <select
          className={`form-input form-select form-input-${variant} ${
            rightIcon ? "form-input-with-icon" : ""
          }`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {rightIcon && (
          <span className="form-input-icon-wrapper">{rightIcon}</span>
        )}
      </div>
    </div>
  );
}
