import React from "react";

import Input from "@/components/common/input";

import Badge from "./common/badge";

interface DateStringValue {
  year: string;
  month: string;
  day: string;
}

interface ReferenceDateFormProps {
  referenceDate: DateStringValue;
  setReferenceDate: (date: DateStringValue) => void;
}

export default function ReferenceDateForm({
  referenceDate,
  setReferenceDate,
}: ReferenceDateFormProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, year: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, month: e.target.value });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, day: e.target.value });
  };

  // 오늘 날짜와 비교하는 함수
  const isToday = (): boolean => {
    const today = new Date();
    const todayYear = today.getFullYear().toString();
    const todayMonth = (today.getMonth() + 1).toString();
    const todayDay = today.getDate().toString();

    return (
      referenceDate.year === todayYear &&
      referenceDate.month === todayMonth &&
      referenceDate.day === todayDay
    );
  };

  return (
    <form className="space-y-2">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">기준일</h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1">
            <Input
              id="year"
              type="number"
              placeholder="2000"
              value={referenceDate.year}
              onChange={handleYearChange}
              size={4}
              required
            />
            <span>년</span>
          </label>
          <label className="flex items-center gap-1">
            <Input
              id="month"
              type="number"
              placeholder="1"
              value={referenceDate.month}
              onChange={handleMonthChange}
              size={2}
              max={12}
              min={1}
            />
            <span>월</span>
          </label>
          <label className="flex items-center gap-1">
            <Input
              id="day"
              type="number"
              placeholder="1"
              value={referenceDate.day}
              onChange={handleDayChange}
              size={2}
              max={31}
              min={1}
            />
            <span>일</span>
          </label>
          {isToday() && <Badge variant="accent">오늘</Badge>}
        </div>
      </div>
    </form>
  );
}
