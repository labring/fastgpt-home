---
title: FastGPT V4.8.3 Release Updates and Fixes
slug: /en/deploy/fastgpt-v4-8-3-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/483
source_type: 官方文档
---

# FastGPT V4.8.3 Release Updates and Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

### Key New Capabilities
This v4.8.3 release adds four core features to expand FastGPT's functionality and operational visibility:
1.  **Milvus Database Support**: Official compatibility with Milvus as a backend database is now available. Deployment reference files are provided via the `docker-compose.milvus.yml` template hosted at https://github.com/labring/FastGPT/blob/main/document/public/deploy/docker/main/global/docker-compose.milvus.yml.
2.  **Chat API Empty Answer Logging**: New logging has been added for empty responses returned by the chat API, to help administrators identify and troubleshoot model-related issues.
3.  **Regex String Matching for If/Else Nodes**: The If/Else conditional workflow node now supports regular expression matching for string comparison, enabling more complex conditional logic in automated workflows.
4.  **Code Execution Debug Output**: The code execution node now includes support for `console.log` statements, allowing users to add debug printing during code runs to validate execution behavior.

### Step-by-Step Milvus Deployment
To integrate Milvus with your FastGPT instance, use the official pre-configured template:
1.  Retrieve the `docker-compose.milvus.yml` file from the official FastGPT public repository using the provided link.
2.  Deploy the FastGPT stack using this compose file to enable Milvus as the backend database. All required service configurations are included in the template, so no additional manual parameter setup is needed for basic Milvus integration.

### Resolved Operational Issue
A critical bug affecting debug sessions has been fixed in this release: variable updates during Debug mode previously failed, interrupting workflow testing. This release fully resolves this issue, allowing reliable modification and testing of variables during debug sessions without errors.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/483)
