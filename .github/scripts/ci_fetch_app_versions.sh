#!/bin/bash
set -euo pipefail

# Convert utils.sh to Unix line endings if needed
dos2unix utils.sh 2>/dev/null || true

source utils.sh
set_prebuilts

# Find all app configs
CONFIG_FILES=$(find configs/patches configs/dummy.toml -name "*.toml")

if [ -z "$CONFIG_FILES" ]; then
    echo "No config files found in configs/patches. Exiting."
    exit 0
fi

# Convert all TOML files to a single JSON
# shellcheck disable=SC2086
yq -o=json eval-all '. as $item ireduce ({}; . * $item)' $CONFIG_FILES > temp_all_configs.json

[ -f .github/configs/app_versions.json ] || echo '{}' > .github/configs/app_versions.json
> fetched_app_versions.jsonl
CHECK_ONLY_LISTED=$(jq -r '."_check_only_listed" // false' .github/configs/app_versions.json)

if [ "$CHECK_ONLY_LISTED" = "true" ]; then
    jq -r 'to_entries | map(select(.key | startswith("_") | not)) | .[] | "\(.key)|\(.value.keys[0])"' .github/configs/app_versions.json > check_list.txt
else
    # All enabled apps
    ENABLED_APPS=$(jq -r 'to_entries | map(select((.value | type == "object") and .value.enabled == true)) | .[].key' temp_all_configs.json)
    
    # Get all grouped apps to exclude them
    GROUPED_APPS=$(jq -r 'to_entries | map(select(.key | startswith("_") | not)) | .[].value.keys[]?' .github/configs/app_versions.json 2>/dev/null || echo "")
    
    > check_list.txt
    
    # Add groups first
    jq -r 'to_entries | map(select(.key | startswith("_") | not)) | .[] | "\(.key)|\(.value.keys[0])"' .github/configs/app_versions.json >> check_list.txt
    
    # Add non-grouped enabled apps
    for app in $ENABLED_APPS; do
        if ! echo "$GROUPED_APPS" | grep -qx "$app"; then
            echo "$app|$app" >> check_list.txt
        fi
    done
fi

declare -A cached_versions

