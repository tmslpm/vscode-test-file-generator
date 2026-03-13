import { join, parse } from "node:path";

/**
 * Resolves the absolute test file path from a source file path.
 * Returns null if the source file is not under the sourceRoot.
 */
export function resolveTestFilePath(
  sourceFilePath: string,
  srcPattern: string,
  testPattern: string,
  suffix: string
): string | null {
  const normalized = sourceFilePath.replace(/\\/g, "/");
  const segment = `/${srcPattern}/`;
  const lastIdx = normalized.lastIndexOf(segment);

  if (lastIdx === -1) {
    return null;
  }

  const before = normalized.slice(0, lastIdx);
  const after = normalized.slice(lastIdx + segment.length);

  const parsed = parse(after);
  return `${before}/${testPattern}/${join(parsed.dir, parsed.name + suffix + parsed.ext)}`;
}
