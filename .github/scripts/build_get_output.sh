#!/bin/bash
set -euo pipefail
if [ -n "${GITHUB_OUTPUT:-}" ]; then
    DELIM="$(openssl rand -hex 8)"
    echo "BUILD_LOG<<${DELIM}" >> "$GITHUB_OUTPUT"
    cat build.md >> "$GITHUB_OUTPUT"
    echo "${DELIM}" >> "$GITHUB_OUTPUT"
else
    export BUILD_LOG="$(cat build.md)"
fi
