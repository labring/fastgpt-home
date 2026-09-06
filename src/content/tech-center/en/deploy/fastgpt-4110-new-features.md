---
title: Key New Features of FastGPT 4.11.0
slug: /en/deploy/fastgpt-4110-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4110
source_type: 官方文档
---

# Key New Features of FastGPT 4.11.0

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Workflow and Chat Interface Improvements
Two core platform updates enhance workflow reliability and chat session organization. First, all workflow nodes now support error-catching branches, which let developers define custom handling logic for failed node executions without terminating the entire workflow pipeline. This update reduces workflow downtime by allowing teams to address failed steps without restarting full automation runs. Second, the chat page has been updated with an independent tab UX design, which organizes active chat sessions into separate tabs to eliminate interface overlap and streamline multi-session management.

## Model and Monitoring Enhancements
This release expands model support and improves operational visibility. A list of newly added model configurations is provided below:
| Supported Model Names |
|-----------------------|
| Gemini 2.5            |
| Grok 4                |
| Kimi                  |
Additionally, model invocation logs now include two critical new data fields: time-to-first-token and request IP address. These fields provide more granular insight into request performance and the source of incoming API calls. The platform also adds official support for Signoz traces and logs system monitoring, enabling centralized tracking and analysis of platform-wide operational data.

## Commercial Edition Feature Additions
The commercial edition of FastGPT 4.11.0 introduces the App Evaluation (Beta) feature. This tool supports supervised scoring of deployed applications, allowing teams to conduct structured, standardized evaluations of app performance through configurable scoring workflows. This feature helps teams refine and optimize their FastGPT applications with data-driven feedback.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4110)
