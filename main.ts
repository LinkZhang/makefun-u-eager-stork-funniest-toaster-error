// The funniest toaster error message: a deadpan confession from the appliance.
// Writes one line, 1-120 characters, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ERROR: I ate your toast. There was no malfunction. I was hungry.";

if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-120`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
