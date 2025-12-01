import { Copy } from "iconoir-react";
import { useRef } from "react";

import { cn } from "@/utils/classname";

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function CopyButton({
  text,
  disabled = false,
  size = "md",
  className = "",
}: CopyButtonProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    if (text.trim() === "") return;

    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다.");
    } catch {
      // 클립보드 API 실패 시 fallback
      if (textareaRef.current) {
        textareaRef.current.value = text;
        textareaRef.current.select();
        const success = document.execCommand("copy");
        if (success) {
          alert("복사되었습니다.");
        } else {
          alert("복사에 실패했습니다.");
        }
      } else {
        alert("복사에 실패했습니다.");
      }
    }
  };

  const sizeClasses =
    size === "sm" ? "px-2.5 py-1 text-xs gap-1.5" : "px-3 py-1.5 text-sm gap-2";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <>
      <button
        onClick={handleCopy}
        disabled={disabled || text.trim() === ""}
        className={cn(
          "flex items-center rounded-sm border border-stone-300 bg-white text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-stone-300 disabled:hover:bg-white",
          sizeClasses,
          className,
        )}
        aria-label="복사"
      >
        <Copy className={iconSize} />
        <span>복사</span>
      </button>
      <textarea
        ref={textareaRef}
        className="absolute -left-[9999px] opacity-0"
        readOnly
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  );
}
