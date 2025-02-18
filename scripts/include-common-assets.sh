#!/bin/bash
# copy all asset files from common_assets folder (excluding .txt files) to <brand>/assets folder

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Check all required parameters
if [ "$#" -lt 1 ]; then
  echo -e "${RED}Usage: $0 <BRAND_FOLDER>${NOCOLOR}"
  exit 1
fi
# Get root directory (prev path from the script location)
root_dir="$(cd "$(dirname "$0")/.." && pwd)"

BRAND_FOLDER=$root_dir/$1
COMMON_ASSETS_FOLDER=$root_dir/common_assets/
BRAND_ASSETS_FOLDER=$BRAND_FOLDER/assets

find $COMMON_ASSETS_FOLDER -type f ! -name "*.txt" -exec bash -c 'rsync -a "$0" "$1/common-$(basename "$0")"' {} "$BRAND_ASSETS_FOLDER" \;