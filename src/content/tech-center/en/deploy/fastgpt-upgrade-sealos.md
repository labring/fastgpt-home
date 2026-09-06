---
title: Properly Upgrade FastGPT on Sealos
slug: /en/deploy/fastgpt-upgrade-sealos
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/deploy/sealos
source_type: 官方文档
---

# Properly Upgrade FastGPT on Sealos

## Pre-Upgrade Preparation
Before initiating any FastGPT upgrade on Sealos, first review the official upgrade documentation at ../upgrading/upgrade-instruction.en.mdx to confirm your target release version. A critical rule for all upgrades is to never skip versions between your currently installed FastGPT version and the target. For example, if running FastGPT v4.5, you must first upgrade to v4.5.1 before proceeding to any later releases. The documentation will also specify whether the target version requires an initialization script; only run this script if explicitly required, and skip the step if no initialization is needed for the target version.

## Locate FastGPT Applications on Sealos
Sealos deploys two distinct FastGPT applications: `fastgpt` and `fastgpt-pro`. Both applications follow the identical upgrade workflow, and you will need to complete the process for each deployed instance if you manage both. Access the Sealos app management dashboard to view your currently deployed FastGPT applications.

## Step-by-Step Upgrade Workflow
Follow these structured steps to upgrade your FastGPT deployment:
1.  Confirm your target FastGPT version using the official upgrade documentation, ensuring no versions are skipped between your current installation and the selected target.
2.  Open the Sealos app management interface.
3.  Locate either the `fastgpt` or `fastgpt-pro` application you intend to upgrade.
4.  Launch the configuration edit menu: either click the three-dot menu on the right side of the app listing and select **Change**, or open the app’s detailed view and click **Change** in the top-right corner of the page.
5.  Locate the image version configuration field, then update the existing version number to match your confirmed target version.
6.  Click the **Change/Restart** button to automatically pull the latest container image for the target version and apply the upgrade. Wait for the upgrade process to fully complete before moving forward with additional changes.
7.  If the target version requires an initialization script, run the corresponding script from the official upgrade documentation immediately after the application restarts successfully.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/deploy/sealos)
