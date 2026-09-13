---
title: FastGPT 4.15.0 Platform Technical Improvements
slug: /en/deploy/fastgpt-4-15-0-technical-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# FastGPT 4.15.0 Platform Technical Improvements

# Workflow and User Experience Enhancements
This release includes targeted improvements to FastGPT's workflow editor and core user flows. Key updates include mutually exclusive parent-child node selection to prevent jitter when moving grouped selected nodes, improved long-name adaptation for workflow node names and descriptions, and automatic saving of workflow drafts when a user is redirected due to expired login sessions. Workflow run details now display form input file fields as structured file lists, with strengthened validation for array reference types to avoid conflicts with two-dimensional data. Additional UI updates include truncating long names for apps, datasets, files, and folders with full-name hover previews, virtual list rendering for large app and dataset lists to improve performance, and a revamped login page UI. Template features are hidden for users without creation permissions, and recent chat history is retained per app when switching applications, with local chat cache cleared when switching teams.

# Data Processing and Security Hardening
Data parsing and security have been refined across the platform. PDF parsing now uses `liteparse` instead of PDFJs, with improved processing speed. XLSX parsing now automatically removes empty rows and columns and supports merged cells. Dataset management updates include improved search test interactions and data editing modals, a graceful prompt when deleting a dataset from app orchestration, strengthened indexing error validation with one-click retry for failed items, and filtering of invalid dataset citation markers. Security enhancements include hardened validation for input guide configurations to prevent incorrect custom dictionary URL setups, strengthened protection for third-party dataset requests, HTTP tool parsing, IP detection, and Code Sandbox AST checks. File injection in messages has been moved from system messages to user messages to improve cache hit rates, and site sync rate-limit error prompts have been deduplicated.

# Configurable Runtime Parameters
Several adjustable parameters are available to tailor platform behavior:
| Parameter | Purpose |
|-----------|---------|
| `MULTIPLE_DATA_TO_BASE64` | When set to `true`, configures image processing workers to convert images to base64 before sending them to LLM models |

Additionally, plugin execution entries can now be fetched from object storage and cached in a local directory to improve performance. Other runtime improvements include optimized OTEL log collection format, streamlined stream-resume pause and abnormal interruption recovery to reduce stuck chat states, automatic switching of HTML output to preview mode after generation, a toggle to hide reasoning content in the UI while preserving it for LLM requests, optimized `chat2messages` adaptation to avoid standalone reason output, and automatic filling of empty tool responses with `none` to prevent model errors. Improved error prompts for insufficient balance are now shown to non-admin users and visitors, Skill-related modals, editing interactions, and list API performance have been enhanced, and LLM request traces now use team-isolated queries to prevent cross-team exposure of sensitive data via request IDs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
