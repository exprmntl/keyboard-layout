import type { LayoutName, TrackEvent } from "./analytics-events";

export const ENGAGED_MS = 30_000;
export const MAX_TYPING_GAP_MS = 5_000;
export const NEW_PRACTICE_AFTER_MS = 30 * 60_000;

export function createPracticeId(random: Pick<Crypto, "getRandomValues"> & Partial<Pick<Crypto, "randomUUID">> = crypto) {
  // LAN previews on a phone use HTTP, where randomUUID is unavailable.
  return random.randomUUID?.() ?? Array.from(
    random.getRandomValues(new Uint8Array(16)),
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");
}

// Only timing and counts enter this tracker. Keys and typed text never do.
export function createPracticeTracker(
  initialLayout: LayoutName,
  emit: TrackEvent,
  createId: () => string
) {
  let layout = initialLayout;
  let practiceId: string | null = null;
  let lastInput: number | null = null;
  let lastActiveInput: number | null = null;
  let activeMs = 0;
  let characterCount = 0;
  let engaged = false;

  const reset = () => {
    practiceId = null;
    lastInput = null;
    lastActiveInput = null;
    activeMs = 0;
    characterCount = 0;
    engaged = false;
  };

  return {
    selectLayout(next: LayoutName) {
      if (next === layout) return;
      layout = next;
      reset();
    },
    pause() {
      lastActiveInput = null;
    },
    input(now: number) {
      if (lastInput !== null && now - lastInput >= NEW_PRACTICE_AFTER_MS) reset();
      characterCount += 1;
      if (lastActiveInput !== null) {
        const gap = now - lastActiveInput;
        // Count intervals bounded by actual input, never a timer left running.
        if (gap >= 0 && gap <= MAX_TYPING_GAP_MS) activeMs += gap;
      }
      lastInput = now;
      lastActiveInput = now;

      if (practiceId === null) {
        practiceId = createId();
        emit("practice_started", {
          layout,
          practice_id: practiceId,
          active_seconds: 0,
          character_count: characterCount,
        });
      }
      if (!engaged && activeMs >= ENGAGED_MS) {
        engaged = true;
        emit("practice_engaged", {
          layout,
          practice_id: practiceId,
          active_seconds: Math.floor(activeMs / 1000),
          character_count: characterCount,
        });
      }
    },
  };
}

export function isPracticeInput(input: {
  repeat: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  isComposing: boolean;
  code: string;
  mappedValue?: string;
}) {
  return !input.repeat && !input.metaKey && !input.ctrlKey && !input.altKey &&
    !input.isComposing && (input.code === "Space" || input.mappedValue?.length === 1);
}
