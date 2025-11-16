import type { DateStringValue } from "@/types/date";
import type { CalculatedBirthYear } from "@/utils/calculators/birth-year-calculator";

interface BirthYearResultProps {
  birthYear: CalculatedBirthYear;
  referenceDate: DateStringValue;
}

export default function BirthYearResult({
  birthYear,
  referenceDate,
}: BirthYearResultProps) {
  // 기준일 포맷팅 함수
  const formatReferenceDate = (): string => {
    const month = referenceDate.month ? Number(referenceDate.month) : 0;
    const day = referenceDate.day ? Number(referenceDate.day) : 0;

    if (month > 0 && day > 0) {
      return `${month}월 ${day}일`;
    } else if (month > 0) {
      return `${month}월`;
    }
    return "";
  };

  const referenceDateStr = formatReferenceDate();

  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">몇 년생이지?</h1>
      {birthYear !== null ? (
        <div className="mt-4 space-y-2">
          <div className="rounded-sm bg-white p-4 text-center">
            {typeof birthYear === "number" ? (
              <p className="text-2xl">{birthYear}년생</p>
            ) : (
              <p className="text-2xl">
                {birthYear.min}년생 <span className="text-lg">또는</span>{" "}
                {birthYear.max}년생
              </p>
            )}
          </div>
          {typeof birthYear === "object" && referenceDateStr && (
            <p className="text-sm text-stone-600">
              생일이 {referenceDateStr} 이후면 {birthYear.min}년생, 그 이전이면{" "}
              {birthYear.max}년생입니다.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4">나이를 입력하면 출생년도가 표시됩니다.</p>
      )}
    </section>
  );
}
