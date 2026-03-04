// shared/ui/spinner/Spinner.tsx
import { spinner } from "./Spinner.styles";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  className?: string;
}

export const Spinner = ({ size, color, className }: SpinnerProps) => {
  return (
    <div 
      className={spinner({ size, color, className })}
      role="status"
      aria-label="Loading"
    />
  );
};