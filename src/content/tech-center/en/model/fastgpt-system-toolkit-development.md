---
title: Create FastGPT System Plugin Toolkits for Developers
slug: /en/model/fastgpt-system-toolkit-development
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Create FastGPT System Plugin Toolkits for Developers

# Toolkit Development Basics
FastGPT system toolkits bundle multiple related custom tools into a single distributable package. Use the `defineToolSet()` function to create a toolkit, with shared configuration stored at the top level, and individual tool definitions listed in a dedicated array. All schema validation and UI metadata rely on Zod annotations, with explicit meta fields for multi-language support and secure credential handling.

# Core Configuration Parameters
The `defineToolSet()` function accepts three top-level configuration groups:
| Field | Purpose |
|-------|---------|
| `manifest` | Global plugin metadata, including `pluginId`, `version`, and multi-language `name` and `description` |
| `secretSchema` | Shared Zod schema for sensitive credentials, with UI display annotations |
| `children` | Array of individual tool definitions, each with `id`, multi-language `name`/`description`, `toolDescription`, and `handler` |

Each child tool uses a handler created via `createToolHandler()`, which defines input/output schemas, references the shared secret schema, and implements execution logic. Input and output schemas include meta annotations to set user-facing field titles for the FastGPT interface.

# Step-by-Step Implementation
Follow this workflow to build a functional toolkit using the provided sample code:
1. **Import Dependencies**: Pull required functions from `@fastgpt-plugin/sdk-factory` and Zod for schema validation.
2. **Define Shared Secrets**: Create a Zod object schema for credentials like `apiKey`, with a meta annotation marking it as sensitive (`isSecret: true`) and setting a UI title of "API Key".
3. **Build Individual Tools**: Use `createToolHandler()` for each tool. The sample search tool has an ID of `search`, accepts a `query` input, and returns an array of text items under the `items` key. The summary tool has an ID of `summary`, accepts a `content` input, and returns a truncated 100-character summary under the `summary` key. Both tools reference the shared secret schema and include multi-language display names and descriptions.
4. **Bundle and Export**: Call `defineToolSet()` with the global manifest (including `pluginId: 'text-tools'`, version `1.0.0`, and multi-language names/descriptions), the child tool array, and the shared secret schema. Export the final toolkit for integration with FastGPT.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
