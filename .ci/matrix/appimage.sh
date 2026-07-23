#!/bin/sh -e

use_extra() {
	[ "$DEVEL" != "true" ] || [ "$FORCE_PGO" = "true" ]
}

## Architectures ##
arch() {
	cat <<-EOF
		{"runs-on": "$1", "arch": "$2"}
	EOF
}

amd=$(arch ubuntu-latest amd64)
arm=$(arch ubuntu-24.04-arm aarch64)

#legacy=$(arch ubuntu-latest legacy)
#steam=$(arch ubuntu-latest steamdeck)
#ally=$(arch ubuntu-latest rog-ally)

arches="[$amd, $arm]"

echo "Architectures: $arches"
echo "matrix=${arches}" >>"$GITHUB_OUTPUT"

## Compilers ##

compiler() {
	cat <<-EOF
		{"program": "$1", "target": "$2"}
	EOF
}

#gcc=$(compiler gcc standard)
pgo=$(compiler clang pgo)

compilers="[$pgo]"

echo "Compilers: $compilers"
echo "compiler=${compilers}" >>"$GITHUB_OUTPUT"
