interface BirthYearResultProps {
  birthYear: number | null;
}

export default function BirthYearResult({ birthYear }: BirthYearResultProps) {
  return (
    <section className="rounded-sm bg-stone-100 p-4">
      <h1 className="text-xl font-semibold">몇 년생이지?</h1>
      {birthYear !== null ? (
        <div className="mt-4">
          <div className="rounded-sm bg-white p-4 text-center">
            <p className="text-2xl font-semibold">{birthYear}년생</p>
          </div>
        </div>
      ) : (
        <p className="mt-4">나이를 입력하면 출생년도가 표시됩니다.</p>
      )}
    </section>
  );
}
