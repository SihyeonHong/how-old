import { useMemo, useState } from "react";

import type { DateStringValue, DateValue } from "@/types/date";
import ageCalculator from "@/utils/calculators/age-calculator";
import kAgeCalculator from "@/utils/calculators/k-age-calculator";

export function useCalculator() {
  const today = new Date();
  const [referenceDate, setReferenceDate] = useState<DateStringValue>({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });
  const [birthDate, setBirthDate] = useState<DateStringValue>({
    year: "2000",
    month: "",
    day: "",
  });
  const [applyQuick, setApplyQuick] = useState(false);
  const [visibleStates, setVisibleStates] = useState<Record<string, boolean>>({
    "man-age": true,
    "korean-age": true,
  });

  // birthDate를 업데이트하는 함수 (month가 비면 빠른년생 체크 해제)
  const handleBirthDateChange = (date: DateStringValue) => {
    setBirthDate(date);
    // month가 비면 빠른년생 체크 해제
    if (!date.month || date.month.trim() === "") {
      setApplyQuick(false);
    }
  };

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
      return kAgeCalculator(refDateValue, birthDateValue, applyQuick);
    }

    return null;
  }, [referenceDate, birthDate, applyQuick]);

  // rows 생성 로직 (공유)
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

  const rows = useMemo(
    () => [
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
    ],
    [ageResult, kAgeResult],
  );

  const hiddenRows = rows.filter(
    (row) => row.isVisible && visibleStates[row.id] === false,
  );

  const handleHide = (id: string) => {
    setVisibleStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleShow = (id: string) => {
    setVisibleStates((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const isQuickDisabled = !birthDate.month || birthDate.month.trim() === "";

  return {
    // 상태 값들
    referenceDate,
    birthDate,
    applyQuick,
    visibleStates,
    // 상태 변경 함수들
    setReferenceDate,
    handleBirthDateChange,
    setApplyQuick,
    handleHide,
    handleShow,
    // 계산 결과
    ageResult,
    kAgeResult,
    rows,
    hiddenRows,
    // 유틸리티
    isQuickDisabled,
  };
}
