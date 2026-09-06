---
title: Procedures for FastGPT Application Version Rollbacks
slug: /en/tutorial/fastgpt-version-rollback
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/version
source_type: Official documentation
---

# Procedures for FastGPT Application Version Rollbacks

## Overview of FastGPT Version Rollback
FastGPT’s version rollback feature enables users to revert both their active workspace files and the live production version of their application to a previously published snapshot. This tool provides a quick, automated way to restore a known-stable application state after unintended changes, broken deployments, or to revert to a prior configuration.

## Step-by-Step Rollback Process
Follow these official steps to complete a version rollback:
1. Open the FastGPT application editor, then click the **"Version History"** clock icon located in the top right corner of the editor interface. This action will display a full list of all published snapshots for your application.
2. Hover your cursor over the version snapshot you wish to restore. A **"Switch"** return arrow icon will appear adjacent to the selected version; click this icon to instantly revert your workspace and live production application to the chosen snapshot state.

## Critical Rollback Limitations
An important limitation applies to all version rollback operations: restored snapshots will not include any files excluded by your project’s `.gitignore` file. Common examples of unrecoverable ignored files include local dependency directories such as `node_modules` or `.venv`. These files are not saved as part of published application snapshots, so they cannot be recovered via the rollback process.

![Version History & Rollback](/imgs/version_history_rollback.png)

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/version)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.
