#!/usr/bin/env node
// run with: node theme-upload.js <FOLDER> <PUBLISH (default false)>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { zcli, validateFolder, LOG_COLOR } from './zcli-common.js';
// inputs: pathToNode and pathToScript are the first two (predefined) input element of process.argv
const [pathToNode, pathToScript, folder, publish] = process.argv;

// get brand id from env
const brandId = process.env.BRAND_ID;
if (!brandId) {
  console.error(`${LOG_COLOR.red}Error: BRAND_ID env variable not set!${LOG_COLOR.reset}`);
  process.exit(1);
}

// check folder input
validateFolder(folder, 'Usage: theme-upload.js <FOLDER> <PUBLISH (default false)>');

console.log(`\n${LOG_COLOR.cyan}Uploading Brand: ${folder} - ${brandId}\n${LOG_COLOR.reset}`);

// import theme in zendesk
const { themeId } = zcli(`themes:import ${folder} --brandId=${brandId}`);

if (publish) {
  // publish current theme
  zcli(`themes:publish --themeId=${themeId}`);

  // get brand's theme list
  const { themes } = zcli(`themes:list ${folder} --brandId=${brandId}`);

  // filter only "non live" themes and sort theme by "updated_at" desc (from the most recent)
  const nonLiveThemes = themes
    .filter((theme) => !theme.live)
    .sort((a, b) => new Date(b.created_at) - new Date(a.updated_at));

  // remove all non live themes keeping the 2 most recent (for backup)
  nonLiveThemes.slice(2).forEach((theme) => {
    zcli(`themes:delete --themeId=${theme.id}`);
  });
}

console.log(
  `${greenColor}Theme ID ${publish ? 'published' : 'imported'}: ${themeId}${LOG_COLOR.reset}`
);
