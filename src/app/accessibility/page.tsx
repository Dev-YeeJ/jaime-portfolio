import type { Metadata } from "next";
import { accessibility } from "@/lib/legal";
import { LegalPage } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: accessibility.description,
};

export default function AccessibilityPage() {
  return <LegalPage document={accessibility} />;
}
