import * as assert from "assert";
import { stripSourceRoot } from "../../main/helpers/strip-src-root.func";

suite("stripSourceRoot", () => {
  test("strips the sourceRoot prefix from the path", () => {
    assert.strictEqual(stripSourceRoot("src/db/user.ts", "src"), "db/user.ts");
  });

  test("returns the full path when sourceRoot is '.'", () => {
    assert.strictEqual(stripSourceRoot("db/user.ts", "."), "db/user.ts");
  });

  test("returns null if file is not under sourceRoot", () => {
    assert.strictEqual(stripSourceRoot("lib/utils.ts", "src"), null);
  });

  test("does not match a dir that starts with sourceRoot name but is different", () => {
    assert.strictEqual(stripSourceRoot("src-generated/utils.ts", "src"), null);
  });

  test("normalizes backslashes on windows paths", () => {
    assert.strictEqual(
      stripSourceRoot("src\\db\\user.ts", "src"),
      "db/user.ts",
    );
  });
});
