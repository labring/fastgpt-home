---
title: FastGPT v4.6.9 Feature and Fix Details
slug: /en/deploy/fastgpt-v4-6-9-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469
source_type: 官方文档
---

# FastGPT v4.6.9 Feature and Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Key New Features
This release delivers targeted new capabilities for FastGPT users across individual and commercial deployments. The Commercial Edition Dataset now includes an "Enhanced Processing" mode, which generates additional specialized index types to optimize semantic search and retrieval performance for large datasets. The HTTP node receives two critical workflow improvements: first, improved inline variable hints that reduce configuration time for new users, and second, native support for OpenAI single-endpoint imports to simplify integration with OpenAI-compatible services. Additional node-level updates include default value support for the Content Extraction node, which eliminates the need to re-enter static values across repeated workflow runs. Global variables now extend to support external variables, which can be dynamically injected via two standardized distribution methods.

## External Variable Configuration Reference
The following table outlines the supported methods for passing external variables to FastGPT applications:
| Distribution Method | Implementation Details |
|----------------------|------------------------|
| Shared Application Links | Append custom query parameters to the published share link |
| Programmatic API Calls | Include the `variables` parameter in the FastGPT API request body |

## System and Usability Enhancements
Several backend and frontend improvements were rolled out to improve platform reliability and user experience. The query rewriting feature, previously limited to certain languages, now includes English language support, and can be saved as a standalone reusable node to streamline deployment across multiple application workflows. The platform’s usage tracking system has been fully rewritten to improve data aggregation accuracy and reduce latency in usage reporting. Token-based conversation history filtering has been updated to retain an even number of messages per session, preventing parsing errors with compatible large language models that require balanced message pairs. Share link SEO has been refined to directly display the published application’s name and avatar in search engine results, improving discoverability for public app deployments.

## Resolved Bug Fixes
This release addresses three critical platform bugs:
1. Fixed an intermittent failure in the annotation feature that prevented proper application of tags and user comments to dataset entries
2. Corrected a QA generation thread count error that caused inconsistent processing resource allocation across batch jobs
3. Fixed a connection type mismatch error in the question classification node that disrupted workflow execution for certain application configurations

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469)
