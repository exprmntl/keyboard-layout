"use client";

import { useState, useEffect, useMemo, useRef, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Keyboard from "@/components/Keyboard";
import TouchKeyboard from "@/components/TouchKeyboard";
import KeyboardOption from "@/components/KeyboardOption";
import KeyboardRecommendations from "@/components/KeyboardRecommendations";
import TypeTest from "@/components/TypeTest";
import qwertyKeyMap from "@/keyboards/qwertyKeyMap";
import dvorakKeyMap from "@/keyboards/dvorakKeyMap";
import colemakKeyMap from "@/keyboards/colemakKeyMap";
import { words } from "@/words";
import LightBulb from "@/components/Icons/LightBulb";
import ThemeToggle from "@/components/ThemeToggle";
import { track } from "@/lib/analytics";
import { layouts, layoutForPathname, type LayoutName } from "@/lib/layouts";
import { createPracticeId, createPracticeTracker, isPracticeInput } from "@/lib/practice-analytics";
import { applyTypingKey, type TypingKeyMap } from "@/lib/typing-state";

const KeyMap = {
  qwerty: qwertyKeyMap,
  dvorak: dvorakKeyMap,
  colemak: colemakKeyMap,
};

const KeyboardTester = ({ children }: { children: ReactNode }) => {
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const touchKeyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keyboard = touchKeyboardRef.current;
    if (!keyboard) return;
    // Reserve the dock's actual height, including safe-area padding and text zoom.
    const reserveKeyboardSpace = () => {
      mainRef.current?.style.setProperty("--touch-keyboard-height", `${keyboard.getBoundingClientRect().height}px`);
    };
    reserveKeyboardSpace();
    const observer = new ResizeObserver(reserveKeyboardSpace);
    observer.observe(keyboard);
    return () => observer.disconnect();
  }, []);

  // The shared route layout keeps typing state and hints mounted during navigation.
  const keyboardLayout = layoutForPathname(usePathname());
  const selectedLayout = layouts[keyboardLayout];
  const keyMap: TypingKeyMap = KeyMap[keyboardLayout];
  const previousLayout = useRef(keyboardLayout);
  const practice = useRef<ReturnType<typeof createPracticeTracker> | null>(null);
  if (!practice.current) {
    practice.current = createPracticeTracker(keyboardLayout, track, createPracticeId);
  }

  useEffect(() => {
    if (previousLayout.current !== keyboardLayout) {
      track("layout_selected", { layout: keyboardLayout, previous_layout: previousLayout.current });
      practice.current?.selectLayout(keyboardLayout);
      previousLayout.current = keyboardLayout;
    }
    appRef.current?.focus({ preventScroll: true });
  }, [keyboardLayout]);

  // Keys that are currently pressed down. For visual keyboard
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  // Store if should show hints
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    appRef.current?.focus();
    const pause = () => {
      setPressedKeys(new Set());
      practice.current?.pause();
    };
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", pause);
    return () => {
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);

  const getHintKey = () => {
    if (!showHints) {
      return undefined;
    }

    if (incorrectText.length > 0) {
      return "Backspace";
    }

    return Object.keys(keyMap).find(
      (key) =>
        keyMap[key].value === restText[0] ||
        keyMap[key].shiftValue === restText[0]
    );
  };

  // Store type test data
  const [typeTestState, setTypeTestState] = useState({
    finishedText: "", // Complete words that have been finished
    typedText: "", // The text currently being typed
    unfinishedText: "", // All text that is incomplete (including typedText)
  });
  const { correctText, incorrectText, restText } = useMemo(() => {
    const { typedText, unfinishedText } = typeTestState;

    // Find the index of the first incorrect character in typedText
    let incorrectIndex = 0;
    while (
      incorrectIndex < typedText.length &&
      incorrectIndex < unfinishedText.length &&
      typedText[incorrectIndex] === unfinishedText[incorrectIndex]
    ) {
      incorrectIndex++;
    }

    // Handle logic to display typed text correctly
    const correctText = typedText.slice(0, incorrectIndex);
    const incorrectText = typedText
      .slice(incorrectIndex)
      .replace(/ /g, "\u00A0");
    const restText = unfinishedText.slice(incorrectIndex);

    return { correctText, incorrectText, restText };
  }, [typeTestState]);

  useEffect(() => {
    // Set type test to a set of random words
    setTypeTestState({
      finishedText: "",
      typedText: "",
      unfinishedText: [...words].sort(() => 0.5 - Math.random()).join(" "),
    });
  }, []);

  useEffect(() => {
    // Add more words to type if its running low
    const { unfinishedText } = typeTestState;

    if (unfinishedText !== "" && unfinishedText.length < 500) {
      setTypeTestState((prev) => ({
        ...prev,
        unfinishedText:
          prev.unfinishedText +
          " " +
          [...words].sort(() => 0.5 - Math.random()).join(" "),
      }));
    }
  }, [typeTestState]);

  const handleTypingKey = (code: string, shifted: boolean, clearMistakes = false) => {
    setTypeTestState((prev) => applyTypingKey(prev, code, keyMap, shifted, clearMistakes));
  };

  // Handle new line
  const handleNewLine = useCallback(() => {
    setTypeTestState((prev) => prev.finishedText ? { ...prev, finishedText: "" } : prev);
  }, []);

  // KeyboardEvent Handlers
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) {
      return;
    }
    // Set highlighted key on visual keyboard
    setPressedKeys((prev) => new Set(prev).add(event.code));

    if (event.code === "Backspace" && event.metaKey) {
      event.preventDefault();
      handleTypingKey(event.code, false, true);
      setPressedKeys(new Set());
      return;
    }
    if (event.metaKey || event.ctrlKey || event.altKey || event.nativeEvent.isComposing) return;

    // Spaces belong to the practice text, not page scrolling.
    if (event.code === "Space" || event.code === "Backspace") event.preventDefault();

    if (isPracticeInput({
      repeat: event.repeat,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      isComposing: event.nativeEvent.isComposing,
      code: event.code,
      mappedValue: keyMap[event.code]?.value,
    })) {
      practice.current?.input(performance.now());
    }
    handleTypingKey(event.code, event.shiftKey);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    // Unset highlighted key on visual keyboard
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(event.code);
      return next;
    });
  };

  return (
    <div>
      <main ref={mainRef} className="tester-main w-full min-h-[100svh] max-w-6xl mx-auto px-4 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8 md:px-12 md:pt-10 md:pb-12 flex flex-col">
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/" className="site-brand"><span className="brand-key" aria-hidden="true">k.</span>Keyboard Layout</Link>
          <div className="site-nav-actions"><Link href="/learn">Guides <span aria-hidden="true">↗</span></Link><ThemeToggle /></div>
        </nav>
        <header className="tester-header">
          <p className="tester-eyebrow">{selectedLayout.heading}</p>
          <h1>{keyboardLayout === "qwerty" ? "Try a different way to type" : `Get a feel for ${selectedLayout.name}`}<span className="accent-period">.</span></h1>
          <p id="typing-instructions">
            <span className="physical-typing-instructions">{selectedLayout.introduction}</span>
            <span className="touch-typing-instructions">Tap the keys below to try {selectedLayout.name}.</span>
          </p>
        </header>
        <div
          ref={appRef}
          className="outline-none flex flex-col"
          aria-label="Keyboard layout simulator"
          aria-describedby="typing-instructions"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onPointerDown={(event) => {
            if (!(event.target as HTMLElement).closest("a, button")) appRef.current?.focus({ preventScroll: true });
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPressedKeys(new Set());
              practice.current?.pause();
            }
          }}
        >
          <div className="tester-controls mb-5 flex items-start gap-3 sm:gap-6 md:gap-8">
            <nav aria-label="Keyboard layouts" className="flex min-w-0 flex-1 gap-2 sm:gap-4">
              {(Object.keys(layouts) as LayoutName[]).map((name) => (
                <KeyboardOption
                  key={name}
                  name={layouts[name].name}
                  description={layouts[name].summary}
                  href={layouts[name].path}
                  highlight={keyboardLayout === name}
                  onSelect={() => appRef.current?.focus({ preventScroll: true })}
                />
              ))}
            </nav>
            <div className="text-right shrink-0">
              <button
                type="button"
                className="hint-toggle"
                onClick={() => {
                  const enabled = !showHints;
                  setShowHints(enabled);
                  track("hints_toggled", { layout: keyboardLayout, enabled });
                  appRef.current?.focus();
                }}
                onKeyUp={(e) => e.preventDefault()}
                aria-label={showHints ? "Hide key hints" : "Show key hints"}
                aria-pressed={showHints}
              >
                <LightBulb lit={showHints} />
                <span>Hints</span>
              </button>
            </div>
          </div>

          <div className="practice-label"><span>Typing practice</span><span className="physical-typing-instructions">Click here & start typing</span></div>
          <div className="practice-text mb-4 ph-no-capture" data-private-typing>
            <TypeTest
              finishedText={typeTestState.finishedText}
              correctText={correctText}
              incorrectText={incorrectText}
              restText={restText}
              handleNewLine={handleNewLine}
            />
          </div>
          <div className="physical-keyboard keyboard-frame w-full flex justify-center mb-8 sm:mb-10 md:mb-12 ph-no-capture" data-private-typing>
            <Keyboard
              pressedKeys={pressedKeys}
              keyMap={keyMap}
              hintKey={getHintKey()}
            />
          </div>
          <div ref={touchKeyboardRef} className="touch-keyboard-frame ph-no-capture" data-private-typing>
            <TouchKeyboard
              key={keyboardLayout}
              layoutName={selectedLayout.name}
              keyMap={keyMap}
              pressedKeys={pressedKeys}
              hintKey={getHintKey()}
              hintShift={showHints && !incorrectText && Object.values(keyMap).some((key) => key.shiftValue === restText[0] && key.value !== restText[0])}
              onKey={(code, shifted) => {
                if (code === "Space" || keyMap[code]?.value?.length === 1) practice.current?.input(performance.now());
                handleTypingKey(code, shifted);
              }}
            />
          </div>
        </div>

        <KeyboardRecommendations layout={keyboardLayout} />

        {children}

        <div className="tester-footer mt-8 text-sm text-right grow flex flex-col justify-end">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Link href="/compare/qwerty-dvorak-colemak" className="underline underline-offset-4">Which layout is right for you? <span aria-hidden="true">↗</span></Link>
            <p>
              A product by{" "}
              <a
                href="https://experimental.software/"
                target="_blank"
                className="underline"
              >
                Experimental Software
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KeyboardTester;
