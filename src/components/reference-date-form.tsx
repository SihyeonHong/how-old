import React, { useState, useEffect } from "react";

import Input from "@/components/common/input";
import { cn } from "@/utils/classname";

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
  const [useToday, setUseToday] = useState(true);

  // 오늘 날짜를 가져오는 함수
  const getTodayDate = (): DateStringValue => {
    const today = new Date();
    return {
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day: today.getDate().toString(),
    };
  };

  // 체크박스가 체크되면 오늘 날짜로 설정
  useEffect(() => {
    if (useToday) {
      setReferenceDate(getTodayDate());
    }
  }, [useToday, setReferenceDate]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, year: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, month: e.target.value });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate({ ...referenceDate, day: e.target.value });
  };

  const handleTodayCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUseToday(e.target.checked);
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
              disabled={useToday}
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
              disabled={useToday}
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
              disabled={useToday}
            />
            <span>일</span>
          </label>
          <label className="mt-1 ml-1 flex cursor-pointer items-center gap-1 hover:font-semibold">
            <input
              type="checkbox"
              checked={useToday}
              onChange={handleTodayCheckboxChange}
              className="h-4 w-4 cursor-pointer"
            />
            <span className={cn("mb-0.5", useToday ? "font-semibold" : "")}>
              오늘
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}
