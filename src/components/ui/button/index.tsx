import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./index.css";

type BtnType = "primary" | "default-outline" | "default-ghost" | "desabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  btnType?: BtnType;
}

export default function Button({
  children,
  onClick,
  width = "125px",
  height = "60px",
  btnType = "primary",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${btnType} ${className}`}
      style={{ width, height }}
      {...rest}
    >
      {children}
    </button>
  );
}
