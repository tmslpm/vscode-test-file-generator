import { workspace } from "vscode";
import type { ExtensionContext } from "vscode";
import { syncTestFileNameWithSrcFile } from "./sync-test-file-name.func";

export default function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    workspace.onDidRenameFiles((e) => syncTestFileNameWithSrcFile(ctx, e.files))
  );
}
