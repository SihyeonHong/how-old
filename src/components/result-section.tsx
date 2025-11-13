import { Xmark } from "iconoir-react";

import type { DateValue } from "@/types/date";
import { cn } from "@/utils/classname";

interface ResultSectionProps {
  ageResult: DateValue | null;
  kAgeResult: number | null;
  applyQuick: boolean;
  onApplyQuickChange: (value: boolean) => void;
  isQuickDisabled?: boolean;
  visibleStates: Record<string, boolean>;
  onHide: (id: string) => void;
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
  applyQuick,
  onApplyQuickChange,
  isQuickDisabled = false,
  visibleStates,
  onHide,
}: ResultSectionProps) {
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
      value: kAgeResult !== null ? `${kAgeResult}세 ` : "",
      isVisible: kAgeResult !== null,
    },
  ];

  const visibleRows = rows.filter(
    (row) => row.isVisible && visibleStates[row.id] !== false,
  );

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
                <td className="w-auto px-4 py-2 wrap-break-word">
                  <div className="flex items-center gap-2">
                    <span>{row.value}</span>
                    {row.id === "korean-age" && !isQuickDisabled && (
                      <label className="flex cursor-pointer items-center gap-1 hover:[&>span]:text-stone-900">
                        <input
                          type="checkbox"
                          checked={applyQuick}
                          onChange={(e) => onApplyQuickChange(e.target.checked)}
                          className="h-4 w-4 cursor-pointer"
                          aria-label="빠른년생"
                        />
                        <span
                          className={cn(
                            "text-sm whitespace-nowrap",
                            applyQuick ? "text-stone-900" : "text-stone-400",
                          )}
                        >
                          빠른년생
                        </span>
                      </label>
                    )}
                  </div>
                </td>
                <td
                  className="px-1 text-center whitespace-nowrap"
                  style={{ width: "1%" }}
                >
                  <button
                    onClick={() => onHide(row.id)}
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
