---
title: Key FastGPT Plugin Repository Responsibilities Explained
slug: /en/model/fastgpt-plugin-repo-responsibilities
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Key FastGPT Plugin Repository Responsibilities Explained

## FastGPT Plugin Ecosystem Repository Structure
The FastGPT plugin ecosystem organizes plugin-related code across four specialized, role-specific repositories to streamline development, distribution, and governance. Each repository has a defined, non-overlapping purpose to avoid code duplication and align with different use cases for plugin deployment.

## Official Repository Purpose Table
The following table outlines the core purpose of each repository in the FastGPT plugin ecosystem:

| Repository                  | Purpose                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `labring/fastgpt-plugin`    | Plugin service, SDK, CLI, debug monitor, and infrastructure code.      |
| `fastgpt-official-plugins`  | Plugins maintained or reviewed by FastGPT officials.                   |
| `fastgpt-community-plugins` | Community third-party plugins.                                         |
| `fastgpt-business-plugins`  | Private plugins, customer-customized plugins, and commercial delivery. |

## fastgpt-plugin Repository Constraints
The `labring/fastgpt-plugin` repository does not host any end-user plugin source code. Its supported functionality is limited to core development tooling and runtime infrastructure: it provides local plugin debugging via the integrated CLI, automated build workflows, static code checking to enforce standards, packaging of distributable plugin artifacts, and running a local plugin service server for testing. All production-ready plugin implementations must be stored in one of the dedicated plugin repositories: the official, community, or business-specific plugin repos. This separation ensures the core toolkit remains focused on development workflows rather than hosting finished plugin assets.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
