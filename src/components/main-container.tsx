import BirthForm from "@/components/birth-form";
import HiddenItemsSection from "@/components/hidden-items-section";
import ReferenceDateForm from "@/components/reference-date-form";
import ResultSection from "@/components/result-section";
import { useCalculator } from "@/hooks/use-calculator";

export default function MainContainer() {
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
    <main className="mx-auto w-full max-w-lg space-y-4 bg-white p-8 sm:rounded-sm sm:shadow-md">
      {/* 결과 섹션 */}
      <ResultSection
        ageResult={ageResult}
        kAgeResult={kAgeResult}
        applyQuick={applyQuick}
        onApplyQuickChange={setApplyQuick}
        isQuickDisabled={isQuickDisabled}
        visibleStates={visibleStates}
        onHide={handleHide}
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
    </main>
  );
}
