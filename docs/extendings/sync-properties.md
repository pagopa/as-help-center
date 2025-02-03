## Properties synchronization process

Zendesk Help Center Guide, in addition to providing a CMS for the knowledge base (articles, categories, etc.), also offers a configuration panel that allows managing and modifying externalized properties such as colors, labels, and more.

When one of these properties is modified via the configuration panel, to ensure that the GitHub repository remains aligned with the deployed instance, a GitHub Action called [**“Sync Manifest Properties”**](../../.github/workflows/sync-properties.yml) has been implemented. This action synchronizes these properties by uploading the manifest.json file (the file where the properties are stored).

If a manual modification has been made through the configuration panel, the action must be triggered manually. The user needs to specify the instance ID to be synchronized and the GitHub branch. Direct synchronization to the main branch (main) is not allowed; instead, the synchronization must be done on a secondary branch, followed by a pull request (PR) to merge the changes.