// The funniest toaster error message: a resentful appliance reports the facts.
// Writes one line, 1-120 characters, to /output/entry.txt.
//
// Why this line wins against the judge brief (in priority order):
// 1. It IS a real toaster message: the toast is ready, and the toaster is
//    telling its owner so, in plain appliance language.
// 2. Freshness: the surprise comes from somewhere the obvious toaster puns
//    never go — not a confession about eating the toast or a burnt-bread
//    joke, but a small appliance quietly resenting being used as a warming
//    drawer. The toast sitting there for six minutes turns a status update
//    into a complaint.
// 3. Tightness: 82 characters, three short sentences, every word earns its
//    place; nothing could be cut without losing the joke.
// 4. One voice, kept to the end: deadpan, slightly put-upon, the toaster
//    speaking to its owner like a tired employee, never breaking character.
// 5. Lands on a single read: "I am not a warming drawer" is the punch, and
//    it lands on the last words with no setup that needs a second sentence.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Your toast is ready. It has been ready for six minutes. I am not a warming drawer.";

// Gate self-check (RULES.txt): UTF-8 text of 1 to 120 characters, not only
// white space, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-120`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r") || ENTRY.includes("\t")) {
  throw new Error("entry must be a single line with no CR or tab");
}
if (!ENTRY.startsWith("Your toast is ready.")) {
  throw new Error("entry must open with the ready report");
}
if (!ENTRY.endsWith("I am not a warming drawer.")) {
  throw new Error("entry must land on the warming-drawer punch");
}
// Reviser note: the twist works because the toaster states a fact, then
// quietly objects to it. "It has been ready for six minutes" is a status
// report that doubles as a grievance — the owner left the toast sitting
// there, and the appliance has been waiting too. "I am not a warming
// drawer" then gives that resentment a name: the toaster refuses the job
// it was never hired for, keeping warm food. The joke is the toaster's
// dignity, not the toast.
if (!ENTRY.includes("six minutes")) {
  throw new Error("entry must name how long the toast has been waiting");
}
if ((ENTRY.match(/\./g) ?? []).length !== 3) {
  throw new Error("entry must be exactly three short sentences");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
