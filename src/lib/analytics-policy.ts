export const INTERNAL_STORAGE_KEY = "keyboard-analytics-internal-v1";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function getAnalyticsContext(url: URL, storage?: StorageLike) {
  const mode = url.searchParams.get("analytics");
  let internal = mode === "internal" || mode === "debug";
  try {
    if (mode === "external") storage?.removeItem(INTERNAL_STORAGE_KEY);
    else if (internal) storage?.setItem(INTERNAL_STORAGE_KEY, "1");
    internal ||= storage?.getItem(INTERNAL_STORAGE_KEY) === "1";
  } catch {
    // Private browsing / blocked storage must not prevent using the tester.
  }
  const testId = url.searchParams.get("analytics_test");
  return {
    is_internal: internal,
    debug: mode === "debug",
    verification_id: internal && testId && /^[a-zA-Z0-9_-]{1,64}$/.test(testId) ? testId : undefined,
  };
}

export function cleanAnalyticsUrl(url: URL) {
  const clean = new URL(url);
  clean.searchParams.delete("analytics");
  clean.searchParams.delete("analytics_test");
  return clean.href;
}
