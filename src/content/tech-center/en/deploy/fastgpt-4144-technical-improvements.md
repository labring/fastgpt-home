---
title: FastGPT 4.14.4 Key Technical Improvements for Self-Hosted Deployments
slug: /en/deploy/fastgpt-4144-technical-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144
source_type: Official documentation
---

# FastGPT 4.14.4 Key Technical Improvements for Self-Hosted Deployments

## Storage & Infrastructure Tuning
Several storage and infrastructure improvements are included in this release. First, the S3 file upload timeout has been increased to 5 minutes, providing more reliable transfer for large binary assets. A new check for invalid S3 keys has also been added, catching misconfigured credentials or invalid bucket paths earlier in the upload workflow. For shared link custom authentication, the returned `uid` field is now limited to a maximum of 200 characters, resolving file upload failures caused by excessively long UID values. Additionally, MongoDB slow operation logs now accurately print the target collection name and full operation details, simplifying debugging for self-hosted administrators.

## Application & Dataset Management
Lifecycle management for applications and datasets has been updated to reduce user friction and prevent accidental data loss. Dataset deletion now uses an asynchronous queue-based approach, eliminating blocking delays during large-scale dataset cleanup operations. Furthermore, deleting either an individual app or a dataset now requires users to enter the exact name of the resource as a confirmation step, adding a critical safeguard against unintended deletions.

## LLM & Query Processing Enhancements
This release includes targeted improvements to LLM query handling and response formatting:
1. Query rewriting now leverages JinaAI's marginal utility formula to identify and select the search term with the highest marginal gain, optimizing the relevance of retrieved context for chat workflows.
2. Error messages for invalid images included in LLM requests have been refined to provide clearer, more actionable diagnostic information.
3. A new response field is available for non-stream mode Completions API requests with `detail=false`: the `reason_content` field is now included in the API response, as detailed in the table below:

| API Endpoint               | Request Mode | Parameter Value | New Response Field |
|----------------------------|--------------|-----------------|--------------------|
| `/v1/chat/completions`     | Non-stream   | `detail=false`  | `reason_content`   |

## User Notification System Updates
User-facing notifications now support both Chinese and English languages, with revised, more consistent template formatting across all supported locales, ensuring clearer communication for all users regardless of language preference.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
