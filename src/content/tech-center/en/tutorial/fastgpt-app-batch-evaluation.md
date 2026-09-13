---
title: Perform Quantitative FastGPT App Performance Evaluation
slug: /en/tutorial/fastgpt-app-batch-evaluation
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/evaluation
source_type: Official documentation
---

# Perform Quantitative FastGPT App Performance Evaluation

## Overview
FastGPT v4.11.0 and later include beta support for batch application evaluation. This feature automates the process of scoring your FastGPT application's generated responses, enabling objective, repeatable assessment of application performance. By allowing users to submit multiple QA pairs, the system eliminates manual review of individual responses, delivering consistent performance metrics across multiple test runs. This tool helps technical teams and decision makers measure their FastGPT application's performance with standardized, automated scoring.

## Supported Evaluation Metrics
The FastGPT batch evaluation tool supports three core evaluation metrics for measuring application performance: answer accuracy, question relevance, and semantic accuracy. As a beta release, only answer accuracy is currently available for use. The remaining two metrics will be added in future platform releases.

## Metric Availability Table
| Metric Name               | Current Availability
|---------------------------|---------------------|
| Answer Accuracy            | Available in Beta
| Question Relevance         | Scheduled for Future Release
| Semantic Accuracy        | Scheduled for Future Release

## Batch Evaluation Usage
To utilize the batch evaluation feature, you must provide multiple QA pairs. The system will automatically score your application's responses, generating quantitative performance metrics for your FastGPT application. No additional configuration steps are required beyond submitting valid QA pairs for this beta feature.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/evaluation)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
