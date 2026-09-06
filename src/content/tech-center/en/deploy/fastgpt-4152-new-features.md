---
title: Key FastGPT 4.15.2 New Feature Details
slug: /en/deploy/fastgpt-4152-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# Key FastGPT 4.15.2 New Feature Details

This page outlines the new feature updates included in FastGPT version 4.15.2 for self-hosted deployments, focused on security, workflow flexibility, file handling reliability, and custom tool configuration.

## Enterprise and Portal Workflow Enhancements
Two key updates improve access control and user chat workflows: First, enterprise and company verification has been added as a new access control layer, allowing administrators to restrict platform access to verified organizational users. Second, the public portal page now supports selecting Agent V2 applications during chat sessions. End-users can choose from available agent workflows without direct access to application configuration, streamlining multi-agent deployment use cases.

## Improved File Handling and URL Management
Two critical file-related updates enhance reliability and compatibility: First, all new file upload and download URLs now use short-form access URLs. This reduces token context consumption from long, complex URLs and lowers the risk of model output corruption due to malformed URL strings. Previously issued long-form URLs remain fully supported for backward compatibility. Second, for files without a recognizable file extension in metadata, FastGPT now infers the file type directly from the file buffer. This eliminates parsing failures caused by missing or incorrect file extensions, improving success rates for unstructured or mislabeled file uploads.

## Custom Tool Parameters Node Updates
The Custom Tool Parameters node has been expanded with flexible configuration options for developers. Previously limited to preset parameter templates, the node now supports manual entry of full JSON Schema definitions for parameter validation. Users can also mark individual parameters as required to enforce mandatory input fields during tool execution. A reference table for the new node parameters is below:

| Parameter | Description | Notes |
|-----------|-------------|-------|
| JSON Schema Input | Manual entry field for defining custom tool parameter structure | Supports full JSON Schema syntax for parameter validation |
| Required Parameter Flag | Toggle to mark individual parameters as mandatory | Ensures specified parameters are included in tool execution requests |

This update provides granular control over tool input validation, allowing developers to align parameter structures exactly with their integration requirements.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
