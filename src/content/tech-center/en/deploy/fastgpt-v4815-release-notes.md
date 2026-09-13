---
title: FastGPT v4.8.15 Feature and Fix Release Notes
slug: /en/deploy/fastgpt-v4815-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# FastGPT v4.8.15 Feature and Fix Release Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Core Features
This release adds production-ready features for self-hosted FastGPT deployments:
- API Dataset support, which replaces the deprecated external file library; refer to the official API Dataset documentation for implementation details
- A dedicated Toolbox page for viewing all available system resources, with enhanced commercial edition admin panel controls for configuring system plugins and custom categories
- Native HTML rendering support in Markdown, with an optional preview mode that blocks all scripts and only displays static content
- Custom system-level file parsing service integration, compatible with third-party PDF parsing tools
- Direct reconfiguration of existing collections without deleting and re-importing dataset files
- Commercial edition admin panel support for configuring custom sidebar navigation links

## System Optimization Improvements
Multiple backend and frontend behaviors are refined to improve reliability and usability:
- Enhanced Base64 image truncation detection
- Improved i18n cookie detection for multi-language deployments
- Updated Markdown text splitting to support heading-only sections with no associated content
- Revised string variable substitution logic: unassigned variables now resolve to `undefined` instead of retaining the raw variable ID string
- Global variable default values now apply to API calls, and custom variables now support configurable default values
- Updated HTTP Body JSON parsing to convert `undefined` values to `null` via regex, reducing parsing error rates
- Enhanced scheduled execution workflows with run log tracking and retry functionality to lower error rates

## Step-by-Step: Enable Markdown HTML Preview Mode
This workflow uses only native FastGPT editor controls:
1.  Open the Markdown editor within your FastGPT workspace
2.  Locate the display mode toggle in the top toolbar of the editor
3.  Select the "Preview Mode" option to enable script-blocking static content rendering

## Resolved Bug Fixes
This release addresses high-priority stability and functionality issues:
- Fixed authentication errors for share link like/upvote interactions
- Corrected an issue where switching to an auto-execute app on the chat page could incorrectly trigger non-auto-execute apps
- Fixed audio playback authentication failures
- Resolved a bug where plugin app dataset citation limits were permanently capped at 3000
- Updated workflow edit history storage: removed local storage dependencies and added forced auto-save on abnormal application exit
- Fixed a special variable substitution bug where strings starting with `$` failed to be replaced correctly

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815)
