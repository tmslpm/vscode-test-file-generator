# Contributing

## Adding Snippets

Snippets live in `src/main/snippets/`, one file per language extension.

**Naming convention:** `tfg-{ext}.code-snippets`

| Extension | File                   |
| --------- | ---------------------- |
| `.ts`     | `tfg-ts.code-snippets` |
| `.py`     | `tfg-py.code-snippets` |
| `.go`     | `tfg-go.code-snippets` |

**Snippet key pattern:** `tfg-{ext}-test` (e.g. `tfg-go-test`, `tfg-rs-test`)

Each file should contain exactly one snippet, the most widely
adopted framework for that language. If the language has no
dominant framework, pick the one closest to the standard library.

### Steps

#### 1. Create `src/main/snippets/tfg-{ext}.code-snippets`:

Example `src/main/snippets/tfg-foo.code-snippets`:

```json
{
  "tfg-foo-test": {
    "prefix": "tfg-foo-test",
    "body": ["foo"]
  }
}
```

#### 2. Register it in `package.json` under `contributes.snippets`:

```json
{
  "language": "{ext}",
  "path": "./src/main/snippets/tfg-{ext}.code-snippets"
}
```

example

```json
{
  "language": "foo",
  "path": "./src/main/snippets/tfg-foo.code-snippets"
}
```
#### 3. And open a PR

> [!NOTE]
> The following languages require a third-party VS Code extension 
> to be installed before their snippets can be registered: `Elixir`, 
> `Scala`, `Kotlin`, `Zig`, `OCaml`, `Haskell`. 
> 
> VS Code does not provide a way to conditionally register snippets 
> based on installed extensions, **so these are not and will not be bundled 
> with this extension**.
> 
> If you use one of these languages, install the relevant VS Code
> extension, then add the snippet file manually in your project. 
> Default snippet templates are available in the repository under 
> `src/main/snippets/`.
> 
>  ```bash
>  Unknown language in `contributes.test-file-generator.language`. Provided value: elixir
>  Unknown language in `contributes.test-file-generator.language`. Provided value: scala
>  Unknown language in `contributes.test-file-generator.language`. Provided value: kotlin
>  Unknown language in `contributes.test-file-generator.language`. Provided value: zig
>  Unknown language in `contributes.test-file-generator.language`. Provided value: ocaml
>  Unknown language in `contributes.test-file-generator.language`. Provided value: haskell
>  ```

---

## Fix issues / Improve

- TODO contributing - "Fix issues / Improve"

## Adding Features

- TODO contributing - "Adding Features"
