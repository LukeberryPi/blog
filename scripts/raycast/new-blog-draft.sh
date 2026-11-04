#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title New Blog Draft
# @raycast.mode silent

# Optional parameters:
# @raycast.icon ✍️
# @raycast.packageName Blog
# @raycast.argument1 { "type": "text", "placeholder": "Title" }

# Starts a draft from anywhere and opens it in your editor. To install, add this
# folder in Raycast: Settings → Extensions → Script Commands → Add Directories.

# Raycast runs scripts with a minimal PATH.
export PATH="$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

cd "$(dirname "$0")/../.." || exit 1
# Show errors (like "already exists") in Raycast, hide the normal output.
bun scripts/articles.ts new "$1" 2>&1 >/dev/null || exit 1
echo "Draft started: $1"
