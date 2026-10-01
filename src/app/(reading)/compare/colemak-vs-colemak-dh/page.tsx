import Article from "@/components/guides/Article";
import { articles } from "@/content/catalog";
import comparison from "@/content/colemak-vs-colemak-dh";
import { contentMetadata } from "@/lib/metadata";

export const metadata = contentMetadata(articles["colemak-vs-colemak-dh"], "article");

export default function ColemakComparisonPage() {
  return <Article id="colemak-vs-colemak-dh" content={comparison} />;
}
