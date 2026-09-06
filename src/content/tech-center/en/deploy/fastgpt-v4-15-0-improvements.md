---
title: FastGPT v4.15.0 Stability and Usability Improvements
slug: /en/deploy/fastgpt-v4-15-0-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502
source_type: Official documentation
---

# FastGPT v4.15.0 Stability and Usability Improvements

This document details the targeted technical improvements included in the FastGPT v4.15.0 self-hosted release, focused on operational stability, workflow usability, dataset management, and chat interaction reliability.

## Session Reliability & State Management
This section addresses gaps in session handling, stream resumption, and cross-app chat state preservation. Key improvements and operational parameters are outlined below:
1.  Stream-resume pause experience: After pausing a running workflow, the client waits for the backend to return the real-time generation state. If the workflow has not completed, the input area remains disabled and displays the exact "Stopping" text, preventing premature submission of subsequent requests.
2.  Abnormal session recovery: Two layered mechanisms resolve stuck "generating" sessions following service crashes or restarts. Critical configuration details are summarized in the table:
| Operational Mechanism | Configuration Specification |
|-----------------------|---------------------------|
| Redis Stream Activity Detection | Triggers state correction after 2 minutes without a heartbeat |
| MongoDB Fallback Retention | Retains the existing 30-minute timeout window to avoid incorrect session state updates during short Redis outages |
3.  Per-app chat ID preservation: Switching between apps in the same browser now restores the last opened `chatId` for each individual app, rather than using a single global shared session ID.
4.  Optimized `chat2messages` adaptation: Eliminates standalone reason output in chat workflow flows.

## Workflow & UI Layout Enhancements
This section refines workflow design and UI consistency for self-hosted deployments:
1.  Disabled invalid connection mode in Workflows to reduce user-induced configuration errors.
2.  Improved layout adaptation for Workflow nodes with extremely long names, preventing UI overflow and layout breakage.
3.  Optimized response detail display: In the full response modal, file fields from form input nodes are now rendered as structured file lists instead of unformatted raw JSON text.

## Dataset & Observability Updates
This section enhances dataset tooling and observability for operational teams:
1.  Optimized OTEL log collection format for more consistent, parseable observability data.
2.  Improved Dataset search test interaction to reduce friction during dataset validation.
3.  Refined the Dataset data editing modal for more intuitive content management.
4.  Improved reason hide toggle: Allows UI-side hiding of reasoning content while preserving the full reasoning payload for LLM request processing.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
