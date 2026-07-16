#!/bin/bash
mkdir -p ./downloads
# Download Apps
UPDATE_WINLATOR=$(jq -r '.UPDATE_WINLATOR // false' .github/configs/predl_updates.json) || UPDATE_WINLATOR="false"
UPDATE_ZALITH_LAUNCHER=$(jq -r '.UPDATE_ZALITH_LAUNCHER // false' .github/configs/predl_updates.json) || UPDATE_ZALITH_LAUNCHER="false"
UPDATE_GEODE=$(jq -r '.UPDATE_GEODE // false' .github/configs/predl_updates.json) || UPDATE_GEODE="false"
UPDATE_LEVILAUNCHER=$(jq -r '.UPDATE_LEVILAUNCHER // false' .github/configs/predl_updates.json) || UPDATE_LEVILAUNCHER="false"


if [[ $UPDATE_WINLATOR = "true" ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ $GITHUB_ACTIONS != "true" ]] ; then
  echo -e "\e[32m[+] Downloading Winlator\e[0m"
  wget -qO downloads/winlator.apk $(gh api repos/StevenMXZ/Winlator-Ludashi/releases/latest | jq -r '.assets[2].browser_download_url')
fi
if [[ $UPDATE_ZALITH_LAUNCHER = "true" ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ $GITHUB_ACTIONS != "true" ]] ; then
  echo -e "\e[32m[+] Downloading Zalith Launcher 2 Plus\e[0m"
  wget -qO downloads/zalith-launcher-2-plus.apk $(gh api repos/Star1xr/ZalithLauncher2Plus/releases/latest | jq -r '.assets[4].browser_download_url')
fi
if [[ $UPDATE_GEODE = "true" ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ $GITHUB_ACTIONS != "true" ]] ; then
  echo -e "\e[32m[+] Downloading Geode\e[0m"
  wget -qO downloads/geode.apk $(gh api repos/geode-sdk/android-launcher/releases/latest | jq -r '.assets[1].browser_download_url')
fi
if [[ $UPDATE_LEVILAUNCHER = "true" ]] || [[ $GITHUB_EVENT_NAME = "workflow_dispatch" ]] || [[ $GITHUB_ACTIONS != "true" ]] ; then
  echo -e "\e[32m[+] Downloading LeviLauncher\e[0m"
  wget -qO downloads/levilauncher.apk $(gh api repos/0Sombra666/LeviLaunchroidUnlocked/releases/latest | jq -r '.assets[0].browser_download_url')
fi  
