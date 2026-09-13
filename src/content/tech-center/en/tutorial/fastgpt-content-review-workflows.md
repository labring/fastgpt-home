---
title: Implement Content Review and Auto Rewriting Workflows
slug: /en/tutorial/fastgpt-content-review-workflows
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Implement Content Review and Auto Rewriting Workflows

## Workflow Use Case Overview
FastGPT workflows are optimized for tasks with fixed sequential steps, clear logical frameworks, and requirements for branching decision-making or human confirmation. This use case implements a content compliance review workflow that mirrors enterprise pre-publication content review processes. The workflow breaks the end-to-end review task into six distinct stages: compliance Dataset retrieval, AI content classification, conditional branching routing, automatic content rewriting, rejection explanation generation, and optional human confirmation. The core input for this workflow is content intended for official publication, with review rules sourced from a dedicated compliance Dataset, and standard output options including pass, rewrite required, or reject.

## Core Workflow Value
This implementation delivers two key operational benefits:
1.  **Automation**: Upon being triggered, the system automatically executes all predefined workflow steps without manual intervention for each stage.
2.  **Standardization**: All identical input content follows the exact same judgment and processing pipeline, eliminating variability caused by inconsistent human decision-making.
To assess if a task is suitable for FastGPT workflows, verify it meets three core characteristics: stable repeatable steps, clearly defined rules, and consistent repeatable execution. Content review is a canonical example of such a task, as it aligns with all three criteria while improving processing efficiency and retaining strict risk control over published content.

## Step-by-Step Workflow Configuration
1.  **Define Input**: Set the workflow to accept content intended for publication as the core input.
2.  **Add Dataset Retrieval Node**: Connect a compliance-focused Dataset to pull review rules for the input content.
3.  **Insert AI Classification Node**: Configure an AI node to classify the input content against the retrieved compliance rules.
4.  **Set Up Conditional Branching**: Create three routing paths based on classification results:
    - Pass: Route content to final output
    - Rewrite Required: Trigger the automatic rewriting stage
    - Reject: Trigger the rejection explanation stage
5.  **Run Automatic Rewriting**: Process content flagged for revision via the auto rewriting workflow step.
6.  **Generate Rejection Explanations**: Auto-create clear compliance violation explanations for rejected content.
7.  **Add Human Confirmation (Optional)**: Insert a manual approval step to review rewritten or high-risk content before finalization.
8.  **Output Results**: Deliver standardized outputs including approved content, revised content, or rejection notices with explanations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
