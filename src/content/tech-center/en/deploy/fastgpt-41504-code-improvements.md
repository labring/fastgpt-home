---
title: FastGPT 4.15.04 Key Code Improvement Changes
slug: /en/deploy/fastgpt-41504-code-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504
source_type: Official documentation
---

# FastGPT 4.15.04 Key Code Improvement Changes

## Plugin Service Monorepo Restructuring
FastGPT 4.15.04 restructures the plugin service’s underlying architecture, replacing the legacy runtime structure with a pnpm workspace monorepo. The monorepo is split into seven standardized, modular packages, each with a dedicated purpose:

| Package Name               | Core Purpose                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| HTTP Service Entry          | Primary runtime entry point for handling incoming plugin HTTP requests      |
| Domain Models               | Core business data structures governing plugin workflow state               |
| Use Cases                   | Standalone business logic implementations for core plugin operations         |
| API Adapters                | Abstraction layers for integrating with external APIs and services          |
| Infrastructure              | Low-level system utilities and platform connectivity tools                  |
| SDK                         | Client software development kit for building custom plugin extensions       |
| CLI                         | Command-line interface for managing plugin deployments and configurations    |

This modular structure improves maintainability, allows for targeted updates, and simplifies cross-team collaboration on plugin-related code.

## Zod-Schema API Endpoint Validation & Docs
All application API endpoints have been fully rewritten using Zod schemas for strict, type-safe input and output validation. Official API documentation is automatically generated directly from the deployed Zod schemas, eliminating manual documentation updates and ensuring alignment between the codebase and published API specifications.

## Image Processing Memory Optimization
The platform’s image processing pipeline has been updated to process images immediately in dedicated worker threads, rather than retaining base64-encoded image data in main memory during processing. This change removes the memory overhead of storing uncompressed base64 image data throughout the workflow, lowering overall system memory usage and improving stability during high-volume image operations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
