import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { getPillar } from "@/content/pillars";

const pillar = getPillar("shiksha")!;

export const metadata: Metadata = {
  title: `${pillar.nameEn} (${pillar.nameHi})`,
  description: pillar.summaryEn,
};

export default function Page() {
  return <PillarPage slug="shiksha" />;
}
