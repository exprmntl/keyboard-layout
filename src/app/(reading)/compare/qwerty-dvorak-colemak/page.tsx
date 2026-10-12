import Article from "@/components/guides/Article";
import { articles } from "@/content/catalog";
import comparison from "@/content/comparison";
import { contentMetadata } from "@/lib/metadata";

export const metadata = contentMetadata(articles.comparison, "article");

export default function ComparisonPage() {
  return <Article id="comparison" content={comparison} />;
}
