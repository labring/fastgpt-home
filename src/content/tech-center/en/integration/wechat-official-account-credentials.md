---
title: Obtain WeChat Official Account Credentials for FastGPT
slug: /en/integration/wechat-official-account-credentials
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/official_account
source_type: Official documentation
---

# Obtain WeChat Official Account Credentials for FastGPT

## Prerequisite Account Eligibility
All WeChat Official Account integrations with FastGPT require a verified account. Unverified WeChat Official Accounts are not currently supported for this workflow. For non-production testing, developers may apply for a dedicated WeChat Official Account test account via the official test application link; test accounts operate normally for basic validation but do not support AES Key configuration. All administrative access to account settings and credentials begins at the official WeChat Official Account website: https://mp.weixin.qq.com.

## Step-by-Step Credential Retrieval
Follow this sequential workflow to retrieve the three required credentials:
1. Open the official WeChat Official Account administrative website at the URL https://mp.weixin.qq.com.
2. Authenticate to your registered WeChat Official Account dashboard using your account login credentials.
3. Navigate to the developer credentials panel, as visually referenced in the included image located at `/imgs/offiaccount-2.png`.
4. Copy the publicly displayed AppID and Secret values for input into FastGPT's integration configuration fields.
5. Locate or generate the custom Token value specified for your FastGPT integration setup, then save this value for later configuration steps.

## Critical Configuration Constraints
Note that test accounts cannot be used for AES Key configuration, so this setting must be disabled when using a test account with FastGPT. All three credentials (AppID, Secret, Token) are mandatory to complete the WeChat Official Account integration with FastGPT. Ensure that each credential is stored securely to prevent unauthorized access to your official account's messaging and development functionality. The included image provides a clear visual reference for the location of core credential values within the official dashboard interface.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/official_account)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
