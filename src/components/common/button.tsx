import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/classname";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-sm px-4 py-2 transition-colors duration-150 focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

const variants = {
  primary: "bg-stone-800 hover:bg-stone-900 text-white ",
  secondary: "bg-stone-200 text-stone-800 hover:bg-stone-300",
  outline:
    "border border-stone-800 bg-transparent text-stone-800 hover:bg-stone-50",
};
