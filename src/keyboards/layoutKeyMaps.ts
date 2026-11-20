import qwerty from "./qwertyKeyMap";
import dvorak from "./dvorakKeyMap";
import colemak from "./colemakKeyMap";

// Current US ANSI Colemak-DH uses the Angle Mod on the bottom row.
// The QWERTY entries supply each replacement letter's legend and Shift value.
const colemakDh = {
  ...colemak,
  KeyT: qwerty.KeyB,
  KeyG: qwerty.KeyG,
  KeyH: qwerty.KeyM,
  KeyZ: qwerty.KeyX,
  KeyX: qwerty.KeyC,
  KeyC: qwerty.KeyD,
  KeyB: qwerty.KeyZ,
  KeyM: qwerty.KeyH,
};

export const layoutKeyMaps = { qwerty, dvorak, colemak, "colemak-dh": colemakDh };
