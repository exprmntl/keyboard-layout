import type { ReactNode } from "react";
import type { Viewport } from "next";
import KeyboardTester from "@/components/KeyboardTester";

export const viewport: Viewport = { viewportFit: "cover" };

export default function TesterLayout({ children }: { children: ReactNode }) {
  return <KeyboardTester>{children}</KeyboardTester>;
}
