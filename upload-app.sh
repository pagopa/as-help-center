#!/bin/bash
# run with: upload-app.sh <brand-folder-name>
# or run with: upload-app.sh and then choose the brand to upload

# set echo color
RED='\033[0;31m'
NOCOLOR='\033[0m'

# function to export zendesk env var and upload new template
upload_template() {
  brand_folder=$1

  # copy common_assets files
  bash scripts/include-common-assets.sh $brand_folder

  # set zendesk env var to authenticate 
  export $(cat "$brand_folder/.env" | xargs)
  # upload zendesk template
  node ./scripts/theme-upload.js $brand_folder false
}

# Find all brand directories (that contain a manifest.json file)
brand_folders=$(bash scripts/get-brand-folders.sh)

# Check if brand folder is passed as an argument
if [ -n "$1" ]; then
  input_folder=$1
  if ! echo "$brand_folders" | grep -qw "$input_folder"; then
    echo -e "${RED}Error: $input_folder is not a valid folder with a manifest.json!${NOCOLOR}"
    exit 1
  fi
  # upload zendesk template
  upload_template $input_folder
else
  # Use `select` to ask user to choose a brand to start
  echo "Choose the brand to upload and press enter:"
  select folder in $brand_folders; do
    if [ -n "$folder" ]; then
      # upload zendesk template
      upload_template $folder
      break
    else
      echo -e "\n${RED}Invalid choice. Try again.${NOCOLOR}"
    fi
  done
fi