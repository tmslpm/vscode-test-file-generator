import { join, relative } from "node:path";
import { stripSourceRoot } from "./strip-src-root.func";
import { buildTestFileName } from "./build-test-file-name.func";

/**
 * Resolves the absolute test file path from a source file path.
 * Returns null if the source file is not under the sourceRoot.
 */
export function resolveTestFilePath(
  sourceFilePath: string,
  workspaceRoot: string,
  sourceRoot: string,
  testRoot: string,
  testSuffix: string,
): string | null {
  const relativeFromSource = stripSourceRoot(
    relative(workspaceRoot, sourceFilePath),
    sourceRoot,
  );

  if (relativeFromSource === null) {
    return null;
  }

  return join(
    workspaceRoot,
    testRoot,
    buildTestFileName(relativeFromSource, testSuffix),
  );
}
