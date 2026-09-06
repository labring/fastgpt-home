---
title: Update FastGPT Application Images on Sealos
slug: /en/deploy/fastgpt-sealos-image-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction
source_type: 官方文档
---

# Update FastGPT Application Images on Sealos

## Updating FastGPT on Sealos
This document covers the official self-hosted FastGPT image update procedure for deployments running on the Sealos cloud platform.

### Accessing the Sealos Management Interface
First, navigate to the official Sealos Cloud dashboard at the provided URL: https://cloud.sealos.io?uid=fnWRt09fZP. After logging into your account, locate and select the **App Management** option from the desktop interface. A reference screenshot showing this desktop layout is available to align with your dashboard view.

### Step-by-Step Image Update Workflow
Follow these structured steps to update your FastGPT application:
1.  On the App Management page, locate the deployed FastGPT application instance you intend to update.
2.  Click the three vertical dots menu on the right-hand side of the application entry, then select **Update** from the dropdown menu. A reference screenshot of this app list interface is available for validation against your own dashboard.
3.  In the update configuration modal, update the application image reference to your desired new version. Once your image update is fully configured, select **Confirm Changes** to apply the update to your FastGPT instance.

### Modifying Configuration Files During Update
If you need to adjust your FastGPT application configuration as part of the update process, wait to confirm changes until you have modified the required settings. Scroll down within the update modal to the `Configuration File` section, make any necessary adjustments to the configuration content directly in this section, then proceed to confirm your changes to apply both the image update and configuration modifications. A reference screenshot showing the Configuration File section within the update modal is available for reference.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction)
