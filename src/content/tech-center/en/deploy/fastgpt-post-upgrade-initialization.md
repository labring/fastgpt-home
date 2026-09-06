---
title: Run Initialization for FastGPT After Image Upgrade
slug: /en/deploy/fastgpt-post-upgrade-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47
source_type: 官方文档
---

# Run Initialization for FastGPT After Image Upgrade

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Initialization Script Overview
After upgrading your FastGPT container image, this initialization script must be executed to complete post-upgrade configuration. The script targets a dedicated administrative API endpoint to resolve plugin parentId initialization gaps, ensuring all deployed plugins function as expected following the upgrade. No additional system modifications are required beyond running this single API call.

## Required Command Parameters
The provided curl command includes two mandatory placeholders that must be replaced with values specific to your FastGPT deployment:
| Placeholder | Exact Replacement Requirement |
| --- | --- |
| `{{rootkey}}` | The administrative root key configured in your FastGPT environment variables. This key grants full administrative access to your FastGPT instance, so maintain its security and avoid public sharing. |
| `{{host}}` | Your FastGPT deployment’s public domain or base URL, used to access the platform from external terminals. Do not include trailing slashes when substituting this value. |

## Execute the Initialization Command
To run the script, use the following curl command in any terminal with network access to your FastGPT instance’s public domain. Replace the placeholders noted in the parameter table before executing the command:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv47' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
When executed correctly, the script will complete the initialization of parentId values for all existing plugins, aligning the plugin data structure with the requirements of the upgraded FastGPT image.
> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47)
