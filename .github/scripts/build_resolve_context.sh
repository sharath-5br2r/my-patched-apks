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
    IS_DEV=false
  fi
elif [[ "$CONFIG" == *.toml ]]; then
  if awk '/^\[/ {exit} {print}' "$CONFIG" | grep -qE '^[[:space:]]*patches-version[[:space:]]*=[[:space:]]*"?dev"?'; then
    IS_DEV=false
  fi
fi

if [ "$IS_DEV" = true ]; then
  echo "IS_PRERELEASE=true" >> "$GITHUB_OUTPUT"
  echo "TG_THREAD_ID=350" >> "$GITHUB_OUTPUT"
  echo "TITLE_SUFFIX= (Pre-release)" >> "$GITHUB_OUTPUT"
  echo "ARCHIVE_TAG=beta" >> "$GITHUB_OUTPUT"
else
  echo "IS_PRERELEASE=false" >> "$GITHUB_OUTPUT"
  echo "TG_THREAD_ID=262" >> "$GITHUB_OUTPUT"
  echo "TITLE_SUFFIX=" >> "$GITHUB_OUTPUT"
  echo "ARCHIVE_TAG=stable" >> "$GITHUB_OUTPUT"
fi
