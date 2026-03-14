// go-to-counterpart.feature.ts
import { window, workspace, Uri } from "vscode";
import { basename } from "node:path";
import { existsSync } from "node:fs";
import { resolveTestFilePath } from "../../helpers/resolve-test-file.func";
import * as l10n from "@vscode/l10n";
import { getSettings } from "../../helpers/get-settings.func";
import { getSettingsSrcRootPattern } from "../../helpers/get-settings.func";
import { getSettingsSuffix } from "../../helpers/get-settings.func";
import { getSettingsTestRootPattern } from "../../helpers/get-settings.func";
import { showWarn } from "../../helpers/notify.func";
export async function goToCounterpartFile(): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const cfg = getSettings();
  const srcPattern = getSettingsSrcRootPattern(cfg);
  const testPattern = getSettingsTestRootPattern(cfg);
  const testSuffix = getSettingsSuffix(cfg);

  const filePath = editor.document.uri.fsPath;
  const name = basename(filePath);

  const isTestFile = name.includes(testSuffix + ".");

  let counterpartPath: string | null;

  if (isTestFile) {
    // Strip testSuffix from filename before resolving
    // e.g. /foo/test/db/user.test.ts to /foo/src/db/user.ts
    const strippedPath = filePath.replace(
      new RegExp(`${testSuffix.replace(".", "\\.")}(\\.[^.]+)$`),
      "$1"
    );
    counterpartPath = resolveTestFilePath(
      strippedPath,
      testPattern,
      srcPattern,
      ""
    );
  } else {
    counterpartPath = resolveTestFilePath(
      filePath,
      srcPattern,
      testPattern,
      testSuffix
    );
  }

  if (!counterpartPath || !existsSync(counterpartPath)) {
    showWarn(
      l10n.t("TestFileGen: No counterpart found for `{0}`.", basename(filePath))
    );
    return;
  }

  const doc = await workspace.openTextDocument(Uri.file(counterpartPath));
  await window.showTextDocument(doc);
}
