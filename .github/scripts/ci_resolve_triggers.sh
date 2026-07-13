#!/bin/bash
set -euo pipefail
if [ "${CREATED:-false}" = "true" ]; then
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "TRIGGER_STABLE=0" >> "$GITHUB_OUTPUT"
    echo "TRIGGER_PRERELEASE=0" >> "$GITHUB_OUTPUT"
  else
    export TRIGGER_STABLE=0
    export TRIGGER_PRERELEASE=0
  fi
  echo "No patch sources file found, created a new one. No triggers will be set."
  exit 0
fi


RAW_TRIGGER_STABLE=${RAW_TRIGGER_STABLE:-0}
RAW_TRIGGER_PRERELEASE=${RAW_TRIGGER_PRERELEASE:-0}
RAW_TRIGGER_APP_UPDATE=${RAW_TRIGGER_APP_UPDATE:-0}

TRIGGER_STABLE=0
TRIGGER_PRERELEASE=0
TRIGGER_PREDL_STABLE=0
TRIGGER_PREDL_PRERELEASE=0

if [ "$RAW_TRIGGER_STABLE" = "1" ] || [ "$RAW_TRIGGER_APP_UPDATE" = "1" ]; then
  CFG=".github/configs/config.stable.updated.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_STABLE=1
  else
    echo "::notice::Skipping stable build trigger: no enabled apps in $CFG"
  fi
fi

if [ "$RAW_TRIGGER_STABLE" = "1" ] || [ "$RAW_TRIGGER_APP_UPDATE" = "1" ]; then
  CFG=".github/configs/config.stable.updated.predl.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_PREDL_STABLE=1
  else
    echo "::notice::Skipping predl stable build trigger: no enabled apps in $CFG"
  fi
fi
if [ "$RAW_TRIGGER_PRERELEASE" = "1" ] || [ "$RAW_TRIGGER_APP_UPDATE" = "1" ]; then
  CFG=".github/configs/config.dev.updated.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_PRERELEASE=1
  else
    echo "::notice::Skipping dev build trigger: no enabled apps in $CFG"
  fi
fi
if [ "$RAW_TRIGGER_PRERELEASE" = "1" ] || [ "$RAW_TRIGGER_APP_UPDATE" = "1" ]; then
  CFG=".github/configs/config.dev.updated.predl.json"
  ENABLED_COUNT=$(jq '[.[] | objects | select(.enabled != false)] | length' "$CFG" || echo 0)
  if [ "${ENABLED_COUNT:-0}" -gt 0 ]; then
    TRIGGER_PREDL_PRERELEASE=1
  else
    echo "::notice::Skipping predl dev build trigger: no enabled apps in $CFG"
  fi
fi
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "TRIGGER_STABLE=$TRIGGER_STABLE" >> "$GITHUB_OUTPUT"
  echo "TRIGGER_PRERELEASE=$TRIGGER_PRERELEASE" >> "$GITHUB_OUTPUT"
  echo "TRIGGER_PREDL_STABLE=$TRIGGER_PREDL_STABLE" >> "$GITHUB_OUTPUT"
  echo "TRIGGER_PREDL_PRERELEASE=$TRIGGER_PREDL_PRERELEASE" >> "$GITHUB_OUTPUT"
else
  export TRIGGER_STABLE="$TRIGGER_STABLE"
  export TRIGGER_PRERELEASE="$TRIGGER_PRERELEASE"
  export TRIGGER_PREDL_STABLE="$TRIGGER_PREDL_STABLE"
  export TRIGGER_PREDL_PRERELEASE="$TRIGGER_PREDL_PRERELEASE"
fi
