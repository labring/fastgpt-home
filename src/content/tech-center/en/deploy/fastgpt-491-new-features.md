---
title: Configure and Adopt FastGPT 491 New Features
slug: /en/deploy/fastgpt-491-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491
source_type: 官方文档
---

# Configure and Adopt FastGPT 491 New Features

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Team Management & Invitation Updates
Pro edition FastGPT now supports single-team mode, which centralizes internal member management to streamline permission controls and cross-member workflows for single organizational teams. This mode eliminates cross-team permission conflicts, providing a unified interface for managing all internal team members, roles, and resource access. Additionally, team member invitations have been updated to use an invite link model, replacing prior manual invitation processes. Team admins can generate a secure, shareable invite link to onboard new members, who can then join the team directly via the link, simplifying onboarding workflows.

## Dataset Processing Enhancements
Two key updates improve dataset handling and API capabilities. First, a new dataset chunk reader is introduced, enabling users to split imported text data into smaller, targeted chunks. This granular splitting can improve the accuracy of subsequent semantic search and large language model response generation by aligning chunk size with specific use case requirements. Second, the API Dataset feature now supports PDF enhanced parsing, which applies optimized logic to extract text from uploaded PDF documents, reducing common errors such as misaligned text or missed content compared to standard parsing methods.

## Search & Reranking Configuration Controls
This update adds full support for hybrid search weight configuration and rerank model selection with weight tuning. A critical change to dataset search weight calculation has been implemented: the prior formula of `vector search weight + full-text search weight + rerank weight` has been adjusted to `search weight + rerank weight`. This modification simplifies configuration by reducing the number of weighted components, while still delivering balanced, tailored search results. The update may alter existing search results, so users should review and adjust relevant configuration weights to align with their dataset and use case requirements.

Below is a reference table of the new configurable parameters:
| Configuration Parameter | Official Details |
|------------------------|------------------|
| Hybrid Search Weight | User-configurable weight for combined vector and full-text search results |
| Rerank Model | Selectable model for post-processing search result ranking |
| Rerank Weight | User-configurable weight applied to outputs from the selected rerank model |
| Updated Search Weight Calculation | Replaces the triple-component formula with a two-component formula: `search weight + rerank weight`

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491)
