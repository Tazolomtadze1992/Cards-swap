import type { ReactNode } from "react";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";

export default function PrototypeLayout({ children }: { children: ReactNode }) {
  return <PrototypeTypographyTuner>{children}</PrototypeTypographyTuner>;
}
