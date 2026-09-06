---
title: Integrate FastGPT with External SSO Systems
slug: /en/tutorial/fastgpt-external-sso-integration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Integrate FastGPT with External SSO Systems

# Overview of FastGPT SSO Integration
FastGPT provides a standardized set of interfaces and a dedicated FastGPT-SSO-Service adapter image to streamline integration with external member systems, eliminating the need for custom, one-off integration code.

# Core Supported Capabilities
This integration framework enables two key operational functions:
1.  **SSO Login Authentication**: After receiving an authentication callback from an external member system, automatically create a corresponding user account within FastGPT and complete the login session.
2.  **Member & Organizational Sync**: Sync full member data and hierarchical organizational structure between the external system and FastGPT to keep access permissions and team data aligned across both platforms.

# System Architecture Workflow
FastGPT-pro includes a native set of standard SSO and member sync interface endpoints. The FastGPT-SSO-Service adapter acts as a translation layer: it aggregates interface specifications from external member systems, converts their data formats to match FastGPT-pro’s required structure, and facilitates secure communication between the two platforms. A visual overview of this workflow is available via the reference diagram at `/imgs/sso2.png`.

# Implementation Workflow
Follow these structured steps to deploy the integration:
1.  Deploy the FastGPT-SSO-Service adapter image to host the integration layer between FastGPT-pro and your external member system.
2.  Configure the adapter to map external member system interfaces to FastGPT’s standardized interface specifications.
3.  Enable SSO login flow: Set up triggers in your external system to send authentication callbacks to FastGPT, which will auto-generate user accounts for valid external users upon their first login attempt.
4.  Enable member sync: Configure automated or manual sync jobs to pull and update organizational structure and member data from the external system into FastGPT.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
