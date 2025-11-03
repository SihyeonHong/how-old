import type { DateValue } from "@/types/date";

/**
 * referenceDate와 birthDate를 받아 만 나이를 계산합니다.
 * year는 필수이며, month와 day는 선택적입니다.
 * @param referenceDate 기준 날짜
 * @param birthDate 생년월일
 * @returns 만 나이 계산 결과 문자열. year가 없으면 null 반환
 */
export function AgeCalculator(
  referenceDate: DateValue,
  birthDate: DateValue,
): string | null {
  // year는 필수이므로 둘 중 하나라도 없으면 early return
  if (referenceDate.year === null || birthDate.year === null) {
    return null;
  }

  const refYear = referenceDate.year;
  const refMonth = referenceDate.month;
  const refDay = referenceDate.day;
  const birthYear = birthDate.year;
  const birthMonth = birthDate.month;
  const birthDay = birthDate.day;

  // month와 day가 모두 있는 경우 정확한 날짜로 계산
  if (
    refMonth !== null &&
    refDay !== null &&
    birthMonth !== null &&
    birthDay !== null
  ) {
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

    // 결과 문자열 생성
    const yearText = years > 0 ? `${years}년 ` : "";
    const monthText = months > 0 ? `${months}월 ` : "";
    const dayText = days > 0 ? `${days}일 ` : "";

    if (yearText || monthText || dayText) {
      return `태어난 지 만으로 ${yearText}${monthText}${dayText}지났다`.trim();
    }

    return "태어난 지 만으로 0일 지났다";
  }

  // month나 day가 없는 경우 연도만으로 계산
  const age = refYear - birthYear;

  if (age < 0) {
    return null;
  }

  return `태어난 지 만으로 ${age}년 지났다`;
}
