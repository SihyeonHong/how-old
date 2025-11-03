import type { DateValue } from "@/types/date";
import { AgeCalculator } from "@/utils/calculator";

interface ResultSectionProps {
  birthDate: DateValue;
  referenceDate: DateValue;
}

export default function ResultSection({
  birthDate,
  referenceDate,
}: ResultSectionProps) {
  const age = AgeCalculator(referenceDate, birthDate);

  if (age === null) {
    return null;
  }

  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">만 나이</h1>
      <p>{age}</p>
    </section>
  );
}
