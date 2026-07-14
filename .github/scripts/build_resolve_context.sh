#!/bin/bash
set -euo pipefail
CONFIG="$1"

if [ ! -f "$CONFIG" ]; then
  echo "::warning::Config file not found: $CONFIG"
fi
IS_DEV=false

echo "CONFIG_FILE=$CONFIG" >> "$GITHUB_OUTPUT"

if [[ "$CONFIG" == *"dev"* ]]; then
  IS_DEV=true
elif [[ "$CONFIG" == *.json ]]; then
  if [ "$(jq -r '."patches-version" // empty' "$CONFIG")" = "dev" ]; then
    IS_DEV=true
  fi
elif [[ "$CONFIG" == *.toml ]]; then
  if awk '/^\[/ {exit} {print}' "$CONFIG" | grep -qE '^[[:space:]]*patches-version[[:space:]]*=[[:space:]]*"?dev"?'; then
    IS_DEV=true
  fi
fi

if [ "$IS_DEV" = true ]; then
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "IS_PRERELEASE=true" >> "$GITHUB_OUTPUT"
    echo "ARCHIVE_TAG=beta" >> "$GITHUB_OUTPUT"
  else
    export IS_PRERELEASE=true
    export ARCHIVE_TAG=beta
  fi
else
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "IS_PRERELEASE=false" >> "$GITHUB_OUTPUT"
    echo "ARCHIVE_TAG=stable" >> "$GITHUB_OUTPUT"
  else
    export IS_PRERELEASE=false
    export ARCHIVE_TAG=stable
  fi
fi

