import type { DateValue } from "@/types/date";

/**
 * 기준 날짜와 생년월일을 받아 한국 나이를 계산합니다.
 * 한국 나이는 연도 기준으로 계산되며, (기준 연도 - 출생 연도) + 1 공식을 사용합니다.
 * @param referenceDate 기준 날짜
 * @param birthDate 생년월일
 * @param applyQuick 빠른년생 적용 여부 (기본값: false)
 * @returns 한국 나이
 */
export default function kAgeCalculator(
  referenceDate: DateValue,
  birthDate: DateValue,
  applyQuick: boolean = false,
): number {
  const koreanAge = referenceDate.year - birthDate.year + 1;

  // 빠른년생 적용이 true면 isQuickAge 결과를 더함
  if (applyQuick) {
    return koreanAge + isQuickAge(birthDate);
  }

  return koreanAge;
}

/**
 * 생년월일을 받아 빠른년생 여부를 판단합니다.
 * month가 1월 또는 2월이면 빠른년생(1)을 반환하고, 아니면 0을 반환합니다.
 * @param birthDate 생년월일
 * @returns 빠른년생이면 1, 아니면 0
 */
function isQuickAge(birthDate: DateValue): number {
  // month가 1월 또는 2월이면 빠른년생
  if (birthDate.month === 1 || birthDate.month === 2) {
    return 1;
  }
  return 0;
}
