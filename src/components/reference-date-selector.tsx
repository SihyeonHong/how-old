import React from "react";

import Input from "@/components/common/input";
import type { DateValue } from "@/types/date";

interface ReferenceDateSelectorProps {
  referenceDate: DateValue;
  setReferenceDate: (date: DateValue) => void;
}

export default function ReferenceDateSelector({
  referenceDate,
  setReferenceDate,
}: ReferenceDateSelectorProps) {
  const { year, month, day } = referenceDate;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReferenceDate({ ...referenceDate, [name]: value });
  };

  return (
    <section className="">
      <h1 className="text-xl font-semibold">오늘</h1>
      <p>{`${year}-${month}-${day}`}</p>
      <Input
        type="date"
        value={`${year}-${month}-${day}`}
        onChange={handleChange}
      />
    </section>
  );
}
