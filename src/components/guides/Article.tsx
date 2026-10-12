import Link from "next/link";
import type { ReactNode } from "react";
import { articles, type ArticleId } from "@/content/catalog";
import type { Source } from "@/content/sources";
import { SITE_URL } from "@/lib/site";

export type ArticleSection = { id: string; title: string; body: ReactNode };
export type ArticleContent = { introduction: ReactNode; sections: ArticleSection[]; related?: ArticleId[] };

export function Cite({ n, source }: { n: number; source: Source }) {
  return <sup className="citation"><a href={source.url} aria-label={`Source ${n}: ${source.title}`} title={source.title}>[{n}]</a></sup>;
}

export default function Article({ id, content }: { id: ArticleId; content: ArticleContent }) {
  const article = articles[id];
  return (
    <article className="guide-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: new URL(article.path, SITE_URL).href,
        inLanguage: "en",
        author: { "@type": "Organization", name: "Experimental Software", url: "https://experimental.software/" },
        publisher: { "@type": "Organization", name: "Keyboard Layout", url: SITE_URL.href },
      }) }} />
      <header className="guide-heading">
        <p className="guide-eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="guide-deck">{article.summary}</p>
      </header>
      <details className="guide-contents">
        <summary>On this page</summary>
        <nav aria-label="Article contents">
          <ol>{content.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
        </nav>
      </details>
      <div className="guide-prose">
        {content.introduction}
        {content.sections.map(section => (
          <section id={section.id} key={section.id}>
            <h2><a href={`#${section.id}`}>{section.title}</a></h2>
            {section.body}
          </section>
        ))}
      </div>
      <aside className="guide-related" aria-label="More keyboard layout guides">
        <h2>Keep exploring</h2>
        {(content.related ?? (Object.keys(articles) as ArticleId[]).filter(key => key !== id).slice(0, 3)).map(key => <Link key={key} href={articles[key].path}>{articles[key].title}</Link>)}
      </aside>
    </article>
  );
}
