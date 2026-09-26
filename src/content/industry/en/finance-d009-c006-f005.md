---
title: Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine Research Report Retrieval
slug: /en/industry/finance-d009-c006-f005
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Traditional
meta_description: Traditional Chinese medicine (TCM) research report data intended for financial institution industry analysis is sourced primarily from public
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine Research Report Retrieval

## What the data for this category looks like
Traditional Chinese medicine (TCM) research report data intended for financial institution industry analysis is sourced primarily from public standards issued by the National Pharmacopoeia Committee, industry analysis reports from the National Technical Committee for TCM Standardization, periodic reports of publicly listed TCM companies, and specialized research from TCM research institutes.
Update cycles vary by document type. Pharmacopoeia standards are revised on fixed cycles. Industry research reports are updated quarterly. Public company financial reports are released annually and semi-annually.
Document structures typically include fields such as product name, original source, nature, taste and meridian tropism, functions and indications, dosage and administration, pharmacological indicators, and quality test parameters. Most field units follow standard metric measurements including grams, milligrams, and milliliters.

## How These Characteristics Impact Multi-turn Dialogue and Prompt Engineering
TCM research report data for financial analysis includes both official standard and research analysis content. Multi-turn dialogue workflows must distinguish between authoritative compliant content and industry analysis content. Prompts must explicitly prioritize referencing pharmacopoeia standard data.
Significant differences exist across document update cycles. Multi-turn dialogue workflows must verify the timeliness of currently referenced data to avoid using expired content that reduces analysis accuracy.
Fields cover professional content such as nature, taste and meridian tropism, and pharmacological indicators. Multi-turn dialogue must retain contextual connections to support follow-up questions about individual fields.
Most field units use standard metric types. Prompts must uniformly convert units to clinical standard units commonly used in financial analysis to prevent answer errors caused by unit confusion.

## How to Set Configurations
| Configuration Item | Recommended Range | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | TCM research reports contain multiple sets of professional fields. Multi-turn dialogue must retain context across follow-up questions to avoid losing critical information |
| `recallTopK` | `Top 8–10 results` | TCM research reports cover a wide range of professional content. Sufficient relevant fragments must be retrieved to support follow-up questions |
| `similarityThreshold` | `0.75–0.85` | TCM research reports contain a large number of professional terms. Low-relevance content must be filtered to ensure professional matching accuracy of retrieved content |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Some TCM research reports include long pharmacological research chapters. A longer timeout period is required for the parsing process |
| `promptTemplate` | Fixed template, prioritize referencing pharmacopoeia standard content, present professional fields in the order of user follow-up questions | TCM research reports have high compliance requirements. Official standard data must be explicitly prioritized for display, with content presented logically |
| `reRankTopN` | `Top 3–5 results` | Retain the most relevant content after re-ranking to avoid introducing redundant information that disrupts context during multi-turn dialogue |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Issue: When workflows run, streaming output fragments from AI dialogue are displayed directly on the page without processing by a text stitching component. Cause: The `enableStreamingHide` parameter is not configured, so intermediate output is not intercepted.
- Issue: The dialogue log annotation function cannot be triggered. No interactive feedback appears after clicking. Cause: The `enableLogAnnotation` parameter is not enabled, and system permissions for log annotation are not activated.
- Issue: AI dialogue cannot correctly associate knowledge base retrieval results. The reference source field displays as empty. Cause: Retrieval result data is not passed in the JSON format specified by `ragReferenceFormat`, so the system cannot recognize reference information.

## How to Verify Correct Configuration
- Initiate a test dialogue with follow-up questions to confirm that context is correctly retained and answer content is presented logically.
- Check knowledge base synchronization records to confirm that the latest TCM research report data has been updated, and no expired content is being called.
- View workflow node output logs to confirm that intermediate AI dialogue output is not displayed directly, and only enters the text stitching phase after generation is fully completed.
- Adjust the value ranges of configuration items, compare retrieval results across different configurations, and confirm that parameters act on retrieval logic as preset.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
