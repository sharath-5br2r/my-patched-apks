#!/bin/bash
set -euo pipefail

# Escape special HTML characters in dynamic/user-generated content
esc() { printf '%s' "$1" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g'; }

ACTOR_URL="https://github.com/${ACTOR}"
REPO_NAME="${REPO#*/}"
REPO_URL="https://github.com/${REPO}"
ACTION_CAP="${ACTION^}"
NL=$'\n'

if [ -n "$WF_NAME" ]; then
  WF_URL="${GITHUB_SERVER_URL}/${REPO}/actions/runs/${GITHUB_RUN_ID}"
  RUN_NUM="${GITHUB_RUN_NUMBER}"
  BRANCH="$(esc "${REF_NAME}")"
  ACTOR_ESC="$(esc "${ACTOR}")"
  REPO_ESC="$(esc "${REPO_NAME}")"

  MSG="🔴 <a href=\"${WF_URL}\">$(esc "${WF_NAME}") #${RUN_NUM}</a> failed in <a href=\"${REPO_URL}\">${REPO_ESC}</a>${NL}${NL}"
  MSG+="🌿 Branch: <code>${BRANCH}</code> • triggered by <a href=\"${ACTOR_URL}\">${ACTOR_ESC}</a>${NL}${NL}"
  MSG+="🔗 <a href=\"${WF_URL}\">View run</a>"

elif [ "$EVENT_NAME" = "pull_request" ]; then
  TITLE="$(esc "${PR_TITLE}")"
  BASE="$(esc "${PR_BASE_REF}")"
  HEAD="$(esc "${PR_HEAD_REF}")"
  ACTOR_ESC="$(esc "${ACTOR}")"
  REPO_ESC="$(esc "${REPO_NAME}")"

  if [ "$ACTION" = "opened" ]; then PR_ICON="🟢"; elif [ "$ACTION" = "closed" ]; then PR_ICON="🔴"; else PR_ICON="🟡"; fi
  COMMIT_STR="commits"; if [ "$PR_COMMITS" = "1" ]; then COMMIT_STR="commit"; fi

  MSG="${PR_ICON} <a href=\"${PR_URL}\">Pull request #${PR_NUM}</a> ${ACTION} by <a href=\"${ACTOR_URL}\">${ACTOR_ESC}</a> in <a href=\"${REPO_URL}\">${REPO_ESC}</a>${NL}${NL}"
  MSG+="📝 <b>${TITLE}</b>${NL}${NL}"
  MSG+="📑 <code>${HEAD}</code> → <code>${BASE}</code> • ${PR_COMMITS} ${COMMIT_STR} • ${PR_FILES} files • +${PR_ADD}/-${PR_DEL}${NL}${NL}"
  MSG+="🔗 <a href=\"${PR_URL}\">View pull request</a>"

else
  TITLE="$(esc "${ISSUE_TITLE}")"
  ACTOR_ESC="$(esc "${ACTOR}")"
  REPO_ESC="$(esc "${REPO_NAME}")"

  if [ "$ACTION" = "closed" ]; then ISSUE_ICON="✅"; elif [ "$ACTION" = "reopened" ]; then ISSUE_ICON="🔄"; else ISSUE_ICON="🐛"; fi

  MSG="${ISSUE_ICON} <a href=\"${ISSUE_URL}\">Issue #${ISSUE_NUM}</a> ${ACTION} by <a href=\"${ACTOR_URL}\">${ACTOR_ESC}</a> in <a href=\"${REPO_URL}\">${REPO_ESC}</a>${NL}${NL}"
  MSG+="📝 <b>${TITLE}</b>${NL}${NL}"
  MSG+="🔗 <a href=\"${ISSUE_URL}\">View issue</a>"
fi

# Define Direct Target Chat (Username or Chat ID string)
TARGET_CHAT="$TG_TARGET_CHAT"  # Replace with the actual username or chat ID
python3 -m pip install --upgrade telethon
# Execute Telethon Bot Script
python3 - <<EOF
import os
import asyncio
from telethon import TelegramClient

api_id = int(os.environ['TG_API_ID'])
api_hash = os.environ['TG_API_HASH']
bot_token = os.environ['TG_TOKEN']
reply_to = 2747  # Inherited from your message_thread_id parameter

msg = """$MSG"""
tg_limit = 4096

async def main():
    async with TelegramClient('bot_session_status', api_id, api_hash) as client:
        await client.start(bot_token=bot_token)
        
        # Safe chunking loop to protect HTML tag formatting boundaries
        lines = msg.split('\n')
        chunk = ""
        
        # Cast chat target to integer if it's a numeric ID (like standard group/private IDs)
        destination = int('$TARGET_CHAT') if '$TARGET_CHAT'.lstrip('-').isdigit() else '$TARGET_CHAT'

        for line in lines:
            candidate = f"{chunk}\n{line}" if chunk else line
            if len(candidate) <= tg_limit:
                chunk = candidate
            else:
                if chunk:
                    await client.send_message(
                        destination, 
                        chunk, 
                        parse_mode='html', 
                        link_preview=False,
                        reply_to=reply_to
                    )
                chunk = line
                
        if chunk:
            await client.send_message(
                destination, 
                chunk, 
                parse_mode='html', 
                link_preview=False,
                reply_to=reply_to
            )

asyncio.run(main())
EOF
