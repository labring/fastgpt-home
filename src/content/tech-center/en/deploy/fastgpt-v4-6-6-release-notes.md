---
title: FastGPT V4.6.6 Release Feature Fixes and Additions
slug: /en/deploy/fastgpt-v4-6-6-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/466
source_type: 官方文档
---

# FastGPT V4.6.6 Release Feature Fixes and Additions

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Key Feature Additions
This release includes multiple core feature expansions:
- A multi-stage search pipeline with separated vector semantic search, full-text search, and reranking modes, using Reciprocal Rank Fusion (RRF) to merge final results.
- The HTTP node now supports a JSON editor for configuring request headers.
- Official support for ReRank model deployment, with a dedicated setup guide.

A summarized breakdown of new features is below:
| Feature Category       | Update Details                                                                 | Reference Link                                                                 |
|------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Search Workflow        | Three distinct search modes with RRF result merging                              | N/A                                                                           |
| HTTP Node Configuration| JSON editor for request header setup                                            | N/A                                                                           |
| ReRank Model Support   | Official deployment documentation available                                      | ../../custom-models/bge-rerank.en.mdx                                          |

## Operational and Code Improvements
Several quality-of-life and bug fix updates are included:
- Question classifier prompts have been updated to use ID-guided classification, and validated to work with Chinese commercial API models including Baidu, Alibaba, Zhipu, and iFlytek when using Prompt mode.
- Codebase optimization: Application icons have been extracted and auto-generated to reduce maintenance overhead.
- A critical bug for link-based Collections has been resolved: previously, saved selectors were not stored, causing sync operations to run without configured selectors.

## UI and Strategic Updates
The FastGPT user interface will begin rolling out a new design gradually across the platform. For details on upcoming planned changes, refer to the official FastGPT 2024 RoadMap: https://github.com/labring/FastGPT?tab=readme-ov-file#-%E5%9C%A8%E7%BA%BF%E4%BD%BF%E7%94%A8

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/466)
