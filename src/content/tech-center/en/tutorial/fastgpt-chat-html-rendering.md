---
title: Secure HTML Rendering for FastGPT Chat
slug: /en/tutorial/fastgpt-chat-html-rendering
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/chat/htmlRendering
source_type: Official documentation
---

# Secure HTML Rendering for FastGPT Chat

## Design Background
While Markdown natively supports embedded HTML tags, many platforms restrict HTML rendering for security reasons -- especially for dynamic content, interactive elements, and external resources. These restrictions limit flexibility when authoring complex documents that need embedded HTML. To address this gap, FastGPT provides a dedicated HTML rendering solution for chat flows.

## Core Rendering Mechanism
FastGPT’s HTML rendering implementation uses the standard HTML `<iframe>` element to embed and render custom HTML content within chat interactions. The `<iframe>` creates an isolated browsing context for the embedded HTML, preventing direct interaction between the rendered content and the host FastGPT chat environment. To further mitigate risks from untrusted HTML content, FastGPT combines the `<iframe>` with the `sandbox` attribute, a browser-native security feature that restricts the iframe’s privileges to prevent unauthorized actions such as executing arbitrary code, accessing sensitive browser data, or loading external resources without explicit approval. This configuration ensures that even untrusted embedded HTML cannot compromise the host system or interfere with core chat functionality.

## Configuration Reference
Below is a structured breakdown of the core components used in FastGPT’s HTML rendering:
| Component | Purpose |
|-----------|---------|
| Native Markdown HTML support | Base capability for embedding HTML in Markdown documents |
| `<iframe>` element | Isolated container for hosting embedded HTML content |
| `sandbox` attribute | Security control to restrict iframe privileges and ensure safe rendering |

This implementation balances flexible HTML embedding with strict security safeguards, resolving the limitations of native Markdown HTML support across most platforms.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/chat/htmlRendering)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
