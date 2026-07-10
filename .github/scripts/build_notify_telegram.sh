#!/bin/bash
set -euo pipefail
cd build || { echo "build folder not found"; exit 1; }

NL=$'\n'
APKS=""
MODULES=""
HAS_MODULES=false

shopt -s nullglob
for OUTPUT in *; do
  DL_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/releases/download/$NEXT_VER_CODE/${OUTPUT}"
  if [[ $OUTPUT = *.apk ]]; then
    APKS+="${NL}${NL}<a href=\"${DL_URL}\">${OUTPUT}</a>"
  elif [[ $OUTPUT = *.zip ]]; then
    MODULES+="${NL}${NL}<a href=\"${DL_URL}\">${OUTPUT}</a>"
    HAS_MODULES=true
  fi
done
shopt -u nullglob

MODULES=${MODULES#"$NL"}
APKS=${APKS#"$NL"}

BODY="$(sed 's/&/&amp;/g; s/</&lt;/g; s/>/&gt;/g; s/^\* /↪ /g; s/^- /↪ /g; s/### //g; s/###//g; /^==/d; s/\*\*\([^*]*\)\*\*/<b>\1<\/b>/g; s/`\([^`]*\)`/<code>\1<\/code>/g; s/\[\([^]]*\)\](\([^)]*\))/<a href="\2">\1<\/a>/g;' ../build.tmp)"

TITLE_SUFFIX_ESC="$(echo "${TITLE_SUFFIX:-}" | sed 's/&/&amp;/g; s/</&lt;/g; s/>/&gt;/g')"
MSG="<b>Build No. $NEXT_VER_CODE</b>${TITLE_SUFFIX_ESC}${NL}${NL}${BODY}${NL}${NL}"
  
if [ "$HAS_MODULES" = true ]; then
  MSG+="<b>Modules:</b>${MODULES}${NL}${NL}"
fi

MSG+="<b>APKs:</b>${APKS}"

# Define the target username or chat ID directly to the bot interaction 
# Note: Ensure the bot has interacted with the user or is a member of the group/chat if it's a direct message setup.
TARGET_USER="$TG_TARGET_CHAT"  # Replace with the actual username or chat ID
python3 -m pip install --upgrade telethon
# Inline Python script using Telethon to send chunks
python3 - <<EOF
import os
import asyncio
from telethon import TelegramClient

api_id = int(os.environ['TG_API_ID'])
api_hash = os.environ['TG_API_HASH']
bot_token = os.environ['TG_TOKEN']
reply_to = os.environ.get('TG_THREAD_ID') # Optional: thread ID if sending to a group topic

msg = """$MSG"""
tg_limit = 4096

async def main():
    # Initialize the client as a Bot using the token
    async with TelegramClient('bot_session', api_id, api_hash) as client:
        await client.start(bot_token=bot_token)
        
        # Split message on line breaks without breaking links
        lines = msg.split('\n')
        chunk = ""
        
        for line in lines:
            candidate = f"{chunk}\n{line}" if chunk else line
            if len(candidate) <= tg_limit:
                chunk = candidate
            else:
                if chunk:
                    await client.send_message(
                        '$TARGET_USER', 
                        chunk, 
                        parse_mode='html', 
                        link_preview=False,
                        reply_to=int(reply_to) if reply_to else None
                    )
                chunk = line
                
        if chunk:
            await client.send_message(
                '$TARGET_USER', 
                chunk, 
                parse_mode='html', 
                link_preview=False,
                reply_to=int(reply_to) if reply_to else None
            )

asyncio.run(main())
EOF
