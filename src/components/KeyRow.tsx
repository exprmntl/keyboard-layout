import { ReactNode } from "react";

const KeyRow = ({ children }: { children: ReactNode }) => {
  return <div className="keyboard-row flex">{children}</div>;
};
export default KeyRow;
