type KeyProps = {
  text: string;
  shiftText?: string;
  highlight?: boolean;
  bump?: boolean;
  hint?: boolean;
};

const Key = ({ text, shiftText, highlight, bump, hint }: KeyProps) => {
  return (
    <div
      className="keyboard-key keycap shrink-0 grow-0 flex items-center justify-center leading-relaxed"
      data-highlight={highlight}
      data-hint={hint}
    >
      {shiftText ? (
        <div className="keyboard-key-shift-text">
          <p>{shiftText}</p>
          <p>{text}</p>
        </div>
      ) : (
        <p
          className={bump ? "key-bump" : undefined}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Key;
