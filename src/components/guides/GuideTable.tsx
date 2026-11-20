import type { ReactNode } from "react";

export default function GuideTable({ caption, headings, rows, compact = false }: { caption: string; headings: string[]; rows: ReactNode[][]; compact?: boolean }) {
  return <div className="guide-table-scroll" tabIndex={0} role="region" aria-label={caption}>
    <table className={compact ? "compact-guide-table" : undefined}><caption>{caption}</caption><thead><tr>{headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
