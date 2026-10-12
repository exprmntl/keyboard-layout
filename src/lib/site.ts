// Metadata, sitemap and analytics share the canonical production host.
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://keyboardlayout.app/"
);

export function isProductionHost(hostname: string, environment: string) {
  return environment === "production" && hostname === SITE_URL.hostname;
}
