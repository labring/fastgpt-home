---
title: Update FastGPT 4.6 and Revise Configuration Files
slug: /en/deploy/fastgpt-46-config-revision
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46
source_type: 官方文档
---

# Update FastGPT 4.6 and Revise Configuration Files

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page outlines the mandatory update steps and configuration changes for self-hosted FastGPT deployments targeting version 4.6 or the commercial edition’s V0.2.1 release.

## Mandatory Image Version Updates
All self-hosted FastGPT deployments require updating their container images to maintain compatibility with this version update. Standard deployments may select either the latest stable release or specifically version 4.6. Commercial edition deployments have a dedicated required image version: update to V0.2.1. No alternative version updates are addressed in this guidance.

## Deprecated Legacy Configuration Files
The legacy `config.json` configuration guide is no longer maintained for current FastGPT versions. Previously, this file was used to manage core application settings, but this setup method has been phased out. For standard deployments, refer to the official documentation resources: [Model Configuration](../../config/model/intro.en.mdx) and [Environment Variables](../../config/env.en.mdx) to configure your updated instance. Commercial edition users should note that their configuration file structure has been fully updated, and all configuration steps must be completed using the latest Lark documentation to ensure proper functionality.

## Step-by-Step Update and Configuration Workflow
Follow these structured steps to complete your deployment update:
1.  Discontinue all usage of the legacy `config.json` file, as it is no longer supported for current FastGPT versions.
2.  For standard deployments, consult the linked official documentation to set up your model and environment variable configurations for the updated instance.
3.  For commercial edition deployments, access the latest Lark documentation to complete your configuration updates, as the commercial configuration file has been revised.
4.  Deploy your FastGPT containers using the approved updated images matching your deployment type.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46)
