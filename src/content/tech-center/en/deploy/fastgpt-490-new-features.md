---
title: FastGPT 490 Upgrade New Feature Details
slug: /en/deploy/fastgpt-490-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT 490 Upgrade New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Enhanced PDF Parsing Interface and Built-in Service
A redesigned PDF parsing UI has been introduced to the FastGPT platform. The Doc2x document parsing service is now natively integrated into the system, removing the requirement for external third-party PDF parsing tools. Users can now directly process PDF files using the built-in Doc2x service directly within the platform’s interface, without needing to configure separate external connections.

## Dataset Upload Workflow and Image Annotation Improvements
This update includes refined data handling logic and UI adjustments for the dataset file upload process, making it easier to manage and import dataset materials. Additionally, automatic image annotation functionality has been added, automating a key preprocessing step for image-based dataset entries and reducing manual workload for dataset curation.

## PG Vector Extension Upgrade Details
The platform’s PG Vector database extension has been upgraded to version 0.8.0. A critical new capability introduced in this version is iterative search functionality, which addresses and reduces occurrences where stored dataset content fails to return during query operations. The following table summarizes the key changes to the PG Vector component:
| Component | Updated Version | New Functional Addition |
|-----------|----------------|-------------------------|
| PG Vector Extension | 0.8.0 | Iterative search to minimize retrieval failures |

## New Large Language Model Configuration Support
Native configuration support for the qwen-qwq series of large language models has been added to the platform. Users can now select and deploy these models as part of their FastGPT instance’s LLM stack, with no custom configuration files required for initial setup of these model options.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490)
