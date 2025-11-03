export default function ReferenceDateSelector() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <section className="">
      <h1 className="text-xl font-semibold">오늘</h1>
      {year}년 {month}월 {day}일
    </section>
  );
}
