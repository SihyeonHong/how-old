import type { HTMLAttributes } from "react";
import type { ReactNode } from "react";

import { cn } from "@/utils/classname";

export default function Chip({
  children,
  className,
  variant = "primary",
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-sm",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

const variants = {
  primary: "bg-stone-200 text-stone-800",
  secondary: "bg-stone-800 text-white",
  accent: "bg-slate-300 text-black",
};
