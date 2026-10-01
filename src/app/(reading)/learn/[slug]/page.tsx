import { notFound } from "next/navigation";
import Article from "@/components/guides/Article";
import { articles } from "@/content/catalog";
import dvorak from "@/content/dvorak";
import colemak from "@/content/colemak";
import history from "@/content/history";
import french from "@/content/french-keyboard-layout";
import german from "@/content/german-keyboard-layout";
import usUk from "@/content/us-vs-uk-keyboard";
import international from "@/content/us-international-keyboard";
import troubleshooting from "@/content/keyboard-typing-wrong-letters";
import charts from "@/content/keyboard-layout-charts";
import spanish from "@/content/spanish-vs-latin-american-keyboard";
import portuguese from "@/content/portuguese-vs-brazilian-keyboard";
import { contentMetadata } from "@/lib/metadata";

const guides = { dvorak, colemak, history, "french-keyboard-layout": french, "german-keyboard-layout": german, "us-vs-uk-keyboard": usUk, "us-international-keyboard": international, "keyboard-typing-wrong-letters": troubleshooting, "keyboard-layout-charts": charts, "spanish-vs-latin-american-keyboard": spanish, "portuguese-vs-brazilian-keyboard": portuguese };
type Slug = keyof typeof guides;
const isSlug = (slug: string): slug is Slug => Object.prototype.hasOwnProperty.call(guides, slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(guides).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!isSlug(params.slug)) notFound();
  return contentMetadata(articles[params.slug], "article");
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  if (!isSlug(params.slug)) notFound();
  return <Article id={params.slug} content={guides[params.slug]} />;
}
