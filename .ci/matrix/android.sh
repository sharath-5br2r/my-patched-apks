#!/bin/sh -e

flavor() {
  cat <<-EOF
		{"flavor": "$1", "arch": "$2" }
	EOF
}

#standard=$(flavor standard)
chromeos=$(flavor chromeos x86_64)
optimized=$(flavor optimized arm64)
#legacy=$(flavor legacy)

# TODO: rename force_pgo to force_tag or something
# and have it build the extras here too
targets="[$chromeos,$optimized]"

echo "Android Targets: $targets"
echo "targets=${targets}" >>"$GITHUB_OUTPUT"
