import Link from "next/link";

type KeyboardOptionProps = {
  name: string;
  description: string;
  highlight: boolean;
  href: string;
  onSelect: () => void;
};

const KeyboardOption = ({
  name,
  description,
  highlight,
  href,
  onSelect,
}: KeyboardOptionProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={highlight ? "page" : undefined}
      className="layout-option text-left min-w-0 p-3 sm:p-4 flex-1"
      onClick={(event) => {
        // Modified clicks keep normal link behavior (new tab/window).
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (highlight) event.preventDefault();
        onSelect();
      }}
    >
      <span className="layout-option-name block text-xs min-[360px]:text-sm min-[420px]:text-base sm:text-lg font-medium sm:mb-2">
        {name}
      </span>
      <span className="layout-option-description hidden text-sm sm:block">{description}</span>
    </Link>
  );
};

export default KeyboardOption;
