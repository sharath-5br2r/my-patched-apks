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
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "IS_DEV=true" >> "$GITHUB_OUTPUT"
  else
    export IS_DEV=true
  fi
else
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "IS_DEV=false" >> "$GITHUB_OUTPUT"
  else
    export IS_DEV=false
  fi
fi

