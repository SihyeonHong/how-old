import type { DateValue } from "@/types/date";

interface ResultSectionProps {
  ageResult: DateValue | null;
}

export default function ResultSection({ ageResult }: ResultSectionProps) {
  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">몇 살이지?</h1>
      {ageResult ? (
        <p>
          만 {ageResult.year}세 {ageResult.month}개월 {ageResult.day}일
        </p>
      ) : (
        <p>날짜를 입력하면 나이가 표시됩니다.</p>
      )}
    </section>
  );
}
