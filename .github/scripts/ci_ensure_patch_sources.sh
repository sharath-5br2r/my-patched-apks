#!/bin/bash
set -euo pipefail
mkdir -p .github/configs
PATCH_FILE=".github/configs/patch_downstream_sources.json"

if [ ! -f "$PATCH_FILE" ]; then
  cat > "$PATCH_FILE" << 'EOF'
{
  "dummy_patch": { "enabled": false, "repo": "" }
}
EOF
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "created=true" >> "$GITHUB_OUTPUT"
  else
    export CREATED=true
  fi
else
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "created=false" >> "$GITHUB_OUTPUT"
  else
    export CREATED=false
  fi
fi

