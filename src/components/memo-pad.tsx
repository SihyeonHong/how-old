import { Copy } from "iconoir-react";
import React, { useRef, useState } from "react";

export default function MemoPad() {
  const [memo, setMemo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
    // 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleCopy = async () => {
    if (memo.trim() === "") return;

    try {
      await navigator.clipboard.writeText(memo);
      alert("복사되었습니다.");
    } catch {
      // 클립보드 API 실패 시 fallback
      if (textareaRef.current) {
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

  return (
    <div className="rounded-sm bg-white p-8 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-900">메모장</h2>
        <button
          onClick={handleCopy}
          disabled={memo.trim() === ""}
          className="flex items-center gap-2 rounded-sm border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-stone-300 disabled:hover:bg-white"
        >
          <Copy className="h-4 w-4" />
          <span>복사</span>
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={memo}
        onChange={handleChange}
        placeholder="사이트를 나가면 메모 내용은 삭제됩니다."
        className="w-full resize-none overflow-hidden rounded-sm border border-stone-300 p-4 text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-300 focus:outline-none"
        rows={4}
      />
    </div>
  );
}
