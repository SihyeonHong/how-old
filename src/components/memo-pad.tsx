import React, { useEffect, useRef } from "react";

import CopyButton from "@/components/common/copy-button";

interface MemoPadProps {
  memo: string;
  setMemo: (memo: string) => void;
}

export default function MemoPad({ memo, setMemo }: MemoPadProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
    // 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // memo가 변경될 때마다 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [memo]);

  return (
    <div className="rounded-sm bg-white p-8 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-900">메모장</h2>
        <CopyButton text={memo} />
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
