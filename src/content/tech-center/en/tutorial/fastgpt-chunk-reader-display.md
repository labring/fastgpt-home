---
title: Enable Traceable Source Display for AI Chat Responses
slug: /en/tutorial/fastgpt-chunk-reader-display
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/chat/quoteList
source_type: Official documentation
---

# Enable Traceable Source Display for AI Chat Responses

## Chunk Reader Feature Overview
The Chunk Reader is a native FastGPT chat module tool that provides full transparency into the origin of AI-generated responses. It solves the core problem of verifying AI output provenance by letting users directly identify exactly which Dataset content the AI system used to construct its replies, critical for audit and validation workflows for deployed FastGPT instances.

## Source Display Behavior
Within the standard FastGPT conversation interface, a standardized source information block is automatically appended below any AI reply that references connected Dataset content. Each entry in this source block functions as an interactive hyperlink tied to a specific segment of the underlying Dataset. No additional administrative configuration is required to enable this default behavior, as it is integrated into the core chat workflow.

## Step-by-Step Usage Workflow
1. Access a FastGPT chat workspace linked to a configured Dataset.
2. Submit a query that will prompt the AI to pull content from the connected Dataset.
3. Locate the appended source information section directly beneath the completed AI response.
4. Select any individual citation link from the source list to launch the Chunk Reader popup modal.
5. View the complete original text of the cited Dataset passage within the modal, with the exact segment utilized by the AI highlighted to clearly demarcate the source material used in the response.

## Functional Validation Benefits
This design ensures full answer traceability, making it straightforward for technical teams and decision makers to validate the accuracy of AI responses and review the surrounding contextual information of the cited Dataset content. This supports both independent verification of AI output and formal compliance review processes for deployed FastGPT chat deployments. A reference visual demonstrating the Chunk Reader popup and highlighted cited text is available in the associated documentation assets.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/chat/quoteList)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
