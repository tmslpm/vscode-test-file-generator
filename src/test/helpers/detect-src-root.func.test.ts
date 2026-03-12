import * as assert from "assert";
import * as path from "node:path";
import * as fs from "node:fs";
import { detectSrcRoot } from "../../main/helpers/detect-src-root.func";

const root = path.join(__dirname, "tmp-detect-source-root");

suite("detectSourceRoot", () => {
  setup(() => fs.mkdirSync(root, { recursive: true }));
  teardown(() => fs.rmSync(root, { recursive: true, force: true }));

  test("returns 'src' if a src folder exists", () => {
    fs.mkdirSync(path.join(root, "src"));
    assert.strictEqual(detectSrcRoot(root), "src");
  });

  test("returns '.' if no src folder exists", () => {
    assert.strictEqual(detectSrcRoot(root), ".");
  });
});
