---
title: FastGPT 4.15.02 New Feature Technical Details
slug: /en/deploy/fastgpt-41502-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502
source_type: Official documentation
---

# FastGPT 4.15.02 New Feature Technical Details

## Skill Editing for Agents
This release introduces native skill editing functionality for AI agents within the FastGPT platform. Authorized users may now configure and assign static Skills to agents for extended task execution. A key limitation of this initial implementation is that reverse calls to system tools are not supported at this time. No additional environment configuration is required to access this feature beyond standard platform access permissions.

## AgentV2 Loop Logic Rework
The loop execution logic for the agentV2 framework has been fully reworked to improve workflow stability. This internal refactor modifies how the agent handles iterative task loops, but no user-configurable parameters or interface changes are exposed for this update. All changes are applied automatically when using the agentV2 framework.

## Multimodal Dataset Search
Dataset search capabilities have been expanded to support native multimodal embedding models, alongside native image-to-image search functionality. Users with configured datasets may now leverage these updated search modes without requiring third-party integration tools. This update aligns dataset search functionality with modern multimodal AI requirements.

## Chat API Validation Updates
Three core API endpoints now include pre-execution `dataId` duplicate validation to prevent invalid workflow runs. The validated endpoints are `/v1/chat/completions`, `/v2/chat/completions`, and `chatTest`. The validation checks whether the submitted `dataId` appears duplicate within the current request payload or existing records in the active session.
The following table outlines the specific validation behavior per endpoint:
| API Endpoint | Validation Check |
|--------------|------------------|
| `/v1/chat/completions` | Duplicate `dataId` in request or active session |
| `/v2/chat/completions` | Duplicate `dataId` in request or active session |
| `chatTest` | Duplicate `dataId` in request or active session |
If a duplicate `dataId` is detected, the API returns an immediate business error, blocking invalid data from entering workflow execution and stream-resume merge logic. This validation is enabled by default for all listed endpoints with no additional user setup required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41502)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
