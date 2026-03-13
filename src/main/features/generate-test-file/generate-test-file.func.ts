import { window, workspace, commands, Uri, l10n } from "vscode";
import { basename, extname } from "node:path";
import { getSettings } from "../../helpers/get-settings.func";
import { getSettingsTodoLines } from "../../helpers/get-settings.func";
import { getSettingsSrcRootPattern } from "../../helpers/get-settings.func";
import { getSettingsSuffix } from "../../helpers/get-settings.func";
import { getSettingsTestRootPattern } from "../../helpers/get-settings.func";
import { resolveTestFilePath } from "../../helpers/resolve-test-file.func";
import { existsSync } from "node:fs";
import { showError } from "../../helpers/notify.func";

export async function generateTestFile(
  sourceUri: Uri,
  isForImplementLater: boolean = false
): Promise<void> {
  // Resolve config

  const cfg = getSettings();
  const srcPattern = getSettingsSrcRootPattern(cfg);
  const testPattern = getSettingsTestRootPattern(cfg);
  const suffix = getSettingsSuffix(cfg);

  // Resolve path

  const testFilePath = resolveTestFilePath(
    sourceUri.fsPath,
    srcPattern,
    testPattern,
    suffix
  );

  if (!testFilePath) {
    showError(
      l10n.t(
        "TestFileGen: `{0}` does not contain pattern `{1}`.",
        basename(sourceUri.fsPath),
        srcPattern
      )
    );
    return;
  }

  // Create test file
  if (!existsSync(testFilePath)) {
    try {
      await workspace.fs.writeFile(
        Uri.file(testFilePath),
        new TextEncoder().encode(
          isForImplementLater
            ? getSettingsTodoLines(cfg).replaceAll(
                "{name}",
                basename(testFilePath)
              )
            : ""
        )
      );
    } catch (error) {
      showError(
        l10n.t(
          "Could not create Test file at `{0}`. Check permissions.",
          testFilePath
        ),
        error
      );
      return;
    }
  }

  if (isForImplementLater) {
    return;
  }

  // Open test file

  try {
    await workspace
      .openTextDocument(testFilePath)
      .then((doc) => window.showTextDocument(doc));
  } catch (error) {
    showError(l10n.t("Test file but could not be opened."), error);
    return;
  }

  // Insert vscode snippets

  const snippetName = `tfg-${extname(testFilePath).substring(1)}-test`;
  try {
    await commands.executeCommand("editor.action.insertSnippet", {
      name: snippetName
    });
  } catch (error) {
    showError(l10n.t("Failed to insert snippet: '{0}'", snippetName), error);
  }
}
