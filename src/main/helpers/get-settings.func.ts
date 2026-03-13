import { EOL } from "node:os";
import { workspace, WorkspaceConfiguration } from "vscode";

export function getSettings() {
  return workspace.getConfiguration("testFileGenerator");
}

export function getSettingsSrcRootPattern(
  workspaceConfig: WorkspaceConfiguration
): string {
  return getStrOrDefault(workspaceConfig.get("sourceRootPattern"), () => "src");
}

export function getSettingsTestRootPattern(
  workspaceConfig: WorkspaceConfiguration
): string {
  return getStrOrDefault(workspaceConfig.get("testRootPattern"), () => "test");
}

export function getSettingsSuffix(
  workspaceConfig: WorkspaceConfiguration
): string {
  return getStrOrDefault(workspaceConfig.get("testSuffix"), () => ".test");
}

export function getSettingsWatcherPattern(
  workspaceConfig: WorkspaceConfiguration
): string[] {
  return workspaceConfig.get<string[]>("hardcorePatterns", []);
}

export function getSettingsTodoLines(
  workspaceConfig: WorkspaceConfiguration
): string {
  return workspaceConfig
    .get<string[]>("hardcoreTodoLines", [])
    .map((line) => (line === "" ? "" : `// ${line}`))
    .join(EOL);
}

/**
 * Returns the given value if it is a non-empty string (after trimming),
 * otherwise falls back to the result of the provided factory function.
 *
 * @param value - The value to validate.
 * @param fallback - A factory function called only when the value is invalid.
 * @returns The validated value or the fallback.
 */
export function getStrOrDefault(
  value: unknown,
  fallback: () => string
): string {
  // eslint-disable-next-line eqeqeq
  if (value == null || typeof value !== "string" || value.trim().length === 0) {
    return fallback();
  }

  return value;
}
