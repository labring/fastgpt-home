---
title: Configure External Citation Visibility for FastGPT Shared Links
slug: /en/tutorial/fastgpt-external-citation-visibility
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/chat/quoteList
source_type: Official documentation
---

# Configure External Citation Visibility for FastGPT Shared Links

## Overview
FastGPT provides flexible citation visibility settings to balance content openness and data security, specifically for anonymous shared chat links. Administrators can use these controls to precisely define which parts of source documents external visitors are allowed to access, preventing unintended exposure of full source material.

## Supported Visibility Modes
The platform includes a dedicated visibility mode tailored for restricted external access:
| Visibility Mode | Core Behavior |
|------------------|---------------|
| Citation Content Only | External users clicking citation links will only view the exact cited text fragments, not the full original source document |

When this mode is active, the built-in Chunk Reader component automatically adjusts its display mode to match the configured restrictions. The following visual examples illustrate the two primary display states:
| Standard Display | Restricted Citation-Only Display |
|------------------|----------------------------------|
| ![](/imgs/chunkReader8.png) | ![](/imgs/chunkReader9.jpg) |

## Step-by-Step Configuration
To apply citation visibility restrictions for anonymous shared links:
1. Access the settings panel for your FastGPT shared chat link.
2. Locate the citation visibility configuration selector.
3. Select the "Citation Content Only" option from the available modes.
4. Save the updated settings to enforce the restrictions.

## Automatic Chunk Reader Behavior
The Chunk Reader component integrates natively with the visibility settings, requiring no additional manual configuration beyond selecting the desired mode. When "Citation Content Only" is active, the Chunk Reader filters out all full source document content, rendering only the specific text segments referenced in the chat response. This ensures external visitors cannot access unapproved portions of source material while still allowing them to verify the exact content cited in the chat interaction.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/chat/quoteList)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
