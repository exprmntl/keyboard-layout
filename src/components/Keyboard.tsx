import KeyRow from "@/components/KeyRow";
import Key from "@/components/Keys/Key";
import SpecialKey, { TextPosition } from "@/components/Keys/SpecialKey";
import SplitKey from "@/components/Keys/SplitKey";

type KeyboardProps = {
  pressedKeys: Set<string>;
  keyMap: any;
  hintKey?: string;
};

const Keyboard = ({ pressedKeys, keyMap, hintKey }: KeyboardProps) => {
  return (
    <div className="keyboard flex flex-col dark:text-gray-300 select-none">
      <KeyRow>
        <Key
          {...keyMap.Backquote}
          highlight={pressedKeys.has("Backquote")}
          hint={hintKey === "Backquote"}
        />
        <Key
          {...keyMap.Digit1}
          highlight={pressedKeys.has("Digit1")}
          hint={hintKey === "Digit1"}
        />
        <Key
          {...keyMap.Digit2}
          highlight={pressedKeys.has("Digit2")}
          hint={hintKey === "Digit2"}
        />
        <Key
          {...keyMap.Digit3}
          highlight={pressedKeys.has("Digit3")}
          hint={hintKey === "Digit3"}
        />
        <Key
          {...keyMap.Digit4}
          highlight={pressedKeys.has("Digit4")}
          hint={hintKey === "Digit4"}
        />
        <Key
          {...keyMap.Digit5}
          highlight={pressedKeys.has("Digit5")}
          hint={hintKey === "Digit5"}
        />
        <Key
          {...keyMap.Digit6}
          highlight={pressedKeys.has("Digit6")}
          hint={hintKey === "Digit6"}
        />
        <Key
          {...keyMap.Digit7}
          highlight={pressedKeys.has("Digit7")}
          hint={hintKey === "Digit7"}
        />
        <Key
          {...keyMap.Digit8}
          highlight={pressedKeys.has("Digit8")}
          hint={hintKey === "Digit8"}
        />
        <Key
          {...keyMap.Digit9}
          highlight={pressedKeys.has("Digit9")}
          hint={hintKey === "Digit9"}
        />
        <Key
          {...keyMap.Digit0}
          highlight={pressedKeys.has("Digit0")}
          hint={hintKey === "Digit0"}
        />
        <Key
          {...keyMap.Minus}
          highlight={pressedKeys.has("Minus")}
          hint={hintKey === "Minus"}
        />
        <Key
          {...keyMap.Equal}
          highlight={pressedKeys.has("Equal")}
          hint={hintKey === "Equal"}
        />
        <SpecialKey
          {...keyMap.Backspace}
          position={TextPosition.RIGHT}
          size="wide"
          highlight={pressedKeys.has("Backspace")}
          hint={hintKey === "Backspace"}
        />
      </KeyRow>
      <KeyRow>
        <SpecialKey
          {...keyMap.Tab}
          size="wide"
          highlight={pressedKeys.has("Tab")}
          hint={hintKey === "Tab"}
        />
        <Key
          {...keyMap.KeyQ}
          highlight={pressedKeys.has("KeyQ")}
          hint={hintKey === "KeyQ"}
        />
        <Key
          {...keyMap.KeyW}
          highlight={pressedKeys.has("KeyW")}
          hint={hintKey === "KeyW"}
        />
        <Key
          {...keyMap.KeyE}
          highlight={pressedKeys.has("KeyE")}
          hint={hintKey === "KeyE"}
        />
        <Key
          {...keyMap.KeyR}
          highlight={pressedKeys.has("KeyR")}
          hint={hintKey === "KeyR"}
        />
        <Key
          {...keyMap.KeyT}
          highlight={pressedKeys.has("KeyT")}
          hint={hintKey === "KeyT"}
        />
        <Key
          {...keyMap.KeyY}
          highlight={pressedKeys.has("KeyY")}
          hint={hintKey === "KeyY"}
        />
        <Key
          {...keyMap.KeyU}
          highlight={pressedKeys.has("KeyU")}
          hint={hintKey === "KeyU"}
        />
        <Key
          {...keyMap.KeyI}
          highlight={pressedKeys.has("KeyI")}
          hint={hintKey === "KeyI"}
        />
        <Key
          {...keyMap.KeyO}
          highlight={pressedKeys.has("KeyO")}
          hint={hintKey === "KeyO"}
        />
        <Key
          {...keyMap.KeyP}
          highlight={pressedKeys.has("KeyP")}
          hint={hintKey === "KeyP"}
        />
        <Key
          {...keyMap.BracketLeft}
          highlight={pressedKeys.has("BracketLeft")}
          hint={hintKey === "BracketLeft"}
        />
        <Key
          {...keyMap.BracketRight}
          highlight={pressedKeys.has("BracketRight")}
          hint={hintKey === "BracketRight"}
        />
        <Key
          {...keyMap.Backslash}
          highlight={pressedKeys.has("Backslash")}
          hint={hintKey === "Backslash"}
        />
      </KeyRow>
      <KeyRow>
        <SpecialKey
          {...keyMap.CapsLock}
          size="extraWide"
          highlight={pressedKeys.has("CapsLock")}
          hint={hintKey === "CapsLock"}
        />
        <Key
          {...keyMap.KeyA}
          highlight={pressedKeys.has("KeyA")}
          hint={hintKey === "KeyA"}
        />
        <Key
          {...keyMap.KeyS}
          highlight={pressedKeys.has("KeyS")}
          hint={hintKey === "KeyS"}
        />
        <Key
          {...keyMap.KeyD}
          highlight={pressedKeys.has("KeyD")}
          hint={hintKey === "KeyD"}
        />
        <Key
          {...keyMap.KeyF}
          highlight={pressedKeys.has("KeyF")}
          hint={hintKey === "KeyF"}
          bump
        />
        <Key
          {...keyMap.KeyG}
          highlight={pressedKeys.has("KeyG")}
          hint={hintKey === "KeyG"}
        />
        <Key
          {...keyMap.KeyH}
          highlight={pressedKeys.has("KeyH")}
          hint={hintKey === "KeyH"}
        />
        <Key
          {...keyMap.KeyJ}
          highlight={pressedKeys.has("KeyJ")}
          hint={hintKey === "KeyJ"}
          bump
        />
        <Key
          {...keyMap.KeyK}
          highlight={pressedKeys.has("KeyK")}
          hint={hintKey === "KeyK"}
        />
        <Key
          {...keyMap.KeyL}
          highlight={pressedKeys.has("KeyL")}
          hint={hintKey === "KeyL"}
        />
        <Key
          {...keyMap.Semicolon}
          highlight={pressedKeys.has("Semicolon")}
          hint={hintKey === "Semicolon"}
        />
        <Key
          {...keyMap.Quote}
          highlight={pressedKeys.has("Quote")}
          hint={hintKey === "Quote"}
        />
        <SpecialKey
          {...keyMap.Enter}
          position={TextPosition.RIGHT}
          size="extraWide"
          highlight={pressedKeys.has("Enter")}
          hint={hintKey === "Enter"}
        />
      </KeyRow>
      <KeyRow>
        <SpecialKey
          {...keyMap.ShiftLeft}
          size="shift"
          highlight={pressedKeys.has("ShiftLeft")}
          hint={hintKey === "ShiftLeft"}
        />
        <Key
          {...keyMap.KeyZ}
          highlight={pressedKeys.has("KeyZ")}
          hint={hintKey === "KeyZ"}
        />
        <Key
          {...keyMap.KeyX}
          highlight={pressedKeys.has("KeyX")}
          hint={hintKey === "KeyX"}
        />
        <Key
          {...keyMap.KeyC}
          highlight={pressedKeys.has("KeyC")}
          hint={hintKey === "KeyC"}
        />
        <Key
          {...keyMap.KeyV}
          highlight={pressedKeys.has("KeyV")}
          hint={hintKey === "KeyV"}
        />
        <Key
          {...keyMap.KeyB}
          highlight={pressedKeys.has("KeyB")}
          hint={hintKey === "KeyB"}
        />
        <Key
          {...keyMap.KeyN}
          highlight={pressedKeys.has("KeyN")}
          hint={hintKey === "KeyN"}
        />
        <Key
          {...keyMap.KeyM}
          highlight={pressedKeys.has("KeyM")}
          hint={hintKey === "KeyM"}
        />
        <Key
          {...keyMap.Comma}
          highlight={pressedKeys.has("Comma")}
          hint={hintKey === "Comma"}
        />
        <Key
          {...keyMap.Period}
          highlight={pressedKeys.has("Period")}
          hint={hintKey === "Period"}
        />
        <Key
          {...keyMap.Slash}
          highlight={pressedKeys.has("Slash")}
          hint={hintKey === "Slash"}
        />
        <SpecialKey
          {...keyMap.ShiftRight}
          position={TextPosition.RIGHT}
          size="shift"
          highlight={pressedKeys.has("ShiftRight")}
          hint={hintKey === "ShiftRight"}
        />
      </KeyRow>
      <KeyRow>
        <SpecialKey text="fn" />
        <SpecialKey
          {...keyMap.ControlLeft}
          highlight={pressedKeys.has("ControlLeft")}
          hint={hintKey === "ControlLeft"}
        />
        <SpecialKey
          {...keyMap.AltLeft}
          highlight={pressedKeys.has("AltLeft")}
          hint={hintKey === "AltLeft"}
        />
        <SpecialKey
          {...keyMap.MetaLeft}
          size="command"
          highlight={pressedKeys.has("MetaLeft")}
          hint={hintKey === "MetaLeft"}
        />
        <SpecialKey
          {...keyMap.Space}
          size="space"
          highlight={pressedKeys.has("Space")}
          hint={hintKey === "Space"}
        />
        <SpecialKey
          {...keyMap.MetaRight}
          position={TextPosition.RIGHT}
          size="command"
          highlight={pressedKeys.has("MetaRight")}
          hint={hintKey === "MetaRight"}
        />
        <SpecialKey
          {...keyMap.AltRight}
          position={TextPosition.RIGHT}
          highlight={pressedKeys.has("AltRight")}
        />
        <SplitKey
          {...keyMap.ArrowLeft}
          highlightBottom={pressedKeys.has("ArrowLeft")}
        />
        <SplitKey
          {...keyMap.ArrowDown}
          {...keyMap.ArrowUp}
          highlightBottom={pressedKeys.has("ArrowDown")}
          highlightTop={pressedKeys.has("ArrowUp")}
        />
        <SplitKey
          {...keyMap.ArrowRight}
          highlightBottom={pressedKeys.has("ArrowRight")}
        />
      </KeyRow>
    </div>
  );
};

export default Keyboard;
