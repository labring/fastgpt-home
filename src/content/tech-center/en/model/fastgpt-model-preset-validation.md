---
title: Validate Updated FastGPT Model Preset Changes
slug: /en/model/fastgpt-model-preset-validation
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Validate Updated FastGPT Model Preset Changes

Model preset modifications in FastGPT can introduce unintended issues if not properly validated. This document outlines the official, source-verified validation workflow to ensure your changes are correct, compliant, and do not break existing functionality. All steps are taken directly from the FastGPT official model presets documentation.

## Mandatory Basic Validation
After making any changes to FastGPT model presets, run the following mandatory command to validate type safety across the codebase. This checks for type mismatches, missing fields, and other syntax-related errors specific to your preset updates:
```bash
pnpm typecheck
```
Running this command first catches simple, common errors before proceeding to more comprehensive testing.

## Extended Comprehensive Validation
For changes that impact broad areas of the model preset system—including modifications to multiple AI providers, model schemas, or static asset loading logic—you must run the full test suite to validate end-to-end functionality:
```bash
pnpm test
```
This test suite covers integration with provider APIs, schema validation for model configurations, and static asset loading, ensuring that your changes do not disrupt existing working components of the FastGPT platform.

## Static Data Diff Review
The final mandatory pre-submission step is reviewing the git diff for the static model data directory located at `packages/infrastructure/src/static-data/models/`. Use this structured checklist to validate the diff thoroughly:

| Validation Task | Required Verification |
|-----------------|----------------------|
| Unintended Model Removal | Confirm no unrelated provider model entries were accidentally deleted from the directory |
| Correct Model Types | Ensure all updated or newly added model entries use the intended, correct type definitions |
| Asset File Inclusion | Check that any new provider logo or `channel-avatar` files required for your changes are included in the tracked diff changes |

This manual review prevents accidental data loss, incorrect model configurations, and missing assets that automated testing might not catch.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
