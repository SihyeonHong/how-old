import type { InputHTMLAttributes } from "react";

import { cn } from "@/utils/classname";

export default function Input({
  className,
  style,
  placeholder,
  value,
  size,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  // placeholder나 value 길이에 맞춰 너비 계산 (ch 단위 사용)
  const contentLength = Math.max(
    placeholder?.length ?? 0,
    typeof value === "string" || typeof value === "number"
      ? String(value).length
      : 0,
    2, // 최소 2자리
  );

  // size가 지정되었으면 size 사용, 아니면 계산된 길이 사용
  const inputSize = size ?? contentLength;

  // ch 단위로 너비 계산 (padding p-2 양쪽 고려하여 충분한 여유 추가)
  // style.width가 이미 지정되어 있으면 그것을 우선 사용, 없으면 계산값 사용
  const finalStyle =
    style?.width !== undefined
      ? style
      : { ...style, width: `${inputSize + 4}ch` };

  return (
    <input
      className={cn(
        "min-w-0 rounded-sm border border-stone-300 p-2",
        className,
      )}
      style={finalStyle}
      placeholder={placeholder}
      value={value}
      size={size}
      {...rest}
    />
  );
}
