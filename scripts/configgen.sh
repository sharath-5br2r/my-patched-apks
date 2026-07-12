yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.dev.toml configs/patches/*  > configs/config.dev.toml
yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.stable.toml configs/patches/*  > configs/config.stable.toml
yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.dev.toml configs/config.predl.toml  > configs/config.dev.predl.toml
yq -o=toml eval-all '. as $item ireduce ({}; . * $item)' configs/header.stable.toml configs/config.predl.toml  > configs/config.stable.predl.toml