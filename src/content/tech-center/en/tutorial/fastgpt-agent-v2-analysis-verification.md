---
title: Verify FastGPT Agent V2 Analysis Outputs
slug: /en/tutorial/fastgpt-agent-v2-analysis-verification
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Verify FastGPT Agent V2 Analysis Outputs

## Standardized Analysis Output Structure
FastGPT Agent V2’s Intelligent Data Analysis Agent requires a complete final output that includes four mandatory components: analysis plan, data overview, core findings, and business recommendations. This structured format ensures the full end-to-end data workflow is captured, from initial data processing to final guidance.

## Core Verification Principles
The value of the data analysis agent extends beyond basic summary outputs, as it connects the full process of reading data, calculating metrics, explaining results, and proposing recommendations. To validate the quality of agent-generated analysis, focus on four core dimensions during review:
- Conclusions must be directly derived from actual processed or raw data
- All referenced metrics must have clear, unambiguous definitions
- Included charts or statistics must fully support stated core findings
- Business recommendations must be specific and implementable

## Step-by-Step Verification Workflow
Follow this structured workflow to validate agent outputs:
1.  Cross-reference all reported conclusions against the data the agent processed, ensuring no claims are unsupported by actual data.
2.  Verify that every metric referenced in the analysis has a clearly stated, consistent definition used throughout the report.
3.  Confirm that all included charts, tables, or statistical values directly align with and reinforce the core findings outlined in the analysis.
4.  Assess each proposed business recommendation to ensure it includes specific, actionable steps tied to the analyzed data and findings.

A reference screenshot illustrating valid output formatting and verification checks is available at `/imgs/guide/getting-started/quick-start/image-40.png`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
