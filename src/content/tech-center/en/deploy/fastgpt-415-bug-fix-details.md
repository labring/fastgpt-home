---
title: Official FastGPT 4.15 Bug Fix Details
slug: /en/deploy/fastgpt-415-bug-fix-details
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502
source_type: Official documentation
---

# Official FastGPT 4.15 Bug Fix Details

## Overview
This document outlines all bug fixes included in the FastGPT 4.15 release, designed to resolve stability, session management, workflow editing, and API endpoint issues to enhance platform reliability and user experience.

## Core Workflow & Session Fixes
This section addresses issues across workflow editing, team management, and session handling:
1. Fixed abnormal default value behavior during Workflow single-node debugging.
2. Corrected improper `defaultConfig` override logic in model configuration interfaces.
3. Automatically cleared local chat cache when switching between teams, preventing unintended cross-team data exposure.
4. Implemented comprehensive session stream resume improvements:
   - Restored all submitted form inputs, including `fileSelect` file lists, after page refresh or reconnect resume, eliminating empty forms and missing uploaded files.
   - Preserved loaded AI-generated output and node responses during automatic resume, ensuring restored interactive form values and flow node responses are not lost when server records overwrite local state.
   - Stopped duplicate appending of expired unsubmitted interactions after form submission, and synchronized form default values with `formInputResult` during resume operations.
   - Updated temporary sidebar history items for new sessions to prioritize titles generated from user input, replacing the label with a server-persisted title once available to avoid prolonged "New Chat" display.
   - Fixed a bug where switching between apps briefly showed chat records from another application in the sidebar or session content panel.

## UI Status Prompt Fix
Replaced the warning toast previously shown during session stop with a status prompt synchronized with the backend generation state, providing more accurate and less intrusive session status updates.

## API Endpoint Correction
Fixed the v1/completions API endpoint to ensure `quoteList` within `nodeResponse` correctly returns both `q` and `a` fields, resolving incomplete citation data returns for API consumers. A reference parameter table for the corrected endpoint is below:

| Field Container | Target Field | Corrected Behavior |
|------------------|--------------|---------------------|
| `nodeResponse`   | `quoteList`  | Now returns both `q` and `a` fields |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
