---
title: FastGPT 4.15.1 New Feature Details for Self-Hosted Deployments
slug: /en/deploy/fastgpt-4151-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151
source_type: Official documentation
---

# FastGPT 4.15.1 New Feature Details for Self-Hosted Deployments

## Global API Key Management Updates
This release adds global API key tag management, and preserves an `appName` display snapshot for historical app-level API keys. This update maintains backward compatibility for older API credentials, and simplifies administrative tasks by displaying the linked application context directly alongside each legacy key, making it easier to identify and manage keys tied to specific FastGPT applications.

## Skill Publishing Pre-Extraction Workflow
When publishing a custom skill, the platform now pre-extracts the skill name and description to support streamlined content generation. This enhancement reduces redundant manual input during the publishing process, as core metadata fields are pre-populated automatically. Users can review and adjust the pre-extracted content before finalizing the skill publication.

## Configuration & Marketplace Filter Improvements
### Environment Variable Configuration
A new environment variable is available for self-hosted FastGPT deployments:
| Environment Variable | Default Value | Purpose |
|----------------------|---------------|---------|
| `WECOM_LOGIN_AUTO_REDIRECT` | `disabled` | Controls automatic redirection to the login page for WeCom terminal sessions |

### Plugin & System Tool Filtering
The Plugin Marketplace now supports filtering plugins by official or community source origins, allowing users to narrow listings to preferred plugin types. Additionally, the system tool list includes filtering options for tool status and custom tags, streamlining discovery of relevant system tools for deployment and management.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
