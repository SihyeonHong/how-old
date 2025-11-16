import { useMemo, useState } from "react";

import type { DateStringValue } from "@/types/date";
import birthYearCalculator, {
  type AgeType,
} from "@/utils/calculators/birth-year-calculator";

export function useBirthYearCalculator() {
  const today = new Date();
  const [referenceDate, setReferenceDate] = useState<DateStringValue>({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });
  const [age, setAge] = useState<string>("");
  const [ageType, setAgeType] = useState<AgeType>("man");

  // string을 DateValue로 변환하는 헬퍼 함수
  const stringToDateValue = (
    dateStr: DateStringValue,
  ): { year: number; month: number; day: number } | null => {
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

  // 출생년도 계산
  const birthYear = useMemo(() => {
    const refDateValue = stringToDateValue(referenceDate);
    const ageNumber = Number(age);

    if (!refDateValue || !age || isNaN(ageNumber)) {
      return null;
    }

    return birthYearCalculator(refDateValue, ageNumber, ageType);
  }, [referenceDate, age, ageType]);

  return {
    referenceDate,
    setReferenceDate,
    age,
    setAge,
    ageType,
    setAgeType,
    birthYear,
  };
}
