import { Plus, Text, Xmark } from "iconoir-react";
import { useMemo, useState } from "react";

import CopyButton from "@/components/common/copy-button";
import type { DateStringValue, DateValue } from "@/types/date";
import { formatAgeText } from "@/utils/calculators/age-text-formatter";
import { cn } from "@/utils/classname";

interface ResultSectionProps {
  ageResult: DateValue | null;
  kAgeResult: number | null;
  applyQuick: boolean;
  onApplyQuickChange: (value: boolean) => void;
  isQuickDisabled?: boolean;
  visibleStates: Record<string, boolean>;
  onHide: (id: string) => void;
  birthDate: DateStringValue;
  referenceDate: DateStringValue;
  onAddToMemo: (text: string) => void;
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
  birthDate,
  referenceDate,
  onAddToMemo,
}: ResultSectionProps) {
  const [showTextEditor, setShowTextEditor] = useState(false);

  // DateStringValue를 DateValue로 변환하는 헬퍼 함수
  const stringToDateValue = (dateStr: DateStringValue): DateValue | null => {
    const year = Number(dateStr.year);
    if (!dateStr.year || isNaN(year) || year <= 0) {
      return null;
    }
    return {
      year,
      month: dateStr.month ? Number(dateStr.month) : 0,
      day: dateStr.day ? Number(dateStr.day) : 0,
    };
  };

  // 변환된 DateValue들
  const birthDateValue = useMemo(
    () => stringToDateValue(birthDate),
    [birthDate],
  );
  const referenceDateValue = useMemo(
    () => stringToDateValue(referenceDate),
    [referenceDate],
  );

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

  const formattedText = useMemo(() => {
    if (
      (ageResult === null && kAgeResult === null) ||
      birthDateValue === null ||
      referenceDateValue === null
    ) {
      return "";
    }
    return formatAgeText(
      birthDateValue,
      referenceDateValue,
      ageResult,
      kAgeResult,
      applyQuick,
    );
  }, [ageResult, kAgeResult, birthDateValue, referenceDateValue, applyQuick]);

  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">몇 살이지?</h1>
      {visibleRows.length > 0 ? (
        <>
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
                            onChange={(e) =>
                              onApplyQuickChange(e.target.checked)
                            }
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
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowTextEditor(!showTextEditor)}
              className="flex items-center gap-1.5 rounded-sm border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
              aria-label="텍스트로 보기"
            >
              <Text className="h-3.5 w-3.5" />
              <span>텍스트로 보기</span>
            </button>
            {showTextEditor && formattedText && (
              <>
                <CopyButton text={formattedText} size="sm" />
                <button
                  onClick={() => onAddToMemo(formattedText)}
                  className="flex items-center gap-1.5 rounded-sm border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
                  aria-label="메모장에 추가"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>메모장에 추가</span>
                </button>
              </>
            )}
          </div>
          {showTextEditor && (
            <div className="mt-3">
              <pre className="w-full rounded-sm border border-stone-300 bg-white p-3 text-sm text-stone-900 whitespace-pre-wrap font-sans">
                {formattedText}
              </pre>
            </div>
          )}
        </>
      ) : (
        <p className="mt-4">날짜를 입력하면 나이가 표시됩니다.</p>
      )}
    </section>
  );
}
