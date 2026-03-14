#!/usr/bin/env sh
# sh ./scripts/localize.sh copy && npx @vscode/vsce package && sh ./scripts/localize.sh clean

ACTION=$1
SRC="./scripts"
DEST="./"

if [ "$ACTION" = "copy" ]; then
  echo "Copying NLS files to root..."
  cp "$SRC"/package.nls*.json "$DEST"
  echo "Done."
elif [ "$ACTION" = "clean" ]; then
  echo "Cleaning NLS files from root..."
  rm -f "$DEST"/package.nls*.json
  echo "Done."
else
  echo "Usage: localize.sh [copy|clean]"
  exit 1
fi
