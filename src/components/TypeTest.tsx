"use client";

import { ReactNode } from "react";
import { useRef, useEffect, forwardRef } from "react";

type TypeTestProps = {
  finishedText: string;
  correctText: string;
  incorrectText: string;
  restText: string;
  handleNewLine: () => void;
};

type LetterProps = {
  children: ReactNode;
  current?: boolean;
  incorrect?: boolean;
};

const Letter = forwardRef<HTMLSpanElement, LetterProps>(function Letter(
  { children, current, incorrect },
  ref
) {
  return (
    <span
      ref={ref}
      className={`typing-letter ${current ? "typing-cursor" : ""} ${incorrect ? "typing-mistake" : ""}`}
    >
      {children}
    </span>
  );
});

const TypeTest = ({
  finishedText,
  correctText,
  incorrectText,
  restText,
  handleNewLine,
}: TypeTestProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = paragraph.current;
    if (!element) return;
    const keepCursorVisible = () => {
      const cursor = ref.current;
      if (!cursor) return;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      if (cursor.offsetTop >= lineHeight && finishedText && !incorrectText.length) {
        handleNewLine();
      }
      // Also keep long mistakes visible, including after rotating a phone.
      element.scrollTop = Math.floor(cursor.offsetTop / lineHeight) * lineHeight;
    };
    keepCursorVisible();
    const observer = new ResizeObserver(keepCursorVisible);
    observer.observe(element);
    return () => observer.disconnect();
  }, [finishedText, correctText, incorrectText, restText, handleNewLine]);

  return (
    <p ref={paragraph} className="relative h-[2lh] break-words text-lg leading-relaxed overflow-hidden select-none min-[500px]:text-xl md:text-2xl">
      <span>
        {finishedText.split("").map((letter, index) => (
          <Letter key={`${letter}-${index}`}>{letter}</Letter>
        ))}
      </span>
      <span>
        {correctText.split("").map((letter, index) => (
          <Letter key={`${letter}-${finishedText.length + index}`}>
            {letter}
          </Letter>
        ))}
      </span>
      <span className="text-red-600 dark:text-red-400">
        {incorrectText.split("").map((letter, index) => (
          <Letter incorrect key={`${letter}-${index}`}>
            {letter}
          </Letter>
        ))}
      </span>
      <span className="typing-remaining">
        {restText.slice(0, 300).split("").map((letter, index) => (
          <Letter
            current={index === 0}
            ref={index === 0 ? ref : undefined}
            key={`${letter}-${
              finishedText.length + correctText.length + index
            }`}
          >
            {letter}
          </Letter>
        ))}{" "}
      </span>
    </p>
  );
};

export default TypeTest;
