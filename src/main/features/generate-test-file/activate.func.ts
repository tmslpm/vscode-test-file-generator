import { window, commands, Uri } from "vscode";
import type { ExtensionContext } from "vscode";
import { generateTestFile } from "./generate-test-file.func";
import { showError } from "../../helpers/notify.func";

export default function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    commands.registerCommand(
      "testFileGenerator.generate",
      async (uri?: Uri) => {
        const targetUri = uri ?? window.activeTextEditor?.document.uri;
        if (!targetUri) {
          showError(
            "No file selected. Open a file or right-click one in the Explorer."
          );
          return;
        }
        await generateTestFile(targetUri);
      }
    )
  );
}
