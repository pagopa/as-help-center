#!/bin/bash

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# Find all brand directories (that contain a manifest.json file)
brand_folders=$(bash get-brand-folders.sh)

# Create .env based on .env.example to each folder (if not exists yet)
for folder in $brand_folders; do
  if [ ! -f "$folder/.env" ]; then
    if [ -f "$folder/.env.example" ]; then
      cp "$folder/.env.example" "$folder/.env"
    else
      echo -e "${RED}.env.example not found!${NOCOLOR}"
    fi
  fi
done