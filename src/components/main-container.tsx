import BirthForm from "@/components/birth-form";
import ReferenceDateSelector from "@/components/reference-date-selector";
import ResultSection from "@/components/result-section";

export default function MainContainer() {
  return (
    <main className="mx-auto w-full max-w-lg space-y-4 bg-white p-8 sm:rounded-sm sm:shadow-md">
      <ReferenceDateSelector />
      <BirthForm />
      <ResultSection />
    </main>
  );
}
