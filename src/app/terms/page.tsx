import type { Metadata } from "next";
import { terms } from "@/lib/legal";
import { LegalPage } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Terms of use",
  description: terms.description,
};

export default function TermsPage() {
  return <LegalPage document={terms} />;
}
