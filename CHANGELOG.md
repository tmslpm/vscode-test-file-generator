# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 
## [0.0.3] - 2026-03-15

### Fixed
- Corrected repository URL in `package.json`

## [0.0.2] - 2026-03-14

### Added
- Go to Counterpart File command (`Alt+Shift+T`), toggle between 
  source and test file in both directions, inspired by IntelliJ 
  IDEA's `Ctrl+Shift+T`
- Built-in snippets for all languages natively supported by VS Code
- i18n support for UI messages, French, Spanish, German, Brazilian 
  Portuguese, Simplified Chinese, Japanese, Korean
- `package.nls` localization for extension metadata and settings 
  descriptions
- Monorepo support, path-based pattern matching for `sourceRootPattern` 
  and `testRootPattern` instead of workspace-relative roots

### Changed
- `srcRoot` / `testRoot` renamed to `sourceRootPattern` / `testRootPattern` 
  to better reflect path segment matching behavior
- `snippetName` removed, snippet is now resolved automatically from 
  file extension using the `tfg-{ext}-test` convention
- Test file mapping is now independent of workspace root, enabling 
  multi-project workspaces

> [!NOTE]
> Translations were generated with AI assistance and may contain 
> errors. 

## [0.0.1] - 2026-03-12

### Added

- Generate Test File command via Explorer context menu and Command Palette
- Automatic source root detection (`src` or `.`)
- Configurable `testRoot`, `srcRoot`, `testSuffix`, `hardcorePatterns`, and `snippetName`
- VS Code snippet injection after test file creation
- Hardcore Mode: auto-generates test files on source file creation via `hardcorePatterns`
- Sync Test File Rename: renames the corresponding test file when a source file is renamed
