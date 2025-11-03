import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-sm bg-stone-800 px-4 py-2 text-white transition-colors duration-150 hover:bg-stone-900 focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
