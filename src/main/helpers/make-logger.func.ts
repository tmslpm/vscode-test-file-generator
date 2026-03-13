import { window } from "vscode";

/**
 * Creates a named VS Code output channel for logging.
 *
 * @param name - The name to identify the channel
 *               (e.g. class or module name)
 *
 * @returns A VS Code LogOutputChannel scoped to the given name
 *
 * @example
 * ```ts
 * const log = MakeLogger("MyService")
 * log.info("started")
 * ```
 */
export default function MakeLogger(name: string) {
  return window.createOutputChannel(`[TFG/${name}]`, { log: true });
}
