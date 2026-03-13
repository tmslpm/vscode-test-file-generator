import { relative } from "node:path";
import { Uri, workspace } from "vscode";
import { generateTestFile } from "../generate-test-file/generate-test-file.func";
import picomatch from "picomatch";
import { getSettings } from "../../helpers/get-settings.func";
import { getSettingsWatcherPattern } from "../../helpers/get-settings.func";
import { showWarn } from "../../helpers/notify.func";

export default async function autoGenerateTestFile(uri: Uri) {
  const workspaceRoot = workspace.workspaceFolders![0].uri.fsPath;

  const patterns = getSettingsWatcherPattern(getSettings());

  if (!patterns.length) {
    showWarn("No hardcorePatterns configured.");
    return;
  }

  if (
    !patterns.some((pattern) =>
      picomatch(pattern)(
        relative(workspaceRoot, uri.fsPath).replace(/\\/g, "/")
      )
    )
  ) {
    return;
  }

  await generateTestFile(uri, true);
}
