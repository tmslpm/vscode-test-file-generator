# Test File Generator
 
Inspired by IntelliJ IDEA's "Generate Test" feature, this extension 
brings the same workflow to VS Code, language agnostic, configurable, 
and designed to work in any project structure including monorepos.

## Features

### Generate Test File

Right-click a source file in the Explorer or use the Command
Palette → **Generate Test File**.

- Maps `src/db/user.repos.ts` → `test/db/user.repos.test.ts`
- If the test file already exists, opens it without overwriting
- Injects a configured VS Code snippet after creation

### Sync Test File Rename

When a source file is renamed, the corresponding test file is
renamed automatically (with confirmation prompt).

### Go to Counterpart File

Inspired by IntelliJ IDEA's `Ctrl+Shift+T`, toggle between a 
source file and its test file instantly with `Alt+Shift+T` or 
via the context menu. Works in both directions, source → test 
and test → source.

### Auto Generate Test File (Hardcore Mode)
 
When `hardcorePatterns` is configured, a test file is automatically 
created with a `TODO` comment whenever a new source file matching 
one of the patterns is created. Set to an empty array to disable.

## Configuration
 
### Workspace Settings

```json5
{
  "testFileGenerator.sourceRootPattern": "src",
  "testFileGenerator.testRootPattern": "test",
  "testFileGenerator.testSuffix": ".test",
  "testFileGenerator.hardcorePatterns": []
}
```

### Folder Settings

```json5
{
  "folders": [
    ...
  ],
  "settings": {
    "testFileGenerator.sourceRootPattern": "src/main",
    "testFileGenerator.testRootPattern": "src/test",
    "testFileGenerator.testSuffix": ".test",
    "testFileGenerator.hardcorePatterns": [
      "**/*.ts" // /!\ hardcore mode enable (require restart vscode)
    ]
  }
}
```

## Add/Overwrite Snippet

Snippets are resolved by VS Code using the standard priority order: 
```
workspace → user → extension.
```

To override a built-in snippet or add one for an unsupported language, 
create a file in `.vscode/` named `tfg-{ext}.code-snippets` with a 
snippet keyed `tfg-{ext}-test`.

Example for TypeScript (`.vscode/tfg-ts.code-snippets`):

```json
{
  "tfg-ts-test": {
    "prefix": "tfg-ts-test",
    "scope": "typescript",
    "body": [
      "describe(\"$TM_FILENAME_BASE\", () => {", 
      /**/ "\ttest(\"$1\", () => {", 
      /**/ "\t\t$2", 
      /**/ "\t});", 
      "});"
    ]
  }
}
```

The snippet key and prefix must match exactly `tfg-{ext}-test`.

> [!NOTE]
> **Snippet Resolution**: The extension automatically resolve a 
> snippet based on the source file extension. The snippet name is 
> built as `tfg-{ext}-test`, example:
> | filename | | ext  | | key name     |
> |----------|-|------|-|--------------|
> | `foo.ts` |→| `ts` |→| `tfg-ts-test`|
> | `bar.py` |→| `py` |→| `tfg-py-test`|
> 
> VS Code resolves the snippet using its standard priority order:
> 1. Workspace snippets (`.vscode/*.code-snippets`)
> 2. User snippets
> 3. Extension built-in snippets
>
> **If no snippet matches, the file is created empty**, no error, no prompt.

