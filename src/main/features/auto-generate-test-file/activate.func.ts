import { workspace } from "vscode";
import type { ExtensionContext } from "vscode";
import autoGenerateTestFile from "./auto-generate-file.func";
import { getSettings } from "../../helpers/get-settings.func";
import { getSettingsWatcherPattern } from "../../helpers/get-settings.func";

export default function activate(ctx: ExtensionContext) {
  if (getSettingsWatcherPattern(getSettings()).length === 0) {
    return;
  }

  ctx.subscriptions.push(
    workspace.onDidCreateFiles(async (e) => {
      for (const uri of e.files) {
        await autoGenerateTestFile(uri);
      }
    })
  );
}
