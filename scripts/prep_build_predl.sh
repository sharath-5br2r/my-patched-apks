#!/bin/bash
mkdir -p ./downloads
# Download Apps
UPDATE_EDEN=$(jq -r '.UPDATE_EDEN // false' .github/scripts/predl_updates.json) || true
UPDATE_WINLATOR=$(jq -r '.UPDATE_WINLATOR // false' .github/scripts/predl_updates.json) || true
UPDATE_ZALITH_LAUNCHER=$(jq -r '.UPDATE_ZALITH_LAUNCHER // false' .github/scripts/predl_updates.json) || true
UPDATE_GEODE=$(jq -r '.UPDATE_GEODE // false' .github/scripts/predl_updates.json) || true
UPDATE_LEVILAUNCHER=$(jq -r '.UPDATE_LEVILAUNCHER // false' .github/scripts/predl_updates.json) || true

if [[ $UPDATE_EDEN = true ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ -z $GITHUB_REPOSITORY ]] ; then
  EDEN_ID=$(gh run list -R Eden-CI/Workflow -w nightly.yml --status success --limit 1 --json databaseId -q ".[0].databaseId")
  gh api "/repos/Eden-CI/Workflow/actions/artifacts/$(gh api repos/Eden-CI/Workflow/actions/runs/$EDEN_ID/artifacts --jq '.artifacts[] | select(.name| contains("standard.apk")) | .id')/zip" > downloads/eden.apk  
fi
if [[ $UPDATE_WINLATOR = true ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ -z $GITHUB_REPOSITORY ]] ; then
  wget -qO downloads/winlator.apk $(gh api repos/StevenMXZ/Winlator-Ludashi/releases/latest | jq -r '.assets[2].browser_download_url')
fi
if [[ $UPDATE_ZALITH_LAUNCHER = true ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ -z $GITHUB_REPOSITORY ]] ; then
  wget -qO downloads/zalith-launcher-2-plus.apk $(gh api repos/Star1xr/ZalithLauncher2Plus/releases/latest | jq -r '.assets[4].browser_download_url')
fi
if [[ $UPDATE_GEODE = true ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ -z $GITHUB_REPOSITORY ]] ; then
  wget -qO downloads/geode.apk $(gh api repos/geode-sdk/android-launcher/releases/latest | jq -r '.assets[1].browser_download_url')
fi
if [[ $UPDATE_LEVILAUNCHER = true ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ -z $GITHUB_REPOSITORY ]] ; then
  wget -qO downloads/levilauncher.apk $(gh api repos/0Sombra666/LeviLaunchroidUnlocked/releases/latest | jq -r '.assets[0].browser_download_url')
fi  
