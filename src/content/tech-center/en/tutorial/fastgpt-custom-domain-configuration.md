---
title: Configure Custom Domains for FastGPT Services
slug: /en/tutorial/fastgpt-custom-domain-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/workspace/customDomain
source_type: Official documentation
---

# Configure Custom Domains for FastGPT Services

### Prerequisites
Before configuring a custom domain for FastGPT, you must have a registered domain name that has completed valid ICP filing. Supported ICP filing providers include Alibaba Cloud, Tencent Cloud, and Volcano Engine. You also need full access to your domain provider’s DNS management console to update DNS records.

### Step-by-Step Custom Domain Configuration
Follow these ordered steps to add and validate your custom domain:
1. Enter edit mode for FastGPT workspace domain settings by clicking the "Edit" button.
2. Input your fully qualified domain name (example format: www.example.com) into the designated input field.
3. Access your domain provider’s DNS management console, then create a new CNAME record using the exact details displayed in the FastGPT workspace interface.
4. Return to the FastGPT workspace after saving the new DNS record, then click the "Save" button. The system will automatically initiate DNS configuration verification, which typically completes in under one minute. If verification takes longer than expected, retry the save action.
5. Once the domain status updates to "Active", click the "Confirm" button to finalize the setup.
Refer to the provided interface screenshot for visual guidance during configuration: ![Configure custom domain](/imgs/guide/team_permissions/customDomain/2.png)

### Post-Configuration Access
After successful setup, you can use your custom domain to access FastGPT services and call FastGPT APIs. No additional adjustments are required for standard usage once the domain status shows as active.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/workspace/customDomain)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
