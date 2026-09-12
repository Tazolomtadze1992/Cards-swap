import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ბავშვთა ციფრული უსაფრთხოების ჰაბი",
  description:
    "ისწავლე ონლაინ უსაფრთხოება, ივარჯიშე რეალურ სიტუაციებში და იპოვე სანდო დახმარება.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
