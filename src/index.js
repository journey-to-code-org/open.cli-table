function text(value) {
  return value === null || value === undefined ? "" : String(value);
}

export function table(rows, options = {}) {
  if (!Array.isArray(rows) || rows.some((row) => !Array.isArray(row))) {
    throw new TypeError("Expected rows to be an array of arrays");
  }
  if (rows.length === 0) return "";

  const padding = options.padding ?? 1;
  const border = options.border !== false;
  const align = options.align ?? [];

  const widthCount = Math.max(...rows.map((row) => row.length));
  const widths = Array.from({length:widthCount}, (_, column) =>
    Math.max(...rows.map((row) => text(row[column]).length))
  );

  const padCell = (value, column) => {
    const raw = text(value);
    const gap = widths[column] - raw.length;
    const mode = align[column] ?? "left";
    let content;
    if (mode === "right") content = " ".repeat(gap) + raw;
    else if (mode === "center") {
      const left = Math.floor(gap/2);
      content = " ".repeat(left) + raw + " ".repeat(gap-left);
    } else content = raw + " ".repeat(gap);
    return " ".repeat(padding) + content + " ".repeat(padding);
  };

  const sep = () => "+" + widths.map((w) => "-".repeat(w + padding*2)).join("+") + "+";
  const lines = [];

  if (border) lines.push(sep());
  for (let rowIndex=0; rowIndex<rows.length; rowIndex++) {
    const line = rows[rowIndex].map((cell, column) => padCell(cell,column));
    lines.push(border ? `|${line.join("|")}|` : line.join(" "));
    if (border && options.header && rowIndex === 0) lines.push(sep());
  }
  if (border) lines.push(sep());

  return lines.join("\n");
}

export function tableFromObjects(items, columns) {
  if (!Array.isArray(items)) throw new TypeError("Expected items to be an array");
  if (!Array.isArray(columns) || columns.some((c) => typeof c !== "string")) {
    throw new TypeError("Expected columns to be an array of strings");
  }
  return [columns, ...items.map((item) => columns.map((column) => item?.[column]))];
}
