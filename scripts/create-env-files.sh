#!/bin/bash

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Get root directory where there are brand folders (prev path from the script location)
root_dir="$(cd "$(dirname "$0")/.." && pwd)"

# Find all brand directories (that contain a manifest.json file)
brand_folders=$(bash get-brand-folders.sh)

# Create .env based on .env.example to each folder (if not exists yet)
for folder in $brand_folders; do
  if [ ! -f "$root_dir/$folder/.env" ]; then
    if [ -f "$root_dir/$folder/.env.example" ]; then
      cp "$root_dir/$folder/.env.example" "$root_dir/$folder/.env"
    else
      echo -e "${RED}.env.example not found!${NOCOLOR}"
    fi
  fi
done