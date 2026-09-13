---
title: FastGPT V4.6.4 Feature and Fix Updates
slug: /en/deploy/fastgpt-v464-feature-fix-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/464
source_type: 官方文档
---

# FastGPT V4.6.4 Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT V4.6.4 Feature and Fix Updates

## Core Functional and Integration Updates
This release includes several key updates to core functionality and third-party integrations:
- Share link identity tracking has been rewritten to use localID for consistent, reliable user ID tracking across sessions.
- Commercial edition users gain support for share link SSO: integrate your existing user authentication system using three API endpoints and a dedicated authentication URL, with full implementation documentation available in the Share Link Authentication guide.
- Share link embedding options have been expanded with additional DIY customization controls for tailored deployment workflows.
- Web link fetching now supports multiple selectors, enabling more precise content extraction during dataset sync; refer to the Web Site Sync Usage documentation for specific implementation details.
- Authentication order has been adjusted to prioritize API keys, preventing browser cookies from overriding API key-based authentication to strengthen access security.

## Workflow Node Improvements
Two critical workflow node changes are included in this release:
1.  The legacy History node has been deprecated. To replace it in your workflows:
    1.  Remove the deprecated History node from your workflow configuration
    2.  Enter the desired value directly into the relevant exposed field
2.  The dataset search node topK logic has been updated to use MaxToken calculation, which better accommodates text chunks of varying lengths to deliver more accurate search results.

## Bug Fixes and Infrastructure Optimizations
This release resolves several critical bugs and improves underlying infrastructure reliability:
- Fixed an authentication issue that blocked image uploads for shared links.
- Corrected a resource leak where MongoDB connection pools were not properly released after use.
- Resolved an issue where dataset descriptions (the Intro field) failed to update as expected.
- Fixed Markdown code block rendering errors in displayed content.
- Addressed root permission configuration issues that impacted system stability.
- The project Dockerfile has been optimized to improve deployment speed and reduce overall image size.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/464)
