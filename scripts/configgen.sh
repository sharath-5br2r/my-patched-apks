yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.dev.toml configs/patches/*  > configs/config.dev.toml
yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.stable.toml configs/patches/*  > configs/config.stable.toml
