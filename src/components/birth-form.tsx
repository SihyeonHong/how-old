import React from "react";

import Input from "@/components/common/input";

interface DateStringValue {
  year: string;
  month: string;
  day: string;
}

interface BirthFormProps {
  birthDate: DateStringValue;
  setBirthDate: (date: DateStringValue) => void;
}

export default function BirthForm({ birthDate, setBirthDate }: BirthFormProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate({ ...birthDate, year: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate({ ...birthDate, month: e.target.value });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate({ ...birthDate, day: e.target.value });
  };

  return (
    <form className="space-y-2">
      <div className="flex w-full flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold whitespace-nowrap">생년월일</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="birth-year" className="flex items-center gap-1">
            <Input
              id="birth-year"
              type="number"
              value={birthDate.year}
              onChange={handleYearChange}
              size={4}
              required
              aria-label="생년월일 연도"
            />
            <span>년</span>
          </label>
          <label htmlFor="birth-month" className="flex items-center gap-1">
            <Input
              id="birth-month"
              type="number"
              value={birthDate.month}
              onChange={handleMonthChange}
              size={2}
              max={12}
              min={1}
              aria-label="생년월일 월"
            />
            <span>월</span>
          </label>
          <label htmlFor="birth-day" className="flex items-center gap-1">
            <Input
              id="birth-day"
              type="number"
              value={birthDate.day}
              onChange={handleDayChange}
              size={2}
              max={31}
              min={1}
              aria-label="생년월일 일"
            />
            <span>일</span>
          </label>
        </div>
      </div>
    </form>
  );
}
