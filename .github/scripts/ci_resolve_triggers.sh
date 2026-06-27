#!/bin/bash
set -euo pipefail
if [ "${CREATED:-false}" = "true" ]; then
  echo "TRIGGER_STABLE=0" >> "$GITHUB_OUTPUT"
  echo "TRIGGER_PRERELEASE=0" >> "$GITHUB_OUTPUT"
  echo "TRIGGER_LATEST=0" >> "$GITHUB_OUTPUT"
  exit 0
fi

RAW_TRIGGER_STABLE=${RAW_TRIGGER_STABLE:-0}
RAW_TRIGGER_PRERELEASE=${RAW_TRIGGER_PRERELEASE:-0}
RAW_TRIGGER_LATEST=${RAW_TRIGGER_LATEST:-0}

TRIGGER_STABLE=0
TRIGGER_PRERELEASE=0
TRIGGER_LATEST=0

if [ "$RAW_TRIGGER_STABLE" = "1" ]; then
  CFG=".github/configs/config.stable.updated.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_STABLE=1
  else
    echo "::notice::Skipping stable build trigger: no enabled apps in $CFG"
  fi
fi

if [ "$RAW_TRIGGER_PRERELEASE" = "1" ]; then
  CFG=".github/configs/config.dev.updated.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_PRERELEASE=1
  else
    echo "::notice::Skipping dev build trigger: no enabled apps in $CFG"
  fi
fi

if [ "$RAW_TRIGGER_LATEST" = "1" ]; then
  CFG=".github/configs/config.latest.updated.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_LATEST=1
  else
    echo "::notice::Skipping latest build trigger: no enabled apps in $CFG"
  fi
fi

echo "TRIGGER_STABLE=$TRIGGER_STABLE" >> "$GITHUB_OUTPUT"
echo "TRIGGER_PRERELEASE=$TRIGGER_PRERELEASE" >> "$GITHUB_OUTPUT"
echo "TRIGGER_LATEST=$TRIGGER_LATEST" >> "$GITHUB_OUTPUT"
