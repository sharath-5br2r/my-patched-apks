#!/bin/bash
for apk in ./build/*.apk; do
  echo "Uploading $apk..."
  RELEASE_TAG=$(echo "$apk" | awk -F'-' '{print $1}')
  gh release create "$RELEASE_TAG" --title "$RELEASE_TAG" --notes "Automated upload" --repo sharath-5br2r/patched-apks-builder-dump  || true
  gh release upload "$RELEASE_TAG" "$apk" --clobber --repo sharath-5br2r/patched-apks-builder-dump
done