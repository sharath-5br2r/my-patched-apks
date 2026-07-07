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
    _fs_get https://dolphin-emu.org/download/
    DOLPHIN_APK_URL=$(echo $html | grep -Eo 'https://dl\.dolphin-emu\.org/builds/[a-z0-9/]+/dolphin-master-[0-9]+-[0-9]+\.apk' | awk -F'[-/.]' '{v=$(NF-2); b=$(NF-1);if (v>V || (v==V && b>B)) {V=v; B=b; U=$0}} END{print U}')
    DOLPHIN_NAME=$(basename "$DOLPHIN_APK_URL" .apk)
    DOLPHIN_VER=${DOLPHIN_NAME#*-*-}
    curl -L "$DOLPHIN_APK_URL" -H "Cookie: $FS_COOKIES" -H "User-Agent: $user_agent"  -o temp/dolphin-orig.apk
    java -jar ./temp/APKEditor.jar d -i temp/dolphin-orig.apk -o temp/dolphin-src -t xml -dex
    sed -i 's/android:targetSdkVersion="[^"]*"/android:targetSdkVersion="29"/g' temp/dolphin-src/AndroidManifest.xml
    java -jar ./temp/APKEditor.jar b -i temp/dolphin-src -o temp/dolphin-patched.apk
    sign temp/dolphin-patched.apk ./build/dolphin-sdk29-v$DOLPHIN_VER.apk
    echo -e "Patched Dolphin $DOLPHIN_VER with SDK 29" >> build.md
    echo -e "\"dolphin-sdk29\": { \"exts\": [\"apk\"], \"name\": \"dolphin-sdk29\",\"arch\": \"all\",\"patch\": \"sdk29\", \"version\": \"$DOLPHIN_VER\"}," >> build.json
    rm -f ./build/*.idsig
    }

eden-pubg() {
    export EDEN_ID=$(gh run list -R Eden-CI/Workflow -w nightly.yml --status success --limit 1 --json databaseId -q ".[0].databaseId")
    date1=$(gh run list -R Eden-CI/Workflow -w nightly.yml --status success --limit 1 --json updatedAt  -q ".[0].updatedAt")
    export EDEN_NAME=$(gh run view $EDEN_ID -R Eden-CI/Workflow | grep standard.apk | cut -d'-' -f3 )
    gh api "/repos/Eden-CI/Workflow/actions/artifacts/$(gh api repos/Eden-CI/Workflow/actions/runs/$EDEN_ID/artifacts --jq '.artifacts[] | select(.name| contains("standard.apk")) | .id')/zip" > temp/eden-orig.apk  
    java -jar ./temp/APKEditor.jar d -i temp/eden-orig.apk -o temp/eden-src -t xml -dex
    sed -i 's/dev\.eden\.eden_emulator\.nightly/com.tencent.ig/g' temp/eden-src/AndroidManifest.xml
    java -jar ./temp/APKEditor.jar b -i temp/eden-src -o temp/eden-patched.apk
    sign temp/eden-patched.apk ./build/eden-pubg-v$EDEN_NAME.apk
    rm -f ./build/*.idsig
    echo -e "Patched  Eden $EDEN_NAME with com.tencent.ig package name" >> build.md
    echo -e "\"eden-pubg\": { \"exts\": [\"apk\"], \"name\": \"eden-pubg\",\"arch\": \"arm64-v8a\",\"patch\": \"pubg\", \"version\": \"$EDEN_NAME\"}," >> build.json

}

winlator-pubgvn() {
	dl_gh "Winlator-Ludashi" "StevenMXZ" "latest" "winlator-orig.apk" "build.apk"
    java -jar ./temp/APKEditor.jar d -i temp/winlator-orig.apk -o temp/winlator-src -t xml -dex
    sed -i -e 's/package="com\.tencent\.ig"/package="com.vng.pubgmobile"/' -e 's/com\.tencent\.ig\.tileprovider/com.vng.pubgmobile.tileprovider/' -e 's/com\.tencent\.ig\.core\.WinlatorFilesProvider/com.vng.pubgmobile.core.WinlatorFilesProvider/' -e 's/com\.tencent\.ig\.androidx-startup/com.vng.pubgmobile.androidx-startup/' temp/winlator-src/AndroidManifest.xml
    java -jar ./temp/APKEditor.jar b -i temp/winlator-src -o temp/winlator-patched.apk
    sign temp/winlator-patched.apk ./build/winlator-pubgvn-$tag.apk
    rm -f ./build/*.idsig
    echo -e "Patched Winlator-Ludashi $tag with com.vng.pubgmobile package name" >> build.md
    echo -e "\"winlator-pubgvn\": { \"exts\": [\"apk\"], \"name\": \"winlator-pubgvn\",\"arch\": \"arm64-v8a\",\"patch\": \"pubgvn\", \"version\": \"$tag\"}" >> build.json
}


dolphin-sdk29
eden-pubg
winlator-pubgvn

echo -e '}' >> build.json

