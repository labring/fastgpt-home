---
title: Implement Quick Question Buttons in FastGPT Welcome Text
slug: /en/tutorial/fastgpt-quick-question-buttons
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/welcomeText
source_type: Official documentation
---

# Implement Quick Question Buttons in FastGPT Welcome Text

## Quick Question Function Overview
FastGPT’s welcome text feature includes native support for a specialized markdown syntax to add one-click quick question buttons. These buttons eliminate the need for new chat users to manually type initial prompts, streamlining initial interaction flows. Each quick question is rendered as a distinct clickable element, positioned alongside the custom welcome message when a user starts a new conversation session.

## Official Syntax and Example
The syntax for quick question entries uses plain square brackets around the full text of the preset user message. No additional parameters or formatting modifiers are supported. A valid example implementation is shown below:
```md
Hello, I can help you look up product information and support policies.

[How do I request support?]
[What scenarios does this product support?]
[Recommend a starter plan]
```
Each line wrapped in single square brackets will be converted to an individual quick question button. The welcome message text appears first, followed by all defined quick question buttons in the order they are listed in the markdown content.

## User Interaction Behavior
When a user clicks a quick question button, FastGPT automatically sends the text contained within the brackets as the official user message for that conversation turn. No additional configuration steps are required beyond defining the welcome text and quick question entries. The rendered appearance of the quick question buttons in a live chat interface is shown in the referenced asset: `![Quick questions in chat](../../../../public/imgs/image-27.png)`. All interactions follow the standard FastGPT conversation flow, with the sent quick question treated identically to a manually typed user prompt.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/welcomeText)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