while IFS='|' read -r group app; do
    if [ -z "$group" ] || [ -z "$app" ]; then continue; fi
    echo "Checking version for $group ($app)..."
    
    
    uptodown_url=$(jq -r ".\"$app\".\"uptodown-dlurl\" // empty" temp_all_configs.json)
    apkmirror_url=$(jq -r ".\"$app\".\"apkmirror-dlurl\" // empty" temp_all_configs.json)
    apkpure_url=$(jq -r ".\"$app\".\"apkpure-dlurl\" // empty" temp_all_configs.json)
    apkcombo_url=$(jq -r ".\"$app\".\"apkcombo-dlurl\" // empty" temp_all_configs.json)
    local_url=$(jq -r ".\"$app\".\"local-dlurl\" // empty" temp_all_configs.json)

    dlurls=()
    sources=()
    [ -n "$local_url" ] && { dlurls+=("$local_url"); sources+=("local"); }
    [ -n "$uptodown_url" ] && { dlurls+=("$uptodown_url"); sources+=("uptodown"); }
    [ -n "$apkmirror_url" ] && { dlurls+=("$apkmirror_url"); sources+=("apkmirror"); }
    [ -n "$apkpure_url" ] && { dlurls+=("$apkpure_url"); sources+=("apkpure"); }
    [ -n "$apkcombo_url" ] && { dlurls+=("$apkcombo_url"); sources+=("apkcombo"); }

    if [ ${#dlurls[@]} -eq 0 ]; then
        echo "No dlurl for $app, skipping"
        continue
    fi
    
    latest_ver=""
    for i in "${!dlurls[@]}"; do
        dlurl="${dlurls[$i]}"
        source="${sources[$i]}"
        
        if [ -n "${cached_versions[$dlurl]:-}" ]; then
            latest_ver="${cached_versions[$dlurl]}"
            echo "Reusing cached version for $app: $latest_ver"
            break
        else
            if [[ "$source" == "uptodown" ]]; then
                get_uptodown_resp "$dlurl" || { echo "Failed uptodown resp for $app"; continue; }
                vers=$(get_uptodown_vers) || { echo "Failed uptodown vers for $app"; continue; }
                latest_ver=$(echo "$vers" | get_highest_ver) || true
            elif [[ "$source" == "apkmirror" ]]; then
                get_apkmirror_resp "$dlurl" || { echo "Failed apkmirror resp for $app"; continue; }
                vers=$(get_apkmirror_vers) || { echo "Failed apkmirror vers for $app"; continue; }
                latest_ver=$(echo "$vers" | get_highest_ver) || true
            elif [[ "$source" == "apkpure" ]]; then
                get_apkpure_resp "$dlurl" || { echo "Failed apkpure resp for $app"; continue; }
                vers=$(get_apkpure_vers) || { echo "Failed apkpure vers for $app"; continue; }
                latest_ver=$(echo "$vers" | get_highest_ver) || true
            elif [[ "$source" == "apkcombo" ]]; then
                get_apkcombo_resp "$dlurl" || { echo "Failed apkcombo resp for $app"; continue; }
                vers=$(get_apkcombo_vers) || { echo "Failed apkcombo vers for $app"; continue; }
                latest_ver=$(echo "$vers" | get_highest_ver) || true
            elif [[ "$dlurl" == *"eden"* ]]; then
                latest_ver=$(gh run list -R Eden-CI/Workflow -w nightly.yml --status success --limit 1 --json createdAt -q ".[0].createdAt") || { echo "Failed to fetch Eden version for $app"; continue; }
            elif [[ "$dlurl" == *"zalith-launcher-2-plus"* ]]; then
                latest_ver=$(gh api repos/Star1xr/ZalithLauncher2Plus/releases/latest --jq '.tag_name') || { echo "Failed to fetch ZalithLauncher2Plus version for $app"; continue; }
            elif [[ "$dlurl" == *"winlator"* ]]; then
                latest_ver=$(gh api repos/StevenMXZ/Winlator-Ludashi/releases/latest --jq '.tag_name') || { echo "Failed to fetch Winlator version for $app"; continue; }
            elif [[ "$dlurl" == *"geode"* ]]; then
                latest_ver=$(gh api repos/geode-sdk/android-launcher/releases/latest --jq '.tag_name') || { echo "Failed to fetch Geode version for $app"; continue; }
            elif [[ "$dlurl" == *"levilauncher"* ]]; then
                latest_ver=$(gh api repos/0Sombra666/LeviLaunchroidUnlocked/releases/latest --jq '.tag_name') || { echo "Failed to fetch LeviLauncher version for $app"; continue; }
            elif [[ "$dlurl" == *"dolphin"* ]]; then
                _cf_get https://dolphin-emu.org/download/
                DOLPHIN_APK_URL=$(echo $html | grep -Eo 'https://dl\.dolphin-emu\.org/builds/[a-z0-9/]+/dolphin-master-[0-9]+-[0-9]+\.apk' | awk -F'[-/.]' '{v=$(NF-2); b=$(NF-1);if (v>V || (v==V && b>B)) {V=v; B=b; U=$0}} END{print U}')
                DOLPHIN_NAME=$(basename "$DOLPHIN_APK_URL" .apk)
                latest_ver=${DOLPHIN_NAME#*-*-}
            else
                echo "Unknown dlurl for $app: $dlurl"
                continue
            fi
            
            if [ -n "$latest_ver" ]; then
                cached_versions[$dlurl]="$latest_ver"
                # Sleep to avoid rate limiting only if we actually fetched
                sleep 2
                break
            fi
        fi
    done
    
    if [ -n "$latest_ver" ]; then
        echo "Latest version for $group is $latest_ver"
        jq -n --arg grp "$group" --arg ver "$latest_ver" '{($grp): $ver}' >> fetched_app_versions.jsonl
    else
        echo "Could not find latest version for $group"
    fi
done < check_list.txt


if [ -s fetched_app_versions.jsonl ]; then
    FETCHED_JSON=$(jq -s 'reduce .[] as $item ({}; . * $item)' fetched_app_versions.jsonl)
else
    FETCHED_JSON="{}"
fi
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    DELIM="$(openssl rand -hex 8)"
    echo "fetched<<${DELIM}" >> "$GITHUB_OUTPUT"
    echo "$FETCHED_JSON" >> "$GITHUB_OUTPUT"
    echo "${DELIM}" >> "$GITHUB_OUTPUT"
else
    export  FETCHED_APP_VERSIONS="$FETCHED_JSON"
fi
rm -f temp_all_configs.json fetched_app_versions.jsonl check_list.txt
