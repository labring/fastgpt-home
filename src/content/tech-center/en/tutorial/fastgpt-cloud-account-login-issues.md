---
title: Resolve FastGPT Cloud Account and Login Issues
slug: /en/tutorial/fastgpt-cloud-account-login-issues
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/version/cloud/faq
source_type: Official documentation
---

# Resolve FastGPT Cloud Account and Login Issues

## FastGPT Cloud Account Isolation
FastGPT offers two separate cloud deployments, with no shared user accounts between the two environments. User authentication and account data are not synchronized across deployments, so separate login is required for each instance.

## Supported Login Methods by Deployment
The following table details official login options and domain information for each FastGPT cloud deployment:
| Deployment Region | Domain | Supported Login Methods | Historical Phone Sign-Up Status |
|-------------------|--------|-----------------------|----------------------------------|
| China Mainland    | https://fastgpt.cn | WeChat, Phone number | Not applicable |
| International     | https://fastgpt.io | Email, Google, GitHub | Available prior to September 2024 |

## Troubleshooting Login Failures
If you have previously used FastGPT but cannot log in with your expected credentials, the official recommended troubleshooting step is to switch between the two cloud versions. Follow this structured workflow:
1. Identify the original FastGPT deployment you registered with, either the mainland China or international instance.
2. Navigate to the alternate deployment’s domain:
   - If you originally used the international deployment (https://fastgpt.io), access https://fastgpt.cn
   - If you originally used the mainland China deployment (https://fastgpt.cn), access https://fastgpt.io
3. Complete the login flow using the credentials linked to your original FastGPT account on the alternate instance.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/version/cloud/faq)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
