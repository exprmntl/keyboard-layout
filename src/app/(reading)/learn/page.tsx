import Link from "next/link";
import { articles, guidesIndex } from "@/content/catalog";
import { contentMetadata } from "@/lib/metadata";

export const metadata = contentMetadata(guidesIndex);

export default function GuidesPage() {
  return (
    <div className="guides-index">
      <header className="guide-heading">
        <p className="guide-eyebrow">Learn &amp; explore</p>
        <h1>Keyboard Layout Guides</h1>
        <p className="guide-deck">Find your layout, learn its symbols, fix unexpected input, or start practicing something new.</p>
      </header>
      <div className="guide-list">
        {Object.entries(articles).map(([id, article]) => (
          <Link className="guide-card" href={article.path} key={id}>
            <span className="guide-eyebrow">{article.category}</span>
            <h2>{article.title}<span aria-hidden="true"> →</span></h2>
            <p>{article.summary}</p>
          </Link>
        ))}
      </div>
      <p className="guide-index-note">Ready to try one? <Link href="/">Open the simulator</Link> and start typing.</p>
      <p className="guide-index-note">Not sure which layout is active? <Link href="/keyboard-layout-detector">Check your keyboard layout</Link>.</p>
    </div>
  );
}
