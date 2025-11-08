import { useMemo, useState } from "react";

import BirthForm from "@/components/birth-form";
import ReferenceDateForm from "@/components/reference-date-form";
import ResultSection from "@/components/result-section";
import type { DateValue } from "@/types/date";
import ageCalculator from "@/utils/calculators/age-calculator";
import kAgeCalculator from "@/utils/calculators/k-age-calculator";

interface DateStringValue {
  year: string;
  month: string;
  day: string;
}

export default function MainContainer() {
  const today = new Date();
  const [referenceDate, setReferenceDate] = useState<DateStringValue>({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });
  const [birthDate, setBirthDate] = useState<DateStringValue>({
    year: "",
    month: "",
    day: "",
  });

  // string을 DateValue로 변환하는 헬퍼 함수
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

  // 두 날짜가 모두 유효한 DateValue일 때만 계산
  const ageResult = useMemo(() => {
    const refDateValue = stringToDateValue(referenceDate);
    const birthDateValue = stringToDateValue(birthDate);

    if (!refDateValue || !birthDateValue) {
      return null;
    }

    return ageCalculator(refDateValue, birthDateValue);
  }, [referenceDate, birthDate]);

  // 두 날짜에 모두 year가 존재할 때만 한국 나이 계산
  const kAgeResult = useMemo(() => {
    const refDateValue = stringToDateValue(referenceDate);
    const birthDateValue = stringToDateValue(birthDate);

    if (!refDateValue || !birthDateValue) {
      return null;
    }

    // year가 존재하는지 확인
    if (refDateValue.year > 0 && birthDateValue.year > 0) {
      return kAgeCalculator(refDateValue, birthDateValue, false);
    }

    return null;
  }, [referenceDate, birthDate]);

  return (
    <main className="mx-auto w-full max-w-lg space-y-4 bg-white p-8 sm:rounded-sm sm:shadow-md">
      <BirthForm birthDate={birthDate} setBirthDate={setBirthDate} />
      <ReferenceDateForm
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />
      <ResultSection ageResult={ageResult} kAgeResult={kAgeResult} />
    </main>
  );
}
