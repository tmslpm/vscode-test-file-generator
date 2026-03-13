import { ExtensionContext } from "vscode";
import { FileRenameEvent } from "vscode";
import { l10n } from "vscode";
import { Uri } from "vscode";
import { workspace } from "vscode";
import { resolveTestFilePath } from "../../helpers/resolve-test-file.func";
import { getSettings } from "../../helpers/get-settings.func";
import { getSettingsSrcRootPattern } from "../../helpers/get-settings.func";
import { getSettingsSuffix } from "../../helpers/get-settings.func";
import { getSettingsTestRootPattern } from "../../helpers/get-settings.func";
import { existsSync } from "node:fs";
import { basename } from "node:path";
import { showConfirmOnce, showError } from "../../helpers/notify.func";

export async function syncTestFileNameWithSrcFile(
  ctx: ExtensionContext,
  files: FileRenameEvent["files"]
) {
  const cfg = getSettings();
  const srcPattern = getSettingsSrcRootPattern(cfg);
  const testPattern = getSettingsTestRootPattern(cfg);
  const testSuffix = getSettingsSuffix(cfg);

  const toRename = files.flatMap(({ oldUri, newUri }) => {
    const old = resolveTestFilePath(
      oldUri.fsPath,
      srcPattern,
      testPattern,
      testSuffix
    );

    if (!old || !existsSync(old)) {
      return [];
    }

    const curr = resolveTestFilePath(
      newUri.fsPath,
      srcPattern,
      testPattern,
      testSuffix
    );

    if (!curr) {
      return [];
    }

    return [{ old, curr }];
  });

  if (!toRename.length) {
    return;
  }

  const accept = await showConfirmOnce(
    ctx,
    "syncRenameDoNotAsk",
    toRename.length === 1
      ? l10n.t("Rename test file `{0}`?", basename(toRename[0].old))
      : l10n.t("Rename `{0}` test files?", toRename.length)
  );

  if (!accept) {
    return;
  }

  await Promise.allSettled(
    toRename.map(({ old, curr }) =>
      workspace.fs
        .rename(Uri.file(old), Uri.file(curr))
        .then(undefined, (err) =>
          showError(
            l10n.t("TestFileGen: Failed to rename `{0}`", basename(old)),
            err
          )
        )
    )
  );
}
