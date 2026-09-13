---
title: FastGPT 4.14.0 Technical New Feature Updates
slug: /en/deploy/fastgpt-4140-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140
source_type: Official documentation
---

# FastGPT 4.14.0 Technical New Feature Updates

## Plugin Marketplace and Plugin Group Changes
This release adds the official FastGPT Plugin Marketplace, allowing installation of pre-built system tools directly through the catalog. Custom plugin groups have been removed from the platform; only custom tags are retained for organizing individual plugins. Future platform updates will expand supported plugin categories to include workflow triggers, data source parsers, data chunking strategies, and index enhancement strategies.

## Secure Chat File Storage and Preview Links
All files uploaded during chat dialogs are now stored in S3-compatible storage, with no automatic expiration. Files are only deleted when their associated chat record is permanently removed. A key security enhancement replaces long-lived public preview links with signed preview links that automatically expire after 1 hour, reducing potential exposure of shared files.

## Enhanced Variable and Input Capabilities
### Global Variable Type Expansions
This release adds three new supported types for global variables: time point, time range, and chat model selection. The following table outlines each new type:
| Variable Type          |
|------------------------|
| Time Point             |
| Time Range             |
| Chat Model Selection   |

### Password-Protected Plugin Inputs
Plugin input forms now support password-type input fields, which obscure entered text during data entry.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
