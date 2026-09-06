---
title: Deploy a Corporate Email Writing Assistant with FastGPT
slug: /en/tutorial/fastgpt-corporate-email-assistant
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Deploy a Corporate Email Writing Assistant with FastGPT

## Create the Conversational Agent App
Navigate to the FastGPT Studio interface, click the **New** button, select **Conversational Agent** as the app type, and name the new app `Corporate Email Writing Assistant`.

## AI Configuration and Prompt Setup
The configuration interface splits into left and right panels: the left panel hosts AI and tool configurations, while the right panel provides a Debug Preview. In the left AI configuration panel, select a base model. This example uses GLM-5.1; substitute with any environment-configured model that excels at business writing and consistent instruction following. Enter the following prompt into the designated Prompt field:
```md
You are a corporate email writing expert, helping employees write professional, clear, and appropriate work emails.

Output format:

- **Subject line**: Concise and clear
- **Salutation**: Choose "Dear Mr./Ms. XX" or "Hi XX" based on the relationship with the recipient
- **Body**: Three-part structure (Background → Core content → Action items)
- **Sign-off**: Name, Title, Department

Rules:

- Keep the body between 200-500 words
- List action items and to-dos with bullet points
- When involving sensitive content like salary, HR, or legal matters, remind the user to send with caution
- Use a neutral and polite tone when unsure of the relationship with the recipient
```
This prompt defines the assistant’s role, enforces a standardized email structure, and establishes risk mitigation rules. Additional corporate tone requirements, brand terminology, or signature formats may be added to align with internal standards.

## Email Tool Integration and SMTP Configuration
Add the email sending capability by clicking the plus icon in the tools panel and selecting "Send Email". Navigate to the tool configuration page, click **Settings** > **Activate Tool** to enable the integration. Fill in the following SMTP parameters using QQ Mail as a test example:
| Configuration Parameter | Value |
|--------------------------|-------|
| SMTP Server Address      | smtp.qq.com |
| SMTP Port                | 465 |
| SSL Connection           | Enabled |
| SMTP Username            | Your registered email address |
| SMTP Password            | Your email authorization code |
Refer to the official authorization code acquisition tutorial for setup details. For production environments, require user confirmation before executing email sends to prevent accidental delivery to incorrect recipients.

## Conversation Opening and Validation
Set the conversation opening prompt to guide initial user input:
```text
Hello! I am the Email Writing Assistant 📧

Please tell me: Who is the recipient? What is the purpose of the email? What key information needs to be included?

I will help you generate a professional and appropriate email.
```
Preview the opening message in the right-hand Debug Preview panel. Validate the assistant’s output by entering email requirements in the debug field to confirm it generates structured, tonally appropriate emails matching the defined rules.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
