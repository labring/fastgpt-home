---
title: Resolved Issues and New Features in FastGPT v4110
slug: /en/deploy/fastgpt-v4110-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4110
source_type: 官方文档
---

# Resolved Issues and New Features in FastGPT v4110

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Recursive Preprocessing Memory Optimization
This update modifies core recursive processing logic to prevent unintended memory buildup during high-concurrency Dataset preprocessing. The optimized code path significantly reduces persistent memory consumption, enabling more reliable large-scale dataset operations on resource-constrained host environments. No additional configuration is needed to activate this improvement; it activates automatically after completing the v4110 upgrade.

## Bulk Retry for Failed Dataset Indexing
A new feature for Dataset indexing allows users to retry all failed data entries within a single Collection in a single unified action. Previously, resolving failed indexing tasks required per-entry remediation or custom automation to handle bulk retries. This feature centralizes retry operations to simplify post-indexing cleanup.
### Step-by-Step Bulk Retry Workflow
1. Navigate to the target Collection dashboard in your FastGPT instance
2. Access the indexing status overview tab
3. Locate the summary section for failed indexing tasks
4. Select the "Retry All Failed Entries" option
5. Confirm the action to queue retries for all previously failed dataset indexing jobs

## Workflow Value Type Format Validation
This update introduces the `valueTypeFormat` parameter for workflow nodes, designed to prevent data type inconsistencies during workflow execution. Prior to this upgrade, mismatched data types passed between workflow nodes could cause silent failures or incorrect output generation. The `valueTypeFormat` validation enforces consistent data typing across workflow steps, ensuring input and output values adhere to defined schema requirements without manual configuration.

## Regex Special Character Escaping in Dataset Search
Previous versions of the dataset list search functionality failed to properly escape special regex characters, leading to unintended search behavior when querying terms containing regex operators such as `\`, `^`, `$`, or `*`. This update adds proper escaping for all special regex characters in dataset list searches, ensuring that search terms are interpreted literally as entered, rather than parsed as active regex syntax. This resolves cases where valid search terms failed to return expected results due to unescaped regex operators.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4110)
