#!/usr/bin/env node
/* eslint-disable no-undef */

// run with: node download-theme.js <BRAND_FOLDER> <THEME_ID>

/** The script, after a change from CSM, execute synchronization between deployed theme properties (theme_id) and github repo (chosen branch)
 *
 * It creates the export job
 * Every 2 seconds check the status of the job, when it will be completed:
 * - it downloads the zip theme */

import axios from 'axios';
import fs from 'fs';
import { validateFolderExistence, LOG_COLOR } from './utils.js';

/* eslint-disable no-unused-vars */
const [pathToNode, pathToScript, brandFolder, themeId] = process.argv;

const SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
if (!SUBDOMAIN) {
  throw new Error(`Subdomain not found for brand: ${brandFolder}`);
}

// check folder input
validateFolderExistence(
  brandFolder,
  'Error: Folder parameter is required. Usage: theme-upload.js <FOLDER> <PUBLISH (default false)>'
);

const baseUrl = `https://${SUBDOMAIN}.zendesk.com/api/v2/guide/theming`;
const email = process.env.ZENDESK_EMAIL;
const password = process.env.ZENDESK_API_TOKEN;
const api_bearer_token = process.env.API_BEARER_TOKEN;

console.log(email, password, SUBDOMAIN);

const PENDING_JOB_VALUE = 'pending';
const COMPLETED_JOB_VALUE = 'completed';

const exportTheme = async () => {
  const response = await axios.post(
    `${baseUrl}/jobs/themes/exports`,
    {
      job: { attributes: { theme_id: themeId, format: 'zip' } }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${api_bearer_token}`
      }
    }
  );
  if (response.status === 202) {
    return { jobId: response.data.job.id, downloadUrl: response.data.job.data.download.url };
  } else {
    throw new Error(`Error during export job creation: ${response.statusText}`);
  }
};

const pollJobStatus = async (jobId, downloadUrl) => {
  const jobUrl = `${baseUrl}/jobs/${jobId}`;
  let status = PENDING_JOB_VALUE;

  while (status === PENDING_JOB_VALUE) {
    const response = await axios.get(jobUrl, {
      headers: {
        Authorization: `Bearer ${api_bearer_token}`
      }
    });
    status = response.data.job.status;
    if (status === COMPLETED_JOB_VALUE) {
      return;
    }
    if (status !== PENDING_JOB_VALUE) {
      throw new Error(`Error: job ended with unexpected state: ${status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const downloadTheme = async (url) => {
  const response = await axios.get(url, { responseType: 'stream' });
  const outputPath = './theme.zip';
  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(outputPath));
    writer.on('error', reject);
  });
};

const main = async () => {
  const { jobId, downloadUrl } = await exportTheme();
  await pollJobStatus(jobId, downloadUrl);
  const zipPath = await downloadTheme(downloadUrl);
  console.log(`${LOG_COLOR.green}Theme downloaded: ${zipPath}${LOG_COLOR.reset}`);
};

main().catch((err) => {
  console.error(`${LOG_COLOR.red}${err}${LOG_COLOR.reset}`);
  process.exit(1);
});
