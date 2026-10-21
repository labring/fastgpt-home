---
title: FastGPT: Connecting Apps to WeCom, WeChat Official Accounts, Lark, and DingTalk — Version Requirements, Callbacks, and Session Boundaries
slug: /en/guide/im-bot-channel-integration
page_type: Deep-dive guide
source_type: Official documentation (v4.17.2) and community threads
source: https://doc.fastgpt.io/en/guide/build/publish/wecom
source_note: "Criteria taken from the FastGPT documentation (v4.17.2) and release notes, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: This decision guide covers version prerequisites, callback configuration, session boundaries, and verification steps for integrating FastGPT AI apps with WeCom, WeChat Official Accounts, Lark, and DingTalk.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# FastGPT: Connecting Apps to WeCom, WeChat Official Accounts, Lark, and DingTalk — Version Requirements, Callbacks, and Session Boundaries

## When this becomes a decision
Your team faces an actionable business problem when you want to embed FastGPT-built AI capabilities into daily office collaboration tools, or serve external users via mainstream social channels. Trigger scenarios include:
- Internal teams using WeCom, Lark (Feishu), or DingTalk to call AI services without logging into FastGPT
- WeChat Official Accounts handling user inquiries with automated responses
- Unified AI assistant access across cross-departmental workflows

This decision has value only if two conditions are met:
1. Your FastGPT deployment version meets the minimum support requirements for each target platform
2. Your team has admin permissions for the target platforms to create bots and configure callbacks

Community edition FastGPT or missing platform admin permissions mean you cannot use native official integration.

## What to settle first
You must confirm these criteria before starting integration:

| Criterion | What to set | Basis |
|-----------|-------------|-------|
| Deployment type | Select commercial edition or cloud service edition | FastGPT commercial edition documentation |
| Version threshold | Match minimum required version for each target platform | Official tutorial documentation for each platform |
| Custom domain requirement | Cloud service edition users must configure a custom domain for WeCom integration; commercial edition users can use their own enterprise domain | WeCom bot official tutorial |
| IP whitelist configuration | Add FastGPT official IPs to WeChat Official Account platform whitelist | WeChat Official Account integration tutorial |
| Credential and encryption settings | WeCom: Fill in Token and Encoding-AESKey; WeChat Official Account: Fill in AppID, Secret, Token, generate random AES Key and select Secure Mode; Lark: Fill in App ID and App Secret, optional Encrypt Key (recommended for HTTP communication); DingTalk: Fill in Client ID and Client Secret | Official tutorials for each platform |
| Session reset method | Send `Reset` (case-sensitive) to reset chat history | Lark, WeChat Official Account, and DingTalk official tutorials |
| Permission configuration | Enable message receiving and sending permissions for the target platform | Lark and DingTalk official tutorials |

Choices for these criteria depend on your team’s operational resources and business needs. Commercial edition suits teams with in-house server maintenance capabilities. Cloud service edition suits teams without dedicated DevOps support. Version thresholds are mandatory prerequisites for all integration steps. Custom domain and IP whitelist setup are mandatory checks that require prior domain registration and FastGPT domain configuration. Encryption settings secure communication links; follow platform-specific rules strictly. Session reset and permission configuration are critical for user experience and functional availability.

## How to do it
### Preparations
First, confirm your FastGPT version meets the minimum requirements for each target platform. Upgrade commercial edition versions as needed. Cloud service edition users must configure a custom domain before WeCom integration.

Verify you have platform admin permissions:
- WeCom’s intelligent bot entry is only visible to enterprise creators or super admins
- WeChat Official Account users must access the official platform to modify server configurations
- Lark and DingTalk users must create custom enterprise apps in their developer consoles

Complete domain registration and FastGPT domain configuration for cloud service edition WeCom integration.

### Channel-specific Setup
#### WeCom Bot
FastGPT commercial edition 4.12.4+ supports direct WeCom bot integration without additional APIs. Cloud service edition 4.14.4+ requires a custom domain for WeCom integration.
1. Log into the WeCom Admin Console.
2. Go to Security & Management > Management Tools > Intelligent Bot, then select API Mode Creation.
3. Generate or manually enter Token and Encoding-AESKey, then save the values.
4. In FastGPT, go to the Publishing Channels page for your target app, select WeCom Bot, and create a new channel.
5. Enter the saved Token and Encoding-AESKey.
6. Copy the generated callback URL, then paste it into the WeCom bot configuration page to complete setup.

#### WeChat Official Account
FastGPT commercial edition 4.8.10+ supports verified Service or Subscription Accounts.
1. In FastGPT’s Publishing Channels page, create a new WeChat Official Account channel.
2. Log into the WeChat Official Account Platform to get AppID, Secret, and Token, then enter these values into FastGPT’s configuration dialog.
3. Add FastGPT’s official IPs to your platform’s IP whitelist.
4. Generate a random AES Key, then select Secure Mode.
5. Copy FastGPT’s callback URL, paste it into the WeChat Official Account’s server configuration page, then enable server configuration.

