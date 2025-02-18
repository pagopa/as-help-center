common_assets is the folder where you can put common asset files (for each brands)

all assets (excluding this txt file) will be copied into the asset folder of brand you need to start/deploy
these copied files are renamed as "common-<original-name-file>" so they can be excluded with the gitignore file
--> copy script is located in scripts/include-common-asset.sh
--> this copy script is included into start-app.sh script, ./upload-app.sh script and release github action