---
title: Multi-turn Dialogue and Prompting for Advertising and Marketing Research Report Retrieval
slug: /en/industry/finance-d009-c062-f005
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Advertising and
meta_description: Advertising and marketing research report data mainly comes from public reports of industry consulting institutions, backend data of advertising
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Advertising and Marketing Research Report Retrieval

## What the Data for This Category Looks Like
Advertising and marketing research report data mainly comes from public reports of industry consulting institutions, backend data of advertising placement platforms, internal marketing ledgers of brand parties, and monthly updated materials from industry associations. Documents mostly combine structured tables and analytical paragraphs, and include fields such as placement channels, impressions, reach counts, conversion rates, and customer acquisition cost per customer. Units include counts, ten thousand yuan, percentages, and more. The update cadence is primarily regular monthly updates, with ad-hoc updates following major marketing events or changes to industry policies.

## Constraints on Multi-turn Dialogue and Prompting
The coexistence of structured fields and unstructured analysis in advertising and marketing research reports requires multi-turn dialogue to support switching between precise field-based filtering and natural language fuzzy queries.
Unstable data update rhythms require explicit limiting of data time ranges in prompts to avoid returning outdated information.
Multiple fields with varying units require the dialogue flow to automatically recognize units mentioned by users and perform format validation, preventing cross-unit confusion.
Discrepancies across data sources require adding data source descriptions in dialogue to ensure result credibility.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | Single advertising and marketing research reports typically range from 5000 to 10000 characters in length. Retaining context within this range prevents loss of key analytical content |
| `recallTopK` | `Top 6–10 results` | Research report content is extensive and fields are scattered. Too many recalled results disrupt dialogue logic, while too few miss critical data |
| `promptTemplate` | `Fixed template: Extract corresponding fields from research reports based on user questions, annotate data sources and update times, and organize in structured format` | Advertising and marketing research reports require precise field output. A fixed template reduces format confusion and improves result readability |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Single research reports often contain numerous nested tables, leading to long parsing times that exceed default threshold values |
| `similarityThreshold` | `0.75–0.85` | Marketing terminology has many similar expressions. A threshold that is too low introduces irrelevant content, while a threshold that is too high misses relevant research reports |
| `rerankTopN` | `Top 3–5 results` | Reranking retains the most relevant core content of research reports, improving dialogue accuracy |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Phenomenon: A Request Timeout error with status code 504 appears during dialogue. Cause: `PARSE_FILE_TIMEOUT_SECONDS` is not set to match the time required for research report parsing, and table parsing for a single research report exceeds the default threshold.
- Phenomenon: The URL parameter of the specified research report cannot be retrieved, and empty fields are returned. Cause: The `enable_url_param` configuration item is not enabled, or `chatId` and `source` parameters are not passed correctly when starting the dialogue.
- Phenomenon: Mixed units appear for research report fields returned in multi-turn dialogue, such as both counts and thousand-person units. Cause: The prompt does not explicitly require unified unit output, and field unit verification rules are not configured.

## How to Verify Correct Configuration
- Upload a test advertising and marketing research report, initiate a single-round query, and verify the field completeness and unit consistency of the returned results.
- Initiate three consecutive progressive queries, for example, first query "Q3 placement data", then follow up with "What is the conversion rate of the Douyin channel among these results", and finally request "Sort by customer acquisition cost". Confirm that context is retained and field associations are correct.
- Check system logs to confirm that research report parsing time does not exceed the configured `PARSE_FILE_TIMEOUT_SECONDS` threshold.
- Call the API to upload documents and initiate a dialogue, verify that returned results match those from interface operations, and confirm that API configurations take effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