#### Lark Bot
FastGPT commercial edition 4.8.10+ supports Lark bot integration.
1. Create a custom enterprise app in the Lark Open Platform, then add the Bot capability.
2. In FastGPT’s Publishing Channels page, create a new Lark Bot channel.
3. Get App ID and App Secret from the Lark Open Platform, then enter these values into FastGPT’s configuration dialog.
4. Optional: Add an Encrypt Key for HTTP communication.
5. Copy FastGPT’s callback URL, then go to Lark Console > Events & Callbacks to paste the URL as the subscription endpoint.
6. Add the `im.message.receive_v1` (Receive Message v2.0) event.
7. Enable the Send messages as the app permission and required message access permissions.
8. Publish the app in Lark to use the bot.

#### DingTalk Bot
FastGPT commercial edition 4.8.16+ supports DingTalk bot integration.
1. Create an internal enterprise app in the DingTalk Developer Console, then get Client ID and Client Secret.
2. In FastGPT’s Publishing Channels page, create a new DingTalk Bot channel, then enter the saved credentials.
3. Copy FastGPT’s callback URL.
4. Add the Bot capability to your DingTalk app, set the message reception mode to HTTP, then paste the callback URL into the message reception field.
5. Publish the app to use the bot in DingTalk.

#### WeChat Personal Account
1. Select WeChat Personal Account in the FastGPT Publishing Channels page.
2. Scan the QR code to log in. A WeChat ClawBot will appear in your contacts.
Note: This feature only supports iOS systems and requires an updated WeChat version.

### Session Boundary Confirmation
Chat history is split per platform rules:
- Lark chatId comes from private chats, individual topics in topic groups, or group ID plus user ID in regular groups
- DingTalk supports private chats and @mentions in groups
- Send `Reset` (case-sensitive) to reset chat history for Lark, DingTalk, and WeChat Official Accounts
- WeChat Personal Account uses `Reset` or `/reset` to reset chat history
- WeCom session boundaries and reset methods are not documented; confirm based on your environment

### When the bot does not reply
The WeCom and Lark tutorials give the same order of checks:
1. Check platform-side configurations: WeCom users verify trusted domain, Token, and Encoding-AESKey; Lark users verify callback URL and permissions.
2. Check FastGPT chat logs for the incoming message.
3. If logs exist but no platform response, Lark users may lack required permissions.
4. If no logs exist, the app may have an error; test with a simple bot first.
Note: Lark bots do not support global variables, files, or image inputs.
From v4.17.0, the commercial edition returns a clear client error for invalid messages received by publishing channels such as Lark, WeCom, DingTalk and WeChat Official Account. v4.17.1 fixes Lark callback URL validation issues when using Encrypt Key.

## How to verify
Complete these checkable steps to confirm successful integration:
1. Send a test message to the target platform’s bot, then confirm the corresponding request appears in FastGPT chat logs.
2. Compare the bot’s reply to the expected output from the FastGPT debug interface, then confirm they match.
3. Send `Reset` to the bot, start a new conversation, then confirm no historical chat context is included.
4. Check the target platform’s bot configuration page, then confirm the callback URL is validated successfully with no errors.
5. For Lark and DingTalk, send a message and confirm no permission error messages are returned.
6. For group chat scenarios (if supported), @ the bot and send a message, then confirm the bot receives and replies correctly.

## Limits: when this approach does not hold
This integration approach will not work in these scenarios:
- The edition comparison lists third-party app publishing (Lark, WeChat Official Account) as unavailable in the community edition, and the WeCom and DingTalk tutorials describe these bots as commercial edition features. On the community edition, these channels cannot be added as publishing channels; an integration has to be built on the API instead.
- Unverified WeChat Official Accounts cannot complete full configuration. Test accounts work but do not support AES Key configuration.
- Strict enterprise network firewalls block external access to FastGPT services, or prevent callback requests from reaching FastGPT, leading to failed message delivery.
- Your team lacks admin permissions for the target platform, making bot creation, callback configuration, and permission setup impossible.
- Cloud service edition users integrating WeCom bots without a configured custom domain will fail WeCom’s domain validation requirements.
- Strict network restrictions block FastGPT from communicating with target platform open APIs, breaking bot functionality.
- Lark topic group session boundaries differ from regular group chats, leading to unexpected session splits in custom workflows.

## Keep reading

- [Decision Guide for Bidirectional MCP Integration with FastGPT v4.17.2](/guide/mcp-toolset-and-server-identity)

## References

- [WeCom bot integration](https://doc.fastgpt.io/en/guide/build/publish/wecom)
- [Feishu bot integration](https://doc.fastgpt.io/en/guide/build/publish/feishu)
- [DingTalk bot integration](https://doc.fastgpt.io/en/guide/build/publish/dingtalk)
- [WeChat Official Account integration](https://doc.fastgpt.io/en/guide/build/publish/official_account)
- [Custom domain](https://doc.fastgpt.io/en/guide/workspace/customDomain)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
