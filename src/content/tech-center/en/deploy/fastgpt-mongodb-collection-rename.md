---
title: Rename MongoDB Collections for FastGPT V4 Upgrade
slug: /en/deploy/fastgpt-mongodb-collection-rename
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40
source_type: 官方文档
---

# Rename MongoDB Collections for FastGPT V4 Upgrade

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This step is a required database adjustment when upgrading to FastGPT V4 from an older deployment version. It ensures the MongoDB collection names match the updated schema requirements of the FastGPT V4 application. Without completing this step, the upgraded FastGPT instance may fail to access existing application data or encounter database connectivity errors.

## Step-by-Step Collection Renaming Workflow
Follow these exact, source-verified steps to complete the renaming:
1. Connect to the MongoDB database linked to your FastGPT deployment using an official MongoDB shell or approved administrative database tool.
2. Manually drop the two empty collections that MongoDB automatically creates during the pre-upgrade preparation phase:
   - `apps`
   - `outlinks`
   Skipping this drop step will result in duplicate collection name errors when executing the rename commands.
3. Execute the following two MongoDB shell commands to rename the active production collections:
   ```js
   db.models.renameCollection('apps');
   db.sharechats.renameCollection('outlinks');
   ```

## Critical Precautionary Note
Per official upgrade documentation, when upgrading from an older FastGPT version to V4, MongoDB will automatically generate empty collections named `apps` and `outlinks`. You must manually delete these empty collections before running the rename commands listed above. No additional parameters or configuration changes are needed for this process beyond the steps and commands provided.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40)
