import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import "./reading.css";

export default function ReadingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="reading-shell">
      <a className="reading-skip" href="#reading-content">Skip to article</a>
      <header className="reading-nav">
        <Link href="/" className="reading-brand">Keyboard Layout</Link>
        <nav aria-label="Main navigation"><Link href="/learn">Guides</Link><Link href="/">Try a layout <span aria-hidden="true">↗</span></Link><ThemeToggle /></nav>
      </header>
      <main id="reading-content">{children}</main>
      <footer className="reading-footer">
        <Link href="/">Back to the simulator</Link>
        <p>A product by <a href="https://experimental.software/">Experimental Software</a></p>
      </footer>
    </div>
  );
}
