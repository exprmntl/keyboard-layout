import type { Metadata } from "next";
import { layouts, type LayoutName } from "./layouts";
import { SITE_URL } from "./site";

const socialImage = {
  width: 1200,
  height: 630,
  alt: "Try a different way to type. QWERTY, Dvorak and Colemak, illustrated with ivory, charcoal and orange Q, D and C keycaps.",
};

export function layoutMetadata(layout: LayoutName): Metadata {
  const { title, description, path } = layouts[layout];
  return contentMetadata({ title, description, path });
}

export function contentMetadata(
  { title, description, path }: { title: string; description: string; path: string },
  type: "website" | "article" = "website",
): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: "Keyboard Layout",
      title,
      description,
      url,
      locale: "en_US",
      // Page-level Open Graph metadata replaces the parent's image metadata.
      images: [{ ...socialImage, url: new URL("opengraph-image.png?v=2", SITE_URL).href }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ ...socialImage, url: new URL("twitter-image.png?v=2", SITE_URL).href }],
    },
  };
}
