#!/bin/bash
# return a list of zendesk help center project subfolders (folders which contain manifest.json)

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Get current directory in which the script is located
current_dir="$(cd "$(dirname "$0")" && pwd)"

# Find all directories that contain a manifest.json file
folders=$(find "$current_dir" -type f -name 'manifest.json' -exec dirname {} \; | sort -u)

# If there is no folders with manifest.json, exit
if [ -z "$folders" ]; then
  echo -e "${RED}No brands found! (there should be folders with a manifest.json file inside)${NOCOLOR}"
  exit 1
fi

# Extract only folders basename
folders_basename=$(echo "$folders" | xargs -n 1 basename)

echo "$folders_basename"