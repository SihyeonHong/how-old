import type { DateValue } from "@/types/date";

/**
 * referenceDate와 birthDate를 받아 만 나이를 계산합니다.
 * year, month, day는 모두 필수 필드입니다.
 * - month와 day가 모두 0이 아니면 정확한 날짜로 계산합니다.
 * - month는 0이 아니지만 day가 0이면 연도와 월만 계산하고 일은 0으로 반환합니다.
 * - month도 0이면 연도만 계산하고 월과 일은 0으로 반환합니다.
 * @param referenceDate 기준 날짜
 * @param birthDate 생년월일
 * @returns 만 나이 계산 결과 객체 { year, month, day }. 기준일이 생년월일보다 이전이면 null 반환
 */
export default function ageCalculator(
  referenceDate: DateValue,
  birthDate: DateValue,
): DateValue | null {
  const refYear = referenceDate.year;
  const refMonth = referenceDate.month;
  const refDay = referenceDate.day;
  const birthYear = birthDate.year;
  const birthMonth = birthDate.month;
  const birthDay = birthDate.day;

  // month와 day가 모두 0이 아닌 경우 정확한 날짜로 계산
  if (refMonth !== 0 && refDay !== 0 && birthMonth !== 0 && birthDay !== 0) {
    const refDate = new Date(refYear, refMonth - 1, refDay);
    const birthDateObj = new Date(birthYear, birthMonth - 1, birthDay);

    // 날짜 차이 계산
    const diffTime = refDate.getTime() - birthDateObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // 기준일이 생년월일보다 이전인 경우
      return null;
    }

    // 연도, 월, 일 차이 계산
    let years = refYear - birthYear;
    let months = refMonth - birthMonth;
    let days = refDay - birthDay;

    // 일자가 음수이면 이전 달에서 빌려옴
    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(refYear, refMonth - 1, 0).getDate();
      days += prevMonthLastDay;
    }

    // 월이 음수이면 이전 해에서 빌려옴
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years < 0) {
      return null;
    }

    return {
      year: years,
      month: months,
      day: days,
    };
  }

  // month는 있지만 day가 0인 경우 연도와 월만 계산
  if (refMonth !== 0 && birthMonth !== 0) {
    let years = refYear - birthYear;
    let months = refMonth - birthMonth;

    // 월이 음수이면 이전 해에서 빌려옴
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years < 0) {
      return null;
    }

    return {
      year: years,
      month: months,
      day: 0,
    };
  }

  // month도 0인 경우 연도만으로 계산
  const age = refYear - birthYear;

  if (age < 0) {
    return null;
  }

  return {
    year: age,
    month: 0,
    day: 0,
  };
}
