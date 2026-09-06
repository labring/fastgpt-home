---
title: FastGPT v4.8.4 Release Feature and Fix Updates
slug: /en/deploy/fastgpt-v484-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/484
source_type: 官方文档
---

# FastGPT v4.8.4 Release Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

### New Functional Additions
This release includes two key new features for application management on FastGPT:
1.  **Updated App Permission System**: All applications now leverage a redesigned permission framework, enabling more granular and secure access control for deployed apps. This replaces the prior permission structure to align with enterprise-grade access management needs.
2.  **App Folder Organization**: Users can now organize their applications into dedicated folders, simplifying navigation and discovery when managing a large number of active deployments.

### Performance and Stability Improvements
Several updates were made to enhance platform reliability and processing efficiency:
The text splitting module has been modified to automatically strip consecutive line breaks and tab characters. This change addresses performance issues that occurred when parsing extremely large text datasets, preventing unexpected slowdowns during document processing and model interaction workflows.
A critical runtime issue in system plugins has been fully resolved. Prior to this update, in-memory data loading for the plugin runtime pool caused global state contamination, leading to inconsistent plugin behavior across different user sessions and deployments.

### Resolved Defects and UI Adjustments
A comprehensive set of bug fixes and minor UI adjustments are included in this release, detailed in the table below:
| Issue Category       | Specific Resolved Problem                                                                 |
|----------------------|-----------------------------------------------------------------------------------------|
| Critical Fix         | System plugin runtime pool data pollution caused by in-memory global state contamination |
| Bug Fix              | Debug mode displaying abnormal connections when source and target content are identical   |
| Bug Fix              | Scheduled execution initialization error                                                |
| Bug Fix              | App invocation parameter passing error                                                  |
| Bug Fix              | Incorrect nodeId when copying complex nodes via Ctrl+C/V                                |
| UI Adjustment        | Global theme updated for the official component library                                  |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/484)
