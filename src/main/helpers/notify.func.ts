import { ExtensionContext, window } from "vscode";
import MakeLogger from "./make-logger.func";

export const log = MakeLogger("NotifyService");

export function showInfo(msg: string) {
  log.debug(msg); // logged as debug to avoid noise in the output channel
  window.showInformationMessage(`[TFG] ${msg}`);
}

export function showWarn(msg: string) {
  log.warn(msg);
  window.showWarningMessage(`[TFG] ${msg}`);
}

export function showError(msg: string, err?: unknown) {
  log.error(err instanceof Error ? err : new Error(String(err)), msg);
  window.showErrorMessage(msg);
}

export async function showConfirmOnce(
  ctx: ExtensionContext,
  key: string,
  message: string
): Promise<boolean> {
  if (ctx.globalState.get<boolean>(key, false)) {
    return true;
  }

  const answer = await window.showWarningMessage(
    message,
    { modal: false },
    "Confirm",
    "Always",
    "Skip"
  );

  if (answer === "Always") {
    ctx.globalState.update(key, true);
    return true;
  }

  return answer === "Confirm";
}
