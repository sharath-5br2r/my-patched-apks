#!/bin/bash
set -euo pipefail

[ -n "${TAGS_OLD:-}" ] || TAGS_OLD='{}'
[ -n "${TAGS_NEW:-}" ] || TAGS_NEW='{}'

PATCH_SOURCES_JSON=$(cat .github/configs/patch_sources.json || echo '{}')
MSG_BODY=$(jq -rn --argjson new "$TAGS_NEW" --argjson old "$TAGS_OLD" --argjson patches "$PATCH_SOURCES_JSON" '
  [ $new | to_entries[] | . as $e
    | ($old[$e.key] // {}) as $o
    | select(($e.value.stable != "" and $e.value.stable != ($o.stable // "")) or ($e.value.prerelease != "" and $e.value.prerelease != ($o.prerelease // "")) or ($e.value.blocked == true and $o.blocked != true))
    | ($patches[$e.key].host // "github") as $host
    | ($host == "gitlab") as $is_gitlab
    | ($is_gitlab | if . then "https://gitlab.com/" else "https://github.com/" end) as $base
    | "📦 [\($e.value.repo)](\($base)\($e.value.repo))" +
      (if ($e.value.blocked == true and $o.blocked != true) then "\n  ╰ 🚫 Repository access blocked." else "" end) +
      (if ($e.value.blocked != true and $e.value.stable != "" and $e.value.stable != ($o.stable // "")) then
        (if $is_gitlab then "\n  ╰ Stable: [\($e.value.stable)](https://gitlab.com/\($e.value.repo)/-/releases/\($e.value.stable))" else "\n  ╰ Stable: [\($e.value.stable)](https://github.com/\($e.value.repo)/releases/tag/\($e.value.stable))" end)
      else "" end) +
      (if ($e.value.blocked != true and $e.value.prerelease != "" and $e.value.prerelease != ($o.prerelease // "")) then
        (if $is_gitlab then "\n  ╰ Pre-release: [\($e.value.prerelease)](https://gitlab.com/\($e.value.repo)/-/releases/\($e.value.prerelease))" else "\n  ╰ Pre-release: [\($e.value.prerelease)](https://github.com/\($e.value.repo)/releases/tag/\($e.value.prerelease))" end)
      else "" end)
  ] | join("\n\n")
')

APP_UPDATES_JSON=$(cat app_updates.json 2>/dev/null || echo '{}')
APP_UPDATES_MSG=$(jq -r --argjson updates "$APP_UPDATES_JSON" '
  [ $updates | to_entries[] | . as $e | "📱 \($e.key)\n  ╰ Version: \($e.value.new)" ] | join("\n\n")
' <<<"{}")

if [ -z "$MSG_BODY" ] && [ -z "$APP_UPDATES_MSG" ]; then
  echo "::notice::No actual updates to format for Telegram."
  exit 0
fi

NL=$'\n'
FULL_MSG=""

if [ -n "$MSG_BODY" ]; then
  if [ "${TRIGGER_STABLE:-0}" = "1" ] || [ "${TRIGGER_PRERELEASE:-0}" = "1" ]; then
    FULL_MSG="*🚨 New Patch(es) Detected!*${NL}${NL}${MSG_BODY}"
  else
    FULL_MSG="*⚠️ Repository Status Update!*${NL}${NL}${MSG_BODY}"
  fi
fi

if [ -n "$APP_UPDATES_MSG" ]; then
  if [ -n "$FULL_MSG" ]; then
    FULL_MSG="${FULL_MSG}${NL}${NL}"
  fi
  FULL_MSG="${FULL_MSG}*🚨 New Version(s) Detected!*${NL}${NL}${APP_UPDATES_MSG}"
fi

if [ "${EFFECTIVE_STABLE:-0}" = "1" ] || [ "${EFFECTIVE_PRERELEASE:-0}" = "1" ]; then
  if [ -n "${GITHUB_REPOSITORY:-}" ] && [ -n "${GITHUB_RUN_ID:-}" ]; then
    ACTION_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
    FULL_MSG="${FULL_MSG}${NL}${NL}⚙️ [View Build in Action](${ACTION_URL})"
  fi
else
  FULL_MSG="${FULL_MSG}${NL}${NL}ℹ️ _No apps are enabled. Build skipped._"
fi

# Define Direct Target Chat (Username or Chat ID string)
TARGET_CHAT="$TG_TARGET_CHAT"  # Replace with the actual username or chat ID
python3 -m pip install --upgrade telethon
# Execute Telethon script to deliver the message straight to the bot interaction 
python3 - <<EOF
import os
import asyncio
from telethon import TelegramClient

api_id = int(os.environ['TG_API_ID'])
api_hash = os.environ['TG_API_HASH']
bot_token = os.environ['TG_TOKEN']
reply_to = 2747  # Inherited from your message_thread_id parameter

msg = """$FULL_MSG"""
tg_limit = 4096

async def main():
    async with TelegramClient('bot_session_patches', api_id, api_hash) as client:
        await client.start(bot_token=bot_token)
        
        # Safe chunking loop in case updates generate an exceptionally long message
        lines = msg.split('\n')
        chunk = ""
        
        for line in lines:
            candidate = f"{chunk}\n{line}" if chunk else line
            if len(candidate) <= tg_limit:
                chunk = candidate
            else:
                if chunk:
                    await client.send_message(
                        '$TARGET_CHAT', 
                        chunk, 
                        parse_mode='markdown', 
                        link_preview=False,
                        reply_to=reply_to
                    )
                chunk = line
                
        if chunk:
            await client.send_message(
                '$TARGET_CHAT', 
                chunk, 
                parse_mode='markdown', 
                        link_preview=False,
                reply_to=reply_to
            )

asyncio.run(main())
EOF
