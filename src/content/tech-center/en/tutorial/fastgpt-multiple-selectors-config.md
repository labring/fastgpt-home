---
title: Configure Multiple Selectors for FastGPT Web Sync
slug: /en/tutorial/fastgpt-multiple-selectors-config
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/websync
source_type: Official documentation
---

# Configure Multiple Selectors for FastGPT Web Sync

## Overview of Multiple Selectors for Web Sync
When configuring web sync for FastGPT datasets, you may need to extract content from multiple distinct HTML elements on a single target web page. The official FastGPT documentation demo uses multiple selectors to pull specific content blocks from its own documentation site, enabling efficient extraction of targeted data without separate sync jobs for each element type. This approach streamlines dataset creation by allowing you to define all required content targets in a single configuration string.

## Multiple Selector Syntax Fundamentals
The standard syntax for combining multiple selectors requires separating each individual CSS selector with a comma. Each standalone selector follows standard CSS formatting rules to target specific HTML elements. For the FastGPT documentation demo, two distinct selectors are used:
1.  The first selector `.docs-content .mb-0.d-flex` targets child elements under the HTML class `docs-content` that possess both the `mb-0` and `d-flex` CSS classes.
2.  The second selector `.docs-content div[data-prismjs-copy]` targets `div` elements under the `docs-content` class that include the `data-prismjs-copy` custom attribute.
When combined into a single configuration string, these selectors form `.docs-content .mb-0.d-flex, .docs-content div[data-prismjs-copy]`, with a single comma separating the two entries for proper parsing. The associated demo screenshot (webSync10.webp) illustrates the two target HTML tags selected by this configuration.

## Step-by-Step Selector Configuration
Follow these steps to implement multiple selectors for your FastGPT web sync setup, using the official demo as an example:
1.  Identify the unique content blocks you need to extract from your target web page, noting their associated HTML classes, element types, and custom attributes.
2.  Draft each individual CSS selector to match each content block, ensuring accurate targeting of the correct HTML elements.
3.  Combine the individual selectors into a single string by placing a comma between each selector, with optional standard spacing around the comma for improved readability.
4.  Access the web sync configuration interface for your FastGPT dataset, locate the dedicated selector input field, and paste the combined multiple selector string.
5.  Save your updated configuration and run a test sync to verify that content is correctly extracted from all defined target elements.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/guide/dataset/websync)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
