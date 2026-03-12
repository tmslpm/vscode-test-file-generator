import { workspace } from "vscode";
import type { ExtensionContext } from "vscode";
import autoGenerateTestFile from "./auto-generate-file.func";

export default function activate(ctx: ExtensionContext) {
  if (
    workspace
      .getConfiguration("testFileGenerator")
      .get<boolean>("hardcoreMode") !== true
  ) {
    return;
  }

  ctx.subscriptions.push(
    workspace.onDidCreateFiles(async (e) => {
      for (const uri of e.files) {
        await autoGenerateTestFile(uri);
      }
    }),
  );
}
