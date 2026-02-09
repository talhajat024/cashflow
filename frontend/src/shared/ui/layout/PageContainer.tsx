import type { ReactNode } from "react";
import clsx from "clsx";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto max-w-[1200px] px-8 w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
