import React from "react";

import Input from "@/components/common/input";
import type { AgeType } from "@/utils/calculators/birth-year-calculator";

interface BirthYearFormProps {
  age: string;
  setAge: (age: string) => void;
  ageType: AgeType;
  setAgeType: (ageType: AgeType) => void;
}

export default function BirthYearForm({
  age,
  setAge,
  ageType,
  setAgeType,
}: BirthYearFormProps) {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleAgeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeType(e.target.value as AgeType);
  };

  return (
    <div className="space-y-4">
      <form className="space-y-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <h1 className="text-xl font-semibold">나이</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="age-input" className="flex items-center gap-1">
              <Input
                id="age-input"
                type="number"
                value={age}
                onChange={handleAgeChange}
                size={3}
                min={0}
                required
                aria-label="나이"
              />
              <span>세</span>
            </label>
          </div>
        </div>
      </form>

      <form className="space-y-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <h1 className="text-xl font-semibold">나이 기준</h1>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name="age-type"
                value="man"
                checked={ageType === "man"}
                onChange={handleAgeTypeChange}
                className="h-4 w-4 cursor-pointer"
              />
              <span>만 나이</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name="age-type"
                value="korean"
                checked={ageType === "korean"}
                onChange={handleAgeTypeChange}
                className="h-4 w-4 cursor-pointer"
              />
              <span>한국 나이</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
