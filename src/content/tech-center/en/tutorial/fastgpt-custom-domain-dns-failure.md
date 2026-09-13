---
title: Resolve FastGPT Custom Domain DNS Failures
slug: /en/tutorial/fastgpt-custom-domain-dns-failure
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/workspace/customDomain
source_type: Official documentation
---

# Resolve FastGPT Custom Domain DNS Failures

## DNS Monitoring and Disabled Domain Behavior
FastGPT performs daily automated validation of custom domain DNS resolution. When the configured DNS record for a custom domain is found to be invalid, the system automatically disables the custom domain. This action restricts access to the FastGPT workspace using the affected custom domain until the DNS configuration issue is resolved, preventing unintended broken access to the workspace via the custom domain.

## Re-Verify Invalid DNS Records
To revalidate a disabled custom domain, follow this step-by-step process:
1. Navigate to the "Custom Domain" management page within your FastGPT workspace.
2. Locate the entry for the disabled custom domain in the list of configured domains.
3. Click the "Edit" button associated with the target disabled custom domain entry.

The Edit button for custom domain configuration is documented in the following reference image:
![Edit Custom Domain Entry](/imgs/guide/team_permissions/customDomain/3.png)

After initiating the edit flow, follow the on-screen prompts to complete the re-verification of the DNS records linked to the custom domain. This process will revalidate the DNS configuration and re-enable the custom domain for workspace access.

## Reconfigure Custom Domains or DNS Providers
If you need to update your existing custom domain or switch to a different DNS provider, direct modification of the existing configuration is not supported. Instead, you must first fully delete the existing custom domain configuration from the "Custom Domain" management page. Once the old configuration is removed, follow the standard FastGPT custom domain setup workflow to configure the new domain or migrate to the new DNS provider setup.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/workspace/customDomain)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
