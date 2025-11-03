import { useState } from "react";

import BirthForm from "@/components/birth-form";
import ReferenceDateSelector from "@/components/reference-date-selector";
import ResultSection from "@/components/result-section";
import type { DateValue } from "@/types/date";

export default function MainContainer() {
  const today = new Date();
  const [referenceDate, setReferenceDate] = useState<DateValue>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });
  const [birthDate, setBirthDate] = useState<DateValue>({
    year: null,
    month: null,
    day: null,
  });

  return (
    <main className="mx-auto w-full max-w-lg space-y-4 bg-white p-8 sm:rounded-sm sm:shadow-md">
      <ReferenceDateSelector
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />
      <BirthForm birthDate={birthDate} setBirthDate={setBirthDate} />
      <ResultSection birthDate={birthDate} referenceDate={referenceDate} />
    </main>
  );
}
