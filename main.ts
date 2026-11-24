// The One-Line Exit — a program that writes one funny single-line
// resignation letter to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Run: node main.ts
//
// The letter: one line, 1–140 UTF-8 chars, no padding, a specific voice
// (the person who stayed just long enough to watch the intern take over),
// and a punchline that lands where the reader does not expect it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Dear team, I resign — the intern has been running this place since March; I'm just making it official.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard: the gate requires 1–140 UTF-8 characters, not only whitespace,
// and exactly one line.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`resignation line must be 1–140 chars, got ${charCount}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("resignation line must be a single non-blank line");
}

mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");

// Read back what was written: the file must hold exactly the one line,
// no trailing newline, no extra whitespace — the gate counts every char.
const written = readFileSync(entryPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the resignation line");
}
console.log(`wrote ${charCount} chars to ${entryPath}`);
