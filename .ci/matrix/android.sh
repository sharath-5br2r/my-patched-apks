#!/bin/sh -e

flavor() {
	cat <<-EOF
		{"flavor": "$1"}
	EOF
}

#standard=$(flavor standard)
chromeos=$(flavor chromeos)
ptimized=$(flavor optimized)
#legacy=$(flavor legacy)

# TODO: rename force_pgo to force_tag or something
# and have it build the extras here too
targets="[$chromeos,$ptimized]"

echo "Android Targets: $targets"
echo "targets=${targets}" >>"$GITHUB_OUTPUT"
