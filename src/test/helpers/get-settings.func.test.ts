import * as assert from "assert";
import { getStrOrDefault } from "../../main/helpers/get-settings.func";

suite("resolveStringOrDefault", () => {
  test("returns the value if it is a non-empty string", () => {
    assert.strictEqual(
      getStrOrDefault("hello", () => "default"),
      "hello",
    );
  });

  test("returns the fallback if value is an empty string", () => {
    assert.strictEqual(
      getStrOrDefault("", () => "default"),
      "default",
    );
  });

  test("returns the fallback if value is a whitespace-only string", () => {
    assert.strictEqual(
      getStrOrDefault("   ", () => "default"),
      "default",
    );
  });

  test("returns the fallback if value is null", () => {
    assert.strictEqual(
      getStrOrDefault(null, () => "default"),
      "default",
    );
  });

  test("returns the fallback if value is undefined", () => {
    assert.strictEqual(
      getStrOrDefault(undefined, () => "default"),
      "default",
    );
  });

  test("returns the fallback if value is not a string", () => {
    assert.strictEqual(
      getStrOrDefault(42, () => "default"),
      "default",
    );
  });

  test("calls fallback lazily, only when needed", () => {
    let called = false;
    getStrOrDefault("valid", () => {
      called = true;
      return "default";
    });
    assert.strictEqual(called, false);
  });
});
