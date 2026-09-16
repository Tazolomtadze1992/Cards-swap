import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ბავშვთა ციფრული უსაფრთხოების ჰაბი",
  description:
    "ისწავლე ონლაინ უსაფრთხოება, ივარჯიშე რეალურ სიტუაციებში და იპოვე სანდო დახმარება.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
