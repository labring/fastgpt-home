---
title: FastGPT v4.8.8 Release Feature and Fix Summary
slug: /en/deploy/fastgpt-v4-8-8-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/488
source_type: 官方文档
---

# FastGPT v4.8.8 Release Feature and Fix Summary

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

### Plugin and Variable Input Enhancements
This release includes a complete restructure of the system plugin architecture, opening up the ability for community members to submit official system plugins via pull requests. A dedicated guide for submitting plugins to the FastGPT community is available via the linked FeiShu documentation. Three new system plugins are bundled with this update: DuckDuckGo search integration, Lark webhook support, and the updated plugin framework itself.

The variable input workflow has also been significantly revamped. All prompt input fields and Textarea components within the workflow builder now support triggering variable selection by typing the `/` character. This allows users to directly pick any upstream output value without needing to use dynamic import functions, streamlining prompt and workflow configuration. Commercial deployments gain access to dataset permission inheritance, a new access control feature for managing knowledge base access.

### Usability and Interface Improvements
Multiple usability and visual updates are included to improve the overall user experience. The mobile quick app switching interaction has been refined for more intuitive navigation on handheld devices. Node icons across the workflow editor have been updated to provide clearer visual differentiation between workflow types. Chat citations now feature a dedicated copy button, and citation content can be collapsed to reduce on-screen clutter when reviewing chat history.

The OpenAI SDK has been upgraded to include support for custom Whisper model interfaces. The release notes note that the SDK’s built-in Whisper interface does not work correctly with standard FastAPI endpoints, so custom implementations will require targeted adjustments.

### Resolved Issues
The following bugs have been addressed in this release:
| Issue Area | Fixed Behavior |
|------------|----------------|
| Permission System | Corrected permission table declaration issue |
| Workflow Execution | Fixed parallel execution nodes not recording run time correctly, and resolved incorrect display of nested node information in run details |
| Simple Mode | Fixed failure to load dataset configuration when first entering Simple Mode |
| Logging Configuration | Resolved log debug level settings not taking effect |
| Standalone Plugins | Fixed variable substitution of plugin input values when running plugins standalone, which caused unexpected downstream node variable issues |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/488)
