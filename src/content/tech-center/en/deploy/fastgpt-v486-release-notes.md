---
title: FastGPT v4.8.6 Feature and Fix Updates
slug: /en/deploy/fastgpt-v486-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/486
source_type: 官方文档
---

# FastGPT v4.8.6 Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Features in v4.8.6
This release introduces several key new capabilities for self-hosted FastGPT deployments:
- App permission inheritance: Added support for inheriting access permissions across linked application workflows.
- Individual dataset collection disabling: Administrators can now disable specific collections within a dataset, rather than only toggling the entire dataset's availability.
- Updated system plugin architecture: Launched two official built-in plugins: Link Reader and Math Calculator. Official documentation for creating custom system plugins will be publicly released alongside this update.
- Code sandbox runtime parameters: New configurable runtime parameters for isolated code execution sandboxes.
- Mobile-optimized header toggle: Added an optional setting to hide the conversation interface header, optimized for mobile device viewing experiences.

## Performance and Stability Enhancements
Several improvements were made to reduce resource load and improve system reliability:
- Database load optimization: File reading operations now default to connecting to MongoDB secondary nodes, reducing unnecessary operational load on the primary database instance.
- Redundant resource fix: Resolved an issue where MongoDB models were loaded multiple times during runtime, cutting down on redundant memory and CPU usage.
- Prompt template improvements: Updated core prompt template functionality to resolve consistent edge-case behavior during template rendering.

## Resolved Bug Fixes
A full list of addressed bugs is provided in the table below:
| Bug Description | Fixed Outcome |
|-----------------|---------------|
| Creating a link collection not returning the ID | Link collection creation now returns the correct unique resource ID |
| API documentation descriptions | Corrected inaccurate or incomplete text in public API documentation |
| API system prompt merging | Fixed incorrect merging of API-associated system prompt configurations |
| Team plugin folder content loading | Resolved failure to load plugin files stored within team-specific plugin directories |
| Dataset collection folder breadcrumbs | Fixed broken breadcrumb navigation for dataset collection folder hierarchies |
| Markdown export conversation error | Corrected runtime errors encountered when exporting conversation history to Markdown format |
| Prompt template closing tag error | Fixed malformed closing tags in saved prompt template configurations |
| Generic documentation descriptions | Corrected outdated or incorrect wording across project documentation pages |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/486)
