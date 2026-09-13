---
title: Properly Upgrade FastGPT Across Multiple Versions
slug: /en/deploy/fastgpt-cross-version-upgrade
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction
source_type: 官方文档
---

# Properly Upgrade FastGPT Across Multiple Versions

## Pre-Upgrade Mandatory Step
The first required action for any FastGPT cross-version upgrade is to back up your application data, as specified in the official documentation.

## Official Upgrade Path Options
Two documented upgrade paths are available for FastGPT cross-version deployments. The first path allows updating your container image directly to the latest available FastGPT version, then running all released upgrade scripts in sequential order. However, for enhanced operational stability, the official recommended approach is to upgrade one minor or patch version at a time. Skipping multiple versions in a single upgrade cycle increases the risk of unforeseen compatibility issues between the existing application codebase and database schema changes introduced across skipped versions.

## Step-by-Step Sequential Upgrade Workflow
Using the sample scenario of upgrading from version 4.4.7 to version 4.6, follow these sequential steps:
1. Update the active FastGPT container image to version 4.5, then run the official upgrade script.
2. Update the active FastGPT container image to version 4.5.1, then run the official upgrade script.
3. Update the active FastGPT container image to version 4.5.2, then run the official upgrade script.
4. Repeat the update and official upgrade script execution process for each subsequent minor and patch version until reaching your target deployment version.
5. After completing the final version update and associated upgrade script run, confirm the FastGPT application is operational.

## Preferred Upgrade Best Practice
The official documentation explicitly recommends upgrading one version at a time to maintain stability during cross-version FastGPT upgrades. This incremental approach ensures that all database schema changes, configuration adjustments, and code updates are applied in sequence, reducing the likelihood of failed upgrades or application errors.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction)
