import test from "node:test";
import assert from "node:assert/strict";
import { table, tableFromObjects } from "../src/index.js";

test("renders a bordered table", () => {
  const output = table([["Name","Age"],["Ada",36]], {header:true});
  assert.match(output, /\| Name \| Age \|/u);
  assert.match(output, /\| Ada  \| 36  \|/u);
});

test("converts objects to rows", () => {
  assert.deepEqual(tableFromObjects([{a:1,b:2}],["a","b"]), [["a","b"],[1,2]]);
});

test("handles empty input", () => assert.equal(table([]), ""));
