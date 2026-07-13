#!/bin/bash
if [ -f .env ]; then
	source .env
fi
mkdir -p ./temp ./build 
source ./utils.sh
echo -e '{' > build.json
echo -e "\e[32m[+] Setting up APKEditor for combining apks\e[0m"
wget -q $(gh api repos/REAndroid/APKEditor/releases/latest | jq -r '.assets[0].browser_download_url') -O ./temp/APKEditor.jar


#Sign Apks
sign() {
	java -jar ./bin/apksigner.jar sign  --ks ks-p12.keystore --ks-type PKCS12 --ks-key-alias $KEYSTORE_ALIAS --ks-pass pass:$KEYSTORE_PASS --in "$1" --out "$2"
}

dolphin-sdk29() {
    UPDATE_DOLPHIN=$(jq -r '.UPDATE_DOLPHIN // false' .github/scripts/predl_updates.json)
    if [[ $UPDATE_DOLPHIN != true ]] && [[ $GITHUB_EVENT_NAME != "workflow_dispatch" ]] && [[ -n $GITHUB_REPOSITORY ]] ; then
        echo "Dolphin-SDK29 update not required, skipping."
        return
    fi
    echo -e "\e[32m[+] Fetching Dolphin-SDK29\e[0m"
    _cf_get https://dolphin-emu.org/download/
    DOLPHIN_APK_URL=$(echo $html | grep -Eo 'https://dl\.dolphin-emu\.org/builds/[a-z0-9/]+/dolphin-master-[0-9]+-[0-9]+\.apk' | awk -F'[-/.]' '{v=$(NF-2); b=$(NF-1);if (v>V || (v==V && b>B)) {V=v; B=b; U=$0}} END{print U}')
    DOLPHIN_NAME=$(basename "$DOLPHIN_APK_URL" .apk)
    DOLPHIN_VER=${DOLPHIN_NAME#*-*-}
    curl -L "$DOLPHIN_APK_URL" -H "Cookie: $FS_COOKIES" -H "User-Agent: $user_agent"  -o temp/dolphin-orig.apk
    java -jar ./temp/APKEditor.jar d -i temp/dolphin-orig.apk -o temp/dolphin-src -t xml -dex
    sed -i 's/android:targetSdkVersion="[^"]*"/android:targetSdkVersion="29"/g' temp/dolphin-src/AndroidManifest.xml
    java -jar ./temp/APKEditor.jar b -i temp/dolphin-src -o temp/dolphin-patched.apk
    sign temp/dolphin-patched.apk ./build/dolphin-sdk29-v$DOLPHIN_VER-all.apk
    echo -e "Patched Dolphin $DOLPHIN_VER with SDK 29" >> build.md
    echo -e "\"dolphin-sdk29\": { \"exts\": [\"apk\"], \"name\": \"dolphin-sdk29\",\"arch\": \"all\",\"patch\": \"sdk29\", \"version\": \"$DOLPHIN_VER\"}" >> build.json
    rm -f ./build/*.idsig
}

dolphin-sdk29
echo -e '}' >> build.json

