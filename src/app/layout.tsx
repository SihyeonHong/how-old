import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "몇살이지",
  description: "한국 나이 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
