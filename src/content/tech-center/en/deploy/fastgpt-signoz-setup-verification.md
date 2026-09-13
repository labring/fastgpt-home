---
title: Verify Successful SigNoz Monitoring Setup for FastGPT
slug: /en/deploy/fastgpt-signoz-setup-verification
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/signoz
source_type: Official documentation
---

# Verify Successful SigNoz Monitoring Setup for FastGPT

## Access the SigNoz Frontend Dashboard
To verify the SigNoz monitoring integration for FastGPT, first return to the Sealos application management list. Locate the deployed SigNoz frontend project, then navigate to its assigned public network address to load the main dashboard. Two reference screenshots capture the initial dashboard access and project listing views: ![alt text](../../../public/imgs/image-114.png) and ![alt text](../../../public/imgs/image-115.png).

## Complete Initial Account Setup
First-time visitors to the SigNoz dashboard must create a local account, as all account data is stored exclusively in the SigNoz local database. Follow these steps to set up your initial account:
1.  Navigate to the account creation form loaded on first dashboard access.
2.  Enter any valid text input into the required fields; no specific formatting or values are required.
3.  Submit the completed form to log into the dashboard.
A reference screenshot of the account creation flow is provided here: ![alt text](../../../public/imgs/image-116.png).

## Validate Successful Configuration
Once logged into the SigNoz dashboard, confirm the setup is successful by checking the COMPLETED steps panel on the right-hand side of the main interface. A properly configured deployment will show both the `logs` and `traces` steps as fully lit, confirming that monitoring data is being properly collected and routed. Two additional reference screenshots demonstrate the validated completed steps view: ![alt text](../../../public/imgs/image-117.png) and ![alt text](../../../public/imgs/image-118.png).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/signoz)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
