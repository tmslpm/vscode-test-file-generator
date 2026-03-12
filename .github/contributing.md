# TODO CONTRIBUTING.MD

## Adding Snippets

Snippets are located in `src/main/snippets/`, one file per language.

Naming convention: `{language_extension}.code-snippets`

- `.ts` → `ts.code-snippets`
- `.py` → `py.code-snippets`
- `.go` → `go.code-snippets`

**Each snippet key must follow the pattern `tfg-{framework}`
(e.g. `tfg-vitest`, `tfg-pytest`).**

This prefix is used by the extension to list available snippets
in the context menu.

To add support for a new framework, add a snippet entry to the
relevant file and open a PR.
