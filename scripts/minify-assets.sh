#!/bin/bash
# minify all asset files inside <brand>/assets folder

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
BRAND_ASSETS_FOLDER=$BRAND_FOLDER/assets

find $BRAND_ASSETS_FOLDER -type f \( -name "*.js" -o -name "*.css" \) -exec sh -c 'npx minify "$1" > "$1.min" && mv "$1.min" "$1"' _ {} \;
