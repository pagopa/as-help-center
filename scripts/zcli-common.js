/* eslint-disable no-undef */

import { execSync } from 'child_process';

export const LOG_COLOR = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

// zcli wrapper command with json output and error checking
export function zcli(command) {
  try {
    const data = execSync(`npx zcli ${command} --json`, { stdio: 'pipe' });
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`${LOG_COLOR.red}Error: ${error.message}${LOG_COLOR.reset}`);
    process.exit(1);
  }
}

// validate if folder is not null and print error otherwise
export function validateFolder(folder, errorMsg) {
  if (!folder) {
    console.error(`${LOG_COLOR.red}${errorMsg}${LOG_COLOR.reset}`);
    process.exit(1);
  }
}
