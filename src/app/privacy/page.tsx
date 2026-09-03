import type { Metadata } from "next";
import { privacy } from "@/lib/legal";
import { LegalPage } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: privacy.description,
};

export default function PrivacyPage() {
  return <LegalPage document={privacy} />;
}
