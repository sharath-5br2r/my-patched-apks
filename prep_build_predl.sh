#!/bin/bash
mkdir -p ./downloads
# Download Apps
EDEN_ID=$(gh run list -R Eden-CI/Workflow -w nightly.yml --status success --limit 1 --json databaseId -q ".[0].databaseId")
gh api "/repos/Eden-CI/Workflow/actions/artifacts/$(gh api repos/Eden-CI/Workflow/actions/runs/$EDEN_ID/artifacts --jq '.artifacts[] | select(.name| contains("standard.apk")) | .id')/zip" > downloads/eden.apk  
wget -qO downloads/winlator.apk $(gh api repos/StevenMXZ/Winlator-Ludashi/releases/latest | jq -r '.assets[2].browser_download_url')
wget -qO downloads/fcl.apk $(gh api repos/FCL-Team/FoldCraftLauncher/releases/latest | jq -r '.assets[0].browser_download_url')
wget -qO downloads/geode.apk $(gh api repos/geode-sdk/android-launcher/releases/latest | jq -r '.assets[1].browser_download_url')
wget -qO downloads/levilauncher.apk $(gh api repos/0Sombera666/LeviLaunchroidUnlocked/releases/latest | jq -r '.assets[0].browser_download_url')
