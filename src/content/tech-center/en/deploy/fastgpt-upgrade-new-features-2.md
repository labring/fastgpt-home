---
title: New Features for FastGPT Self-Host Upgrades
slug: /en/deploy/fastgpt-upgrade-new-features-2
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/499
source_type: 官方文档
---

# New Features for FastGPT Self-Host Upgrades

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Authentication System Overhaul
This release replaces the legacy JSON Web Token (JWT) login authentication system with a new SessionId-based authentication model. The updated system provides more granular control over user sessions, and administrators can configure the maximum allowed concurrent client sessions per user account. The following configuration parameter is available to adjust this setting:
| Configuration Parameter | Purpose |
|--------------------------|---------|
| MAX_CONCURRENT_CLIENT_SESSIONS | Defines the upper limit of simultaneous active client sessions permitted for each authenticated user |

## Pro Edition License Management Model Update
A revised license management framework is introduced for the FastGPT Pro edition with this upgrade. This new model replaces the prior license handling workflow, offering improved alignment with self-hosted deployment operational needs. It simplifies the process of activating, validating, and assigning Pro edition licenses across team deployments.

## WeChat Official Account Troubleshooting Enhancements
For deployments using WeChat Official Account integrations, this update adds explicit display and logging of all chat conversation errors. Previously, these errors were not consistently captured or visible to administrators, delaying issue resolution. The new functionality logs failed chat interactions and displays error details directly in the platform’s admin interface, cutting down troubleshooting time and improving visibility into integration performance.

## API Dataset BasePath Selection Support
The API Dataset feature now includes support for BasePath selection when integrating with third-party APIs. To leverage this new capability, users must configure an additional required API endpoint, as fully outlined in the official API Dataset Introduction documentation. The linked reference details the required setup steps for the additional endpoint: [API Dataset Introduction](../../../guide/dataset/third-party/api_dataset.en.mdx#4-get-file-details). This update expands the range of configurable options for connecting external data sources via API datasets, allowing more precise control over API request paths.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/499)
