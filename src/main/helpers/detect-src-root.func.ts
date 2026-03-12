import { join } from "node:path";
import { existsSync } from "node:fs";

/**
 * Detects the source root directory of the workspace.
 * Returns "src" if a "src" folder exists, otherwise ".".
 */
export function detectSrcRoot(workspaceRoot: string): string {
  return existsSync(join(workspaceRoot, "src")) 
    ? "src" 
    : ".";
}
