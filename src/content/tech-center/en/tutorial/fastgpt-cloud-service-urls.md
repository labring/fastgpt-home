---
title: Locate Valid FastGPT Cloud Service URLs
slug: /en/tutorial/fastgpt-cloud-service-urls
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/version/cloud/intro
source_type: Official documentation
---

# Locate Valid FastGPT Cloud Service URLs

## Regional FastGPT Cloud Deployment Overview
FastGPT provides two separate regional cloud service instances, optimized for use in the China Mainland and global international markets. These instances operate with fully isolated user account systems, with no shared access between deployments. The official service URLs for each instance are the primary entry points for accessing the web application and associated tools for their respective deployments.

## Official Service URL Reference Table
The following table lists the official service URLs and associated metadata tags for each regional deployment, as specified in official documentation:

| Deployment Region | Base Service URL | Campaign Tag | Site Identifier | Documentation Content Tag |
|-------------------|------------------|--------------|-----------------|---------------------------|
| China Mainland    | https://fastgpt.cn | docs_cloud_intro | cn | cloud_entry_cn |
| International     | https://fastgpt.io | docs_cloud_intro | io | cloud_entry_io |

Each metadata tag pair is used for internal documentation tracking as defined in FastGPT's official cloud deployment guidelines.

## Account Isolation Guidelines
User accounts created on one regional FastGPT cloud deployment cannot be used to access the other deployment. Individuals or organizations requiring access to both the China Mainland and International cloud instances must complete a separate registration process for each instance to gain full access to their respective services.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/version/cloud/intro)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
