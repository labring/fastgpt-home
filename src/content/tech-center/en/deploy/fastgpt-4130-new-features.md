---
title: FastGPT 4.13.0 New Feature Details
slug: /en/deploy/fastgpt-4130-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130
source_type: Official documentation
---

# FastGPT 4.13.0 New Feature Details

## Application & Admin Tooling Improvements
This release delivers two key tooling updates for FastGPT 4.13.0. First, a dedicated HTTP Toolkit application type is now available for all FastGPT apps, replacing the prior HTTP Plugin integration. This new type provides streamlined configuration for external HTTP-based service integrations, with native compatibility across FastGPT's workflow engine. Second, system administrators can now quickly install required system tools directly via file upload, removing the need for manual package manager commands or remote server access for approved tool deployments.

## Team Permission Management Updates
Team administrators now have expanded access control capabilities: they can directly assign model permissions to individual team members or teams. This allows for granular control over which AI models are available to different project groups, reducing overhead for central administrators while maintaining secure, role-based access to FastGPT's model library.

## Workflow & Dataset Configuration Enhancements
Two critical configuration updates improve resource management and workflow efficiency across FastGPT 4.13.0. First, the code execution node now includes AI-assisted code generation, which helps users generate accurate, context-aware code snippets to run within their automation workflows, reducing manual coding time and potential errors. Second, dataset file parsing now supports configuration of maximum concurrent parsing processes to balance system load during bulk dataset imports. Configuration for this setting differs between FastGPT editions, as outlined in the table below:

| FastGPT Edition | Configuration Path/Method | Target Parameter |
|-----------------|---------------------------|------------------|
| Open-source     | `config.json` file        | `systemEnv.datasetParseMaxProcess` |
| Commercial      | Admin Dashboard           | N/A (UI-managed) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
