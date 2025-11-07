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
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">생년월일</h1>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1">
            <Input
              id="year"
              type="number"
              placeholder="2000"
              value={birthDate.year}
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
              value={birthDate.month}
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
              value={birthDate.day}
              onChange={handleDayChange}
              size={2}
              max={31}
              min={1}
            />
            <span>일</span>
          </label>
        </div>
      </div>
    </form>
  );
}
