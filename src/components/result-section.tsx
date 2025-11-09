import { NavArrowDown, Xmark } from "iconoir-react";
import { useState } from "react";

import Badge from "@/components/common/badge";
import type { DateValue } from "@/types/date";

interface ResultSectionProps {
  ageResult: DateValue | null;
  kAgeResult: number | null;
}

interface AgeRow {
  id: string;
  label: string;
  value: string;
  isVisible: boolean;
}

export default function ResultSection({
  ageResult,
  kAgeResult,
}: ResultSectionProps) {
  const [visibleStates, setVisibleStates] = useState<Record<string, boolean>>({
    "man-age": true,
    "korean-age": true,
  });
  const [isHiddenItemsExpanded, setIsHiddenItemsExpanded] = useState(false);

  const formatManAge = (result: DateValue): string => {
    const parts: string[] = [];
    if (result.month > 0 || result.day > 0) {
      if (result.month > 0) {
        parts.push(`${result.month}개월`);
      }
      if (result.day > 0) {
        parts.push(`${result.day}일`);
      }
      return `${result.year}세 (${parts.join(" ")})`;
    }
    return `${result.year}세`;
  };

  const rows: AgeRow[] = [
    {
      id: "man-age",
      label: "만 나이",
      value: ageResult ? formatManAge(ageResult) : "",
      isVisible: ageResult !== null,
    },
    {
      id: "korean-age",
      label: "한국 나이",
      value: kAgeResult !== null ? `${kAgeResult}세` : "",
      isVisible: kAgeResult !== null,
    },
  ];

  const handleHide = (id: string) => {
    setVisibleStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleShow = (id: string) => {
    setVisibleStates((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const visibleRows = rows.filter(
    (row) => row.isVisible && visibleStates[row.id] !== false,
  );

  const hiddenRows = rows.filter(
    (row) => row.isVisible && visibleStates[row.id] === false,
  );

  return (
    <section className="flex flex-col gap-2">
      <section className="rounded-sm bg-stone-100 p-4">
        <h1 className="text-xl font-semibold">몇 살이지?</h1>
        {visibleRows.length > 0 ? (
          <table className="mt-4 w-full max-w-full">
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.id} className="border-b border-stone-300">
                  <td
                    className="border-r border-stone-300 py-2 pr-4 pl-4 font-medium whitespace-nowrap"
                    style={{ width: "1%" }}
                  >
                    {row.label}
                  </td>
                  <td
                    className="px-4 py-2 wrap-break-word"
                    style={{ width: "auto" }}
                  >
                    {row.value}
                  </td>
                  <td
                    className="px-1 text-center whitespace-nowrap"
                    style={{ width: "1%" }}
                  >
                    <button
                      onClick={() => handleHide(row.id)}
                      className="text-red-700 hover:text-red-800"
                      aria-label={`${row.label} 숨기기`}
                    >
                      <Xmark className="size-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">날짜를 입력하면 나이가 표시됩니다.</p>
        )}
      </section>
      <section className="rounded-sm p-4">
        <button
          onClick={() => setIsHiddenItemsExpanded(!isHiddenItemsExpanded)}
          className="flex w-full items-center justify-between hover:opacity-80"
          aria-expanded={isHiddenItemsExpanded}
          aria-label={
            isHiddenItemsExpanded ? "숨겨진 항목 접기" : "숨겨진 항목 펼치기"
          }
        >
          <h2 className="text-lg font-semibold">
            숨겨진 항목 {hiddenRows.length}개
          </h2>
          <NavArrowDown
            className={`size-5 transition-transform ${
              isHiddenItemsExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        {isHiddenItemsExpanded && hiddenRows.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hiddenRows.map((row) => (
              <Badge
                key={row.id}
                variant="primary"
                className="cursor-pointer hover:opacity-80"
                onClick={() => handleShow(row.id)}
              >
                {row.label}
              </Badge>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
