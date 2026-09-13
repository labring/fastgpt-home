---
title: FastGPT 4911 Version New Feature Updates
slug: /en/deploy/fastgpt-4911-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4911
source_type: 官方文档
---

# FastGPT 4911 Version New Feature Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Pro Edition and Dataset Expansions
This release expands Pro edition functionality with native support for image datasets, enabling teams to incorporate image-based training materials into their FastGPT workflows. Official third-party dataset development documentation is now available for reference at ../../../guide/dataset/third-party/third_dataset.en.mdx, supporting custom dataset integration builds.

## Workflow Editor and Version Control Improvements
Two key updates streamline workflow configuration: first, node search functionality has been added to the workflow editor, allowing users to quickly locate specific workflow nodes without scrolling through long editor lists. Second, sub-workflow version control now includes a "Keep Latest Version" option. When enabled for a linked sub-workflow, this option automatically uses the most recent published version, eliminating the need for manual version updates across all dependent workflow instances.

## Operational and Parsing Infrastructure Updates
This section includes two critical operational and backend enhancements, detailed in the table below:
| Feature | Core Functionality |
|---------|---------------------|
| Async Document Parsing Queue | Allows documents to be imported without waiting for parsing to complete |
| Additional Audit Operation Logs | Adds expanded audit trails for all platform operations |

The async document parsing queue processes imported documents in a background queue, so users can submit multiple files for import without waiting for individual parsing jobs to finish. The new audit logs capture additional metadata for every platform action, making it easier to track changes to datasets, workflows, and system configurations.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4911)
