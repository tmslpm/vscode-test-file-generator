# Contributing

## Adding/Improve Snippets

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

> [!TIP]
> Not comfortable with Git or PRs? Open an issue with the translated JSON attached
> and we'll integrate it for you.

> [!WARNING]
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


--------------------------------------------------------------------------------

## Adding/Improving Translations

Translations live in two places:

- `src/main/l10n/` : UI messages (runtime strings via `@vscode/l10n`)
- `scripts/nls/` : extension metadata and settings descriptions (via `package.nls.*.json`)

### Adding a new language

#### 1. UI messages : create `src/main/l10n/bundle.l10n.{locale}.json`

Copy `src/main/l10n/bundle.l10n.json` as a base and translate the values. Keep the keys unchanged.

#### 2. Metadata : create `scripts/nls/package.nls.{locale}.json`

Copy `scripts/nls/package.nls.json` as a base and translate the values. Keep the keys unchanged.

#### 3. Open a PR

### Improving an existing translation

Edit the relevant `bundle.l10n.{locale}.json` or `package.nls.{locale}.json` file directly and open a PR.

Locale codes follow the [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) standard (e.g. `fr`, `de`, `pt-br`, `zh-cn`).

> [!TIP]
> Not comfortable with Git or PRs? Open an issue with the translated JSON attached
> and we'll integrate it for you.

--------------------------------------------------------------------------------

## Fix issues / Improve

- TODO contributing - "Fix issues / Improve"

## Adding Features

- TODO contributing - "Adding Features"
