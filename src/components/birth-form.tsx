import React, { useState } from "react";

import Button from "@/components/common/button";
import Input from "@/components/common/input";

export default function BirthForm() {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`${year}년 ${month}월 ${day}일`);
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
              setYear(e.target.value === "" ? null : Number(e.target.value))
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
              setMonth(e.target.value === "" ? null : Number(e.target.value))
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
              setDay(e.target.value === "" ? null : Number(e.target.value))
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
            setYear(null);
            setMonth(null);
            setDay(null);
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
