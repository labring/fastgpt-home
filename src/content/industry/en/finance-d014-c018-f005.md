---
title: Multi-turn Conversation and Prompt Engineering for Optical Module Financial Report Analysis
slug: /en/industry/finance-d014-c018-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Conversation and Prompt Engineering for Optical
meta_description: The data for this category is primarily sourced from periodic public reports released by optical module manufacturing enterprises, as well as publicly
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Conversation and Prompt Engineering for Optical Module Financial Report Analysis

## What the data for this category looks like
The data for this category is primarily sourced from periodic public reports released by optical module manufacturing enterprises, as well as publicly available industry supply chain monitoring data. Updates follow the enterprise financial report cycle: quarterly reports are updated every 3 months, annual reports are updated once per year, and temporary announcements for major operational changes are released as events occur. Document structure includes separate sections for optical module business metrics including revenue scale, shipment volume, unit production cost, and production capacity. Core fields are total revenue (unit: ten thousand yuan), shipment volume (unit: ten thousand units), and unit production cost (unit: yuan/unit). No custom statistical fields are added.

## What constraints do these characteristics impose on multi-turn conversation and prompt engineering
The scattered data sources and staggered update schedule for optical module financial reports require multi-turn conversations to support context linking across enterprise reports and industry monitoring data. Each conversation must clearly define the data time range to prevent confusion between cross-cycle data. The dedicated business section structure of the documents requires prompt engineering to accurately guide the model to locate the relevant sections for optical module business, excluding interference data from other product lines. The clear unit magnitude differences between fields requires the multi-turn conversation flow to automatically identify and align units, avoiding magnitude errors during cross-field calculations. The high-frequency update nature also requires prompt engineering to enforce that the model only uses the latest data within the specified cycle of the current conversation, and rejects references to outdated information.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | A single optical module financial report document is typically 5000-8000 characters. This range reserves space for multi-turn conversation historical context to ensure complete session information |
| `contextWindowStrategy` | Truncate by conversation turns, retain the latest 3 turns | Optical module financial report data has strong temporal relevance. Retaining the latest 3 turns avoids interference from redundant historical information while maintaining session coherence |
| `promptTemplate` | Only answer based on optical module financial report data within the specified cycle of the current conversation. Clearly state if data is insufficient, and do not reference data from other categories or outdated information | Optical module financial reports have exclusive business sections, so the data scope must be strictly limited to avoid the model confusing information from other product lines |
| `knowledgeBaseRefreshInterval` | `7 days` | Quarterly financial reports are updated every 3 months. A 7-day refresh interval ensures data in the knowledge base remains up-to-date within the cycle and avoids referencing outdated information |
| `tokenCountDisplay` | Enable separate input and output counting | Allows users to separately count the input and output token consumption of multi-turn conversations, facilitating control of session costs |
| `parseFileSectionFilter` | Only parse business sections containing the keyword "optical module" | Filters content from other product lines in financial reports, reduces invalid information received by the model, and improves answer accuracy |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: Multi-turn conversations cannot reference optical module financial report data from historical sessions, and the system prompts that matching information is not found. Cause: The `maxContext` configuration value is less than the total character count of the historical context of the current conversation, or the `contextWindowStrategy` is set to only retain the current turn of context, resulting in key information from historical conversations being truncated.
- Issue: After configuring prompt engineering optimized for Markdown formatting, the output result is plain Markdown syntax text without generating rendered readable format. Cause: Document rendering related configuration items are not enabled, or the prompt template does not explicitly require the model to output rendered format, only retaining the original syntax structure.
- Issue: In the tool call phase, the query results for optical module financial reports include redundant content unrelated to the business, and the required fields cannot be accurately extracted. Cause: The `parseFileSectionFilter` filtering rule is not configured, or the filtering rule does not accurately locate the optical module business section in the financial report, resulting in content from other product lines or irrelevant sections being mixed in during tool calls.

## How to confirm proper configuration
- Upload a single optical module financial report test document, initiate two related queries, and check the context fields in the session log to confirm that key information from historical conversations is not truncated.
- Configure a custom prompt template, initiate a query that includes optical module business fields and time range, and check whether the output result only includes business data of the specified category without mixing irrelevant content.
- Enable the token counting related configuration, initiate a multi-turn conversation, and check whether the interface separately displays the input and output token consumption values.
- Initiate a query that includes Markdown formatting requirements, and check whether the output result is a rendered readable format, and confirm that it is not plain original syntax text.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
