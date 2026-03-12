# Install.md

## Prerequisites

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com)
- [VS Code](https://code.visualstudio.com)

## Setup

```bash
gh repo clone tmslpm/vscode-test-file-generator
```

And run `npm install` inside the project.

```bash
npm install
```

> [!NOTE]
> Optionally, open the pre-configured workspace instead of the folder:
> ```bash
> code .vscode/vs.code-workspace
> ```

## Development

Press `F5` to launch the Extension Development Host, a new VsCode
window opens with the extension loaded.

## Tests

```bash
npm test
```

## Project Structure

```
src/
├── extension.ts (Entry point)
│
├── main/
│   │
│   ├── snippets/ (Built-in snippets per language)
│   │
│   ├── features/ (All Features)
│   │   │
│   │   └── ...
│   │
│   └── helpers/ (Shared utilities)
│       │
│       └── ...
│
└── test/ (All Tests)
    │
    └── ...
```
