# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-03-12

### Added

- Generate Test File command via Explorer context menu and Command Palette
- Automatic source root detection (`src` or `.`)
- Configurable `testRoot`, `srcRoot`, `testSuffix`, `hardcorePatterns`, and `snippetName`
- VS Code snippet injection after test file creation
- Hardcore Mode: auto-generates test files on source file creation via `hardcorePatterns`
- Sync Test File Rename: renames the corresponding test file when a source file is renamed
