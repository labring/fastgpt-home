---
title: FastGPT V4.7.1 Official Release Change Reference
slug: /en/deploy/fastgpt-v471-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/471
source_type: 官方文档
---

# FastGPT V4.7.1 Official Release Change Reference

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This reference page outlines all official changes for the FastGPT V4.7.1 self-hosted release, including new features, configuration updates, and resolved bugs.

## Key New Features
This section covers all newly added platform capabilities:
- Full voice input configuration: Admins can toggle voice input on or off across all pages, including shared pages. Additional configurable behaviors include auto-sending content immediately after voice input is completed, and auto-streaming voice playback of submitted voice input.
- Extended file format support: Added native reading of PPTX presentation and XLSX spreadsheet files. All file processing now occurs server-side, which increases server resource utilization and disables in-upload content previews.
- Laf cloud function integration: Users can connect HTTP workflow nodes to cloud functions hosted on their personal Laf account.
- Scheduled stale data cleanup: Automated incremental cleanup of outdated application data, configured to clean data from the last N hours while the service runs continuously.
- Commercial edition system notifications: Added configuration options for system notifications via the admin panel for commercial FastGPT deployments.

## Scheduled Data Cleanup Tools
Two cleanup workflows are available for managing stale application data:
| Cleanup Scenario | Execution Method | Key Details |
|------------------|------------------|-------------|
| Incremental stale data | Continuous service runtime | Cleans data from the last N hours |
| Full stale data cleanup | `clearInvalidData` endpoint | Required for complete data cleanup following extended periods of service downtime

## Configuration and Behavior Changes
Adjustments to existing platform workflows:
- CSV import template updates: The CSV import template no longer validates custom header values, and automatically reads data from the first two columns of uploaded files.
- Dataset export enhancement: Dataset export functionality now supports IP-based export mode.

## Resolved Bug Fixes
All resolved issues in this release:
1.  Tool calling node connection data type validation error
2.  Custom index input data destructuring failure
3.  ReRank model data format mismatch
4.  Query rewriting history persistence bug
5.  Slow shared page loading in edge cases caused by untriggered database connections during server-side rendering (SSR)

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/471)
