import { ExtensionContext } from "vscode";
import activateGenTestFile from "./main/features/generate-test-file/activate.func";
import activateAutoGenTestFile from "./main/features/auto-generate-test-file/activate.func";
import activateSyncTestFileName from "./main/features/sync-test-file-name/activate.func";

export function activate(ctx: ExtensionContext): void {
  activateGenTestFile(ctx);
  activateAutoGenTestFile(ctx);
  activateSyncTestFileName(ctx);
}

export function deactivate(): void {}
