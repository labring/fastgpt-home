---
title: FastGPT 492 Self-Hosted New Feature Details
slug: /en/deploy/fastgpt-492-upgrade-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492
source_type: 官方文档
---

# FastGPT 492 Self-Hosted New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Dataset and Document Parsing Improvements
Dataset chunking functionality has been optimized to support separate configuration for chunk size and index size, enabling deployment of extra-large chunks that trade higher input token counts for fully intact, un-split document chunks. The update also adds custom separator presets for dataset chunking, plus native support for splitting documents based on newline characters. Two new PDF parsing examples are included: one built on mistral-ocr and another based on miner-u.

## Variable and Sync Workflow Updates
External variables have been officially renamed to Custom Variables. This update adds in-test debugging support for these variables, and they are now hidden in share links to prevent unintended exposure of sensitive data. Collection synchronization workflows have also been enhanced to support syncing title changes for connected datasets.

## Team Management and Database Integrations
The team member management system has been overhauled: support for mainstream IM SSO providers including WeCom, Lark, and DingTalk has been extracted, and native support for custom SSO connections to FastGPT has been added. Member synchronization with external identity systems has also been improved. A new vector database integration for OceanBase is available; to enable this integration, configure the required environment variable as shown below:

| Environment Variable | Required | Purpose |
|----------------------|----------|---------|
| OCEANBASE_URL        | Yes      | Connection string for the OceanBase vector database, enables the integration when set |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492)
