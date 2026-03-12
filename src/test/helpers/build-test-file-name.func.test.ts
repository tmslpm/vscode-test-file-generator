import * as assert from "assert";
import { buildTestFileName } from "../../main/helpers/build-test-file-name.func";

suite("buildTestFileName", () => {
  test("appends testSuffix before the extension", () => {
    assert.strictEqual(
      buildTestFileName("db/user.ts", ".test"),
      "db/user.test.ts",
    );
  });

  test("preserves the source extension", () => {
    assert.strictEqual(
      buildTestFileName("utils/parser.mts", ".test"),
      "utils/parser.test.mts",
    );
  });

  test("handles a file with no subdir", () => {
    assert.strictEqual(buildTestFileName("app.ts", ".test"), "app.test.ts");
  });

  test("respects a custom testSuffix", () => {
    assert.strictEqual(
      buildTestFileName("services/auth.ts", ".spec"),
      "services/auth.spec.ts",
    );
  });

  test("handles compound file names", () => {
    assert.strictEqual(
      buildTestFileName("db/user.repos.ts", ".test"),
      "db/user.repos.test.ts",
    );
  });
});
