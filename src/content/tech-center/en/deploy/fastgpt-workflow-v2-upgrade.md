---
title: Understand FastGPT Workflow V2 Upgrade Changes
slug: /en/deploy/fastgpt-workflow-v2-upgrade
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48
source_type: 官方文档
---

# Understand FastGPT Workflow V2 Upgrade Changes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT Workflow V2 Overview
FastGPT Workflow V2 provides a cleaner, more streamlined workflow experience for designing and managing AI-powered workflows. A critical compatibility update applies to all existing workflows following the platform upgrade to V4.8. Due to substantial architectural changes to the workflow system, full manual reconstruction of all workflows is required.

> 🤖 **Critical Rebuild Requirement**
> Due to significant workflow changes, many parts need to be manually rebuilt. Rebuild plugins first, then apps. Update your workflows as soon as possible to avoid future compatibility issues as the platform continues to evolve.

## Version Field Implementation
Both FastGPT applications and plugins now include a dedicated `version` field to differentiate between legacy and new workflow implementations. After upgrading to FastGPT V4.8, all newly created workflows, as well as any existing workflows that are saved again, will use the new V2 workflow system. Legacy workflows that have not been saved post-upgrade will display a reset prompt dialog when accessed within the platform’s visual editor.

## Step-by-Step Migration Procedure
Follow these required steps to migrate existing workflows to V2:
1.  Rebuild all existing plugins first to align with the updated V2 workflow architecture.
2.  After completing plugin updates, rebuild all associated applications using the revised plugins.

## Post-Upgrade Operational Behavior
Workflows invoked via API calls or shared public links will continue to function without interruption until you save them for the first time following the upgrade. No immediate additional action is required for these active workflows beyond saving them once to adopt the new workflow version when next accessing the editor.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48)
