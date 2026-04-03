import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { button } from "./Button.styles";
import type { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={button({ variant, size, fullWidth, className })}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";