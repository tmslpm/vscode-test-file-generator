import { commands, Uri, type ExtensionContext } from "vscode";
import { goToCounterpartFile } from "./go-to-counterpart-file.func";

export default function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    commands.registerCommand(
      "testFileGenerator.goToCounterpart",
      goToCounterpartFile
    )
  );
}
