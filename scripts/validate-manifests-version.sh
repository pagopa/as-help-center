#!/bin/bash

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Check all required parameters
if [ "$#" -lt 2 ]; then
  echo -e "${RED}Usage: $0 <BASE_BRANCH> <CHANGED_FOLDERS>${NOCOLOR}"
  exit 1
fi

BASE_BRANCH=$1
CHANGED_FOLDERS=$2

# if no changes, continue
if [ -z "$CHANGED_FOLDERS" ]; then
    echo "No changes detected in the brand folders."
    exit 0
fi

echo "Base Branch: $BASE_BRANCH"
echo -e "Changed Folders: $CHANGED_FOLDERS \n"

for FOLDER in $CHANGED_FOLDERS; do
    MANIFEST="$FOLDER/manifest.json"

    if [[ -f "$MANIFEST" ]]; then
        echo "Validating $MANIFEST"

        CURRENT_VERSION=$(jq -r '.version' "$MANIFEST")
        BASE_VERSION=$(git show "$BASE_BRANCH:$MANIFEST" 2>/dev/null | jq -r '.version' || echo "null")

        if [ "$CURRENT_VERSION" == "$BASE_VERSION" ]; then
            echo -e "${RED}Error: Version in $MANIFEST is not updated ($CURRENT_VERSION).${NOCOLOR}"
            exit 1
        else
            echo -e "Version updated in $MANIFEST: $BASE_VERSION -> $CURRENT_VERSION \n"
        fi
    else
        echo -e "No manifest.json found in $FOLDER. Skipping.."
    fi
done