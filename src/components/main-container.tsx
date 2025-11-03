import Button from "@/components/button";

export default function MainContainer() {
  return (
    <main className="mx-auto w-full max-w-lg bg-white p-8 sm:rounded-sm sm:shadow-md">
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>

      <Button onClick={() => alert("clicked")}>확인</Button>
    </main>
  );
}
