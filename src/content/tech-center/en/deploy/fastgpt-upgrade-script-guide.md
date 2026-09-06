---
title: Understand FastGPT Upgrade Script Core Requirements
slug: /en/deploy/fastgpt-upgrade-script-guide
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction
source_type: 官方文档
---

# Understand FastGPT Upgrade Script Core Requirements

## Purpose of FastGPT Upgrade Scripts
Upgrade scripts are a required component for updating self-hosted FastGPT deployments under specific database update conditions. When database schema changes are significant enough that they cannot be handled through default values, or when the associated migration logic is complex, an upgrade script is used to update certain database fields. This automated process ensures the database structure aligns correctly with the updated FastGPT application code, eliminating the need for manual database field modifications.

## Data Safety and Service Availability
Carefully following official initialization and upgrade steps will not cause any data loss during deployment updates. However, if the data volume is large, the initialization or upgrade process may take extended time. During this extended runtime period, the FastGPT service will be temporarily unavailable until the process completes successfully.

## Mandatory Upgrade and Initialization Procedures
To ensure a safe and successful deployment update, adhere to these required steps:
1.  Execute the designated upgrade script when significant database schema changes or complex migration logic are detected in the release update
2.  Complete all documented initialization and upgrade steps in full, without skipping any required actions
3.  Allow the upgrade or initialization process to run to completion, even for deployments with large data volumes
4.  Confirm the upgrade script has executed successfully before restoring full access to the FastGPT service

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/upgrade-instruction)
