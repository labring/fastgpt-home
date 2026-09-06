---
title: Set Up and Manage FastGPT Model Channels
slug: /en/deploy/fastgpt-model-channel-setup
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Set Up and Manage FastGPT Model Channels

## Prerequisite Navigation and Model Prep
First, navigate to the `Model Channels` tab (shown in screenshot `aiproxy-1`). Only models pre-configured in the `Model Configuration` menu can be added to a channel; the FastGPT system includes mainstream models by default. If a required model is not available in the default list, add it via Model Configuration first before proceeding.

## Step-by-Step Channel Creation
1.  Click the "Add Channel" button in the top-right corner of the Model Channels tab to open the configuration page (screenshot `image-122`).
2.  Use Alibaba Bailian models as a reference for filling out the configuration fields (screenshot `image-123`). The required configuration fields are detailed below:
| Configuration Field | Description |
|---------------------|-------------|
| Channel Name | A display-only label for channel identification |
| Protocol Type | The API protocol for the model. Most providers support the OpenAI protocol, which can be selected as a universal option |
| Models | Pre-configured models available for the channel. If the desired model is not in the dropdown menu, click "Add Model" to add a custom model via the linked configuration flow |
| Model Mapping | A JSON object mapping internal FastGPT model names to the actual model names used by the upstream provider. Example: `{"gpt-4o-test": "gpt-4o"}` — FastGPT uses the internal name, while AI Proxy forwards the upstream model name |
| Proxy URL | The base URL for the model API; do not input the full request URL. Confirm whether the path `/v1` must be appended to the base URL |
| API Key | API credentials obtained from the model provider. Some providers require multiple keys; follow on-screen prompts for input requirements |
3.  Click "Add" to save the new channel, which will appear in the Model Channels list (screenshot `aiproxy-4`).

## Key Configuration Notes
- The Proxy URL field only accepts the base API endpoint, not the full model request path. Always verify if the `/v1` path segment is required for the target provider.
- Model mapping creates a consistent internal naming layer, eliminating the need to update internal FastGPT references when upstream model names change.
- All API keys must be obtained directly from the respective model provider, with credentials matching the protocol and proxy URL configured for the channel.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
