## Release process

The release is automated by a workflow that includes the deployment of themes to Zendesk and Git tag/release. Here are the main steps of the release process:

-	**Workflow Trigger**: The release process is triggered automatically when there is a push to the main branch or manually via workflow_dispatch, with the option to select the environment to update (dev or prod).
-	**Deployment Phase**:
	- Identifying modified folders: the modified brand folders are identified to deploy only the Zendesk themes needed.
	- Creating environment variables for each brand: environment variables containing the necessary credentials and configurations for Zendesk authentication.
	- Uploading themes: The modified brand themes are uploaded to Zendesk. If the environment is prod or if a PR is merged to main, the themes are published as “live”. Otherwise, they are only imported.
-	**Git Release Phase**:
	- After the deployment phase is successfully completed, a Git release is created using the **semantic-release** package, with automated tags and versions. Also a changelog is automatically created with significant changes.

> [!IMPORTANT]  
> To ensure a clear release history, you must update the version inside **manifest.json** files for the modified brands that you wish to publish.


### Upload script
The upload script import the theme from the specified folder to the Zendesk theme library of the brand. Depending on the input parameters, it will either publish the theme to production or not.
 
Due to a false timeout error, it is possible that the theme is imported, but the process ends with an error.
To handle this, a fallback process has been implemented if an import error occurs:
- it checks the theme list in the library
- if a theme with the known new version to deploy is found:
   - it proceeds with publishing the theme found
- if no theme is found, the script retries by checking the theme list (since the theme list may not have been updated yet). If the theme is found, it proceeds with the deployment.
- if no theme is found after retrying, the process will return an error and exit the pipeline.

