import Button from "@/components/button";

export default function App() {
  return (
    <div>
      Hello World!
      <Button onClick={() => alert("clicked")}>Click me</Button>
    </div>
  );
}
