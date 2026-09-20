import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import { SITE_URL } from "@/lib/site";
import { layoutMetadata } from "@/lib/metadata";
import { layouts } from "@/lib/layouts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...layoutMetadata("qwerty"),
  metadataBase: SITE_URL,
  applicationName: "Keyboard Layout",
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('keyboard-layout-theme')==='dark'){document.documentElement.classList.add('dark')}}catch{}` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": new URL("#website", SITE_URL).href,
                  "name": "Keyboard Layout",
                  "url": SITE_URL.href,
                  "description": layouts.qwerty.description,
                  "inLanguage": "en"
                },
                {
                  "@type": "WebApplication",
                  "@id": new URL("#app", SITE_URL).href,
                  "name": "Keyboard Layout Simulator",
                  "url": SITE_URL.href,
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Any",
                  "browserRequirements": "Requires JavaScript. Supports physical keyboards and on-screen touch typing.",
                  "isAccessibleForFree": true,
                  "description": layouts.qwerty.description,
                  "image": new URL("opengraph-image.png", SITE_URL).href,
                  "inLanguage": "en",
                  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                  "isPartOf": { "@id": new URL("#website", SITE_URL).href }
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
