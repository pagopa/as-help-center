#!/usr/bin/env node

// run with: node theme-upload.js <FOLDER> <PUBLISH (default false)>

/** The script execute the import of the theme from the specified folder to the theme library of the brand
 * and based on the input attribute ‘publish’, it either publishes the theme to production or not.
 *
 * Due to a false timeout error, the theme is imported but the process ends with an error.
 * Therefore, a fallback process has been implemented if an import error occurs:
 * - it checks the theme list in the library
 * - if a theme with the known new version to deploy is found:
 * - it proceeds with publishing the theme found
 * - if no theme is found, the script retries by checking the theme list (since the theme list may not have been updated yet). If the theme is found, it proceeds with the deployment.
 * - if no theme is found after retrying, the process will return an error and exit the pipeline. */

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  zcli,
  validateFolderExistence,
  getNewBrandVersion,
  getBrandId,
  sleep,
  LOG_COLOR
} from './zcli-common.js';

const [pathToNode, pathToScript, folder, publish] = process.argv;

/** define inputs **/
// check folder input
validateFolderExistence(
  folder,
  'Error: Folder parameter is required. Usage: theme-upload.js <FOLDER> <PUBLISH (default false)>'
);
// get brand id from env
const brandId = getBrandId();
// get new brand version from manifest
const newVersion = getNewBrandVersion(folder);
// set isPublish
const isPublish = publish === 'true';

/** -- START -- **/
console.log(
  `\n${LOG_COLOR.cyan}Uploading Brand: ${folder} (${brandId}) - v${newVersion} - publish=${isPublish}\n${LOG_COLOR.reset}`
);

// import theme and get theme id
const themeId = importTheme(folder, brandId, newVersion);
if (isPublish) {
  // publish theme on production
  publishTheme(themeId);
  // delete all non live themes keeping the 2 most recent (for backup)
  cleanOldThemes(brandId);
}

// output log
console.log(
  `${LOG_COLOR.green}Theme ID ${isPublish ? 'published' : 'imported'}: ${themeId}${LOG_COLOR.reset}`
);
/** -- END -- **/

/********************
 * Declared Functions
 *********************/

function getThemesList(brandId) {
  // get brand themes list
  const { themes } = zcli(`themes:list --brandId=${brandId}`);
  return themes;
}

function checkImportAndGetThemeId(brandId, newVersion, maxRetries = 2) {
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    // Get brand themes list
    const themes = getThemesList(brandId);
    // Find the theme with the specified new version
    const importedTheme = themes.find((theme) => theme.version === newVersion);

    if (importedTheme) {
      return importedTheme.id; // Theme found, return ID
    }

    console.warn(
      `${LOG_COLOR.yellow}Warning: Theme with version ${newVersion} not found. Retrying... (${retryCount + 1}/${maxRetries})\n${LOG_COLOR.reset}`
    );

    // Wait for a short delay before retrying
    sleep(3000); // Sleep for 3 second before retrying
    retryCount++;
  }

  console.error(
    `${LOG_COLOR.red}Error: No theme found with version ${newVersion}.${LOG_COLOR.reset}`
  );
  process.exit(1);
}

function importTheme(folder, brandId, newVersion) {
  try {
    // import theme in zendesk
    const { themeId } = zcli(`themes:import ${folder} --brandId=${brandId}`, false); // false = Do not exit on failure and throws error
    return themeId;
  } catch (error) {
    console.warn(
      `${LOG_COLOR.cyan}Fallback: checking imported theme by version ${newVersion}\n${LOG_COLOR.reset}`
    );
    // check if, after getting error, the theme with the specified version is imported and get its theme id
    return checkImportAndGetThemeId(brandId, newVersion);
  }
}

function publishTheme(themeId) {
  // publish theme in production
  zcli(`themes:publish --themeId=${themeId}`);
}

function cleanOldThemes(brandId) {
  // get brand's theme list
  const themes = getThemesList(brandId);

  // filter only "non live" themes and sort theme by "updated_at" desc (from the most recent)
  const nonLiveThemes = themes
    .filter((theme) => !theme.live)
    .sort((a, b) => new Date(b.created_at) - new Date(a.updated_at));

  // remove all non live themes keeping the 2 most recent
  nonLiveThemes.slice(2).forEach((theme) => {
    zcli(`themes:delete --themeId=${theme.id}`);
  });
}
