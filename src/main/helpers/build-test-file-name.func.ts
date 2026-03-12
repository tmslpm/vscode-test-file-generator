import { join, parse } from "node:path";

/**
 * Builds the test file path from a source-relative path.
 * e.g. "db/user.ts" → "db/user.test.ts"
 */
export function buildTestFileName(
  relativeFromSource: string,
  testSuffix: string,
): string {
  const parsed = parse(relativeFromSource);
  return join(parsed.dir, parsed.name + testSuffix + parsed.ext)
    .replace(
      /\\/g,
      "/",
    );
}
