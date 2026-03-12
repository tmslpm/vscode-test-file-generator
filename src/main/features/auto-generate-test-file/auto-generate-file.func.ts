import { relative } from "node:path";
import { Uri, window, workspace } from "vscode";
import { generateTestFile } from "../generate-test-file/generate-test-file.func";
import picomatch from "picomatch";
import { hasWorkspaceOrShowError } from "../../helpers/assert-has-workspace.func";

export default async function autoGenerateTestFile(uri: Uri) {
  if (!hasWorkspaceOrShowError()) {
    return;
  }

  const workspaceRoot = workspace.workspaceFolders![0].uri.fsPath;

  const patterns = workspace
    .getConfiguration("testFileGenerator")
    .get<string[]>("hardcorePatterns", []);

  if (!patterns.length) {
    window.showWarningMessage("TestFileGen: No hardcorePatterns configured.");
    return;
  }

  if (
    !patterns.some((pattern) =>
      picomatch(pattern)(
        relative(workspaceRoot, uri.fsPath).replace(/\\/g, "/"),
      ),
    )
  ) {
    return;
  }

  await generateTestFile(uri, true);
}
