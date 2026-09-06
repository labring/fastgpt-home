---
title: Resolve FastGPT FeiShu Bot Message Non-Response Issues
slug: /en/integration/fastgpt-feishu-bot-troubleshooting
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/feishu
source_type: Official documentation
---

# Resolve FastGPT FeiShu Bot Message Non-Response Issues

## Pre-Deployment Configuration Checks
Before testing bot interactions, first validate the core setup of your FeiShu (Lark) bot. Confirm the callback URL linked to the bot points to the correct FastGPT endpoint, and that all required permission scopes are enabled in the FeiShu developer console. Incorrect callback configurations or missing permissions will prevent the bot from receiving or responding to user messages entirely.

## Structured Troubleshooting Workflow
Follow this step-by-step diagnostic process to identify the root cause of unresponsive bot behavior:
1.  Access the FastGPT chat logs dashboard and search for a log entry matching the user's incoming FeiShu message.
2.  If a matching log entry is found but no FeiShu response was sent to the user: The bot is missing one or more required operational permissions. Return to the FeiShu developer console to enable all necessary scopes for message delivery.
3.  If no matching log entry appears in the FastGPT logs: The FastGPT application has encountered an unhandled error during query processing. Deploy a minimal test bot with no advanced configurations to isolate the issue.
4.  Critical input restriction: FeiShu bots integrated with FastGPT cannot accept global variables, file uploads, or image content as user input. Sending these types of content will trigger application errors that prevent log creation and bot responses.

## Permission Scope Verification
When confirming bot permissions, ensure all scopes needed for sending messages and interacting with user chats are enabled in the FeiShu bot management console. Without these scopes, the FeiShu platform will block any outgoing messages from the bot, even if FastGPT successfully generates a response.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/feishu)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
