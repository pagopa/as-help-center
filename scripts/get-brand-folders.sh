#!/bin/bash
# return a list of zendesk help center project subfolders (folders which contain manifest.json)

# set echo color
RED='\033[0;31m'
YELLOW='\033[0;33m'
NOCOLOR='\033[0m'

# Get root directory where there are brand folders (prev path from the script location)
root_dir="$(cd "$(dirname "$0")/.." && pwd)"

# Find all directories that contain a manifest.json file (brand folders)
folders=$(find "$root_dir" -type f -name 'manifest.json' -exec dirname {} \; | sort -u)

# If there is no folders with manifest.json, exit
if [ -z "$folders" ]; then
  echo -e "${YELLOW}Warning: No brands found! (there should be folders with a manifest.json file inside)${NOCOLOR}">&2
  exit 0
fi

# Extract only folders basename
folders_basename=$(echo "$folders" | xargs -n 1 basename)

echo "$folders_basename"