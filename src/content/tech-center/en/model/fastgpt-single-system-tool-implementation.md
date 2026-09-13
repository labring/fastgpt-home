---
title: Implement Valid Single FastGPT System Tools
slug: /en/model/fastgpt-single-system-tool-implementation
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Implement Valid Single FastGPT System Tools

All single FastGPT system tools must follow a standardized structure to integrate correctly with the platform. This guide covers the mandatory configuration and implementation steps using the official FastGPT plugin SDK.

## Required Base Structure
The system tool entry point must default-export a configured SDK factory instance. Start by importing core dependencies: the `createToolHandler`, `defineTool` function, and associated type helpers from `@fastgpt-plugin/sdk-factory`, plus Zod for schema validation. The complete implementation includes secret credential, input parameter, and output response schemas, a handler function, and a wrapped tool export.

## Core Mandatory Rules
Adhere to these non-negotiable rules for valid tool deployment:
- Stable identifiers: `pluginId`, input/output field names, and tool ID must remain unchanged after publishing to avoid breaking existing integrations.
- Multilingual manifests: Use `{ en, 'zh-CN' }` nested objects for `name`, `description`, and `versionDescription` manifest fields.
- Schema metadata: Attach `InputSchemaMetaType` to all input fields, `OutputSchemaMetaType` to output fields, and `SecretSchemaMetaType` to sensitive fields with `isSecret: true` flag set.
- Handler compliance: The async handler function must return values that exactly match the defined `outputSchema`.
- Error handling: Convert external API errors into user-actionable messages, and never expose secrets, tokens, or full sensitive API responses.
- Context utilities: Use `ctx.invoke.uploadFile()` for host-initiated file uploads, preserving returned error values, and `ctx.streamResponse()` to deliver real-time progress updates to end users.

## Step-by-Step Implementation Example
Break down the official reference implementation:
1. **Define Secret Schema**: Create a Zod object schema for sensitive credentials, such as an `apiKey` field marked as secret with a user-friendly display title.
2. **Configure Input/Output Schemas**: Define the input schema with a required `query` search keyword field, and the output schema with a `result` field to return processed tool data.
3. **Build Handler Function**: Write an async handler function that accepts input parameters and execution context, then returns a response matching the defined output schema. The reference example returns the input query string as a test response.
4. **Export Final Tool**: Wrap the configured handler and manifest details in `defineTool()` to export the complete tool. The manifest includes required fields including `pluginId: 'example-search'`, version `1.0.0`, multilingual names and descriptions, and a `tools` category tag.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
