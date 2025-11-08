import type { DateValue } from "@/types/date";

interface ResultSectionProps {
  ageResult: DateValue | null;
  kAgeResult: number | null;
}

export default function ResultSection({
  ageResult,
  kAgeResult,
}: ResultSectionProps) {
  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">몇 살이지?</h1>
      {ageResult ? (
        <div className="space-y-2">
          <p>
            만 {ageResult.year}세 {ageResult.month}개월 {ageResult.day}일
          </p>
          {kAgeResult !== null && <p>한국 나이 {kAgeResult}세</p>}
        </div>
      ) : (
        <p>날짜를 입력하면 나이가 표시됩니다.</p>
      )}
    </section>
  );
}
