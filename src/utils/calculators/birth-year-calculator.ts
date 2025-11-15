import type { DateValue } from "@/types/date";

export type AgeType = "man" | "korean";

/**
 * 나이와 기준일을 받아 출생년도를 계산합니다.
 * @param referenceDate 기준 날짜
 * @param age 나이
 * @param ageType 나이 타입 ("man" | "korean")
 * @returns 출생년도. 유효하지 않은 경우 null 반환
 */
export default function birthYearCalculator(
  referenceDate: DateValue,
  age: number,
  ageType: AgeType,
): number | null {
  if (age < 0 || !Number.isInteger(age)) {
    return null;
  }

  if (ageType === "korean") {
    // 한국 나이: (기준 연도 - 출생 연도) + 1 = 나이
    // 출생 연도 = 기준 연도 - 나이 + 1
    const birthYear = referenceDate.year - age + 1;
    return birthYear > 0 ? birthYear : null;
  } else {
    // 만 나이: 기준 연도 - 출생 연도 = 나이 (정확한 날짜 고려)
    // 출생 연도 = 기준 연도 - 나이
    // 단, 생일이 지나지 않았으면 -1 해야 함
    // 하지만 여기서는 연도만 계산하므로 기준 연도 - 나이로 계산
    const birthYear = referenceDate.year - age;
    return birthYear > 0 ? birthYear : null;
  }
}
