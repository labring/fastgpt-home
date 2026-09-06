---
title: FastGPT Marketplace Distribution and Usage Boundaries
slug: /en/model/fastgpt-marketplace-usage-boundaries
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# FastGPT Marketplace Distribution and Usage Boundaries

# FastGPT Marketplace Overview
FastGPT Marketplace is the centralized distribution channel for displaying and sharing official and community-developed plugins for FastGPT. This reference document outlines the official operational boundaries and approved workflows for plugin distribution, access, and uploads, tailored for engineers and technical decision makers evaluating or operating FastGPT deployments.

# Core Distribution Boundaries
The FastGPT Marketplace has fixed, non-negotiable operational boundaries that govern all plugin distribution and usage:
- The Marketplace operates exclusively as a SaaS distribution service; no private deployment version of the Marketplace is provided.
- Community-developed plugins must first be submitted to the official Community Plugins repository, pass a mandatory basic review process, before being included in the public FastGPT Marketplace.
- When team-level plugin uploads are enabled, team administrators are permitted to upload custom plugins for exclusive use within their specific team.
- System administrators have elevated permissions to upload third-party custom plugins, and can manage these uploaded tools as system-wide available plugins for all authorized platform users.

# Approved Plugin Upload and Access Workflows
Three distinct workflows align with the Marketplace’s core boundaries, covering all valid plugin access and deployment scenarios:
## Community Plugin Submission Workflow
1. Submit the completed community plugin to the official Community Plugins repository.
2. Await completion of the required basic review process for community plugin submissions.
3. Once review is successfully passed, the plugin is added to the FastGPT Marketplace for public access.

## Team Custom Plugin Workflow
1. Confirm that team plugin uploads are enabled for your FastGPT team environment.
2. Authenticate using an account granted team administrator permissions.
3. Upload the custom plugin file, which will only be accessible to members of your assigned team.

## System Admin Third-Party Plugin Workflow
1. Authenticate using an account granted full system administrator permissions.
2. Upload the third-party custom plugin file to the FastGPT platform.
3. Manage the uploaded plugin as a system-wide tool, controlling access for all authorized platform users.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
