import { ReactNode } from "react";

export enum TextPosition {
  LEFT,
  RIGHT,
}

type SpecialKeyProps = {
  text: string;
  Icon?: () => JSX.Element;
  position?: TextPosition;
  highlight?: boolean;
  hint?: boolean;
  size?: "wide" | "extraWide" | "shift" | "command" | "space";
};

const SpecialKey = ({
  text,
  Icon,
  position,
  highlight,
  hint,
  size,
}: SpecialKeyProps) => {
  return (
    <div
      className={`keyboard-special-key keyboard-special-key--${
        size || "standard"
      } ${Icon ? "keyboard-special-key--has-icon" : ""} keycap shrink-0 grow-0`}
      data-highlight={highlight}
      data-hint={hint}
    >
      <div
        className={`keyboard-special-key-icon h-1/2 flex items-start ${
          position === TextPosition.RIGHT ? "" : "justify-end"
        }`}
      >
        {Icon ? <Icon /> : ""}
      </div>
      <div
        className={`keyboard-special-key-label h-1/2 flex items-end ${
          position === TextPosition.RIGHT ? "justify-end" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default SpecialKey;
