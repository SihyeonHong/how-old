export interface DateValue {
  year: number;
  month: number; // 없을 때 0으로 처리
  day: number; // 없을 때 0으로 처리
}

export interface DateStringValue {
  year: string;
  month: string;
  day: string;
}
