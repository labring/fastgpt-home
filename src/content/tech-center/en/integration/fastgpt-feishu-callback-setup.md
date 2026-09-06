---
title: Configure Feishu Publishing Callback URLs
slug: /en/integration/fastgpt-feishu-callback-setup
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/feishu
source_type: Official documentation
---

# Configure Feishu Publishing Callback URLs

## Callback URL Configuration Fundamentals
To enable bidirectional event communication between your FastGPT published bot and the Feishu platform, you must configure a valid callback URL. This URL acts as the dedicated endpoint that receives and processes all user interaction events sent from Feishu to your FastGPT deployment. Without this properly configured URL, the published Feishu bot will not be able to receive or respond to user messages.

## Step-by-Step Callback Setup
Follow these sequential steps to complete the callback URL configuration:
1. First, finalize the creation of your Feishu publishing channel within the FastGPT administrative interface.
2. Locate the **Request URL** button linked to your newly created Feishu publishing channel, then click it to generate and copy the corresponding request URL to your clipboard.
3. Open the official Feishu (Lark) developer console for your registered bot application.
4. In the left-hand sidebar navigation menu, select the `Events & Callbacks` option.
5. Find the `Configure Subscription Method` entry, then click the inline edit icon located immediately next to this entry.
6. Paste the copied FastGPT request URL into the provided input field, ensuring the full URL string is pasted without any accidental leading or trailing whitespace.

## Visual Configuration References
The following table maps key stages of the Feishu console configuration to their corresponding screenshot assets:
| Configuration Stage | Associated Screenshot |
|---------------------|-----------------------|
| Feishu console sidebar navigation to Events & Callbacks | ![Image](/imgs/feishu-bot-10.jpg) |
| Editing Feishu subscription method settings | ![Image](/imgs/feishu-bot-11.jpg) |
| Callback URL input field in the Feishu console | ![Image](/imgs/feishu-bot-6.png) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/feishu)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
