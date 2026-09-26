---
title: Multi-turn Dialogue and Prompt Engineering for Securities Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c133-f005
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Securities
meta_description: Securities investment research data primarily comes from exchange public disclosure documents, brokerage research reports, real-time market data APIs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Securities Investment Research Knowledge Base Construction

## What this category of data looks like
Securities investment research data primarily comes from exchange public disclosure documents, brokerage research reports, real-time market data APIs, periodic financial reports and regulatory announcements of listed companies.
Update frequency varies by scenario: financial reports are updated quarterly and annually, while research reports and market data are updated in real time or intraday.
Document structures include structured data tables, unstructured text analysis, and labeled risk warning fields.
Common fields include earnings per share (EPS), price-to-earnings ratio (PE), and price-to-book ratio (PB).
Units include yuan, percentage, multiples, and others.

## What constraints these characteristics impose on multi-turn dialogue and prompt engineering
Securities investment research data has a high proportion of structured content and specialized fields. This requires retaining context parameters such as stock codes and time ranges in multi-turn dialogue to avoid repeated input.
For real-time market and intraday-updated research report data, prompts must explicitly trigger real-time APIs. Do not rely solely on static knowledge bases, as this can lead to returning outdated information.
When parsing long documents such as annual reports and lengthy research reports, prompts need to limit key data dimensions within the context window. This prevents interference from redundant information.
Standardization requirements for specialized fields mean prompts must unify terminology. For example, consistently refer to earnings per share as EPS and clearly specify units for all values.

## How to set configurations
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | Adapts to the long text length of securities research reports and financial reports, retains key parameters such as stock codes and time ranges in multi-turn dialogue |
| `recallTopK` | `Top 8–12 results` | Balances data coverage and context redundancy, avoids interference from irrelevant investment research content on dialogue logic |
| `similarityThreshold` | `0.75–0.85` | Matches the specialized terminology characteristics of securities investment research, filters low-correlation research reports and financial report data |
| `reRankTopN` | `Top 3–5 results` | Performs secondary screening on recalled investment research data, retains content most relevant to the current dialogue topic |
| `promptTemplate` | Fixed pre-prompt including "Current target is {stockCode}, data must be marked with the latest update time, structured fields must clearly specify units" | Clarifies core constraints for investment research dialogue, avoids confusion between data from different listed companies and outdated information |
| `apiRequestTimeout` | `30–60 seconds` | Adapts to the time requirements of real-time market APIs and long document parsing, prevents mid-dialogue interruptions |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Issue: The like button in the dialogue interface is non-functional, and no corresponding API call logs are generated after clicking. Cause: FastGPT v4.8.10 does not include a built-in dialogue like function, and this feature must be connected to a backend API for implementation.
- Issue: The workflow does not respond after reaching the "AI Dialogue" step, or returns the `504 Gateway Timeout` error code. Cause: The `apiRequestTimeout` parameter is not adjusted to account for long document parsing or real-time market API requirements for securities investment research, leading to timeout interruptions.
- Issue: After switching targets during multi-turn dialogue, returned data still corresponds to the initial listed company. Cause: The `stockCode` context parameter is not bound in the `promptTemplate`, or the context retention configuration for `maxContext` is not enabled.

## How to confirm the configuration is correct
- Initiate a multi-turn dialogue that includes a specific stock code and time range. Verify that returned data is consistently bound to the target stock, with no confusion between data from different listed companies.
- Test long document parsing and real-time data requests. Verify that the dialogue completes responses within a reasonable time frame, with no mid-dialogue interruptions.
- Review structured data returned in the dialogue. Confirm that all specialized fields are marked with corresponding units, with no unitless values or terminology confusion.
- Check workflow execution logs. Confirm that all process nodes from "Question Optimization" to "AI Dialogue" have execution records, with no mid-process terminations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
