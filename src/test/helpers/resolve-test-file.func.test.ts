import * as assert from "assert";
import * as path from "node:path";
import { resolveTestFilePath } from "../../main/helpers/resolve-test-file.func";

const root = "/workspace";

suite("resolveTestFilePath", () => {
  test("maps a source file to its test counterpart", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "src/db/repos/user.repos.ts"),
        "src",
        "test",
        ".test",
      ),
      path.join(root, "test/db/repos/user.repos.test.ts"),
    );
  });

  test("preserves the source file extension", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "src/utils/parser.mts"),
        "src",
        "test",
        ".test",
      ),
      path.join(root, "test/utils/parser.test.mts"),
    );
  });

  test("handles a file at the root of sourceRoot (no subdir)", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "src/app.ts"),
        "src",
        "test",
        ".test",
      ),
      path.join(root, "test/app.test.ts"),
    );
  });

  test("returns null if file is not under sourceRoot", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "lib/utils.ts"),
        "src",
        "test",
        ".test",
      ),
      null,
    );
  });

  test("returns null if file is already in testRoot", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "test/db/user.test.ts"),
        "src",
        "test",
        ".test",
      ),
      null,
    );
  });

  test("works with sourceRoot '.'", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "db/user.ts"),
        ".",
        "test",
        ".test",
      ),
      path.join(root, "test/db/user.test.ts"),
    );
  });

  test("respects a custom testSuffix", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "src/services/auth.service.ts"),
        "src",
        "test",
        ".spec",
      ),
      path.join(root, "test/services/auth.service.spec.ts"),
    );
  });

  test("respects a custom sourceRoot and testRoot", () => {
    assert.strictEqual(
      resolveTestFilePath(
        path.join(root, "src/main/db/user.ts"),
        "src/main",
        "src/test",
        ".test",
      ),
      path.join(root, "src/test/db/user.test.ts"),
    );
  });
});
