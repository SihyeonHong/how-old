import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-sm bg-stone-800 p-2 text-white hover:bg-stone-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
