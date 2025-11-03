import React from "react";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import type { DateValue } from "@/types/date";

interface BirthFormProps {
  birthDate: DateValue;
  setBirthDate: (date: DateValue) => void;
}

export default function BirthForm({ birthDate, setBirthDate }: BirthFormProps) {
  const { year, month, day } = birthDate;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBirthDate({ year, month, day });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold">생년월일</h1>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1">
          <Input
            id="year"
            type="number"
            placeholder="2000"
            value={year ?? ""}
            onChange={(e) =>
              setBirthDate({
                ...birthDate,
                year: e.target.value === "" ? null : Number(e.target.value),
              })
            }
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
            value={month ?? ""}
            onChange={(e) =>
              setBirthDate({
                ...birthDate,
                month: e.target.value === "" ? null : Number(e.target.value),
              })
            }
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
            value={day ?? ""}
            onChange={(e) =>
              setBirthDate({
                ...birthDate,
                day: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            size={2}
            max={31}
            min={1}
          />
          <span>일</span>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            setBirthDate({ ...birthDate, year: null, month: null, day: null });
          }}
        >
          초기화
        </Button>
        <Button type="submit" variant="primary">
          확인
        </Button>
      </div>
    </form>
  );
}
