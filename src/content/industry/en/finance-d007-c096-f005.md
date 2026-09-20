---
title: Multi-turn Dialogue and Prompt Engineering for Coke Yield Rates
slug: /en/industry/finance-d007-c096-f005
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Coke Yield
meta_description: Coke-related market and yield rate data is primarily sourced from Dalian Commodity Exchange futures contract data and domestic coal industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Coke Yield Rates

## What the data for this category looks like
Coke-related market and yield rate data is primarily sourced from Dalian Commodity Exchange futures contract data and domestic coal industry association spot monitoring data. Futures market data is updated in real time per trading day. Daily report data is updated within one hour after the close of each trading day.
The document structure includes fields such as contract code, delivery grade, daily settlement price, price change range, trading volume, position volume, average spot price at major ports, and ex-factory price in major producing areas.
For units: price-related fields use yuan/ton uniformly, trading volume and position volume use lots, and monthly/annual trading volume uses ten thousand tons.

## Constraints for Multi-turn Dialogue and Prompt Engineering
Coke data is multi-dimensional and sourced from multiple locations. Multi-turn dialogue must maintain data source context to prevent users from confusing futures and spot data in follow-up questions.
The fixed update time for daily report data requires adding time validity check logic to prompt engineering, to ensure returned daily report data is the latest version for the current day.
The large number of fields with varying units requires prompt engineering to clearly specify required fields and their corresponding units, to avoid ambiguous output.
Multi-turn interactions must retain the user’s question history, to avoid repeated explanations of basic coke attributes and improve dialogue fluency.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxContext` | `8000–12000 characters` | Coke-related data includes multiple categories such as futures, spot, and delivery rules. Multi-turn dialogue requires sufficient context to associate consecutive questions |
| `knowledge_base_recall_top_k` | `Top 8–10 entries` | Coke has multiple data source dimensions. Sufficient relevant documents must be recalled while avoiding redundant information that disrupts dialogue |
| `recall_similarity_threshold` | `0.75–0.85` | Coke data fields have strong relevance. Low-related recall results must be filtered to improve the accuracy of prompt engineering calls |
| `tool_call_timeout` | `15 seconds` | Coke market data interfaces have fast response speeds. The timeout setting prevents long waits from harming dialogue experience |
| `system_prompt_type` | `Custom template` | Data sources, field scope, and unit requirements must be clearly specified to comply with output specifications for multi-dimensional coke data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Issue: Tool call returns coke market data that does not appear in the current conversation interface. Data can be viewed after re-entering the session, but there is no execution record for the tool call. Cause: The `tool_call_display` parameter is not configured as `full`, causing tool call results to only be stored in the backend cache and not synchronized to the front-end conversation window for rendering.
- Issue: Custom prompt engineering cannot dynamically load coke daily report templates stored in the knowledge base. Cause: No trigger condition for knowledge base recall is configured in the prompt engineering, causing the template to not be correctly retrieved and loaded.
- Issue: Data fields for coke become misaligned when switching data sources during multi-turn dialogue. Cause: No data source identifier is retained in context management, causing subsequent questions to fail to associate with the correct data dimension.

## How to Verify Proper Configuration
- Initiate two consecutive questions: first ask for the current day's futures settlement price for coke, then ask for the average spot price at the corresponding port. Confirm that basic coke attributes are not repeatedly requested during the conversation.
- Trigger a tool call to obtain coke daily report data. Confirm that the front-end conversation window synchronously displays the tool call execution steps and returned results.
- Check the knowledge base recall configuration to confirm that recall results include relevant documents from both futures and spot data sources.
- Adjust the unit requirements in the system prompt. Confirm that all price-related fields in the returned results include correct unit identifiers.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
