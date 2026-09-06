---
title: Use HTML Rendering Preview Modes in FastGPT
slug: /en/deploy/fastgpt-html-rendering-preview-modes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# Use HTML Rendering Preview Modes in FastGPT

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## HTML Rendering Preview Modes Overview
This document details the HTML rendering preview feature released with the FastGPT 4815 self-hosted upgrade. The feature adds three dedicated viewing modes for inspecting HTML-formatted content from assistant responses, supporting debugging, validation, and detailed content review workflows.

## Mode Reference Table
The following table outlines each available preview mode, with corresponding UI screenshots referenced in the original documentation:
| Mode Name         | Core Functional Purpose                                                  |
|-------------------|--------------------------------------------------------------------------|
| Source Mode       | Displays unmodified raw HTML source code for structural debugging and verification |
| Preview Mode      | Renders HTML content within the standard FastGPT chat interface to match end-user-facing output |
| Fullscreen Mode   | Provides a maximized, distraction-free view of rendered HTML for detailed layout review |

## Usage Workflows
Users interact with HTML content blocks in assistant responses via dedicated toolbar controls to select their preferred preview mode. Source Mode is designed for technical users who need to verify the underlying code structure of generated HTML. Preview Mode delivers a realistic preview of how the HTML content will appear to end recipients of the chat response. Fullscreen Mode expands the rendered HTML to fill the entire browser viewport, removing interface clutter for thorough, focused reviews of complex HTML layouts.

## Deployment Notes
This feature is included natively in the 4815 FastGPT self-hosted upgrade. No additional configuration, custom environment variables, or separate setup steps are required to activate the three preview modes after completing the standard upgrade process.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815)
