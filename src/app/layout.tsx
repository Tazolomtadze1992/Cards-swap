import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { MotionInput } from "@/components/motion/surface-motion";

export const metadata: Metadata = {
  title: "ბავშვთა ციფრული უსაფრთხოების ჰაბი",
  description:
    "ისწავლე ონლაინ უსაფრთხოება, ივარჯიშე რეალურ სიტუაციებში და იპოვე სანდო დახმარება.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka" data-scroll-behavior="smooth">
      <body><MotionInput />{children}</body>
    </html>
  );
}
