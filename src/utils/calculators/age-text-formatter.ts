import type { DateValue } from "@/types/date";

/**
 * 날짜를 "YYYY년 M월 D일" 형식으로 포맷팅합니다.
 */
function formatDate(date: DateValue): string {
  const parts: string[] = [];
  parts.push(`${date.year}년`);
  if (date.month > 0) {
    parts.push(`${date.month}월`);
  }
  if (date.day > 0) {
    parts.push(`${date.day}일`);
  }
  return parts.join(" ");
}

/**
 * 계산된 나이 결과를 받아 텍스트로 포맷팅합니다.
 * @param birthDate 생년월일
 * @param referenceDate 기준 날짜
 * @param manAgeResult 만 나이 계산 결과 (null일 수 있음)
 * @param koreanAge 한국 나이 계산 결과 (null일 수 있음)
 * @param applyQuick 빠른년생 적용 여부 (기본값: false)
 * @returns 포맷팅된 나이 텍스트
 */
export function formatAgeText(
  birthDate: DateValue,
  referenceDate: DateValue,
  manAgeResult: DateValue | null,
  koreanAge: number | null,
  applyQuick: boolean = false,
): string {
  const lines: string[] = [];

  // 생년월일과 기준일 정보
  const birthDateText = formatDate(birthDate);
  const referenceDateText = formatDate(referenceDate);
  lines.push(`${birthDateText}생 → ${referenceDateText} 기준으로`);

  // 만 나이 포맷팅
  if (manAgeResult !== null) {
    const manAgeParts: string[] = [];
    if (manAgeResult.month > 0 || manAgeResult.day > 0) {
      if (manAgeResult.month > 0) {
        manAgeParts.push(`${manAgeResult.month}개월`);
      }
      if (manAgeResult.day > 0) {
        manAgeParts.push(`${manAgeResult.day}일`);
      }
      lines.push(
        `- 만 나이: ${manAgeResult.year}세 (${manAgeParts.join(" ")})`,
      );
    } else {
      lines.push(`- 만 나이: ${manAgeResult.year}세`);
    }
  }

  // 한국 나이 포맷팅
  if (koreanAge !== null) {
    const koreanAgeText = applyQuick
      ? `${koreanAge}세 (빠른년생 적용)`
      : `${koreanAge}세`;
    lines.push(`- 한국 나이: ${koreanAgeText}`);
  }

  return lines.join("\n");
}
