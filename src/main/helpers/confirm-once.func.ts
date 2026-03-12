import { ExtensionContext, window } from "vscode";

export type ConfirmOnceResult = "confirm" | "skip";

export async function confirmOnce(
  ctx: ExtensionContext,
  key: string,
  message: string,
): Promise<ConfirmOnceResult> {
  if (ctx.globalState.get<boolean>(key, false)) return "confirm";

  const answer = await window.showWarningMessage(
    message,
    { modal: false },
    "Confirm",
    "Always",
    "Skip",
  );

  if (answer === "Always") {
    await ctx.globalState.update(key, true);
    return "confirm";
  }

  return answer === "Confirm" 
    ? "confirm" 
    : "skip";
}
