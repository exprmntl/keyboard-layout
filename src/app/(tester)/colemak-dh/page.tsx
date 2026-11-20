import Link from "next/link";
import { layoutMetadata } from "@/lib/metadata";

export const metadata = layoutMetadata("colemak-dh");

export default function ColemakDhPage() {
  return (
    <p className="text-sm">
      On this US ANSI layout, press the QWERTY C key for D and the M key for H.{" "}
      <Link className="underline" href="/compare/colemak-vs-colemak-dh">Compare the Colemak and Colemak-DH layouts</Link>.
    </p>
  );
}
