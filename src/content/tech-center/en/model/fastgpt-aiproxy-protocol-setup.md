---
title: Set Up FastGPT AIProxy Protocol Entries
slug: /en/model/fastgpt-aiproxy-protocol-setup
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Set Up FastGPT AIProxy Protocol Entries

## Core Differentiators Between AIProxy and Model Providers
FastGPT includes two distinct framework components for model integration, each with separate core responsibilities:
- **Model Provider**: Defines which `provider` identifier is linked to custom model presets, maintains the official model list and supported model capabilities, and uses the static asset path `provider/{Provider}/logo.svg` for its official avatar image.
- **AIProxy Protocol**: Controls whether the protocol is visible in the FastGPT AIProxy channel selection menu. The AIProxy routing system directs incoming requests to matching adaptors using the `channelId` field, and FastGPT uses the path `channel-avatar/{avatar}.svg` for the channel’s displayed avatar.

## When to Implement an AIProxy Protocol
You do not need to create an AIProxy protocol entry if your only task is adding custom model presets. The `aiproxyChannels` configuration array only needs to be modified when you require the protocol to appear as a selectable option in the FastGPT AIProxy channel list for end users.

## Step-by-Step AIProxy Protocol Setup
1. Locate the FastGPT core configuration file where the `aiproxyChannels` array is defined.
2. Add a new entry to the array, assigning a unique `channelId` value to ensure proper request routing.
3. Prepare your custom channel avatar file, and place it in the FastGPT static assets directory at the path `channel-avatar/{avatar}.svg`, replacing `{avatar}` with your chosen unique avatar identifier.
4. Restart the FastGPT service to apply the new configuration changes.

## Configuration Reference
The following standard parameters and paths apply to AIProxy protocol setup, as defined in the FastGPT framework:
| Parameter/Path | Purpose |
|----------------|---------|
| `provider` | Unique identifier for the associated model provider (only required for model provider setup, not core AIProxy protocol configuration) |
| `channelId` | Unique routing key used by the AIProxy system to direct requests to the correct adaptor |
| Model Provider Avatar | Static asset path: `provider/{Provider}/logo.svg` |
| AIProxy Channel Avatar | Static asset path: `channel-avatar/{avatar}.svg` |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
