import { window, workspace } from "vscode";

export function hasWorkspaceOrShowError() {
  // eslint-disable-next-line eqeqeq
  if (
    workspace.workspaceFolders == null ||
    workspace.workspaceFolders.length === 0
  ) {
    window.showErrorMessage("Test File Generator: No workspace folder found.");
    return false;
  }

  return true;
}
