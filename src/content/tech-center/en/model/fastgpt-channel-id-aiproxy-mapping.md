---
title: Match FastGPT Channel IDs to AIProxy Protocols
slug: /en/model/fastgpt-channel-id-aiproxy-mapping
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Match FastGPT Channel IDs to AIProxy Protocols

## Mandatory Channel ID Alignment
When configuring AIProxy protocol integrations in FastGPT, the `channelId` field must exactly match the `ChannelType` constant values defined in the `core/model/chtype.go` file of the AIProxy repository. You must never attempt to guess this ID based on the name of the AI service provider; all valid IDs must be sourced directly from the official AIProxy codebase.

## Retrieve Official Channel Type IDs
To view the complete set of valid `ChannelType` constants and their associated numeric IDs, run the following ripgrep command within the root directory of the AIProxy repository:
```bash
rg -n "ChannelType.*=" core/model/chtype.go
```
This command returns all defined channel type constants alongside their line numbers in the source file. Always use the version of `core/model/chtype.go` from the AIProxy main branch as the single source of truth for current valid IDs.

## Standard Predefined Mappings
The following table lists common, widely used AIProxy channel type mappings as a reference subset. For a full, up-to-date list, always use the official lookup command above:

| AIProxy ChannelType       | Numeric ID | FastGPT `channelId` |
| ------------------------- | ---------- | ------------------- |
| `ChannelTypeOpenAI`       | `1`        | `1`                 |
| `ChannelTypeAnthropic`    | `14`       | `14`                |
| `ChannelTypeAli`          | `17`       | `17`                |
| `ChannelTypeGoogleGemini` | `24`       | `24`                |
| `ChannelTypeDeepseek`     | `36`       | `36`                |
| `ChannelTypeDoubao`       | `40`       | `40`                |
| `ChannelTypeSiliconflow`  | `43`       | `43`                |
| `ChannelTypeAntLing`      | `54`       | `54`                |

Each entry in this table shows the exact `channelId` value required for FastGPT to correctly associate a model configuration with the corresponding AIProxy protocol. Using an incorrect ID will result in failed model calls or configuration errors.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
