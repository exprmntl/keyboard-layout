export type TypingState = {
  finishedText: string;
  typedText: string;
  unfinishedText: string;
};

export type TypingKeyMap = Record<string, { value?: string; shiftValue?: string; [property: string]: unknown }>;

// Physical and touch keys use the same mapping and word-completion rules.
export function applyTypingKey(
  state: TypingState,
  code: string,
  keyMap: TypingKeyMap,
  shift = false,
  clearMistakes = false,
): TypingState {
  if (code === "Backspace") {
    let end = Math.max(0, state.typedText.length - 1);
    if (clearMistakes) {
      end = 0;
      while (end < state.typedText.length && state.typedText[end] === state.unfinishedText[end]) end++;
    }
    return { ...state, typedText: state.typedText.slice(0, end) };
  }

  const value = code === "Space" ? " " : shift ? keyMap[code]?.shiftValue : keyMap[code]?.value;
  if (!value) return state;

  if (value === " ") {
    const boundary = state.unfinishedText.indexOf(" ");
    const word = boundary < 0 ? state.unfinishedText : state.unfinishedText.slice(0, boundary);
    if (word && state.typedText === word) {
      return {
        finishedText: state.finishedText + word + " ",
        typedText: "",
        unfinishedText: boundary < 0 ? "" : state.unfinishedText.slice(boundary + 1),
      };
    }
  }
  return { ...state, typedText: state.typedText + value };
}
