#!/bin/bash
set -euo pipefail

CURRENT_VERSIONS=".github/configs/app_versions.json"
ACTIVE_APPS="active_apps.json"

[ -f "$CURRENT_VERSIONS" ] || echo '{}' > "$CURRENT_VERSIONS"

if [ -z "${FETCHED_APP_VERSIONS:-}" ]; then
    FETCHED_APP_VERSIONS="{}"
fi
[ -f "$ACTIVE_APPS" ] || echo '[]' > "$ACTIVE_APPS"

APP_UPDATES_FILE="app_updates.json"
echo '{}' > "$APP_UPDATES_FILE"

TRIGGER_APP_UPDATE=0

# Compare fetched versions with current versions
while IFS= read -r group; do
    if [ -z "$group" ]; then continue; fi
    new_ver=$(echo "$FETCHED_APP_VERSIONS" | jq -r ".\"$group\"")
    old_ver=$(jq -r ".\"$group\".version // empty" "$CURRENT_VERSIONS")
    
    # If the group existed as a flat string previously (migration), parse it properly
    if [ -z "$old_ver" ]; then
        old_type=$(jq -r ".\"$group\" | type" "$CURRENT_VERSIONS")
        if [ "$old_type" = "string" ]; then
            old_ver=$(jq -r ".\"$group\"" "$CURRENT_VERSIONS")
        fi
    fi
    
    if [ "$new_ver" != "$old_ver" ] && [ "$new_ver" != "null" ] && [ -n "$new_ver" ]; then
        echo "Update detected for $group: $old_ver -> $new_ver"
        TRIGGER_APP_UPDATE=1
        if [[ $group = *"eden"* ]]; then
            export UPDATE_EDEN=true
        elif [[ $group = *"winlator"* ]]; then
            export UPDATE_WINLATOR=true
        elif [[ $group = *"levilauncher-unlocked"* ]]; then
            export UPDATE_LEVILAUNCHER=true
        elif [[ $group = *"geode"* ]]; then
            export UPDATE_GEODE=true
        elif [[ $group = *"zalith-launcher-2-plus"* ]]; then
            export UPDATE_ZALITH_LAUNCHER=true
        elif [[ $group = *"dolphin"* ]]; then
            export UPDATE_DOLPHIN=true
        fi
        # Add all constituent keys to active_apps.json
        keys=$(jq -r ".\"$group\".keys[]? // \"$group\"" "$CURRENT_VERSIONS")
        for key in $keys; do
            jq --arg k "$key" '. + [$k] | unique' "$ACTIVE_APPS" > tmp.json && mv tmp.json "$ACTIVE_APPS"
        done
        
        # Add to app_updates.json for Telegram notification (using Group name)
        jq --arg grp "$group" --arg old "${old_ver:-unknown}" --arg new "$new_ver" '.[$grp] = {old: $old, new: $new}' "$APP_UPDATES_FILE" > tmp.json && mv tmp.json "$APP_UPDATES_FILE"
        
        # Update current versions
        jq --arg grp "$group" --arg ver "$new_ver" '
            if .[$grp] | type == "object" then
                .[$grp].version = $ver
            else
                .[$grp] = { keys: [$grp], version: $ver }
            end
        ' "$CURRENT_VERSIONS" > tmp.json && mv tmp.json "$CURRENT_VERSIONS"
    fi
done < <(echo "$FETCHED_APP_VERSIONS" | jq -r 'keys[]')

if [ "$TRIGGER_APP_UPDATE" = "1" ]; then
    echo "Updates were found!"
else
    echo "No app updates found."
fi
echo -n "{\"UPDATE_EDEN\": ${UPDATE_EDEN:-false}, \"UPDATE_WINLATOR\": ${UPDATE_WINLATOR:-false}, \"UPDATE_ZALITH_LAUNCHER\": ${UPDATE_ZALITH_LAUNCHER:-false}, \"UPDATE_GEODE\": ${UPDATE_GEODE:-false}, \"UPDATE_LEVILAUNCHER\": ${UPDATE_LEVILAUNCHER:-false}, \"UPDATE_DOLPHIN\": ${UPDATE_DOLPHIN:-false}
}" > '.github/scripts/predl_updates.json'
if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "TRIGGER_APP_UPDATE=$TRIGGER_APP_UPDATE" >> "$GITHUB_OUTPUT"
fi
