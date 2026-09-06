---
title: Migrate Legacy FastGPT File Upload Workflows
slug: /en/deploy/fastgpt-legacy-file-upload-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4813
source_type: 官方文档
---

# Migrate Legacy FastGPT File Upload Workflows

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Legacy File Upload Workflow Deprecation Notice
Legacy file upload workflow configurations for FastGPT continue to function in the current self-hosted release, but long-term backward compatibility is set to end. Backward support for these legacy setups will be removed within the next two platform versions. Any user who fails to update their workflows prior to this change will encounter broken file handling and failed workflow execution errors. All operators of self-hosted FastGPT instances must prioritize migrating to the updated file upload logic as soon as possible to avoid service disruptions.

## Critical Nested Application File Handling Change
Prior to this update, file inputs were automatically passed between nested applications within FastGPT workflows. This automatic file propagation behavior has been permanently discontinued. For any workflow that incorporates nested application steps, users can no longer rely on implicit file transfer between these steps. Instead, every workflow using nested apps must now explicitly specify exactly which files to pass through each workflow step. Omitting this explicit configuration will cause file data to fail to transfer between nested application steps, leading to incomplete or failed workflow outputs that cannot be resolved without manual intervention.

## Step-by-Step Workflow Update Procedure
1. Audit all existing FastGPT workflows to identify those that include nested application steps with file input dependencies.
2. For each identified workflow, disable any preconfigured automatic file passing settings between nested application nodes.
3. Explicitly define the exact set of files to pass through each nested application step in your workflow’s configuration panel.
4. Run a test execution of the updated workflow to confirm that file data transfers correctly between all nested application steps and that final workflow outputs are complete and accurate.

## Official Reference Documentation
For full, detailed instructions on updating your file upload workflows to the new standardized logic, refer to the official FastGPT File Upload Changes documentation. This resource covers all required parameter adjustments, workflow step updates, and validation checks to ensure a smooth and error-free migration. The official documentation link is: `../../../guide/build/general/fileInput.en.mdx#4813%E7%89%88%E6%9C%AC%E8%B5%B7%E5%85%B3%E4%BA%8E%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%9B%B4%E6%96%B0`

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4813)
