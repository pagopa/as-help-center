#!/bin/bash
# run with: start-app.sh <brand-folder-name>
# or run with: start-app.sh and then choose the brand to start

# set echo color
CYAN='\033[0;36m'
RED='\033[0;31m'
NOCOLOR='\033[0m'

# function to export zendesk env var and start template app
start_template_app() {
  brand_folder=$1

  # copy common_assets files
  bash scripts/include-common-assets.sh $brand_folder

  # set zendesk env var to authenticate 
  export $(cat "$brand_folder/.env" | xargs)
  # start zendesk template
  zcli themes:preview $brand_folder
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
  echo -e "\n${CYAN}Starting brand: $input_folder \n${NOCOLOR}"
  # start template app
  start_template_app $input_folder
else
  # Use `select` to ask user to choose a brand to start
  echo "Choose the brand to start and press enter:"
  select folder in $brand_folders; do
    if [ -n "$folder" ]; then
      echo -e "\n${CYAN}Starting brand: $folder \n${NOCOLOR}"
      # start zendesk template
      start_template_app $folder
      break
    else
      echo -e "\n${RED}Invalid choice. Try again.${NOCOLOR}"
    fi
  done
fi

# to pass a parameter with npm: npm start -- parameter