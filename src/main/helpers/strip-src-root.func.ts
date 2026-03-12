/**
 * Strips the sourceRoot prefix from a workspace-relative path.
 * Returns null if the file is not under the sourceRoot.
 * e.g. "src/db/user.ts" with sourceRoot "src" → "db/user.ts"
 */
export function stripSourceRoot(
  relativePath: string,
  sourceRoot: string,
): string | null {
  const normalizedRoot = sourceRoot.replace(/\\/g, "/");
  const normalizedPath = relativePath.replace(/\\/g, "/");

  if (normalizedRoot === ".") {
    return normalizedPath;
  }

  if (!normalizedPath.startsWith(normalizedRoot + "/")) {
    return null;
  }

  return normalizedPath.slice(normalizedRoot.length + 1);
}
