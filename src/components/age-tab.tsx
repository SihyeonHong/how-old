import BirthForm from "@/components/birth-form";
import HiddenItemsSection from "@/components/hidden-items-section";
import ReferenceDateForm from "@/components/reference-date-form";
import ResultSection from "@/components/result-section";
import { useCalculator } from "@/hooks/use-calculator";

interface AgeTabProps {
  onAddToMemo: (text: string) => void;
}

export default function AgeTab({ onAddToMemo }: AgeTabProps) {
  const {
    referenceDate,
    birthDate,
    applyQuick,
    visibleStates,
    setReferenceDate,
    handleBirthDateChange,
    setApplyQuick,
    handleHide,
    handleShow,
    ageResult,
    kAgeResult,
    hiddenRows,
    isQuickDisabled,
  } = useCalculator();

  return (
    <div className="space-y-4">
      {/* 결과 섹션 */}
      <ResultSection
        ageResult={ageResult}
        kAgeResult={kAgeResult}
        applyQuick={applyQuick}
        onApplyQuickChange={setApplyQuick}
        isQuickDisabled={isQuickDisabled}
        visibleStates={visibleStates}
        onHide={handleHide}
        birthDate={birthDate}
        referenceDate={referenceDate}
        onAddToMemo={onAddToMemo}
      />

      {/* 생년월일과 기준일 */}
      <div className="space-y-4 rounded-sm bg-stone-100 p-4">
        <BirthForm birthDate={birthDate} setBirthDate={handleBirthDateChange} />
        <ReferenceDateForm
          referenceDate={referenceDate}
          setReferenceDate={setReferenceDate}
        />
      </div>

      {/* 숨겨진 항목 섹션 */}
      <HiddenItemsSection hiddenRows={hiddenRows} onShow={handleShow} />
    </div>
  );
}
