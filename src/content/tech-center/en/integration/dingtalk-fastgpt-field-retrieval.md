---
title: Retrieve FastGPT fields for DingTalk integration
slug: /en/integration/dingtalk-fastgpt-field-retrieval
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset
source_type: Official documentation
---

# Retrieve FastGPT fields for DingTalk integration

This page outlines how to obtain the mandatory configuration fields needed to integrate DingTalk as a third-party dataset source with FastGPT. These fields enable secure authentication and access to your organization's DingTalk resources.

## Required FastGPT Integration Fields
The following table lists each required FastGPT field and its corresponding retrieval location within the DingTalk platform:

| FastGPT field | Where to get it in DingTalk                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `App Key`     | Open `Credentials and Basic Information` in the app detail page, then copy `Client ID (formerly AppKey and SuiteKey)`.                                                                                                                     |
| `App Secret`  | Copy `Client Secret (formerly AppSecret and SuiteSecret)` from the same page.                                                                                                                                                              |
| `User ID`     | Ask the organization contact administrator to open DingTalk admin. Path: [oa.dingtalk.com](https://oa.dingtalk.com/) -> `Contacts` -> `Member Management` -> select the operator member -> copy the member `User ID` from the detail page. |

## Field Retrieval Details
For `App Key` and `App Secret`, navigate directly to your DingTalk application's detail page, access the Credentials and Basic Information tab, and copy the respective client identifier and secret values. For the `User ID`, work with your organization's designated DingTalk administrator to access the OA admin portal, follow the provided path to locate the target member, and extract their unique User ID.

## Critical Usage Notes
Observe these constraints to ensure secure and successful integration:
- `App Secret` is sensitive credential data. Do not share it publicly or expose it in unsecured code repositories.
- `User ID` is a unique organizational identifier distinct from a member’s phone number, display name, or `unionId`.
- If the member detail page does not display the `User ID`, request the administrator export the full member list from the Contacts module; the exported spreadsheet typically includes the required `User ID` values.
- Use a dedicated DingTalk member account as the FastGPT sync account, and grant this account read-only access to all target workspaces.
- Any workspace inaccessible to the dedicated sync account will not be available for synchronization in FastGPT.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
