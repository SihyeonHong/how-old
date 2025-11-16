import BirthYearForm from "@/components/birth-year-form";
import BirthYearResult from "@/components/birth-year-result";
import ReferenceDateForm from "@/components/reference-date-form";
import { useBirthYearCalculator } from "@/hooks/use-birth-year-calculator";

export default function BirthYearTab() {
  const {
    referenceDate,
    setReferenceDate,
    age,
    setAge,
    ageType,
    setAgeType,
    birthYear,
  } = useBirthYearCalculator();

  return (
    <div className="space-y-4">
      {/* 결과 섹션 */}
      <BirthYearResult birthYear={birthYear} referenceDate={referenceDate} />

      {/* 나이와 기준일 */}
      <div className="space-y-4 rounded-sm bg-stone-100 p-4">
        <BirthYearForm
          age={age}
          setAge={setAge}
          ageType={ageType}
          setAgeType={setAgeType}
        />
        <ReferenceDateForm
          referenceDate={referenceDate}
          setReferenceDate={setReferenceDate}
        />
      </div>
    </div>
  );
}
