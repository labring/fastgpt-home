---
title: Key Improvements in FastGPT 491 Self-Host Upgrade
slug: /en/deploy/fastgpt-491-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491
source_type: 官方文档
---

# Key Improvements in FastGPT 491 Self-Host Upgrade

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## User Interface and Data Workflow Refinements
This upgrade includes two targeted improvements to user workflows and backend data handling. First, the dataset data input UI has been updated to streamline the process of managing and uploading dataset content, reducing friction for users interacting with FastGPT’s dataset tools. Second, application-bound dataset data fetching logic, previously executed on the client side, has been fully migrated to backend processing. This centralization eliminates client-side resource overhead associated with repeated data fetch calls and ensures consistent handling of dataset access across all app instances.

## Security and Dependency Maintenance
A core security improvement in this release is the addition of automated security version checks for all installed dependency packages. The upgrade also includes selective upgrades of identified outdated or vulnerable dependency packages, addressing potential security gaps without requiring broad, disruptive updates to the entire dependency stack. This change simplifies long-term maintenance of self-hosted FastGPT deployments by automating dependency security validation.

## Parsing and Search Optimization
Three technical enhancements fall under this category, with concrete behavioral changes for model interactions and search functionality:
### Standardized Reasoning Output Parsing
| Model Configuration | Conversation Reasoning Setting | Parsed <think> Tags |
|----------------------|--------------------------------|---------------------|
| Supports reasoning   | Enabled                        | Yes                 |
| Supports reasoning   | Disabled                       | Yes                 |
| Does not support     | Any                            | No                  |
This consistent parsing behavior ensures that `<think>` tags from supported reasoning models are always extracted, even when per-conversation reasoning is disabled. Second, model testing code has been improved to deliver more reliable validation of deployed AI models, reducing false negatives during pre-deployment checks. Third, the latest jieba dictionary has been loaded into the system, which enhances the accuracy of full-text search tokenization for FastGPT datasets, improving search relevance for indexed content.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491)
