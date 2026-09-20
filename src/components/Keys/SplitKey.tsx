type SplitKeyProps = {
  BottomIcon?: () => JSX.Element;
  TopIcon?: () => JSX.Element;
  highlightBottom?: boolean;
  highlightTop?: boolean;
};

const SplitKey = ({
  BottomIcon,
  TopIcon,
  highlightBottom,
  highlightTop,
}: SplitKeyProps) => {
  return (
    <div className="keyboard-split-key shrink-0 grow-0">
      <div
        data-highlight={highlightTop}
        className={`keycap h-1/2 flex items-center justify-center ${!TopIcon ? "invisible" : ""} ${
          TopIcon && BottomIcon ? "rounded-t-md border-b-[1px]" : "rounded-md"
        }`}
      >
        {TopIcon && <TopIcon />}
      </div>
      <div
        data-highlight={highlightBottom}
        className={`keycap h-1/2 flex items-center justify-center ${!BottomIcon ? "invisible" : ""} ${
          TopIcon && BottomIcon ? "rounded-b-md border-t-[1px]" : "rounded-md"
        }`}
      >
        {BottomIcon && <BottomIcon />}
      </div>
    </div>
  );
};

export default SplitKey;
