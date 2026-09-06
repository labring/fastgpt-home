---
title: Adjust FastGPT Chat Context Window Limits
slug: /en/tutorial/fastgpt-chat-context-window-limits
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/faq
source_type: Official documentation
---

# Adjust FastGPT Chat Context Window Limits

# Context Window Calculation Logic
FastGPT calculates the maximum allowable generated response length using a fixed mathematical formula:
`Max Response = min(Configured Max Response, Max Context Window - History)`
All tokens from retained chat history and new user input share the same model context window as the generated output. As the length of the generated response increases, the available space for retained chat history and new input decreases proportionally. For example, an 18K context model allocates its full window across both input and output, so longer generated responses will directly reduce the number of historical chat turns that can be included in the current prompt.

# Step-by-Step Context Limit Adjustments
To resolve context window constraints, follow these two core operational steps:
1.  First, review your current **Configured Max Response (response limit)** setting to confirm it matches your application’s response length requirements.
2.  Reduce the total input token load by limiting the number of chat history turns included in your application workflow. Fewer historical chat turns frees up critical context window space for both new user input and generated responses.
The Configured Max Response setting is accessible via two standard FastGPT interface locations: dataset configuration pages and application workflow setup pages, as referenced in the included images dataset1.png and dataset2.png.

# Self-Hosted Deployment Configuration
For self-hosted FastGPT instances, you can proactively reserve additional space for generated responses by adjusting the model context limit configuration. For example, if using a model with a native 128K context window, set the deployed context limit to 120K. The remaining 8K of reserved space will be automatically allocated to accommodate generated response output, reducing the risk of truncated chat history or incomplete responses.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/faq)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
