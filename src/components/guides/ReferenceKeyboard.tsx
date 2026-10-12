import layouts from "@/content/reference-layouts.json";

export default function ReferenceKeyboard({ layout }: { layout: keyof typeof layouts }) {
  const reference = layouts[layout];
  return (
    <figure className="reference-keyboard">
      <div className="reference-rows" role="img" aria-label={`${reference.name}. Rows from top to bottom, with each unshifted character followed by its Shift character: ${reference.rows.map(row => row.map(key => `${key.key}, Shift ${key.shift || "no character"}`).join("; ")).join(". Next row: ")}.`}>
        {reference.rows.map((row, index) => <div className={`reference-row reference-row-${index}`} key={index} aria-hidden="true">
          {row.map((key, position) => <span className={`reference-key${index === 2 ? " reference-home" : ""}`} key={position}>
            <small>{key.shift}</small><b>{key.key}</b>
          </span>)}
        </div>)}
      </div>
      <figcaption>{reference.variant}. Upper legend: Shift; lower legend: unshifted. Shading marks the home row. Character keys only; spacing is schematic.</figcaption>
    </figure>
  );
}
