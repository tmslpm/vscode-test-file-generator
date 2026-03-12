# Test File Generator

Generates test files mirroring the source directory structure,
with automatic snippet injection and optional auto-generation
on file creation.

## Features

### Generate Test File

Right-click a source file in the Explorer or use the Command
Palette → **Generate Test File**.

- Maps `src/db/user.repos.ts` → `test/db/user.repos.test.ts`
- If the test file already exists, opens it without overwriting
- Injects a configured VS Code snippet after creation

### Auto Generate Test File (Hardcore Mode)

When `hardcoreMode` is enabled, a test file is automatically created
with a `TODO` comment whenever a new source file matching `hardcorePatterns`
is created.

### Sync Test File Rename

When a source file is renamed, the corresponding test file is
renamed automatically (with confirmation prompt).

## Configuration

| Setting                              | Default       | Description                                        |
| ------------------------------------ | ------------- | -------------------------------------------------- |
| `testFileGenerator.srcRoot`          | `src/main`    | Root directory of source files                     |
| `testFileGenerator.testRoot`         | `src/test`    | Root directory of test files                       |
| `testFileGenerator.testSuffix`       | `.test`       | Suffix before the extension (`user.test.ts`)       |
| `testFileGenerator.snippetName`      | `""`          | VS Code snippet name to inject after file creation |
| `testFileGenerator.hardcoreMode`     | `false`       | Enable auto test file generation on file creation  |
| `testFileGenerator.hardcorePatterns` | `["**/*.ts"]` | Glob patterns to match files for auto-generation   |

## Snippet Setup

Define a snippet in `.vscode/*.code-snippets`:

```json
{
  "bun test": {
    "prefix": "bun-test",
    "scope": "typescript",
    "body": [
      "import { describe, test, expect } from \"bun:test\";",
      "",
      "describe(\"$TM_FILENAME_BASE\", () => {",
      "\ttest(\"$1\", () => {",
      "\t\t$2",
      "\t});",
      "});"
    ]
  }
}
```

Then configure:

```json
"testFileGenerator.snippetName": "bun test"
```

## Example Settings

### Workspace Settings

```json5
{
  "testFileGenerator.snippetName": "bun test",
  "testFileGenerator.sourceRoot": "src",
  "testFileGenerator.testRoot": "test",
  "testFileGenerator.testSuffix": ".test",
  "testFileGenerator.hadrdcoreMode": true,
  "testFileGenerator.hadrdcorePatterns": ["**/*.ts"],
}
```

### Folder Settings

```json5
{
  "folders": [
    ...
  ],
  "settings": {
    "testFileGenerator.snippetName": "bun test",
    "testFileGenerator.sourceRoot": "src",
    "testFileGenerator.testRoot": "test",
    "testFileGenerator.testSuffix": ".test",
    "testFileGenerator.hadrdcoreMode": false,
    "testFileGenerator.hardcorePatterns": ["**/*.ts"],
  },
}
```
