/* eslint-disable no-undef */

import { execSync } from 'child_process';
import fs from 'fs';

export const LOG_COLOR = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// zcli wrapper command with json output and error checking (optionally skipped)
export function zcli(command, exitOnFailure = true) {
  try {
    const data = execSync(`npx zcli ${command} --json`, { stdio: 'pipe' });
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`${LOG_COLOR.red}Error: ${error.message}${LOG_COLOR.reset}`);
    if (exitOnFailure) {
      process.exit(1);
    }
    throw error;
  }
}

// validate if folder is not null and print error otherwise
export function validateFolderExistence(folder, errorMsg) {
  if (!folder) {
    console.error(`${LOG_COLOR.red}${errorMsg}${LOG_COLOR.reset}`);
    process.exit(1);
  }
}

// get new brand version from manifest.json
export function getNewBrandVersion(folder) {
  const manifestPath = `${folder}/manifest.json`;
  const fileContent = fs.readFileSync(manifestPath, 'utf8');
  return JSON.parse(fileContent).version;
}

// get brand id from env var and exit with an error if not set
export function getBrandId() {
  const brandId = process.env.BRAND_ID;
  if (!brandId) {
    console.error(`${LOG_COLOR.red}Error: BRAND_ID env variable not set!${LOG_COLOR.reset}`);
    process.exit(1);
  }
  return brandId;
}

export function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy-waiting loop to simulate synchronous sleep
  }
}
