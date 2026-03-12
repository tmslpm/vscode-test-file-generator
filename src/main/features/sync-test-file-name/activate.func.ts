import { workspace } from "vscode";
import type { ExtensionContext } from "vscode";
import { resolveTestFilePath } from "../../helpers/resolve-test-file.func";
import { getStrOrDefault } from "../../helpers/get-settings.func";
import { existsSync, renameSync } from "node:fs";
import { confirmOnce } from "../../helpers/confirm-once.func";
import { basename } from "node:path";
import { hasWorkspaceOrShowError } from "../../helpers/assert-has-workspace.func";

export default function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    workspace.onDidRenameFiles(async (e) => {
      if (!hasWorkspaceOrShowError()) {
        return;
      }

      const cfg = workspace.getConfiguration("testFileGenerator");
      const srcPattern = getStrOrDefault(cfg.get("srcRoot"), () => "src");
      const testPattern = getStrOrDefault(cfg.get("testRoot"), () => "test");
      const testSuffix = getStrOrDefault(cfg.get("testSuffix"), () => ".test");

      const toRename = e.files.flatMap(({ oldUri, newUri }) => {
        const oldTestPath = resolveTestFilePath(
          oldUri.fsPath,
          srcPattern,
          testPattern,
          testSuffix,
        );

        if (!oldTestPath || !existsSync(oldTestPath)) {
          return [];
        }

        const newTestPath = resolveTestFilePath(
          newUri.fsPath,
          srcPattern,
          testPattern,
          testSuffix,
        );

        if (!newTestPath) {
          return [];
        }

        return [{ oldTestPath, newTestPath }];
      });

      if (!toRename.length) {
        return;
      }

      const result = await confirmOnce(
        ctx,
        "syncRenameDoNotAsk",
        toRename.length === 1
          ? `Rename test file "${basename(toRename[0].oldTestPath)}"?`
          : `Rename ${toRename.length} test files?`,
      );

      if (result === "skip") {
        return;
      }

      for (const { oldTestPath, newTestPath } of toRename) {
        try {
          renameSync(oldTestPath, newTestPath);
        } catch (error) {
          console.error("[TestFileGen] Failed to rename test file:", error);
        }
      }
    }),
  );
}
