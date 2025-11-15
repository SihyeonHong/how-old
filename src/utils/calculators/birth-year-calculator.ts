import type { DateValue } from "@/types/date";

export type AgeType = "man" | "korean";

export type CalculatedBirthYear = number | { min: number; max: number } | null;

/**
 * 나이와 기준일을 받아 출생년도를 계산합니다.
 * @param referenceDate 기준 날짜
 * @param age 나이
 * @param ageType 나이 타입 ("man" | "korean")
 * @returns 출생년도 또는 출생년도 범위. 유효하지 않은 경우 null 반환
 *
 * 만 나이의 경우:
 * - 생일 정보가 없으면 출생년도 범위를 반환합니다.
 *   예: 기준일이 생일 전이면 (기준연도 - 나이 - 1)년생,
 *       기준일이 생일 후면 (기준연도 - 나이)년생이 될 수 있으므로
 *       두 연도 모두 가능한 범위로 반환합니다.
 */
export default function birthYearCalculator(
  referenceDate: DateValue,
  age: number,
  ageType: AgeType,
): CalculatedBirthYear {
  if (age < 0 || !Number.isInteger(age)) {
    return null;
  }

  if (ageType === "korean") {
    // 한국 나이: (기준 연도 - 출생 연도) + 1 = 나이
    // 출생 연도 = 기준 연도 - 나이 + 1
    const birthYear = referenceDate.year - age + 1;
    return birthYear > 0 ? birthYear : null;
  } else {
    // 만 나이 계산
    // 만 나이는 생일이 지났는지 여부에 따라 출생년도가 달라집니다.
    //
    // 예시: 기준일이 2024년 1월 1일이고 만 나이가 20세인 경우
    // - 생일이 기준일(2024-01-01) 이전이면: 생일이 이미 지났으므로 2004년생
    //   (2024 - 20 = 2004)
    // - 생일이 기준일(2024-01-01) 이후이면: 생일이 아직 안 지났으므로 2003년생
    //   (2024 - 20 - 1 = 2003)
    //
    // 공식:
    // - 생일이 기준일 이전(이미 지남): 출생 연도 = 기준 연도 - 나이
    // - 생일이 기준일 이후(아직 안 지남): 출생 연도 = 기준 연도 - 나이 - 1
    //
    // 생일 정보가 없으면 두 경우 모두 가능하므로 범위를 반환합니다.
    // minYear: 생일이 기준일 이후인 경우의 출생년도 (기준연도 - 나이 - 1)
    // maxYear: 생일이 기준일 이전인 경우의 출생년도 (기준연도 - 나이)
    const minYear = referenceDate.year - age - 1;
    const maxYear = referenceDate.year - age;

    if (minYear <= 0 && maxYear <= 0) {
      return null;
    }

    // minYear이 0 이하인 경우 (0년생은 존재하지 않으므로) maxYear만 반환
    if (minYear <= 0) {
      return maxYear;
    }

    // 생일 정보가 없으면 항상 범위 반환
    return { min: minYear, max: maxYear };
  }
}
