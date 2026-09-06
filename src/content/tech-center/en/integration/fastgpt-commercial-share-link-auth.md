---
title: Configure FastGPT Commercial Share Link Authentication
slug: /en/integration/fastgpt-commercial-share-link-auth
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/link
source_type: Official documentation
---

# Configure FastGPT Commercial Share Link Authentication

# Share Link Authentication Background
Prior to the introduction of share link authentication, FastGPT v4.6.4 implemented a localId-based system for share link chat history access. Each visitor receives a unique `localId` to identify their session and pull cloud-stored chat history. However, this system has strict limitations: it only functions on the exact device and browser that generated the localId. Switching devices or clearing browser cache will permanently erase all associated chat history records. Additionally, only the most recent 20 chat records from the past 30 days are available via this default flow.

# Feature Eligibility and Core Purpose
Share link authentication is exclusively available for the FastGPT commercial edition. Its core design goal is to enable quick, secure integration of the FastGPT chat interface into existing external systems. Unlike the default localId-based flow, this authentication method removes device and browser binding, while still adhering to the existing record access constraints. All integrations use exactly two standardized API endpoints to handle authentication and chat history retrieval.

# Key Specification Parameters
| Specification | Value |
|---------------|-------|
| Minimum Required FastGPT Version | v4.6.4 |
| Feature Edition Requirement | Commercial Only |
| Maximum Accessible Chat Records | 20 per session |
| Record Retention Time Window | Past 30 days |
| Required Integration Endpoints | 2 total |

# Implementation Overview
To implement share link authentication, teams must connect to the two provided API endpoints to enable secure embedding of the FastGPT chat interface into external systems. No additional custom development beyond interacting with these endpoints is required. All authenticated share link sessions will follow the predefined record limits and time window, ensuring consistent behavior across all integrated environments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/link)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
