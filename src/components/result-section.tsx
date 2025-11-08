import { Xmark } from "iconoir-react";
import { useState } from "react";

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
  showState: boolean;
  onHide: () => void;
}

export default function ResultSection({
  ageResult,
  kAgeResult,
}: ResultSectionProps) {
  const [showManAge, setShowManAge] = useState(true);
  const [showKoreanAge, setShowKoreanAge] = useState(true);

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
      showState: showManAge,
      onHide: () => setShowManAge(false),
    },
    {
      id: "korean-age",
      label: "한국 나이",
      value: kAgeResult !== null ? `${kAgeResult}세` : "",
      isVisible: kAgeResult !== null,
      showState: showKoreanAge,
      onHide: () => setShowKoreanAge(false),
    },
  ];

  const visibleRows = rows.filter((row) => row.isVisible && row.showState);

  return (
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
                    onClick={row.onHide}
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
  );
}
