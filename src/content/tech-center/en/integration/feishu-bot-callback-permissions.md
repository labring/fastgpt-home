---
title: Configure Feishu Bot Callback Events and Permissions
slug: /en/integration/feishu-bot-callback-permissions
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/en/guide/build/publish/feishu
source_type: 官方文档
---

# Configure Feishu Bot Callback Events and Permissions

## Configure Feishu Bot Callback Events and Permissions

## Event Setup Procedure
Complete the following steps to add the required callback event for Feishu bot integration with FastGPT:
1. Access the Feishu bot developer console and navigate to the **Events & Callbacks** page.
2. Click the **Add Event** button to open the event selection panel.
3. Search for either `Receive Message` or the internal event ID `im.message.receive_v1`, select the `Receive Message v2.0` event, then click **Confirm Add** to save the event configuration.

## Required Permission Configuration
After successfully adding the callback event, you must assign two core permissions to enable message forwarding to FastGPT. FastGPT explicitly recommends avoiding all legacy version permissions, and using only the official new permissions listed below:
When selecting a permission entry, a popup prompt will appear to confirm permission addition. Add the following two permissions:

| Permission Name | Forwarded Message Behavior |
| --- | --- |
| Read messages users send to the bot in private chats | Forwards all private messages sent directly to the Feishu bot to your FastGPT deployment |
| Receive @bot message events in group chats | Forwards all group chat messages that @mention the Feishu bot to your FastGPT deployment |

It is not recommended to enable the two legacy version permissions referenced in associated documentation images. The only explicitly documented legacy permission is `Get all messages in groups`: if enabled, this permission forwards every message sent in any group the bot joins, rather than only targeted messages, which may lead to unintended data exposure or excess processing load.

## Post-Setup Validation
Once all events and permissions are configured, the Feishu bot will automatically forward matching messages to your FastGPT instance. Private messages sent directly to the bot will be forwarded if the private chat permission is enabled, and group chat messages that @mention the bot will be forwarded if the group mention permission is enabled.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/publish/feishu)
