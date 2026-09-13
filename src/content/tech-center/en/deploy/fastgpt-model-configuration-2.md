---
title: Configure Required Models for FastGPT Deployment
slug: /en/deploy/fastgpt-model-configuration-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Configure Required Models for FastGPT Deployment

### Automatic Redirection on First Login
Upon initial login to your self-hosted FastGPT deployment, the platform will display a system prompt notifying you that both the `Language Model` and `Embedding Model` are unconfigured. The system will automatically redirect all first-time users to the official model configuration page. These two model types are mandatory for core FastGPT functionality, and full platform operation cannot proceed without their proper setup.

### Manual Model Configuration Path
If the automatic redirection does not activate, users can manually access the model configuration interface:
1. Locate and select the Account menu in the top-right corner of the FastGPT dashboard
2. Choose the Model Providers option from the dropdown list of account settings
3. Complete the required configuration fields for both the `Language Model` and `Embedding Model`
For full step-by-step configuration guidance, reference the official tutorial documentation at ../config/model/intro.en.mdx.

### Troubleshooting Known Issues
A documented edge case occurs immediately after first accessing the FastGPT system: the active browser tab may become unresponsive, blocking further setup progress. This issue does not indicate a critical deployment failure, and can be resolved with a simple corrective action: close the unresponsive browser tab entirely, then open a new browser tab and navigate back to your FastGPT instance’s public URL to resume the model configuration workflow. No additional system changes are required to resolve this behavior.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
