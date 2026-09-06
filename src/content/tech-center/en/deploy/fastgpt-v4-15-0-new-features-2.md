---
title: FastGPT v4.15.0 Self-Hosted New Feature Updates
slug: /en/deploy/fastgpt-v4-15-0-new-features-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501
source_type: Official documentation
---

# FastGPT v4.15.0 Self-Hosted New Feature Updates

## Workflow and Variable Enhancements
This release introduces core workflow improvements for self-hosted FastGPT deployments. The legacy Batch Execution node has been deprecated and replaced with a new Loop node, which provides more flexible iterative workflow control for processing sequential or conditional tasks. Additionally, global variable inputs now support object values, expanding supported input data types beyond primitive values to enable complex data structure passing between workflow nodes. This change simplifies integration of multi-part data inputs without requiring pre-processing flattening.

## Third-Party Integrations and Tooling Updates
Several new integration and tooling features are available for extended functionality:
- A DingTalk Dataset integration is now in beta, enabling connection to third-party dataset sources; note that rich-text retrieval has known unresolved issues with this beta release.
- When the virtual machine (VM) feature is enabled in tool-calling mode, any files uploaded via chat input are automatically injected directly into the associated virtual machine, eliminating manual file transfer steps for VM workflows.
- S3 CDN support has been added for optimized asset delivery across deployments.
- Rerank models now include support for the `defaultConfig` field, allowing standardized pre-configuration of model parameters across deployments.

## Concurrency Control and Deployment Configurations
To prevent excessive resource contention during resource-intensive tasks, three dedicated worker pools have been implemented: file parsing, HTML-to-Markdown conversion, and text chunking. The following table outlines the available worker pool types and their configuration method:
| Worker Pool Category          | Configuration Method                  |
|--------------------------------|---------------------------------------|
| File parsing                   | Adjustable via environment variables  |
| HTML-to-Markdown conversion    | Adjustable via environment variables  |
| Text chunking                  | Adjustable via environment variables  |
Administrators can tune pool sizes via environment variables to align with their infrastructure's available resources. Additionally, model reasoning configuration has been added, providing a dedicated setup layer for fine-tuning model inference parameters to match specific workload requirements.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
