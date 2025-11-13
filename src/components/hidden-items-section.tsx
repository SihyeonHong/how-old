import { NavArrowDown } from "iconoir-react";
import { useState } from "react";

import Chip from "@/components/common/chip";

interface AgeRow {
  id: string;
  label: string;
  value: string;
  isVisible: boolean;
}

interface HiddenItemsSectionProps {
  hiddenRows: AgeRow[];
  onShow: (id: string) => void;
}

export default function HiddenItemsSection({
  hiddenRows,
  onShow,
}: HiddenItemsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between hover:opacity-80"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "숨겨진 항목 접기" : "숨겨진 항목 펼치기"}
      >
        <h2 className="text-lg font-semibold">
          숨겨진 항목 {hiddenRows.length}개
        </h2>
        <NavArrowDown
          className={`size-5 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && (
        <div className="mt-4 flex flex-wrap gap-2">
          {hiddenRows.map((row) => (
            <Chip
              key={row.id}
              variant="primary"
              className="cursor-pointer hover:opacity-80"
              onClick={() => onShow(row.id)}
            >
              {row.label}
            </Chip>
          ))}
        </div>
      )}
    </section>
  );
}
