---
title: Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine Financial Report Analysis
slug: /en/industry/finance-d014-c006-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Traditional
meta_description: Traditional Chinese medicine (TCM) enterprise financial report data is sourced from periodic reports publicly disclosed by domestic stock exchanges.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Traditional Chinese Medicine Financial Report Analysis

## What the Data for This Category Looks Like
Traditional Chinese medicine (TCM) enterprise financial report data is sourced from periodic reports publicly disclosed by domestic stock exchanges. These include annual, semi-annual, and quarterly reports, with update schedules strictly following regulatory requirements. Annual reports must be disclosed by April 30 each year, and semi-annual reports by August 31.
Document structures include consolidated financial statements and business operation analysis sections. TCM-related fields cover: Chinese medicinal material purchase volume (unit: tons), proprietary Chinese medicine production capacity (unit: ten thousand boxes/pieces), TCM R&D investment amount (unit: ten thousand yuan), area of self-owned planting bases (unit: mu), and more. Some reports also disclose the number of approval documents and sales proportion of exclusive TCM varieties.

## Constraints on Multi-turn Dialogue and Prompt Engineering
The fixed update schedule of TCM financial reports requires multi-turn dialogue to retrieve the latest released one or more periodic reports by default, to avoid using outdated data.
Business segments are clearly split, and multiple types of unit fields are used. This requires multi-turn dialogue to guide users to clarify specific TCM business modules, and limit retrieval scope in prompts to only TCM-related content to prevent mixing in other business data.
Unit differences across different fields require the system to automatically annotate corresponding units when generating responses, or actively confirm the statistical units required by the user during multi-turn dialogue, to avoid unit confusion.
In addition, publicly disclosed financial reports have relatively standardized formats. Prompts can be configured based on fixed field templates, reducing parsing errors for unstructured data.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `12000–15000 characters` | Single annual TCM financial report text is usually lengthy, requiring sufficient context to maintain logical coherence for multi-turn dialogue |
| `RECALL_TOP_K` | `Top 8–12 results` | TCM financial reports contain multiple segmented business data, requiring sufficient retrieved fragments to cover information across different business segments |
| `SIMILARITY_THRESHOLD` | `0.72–0.80` | Differentiate between general financial terminology and TCM-specific business terminology in financial reports, to avoid retrieving irrelevant industry-wide data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Parsing a single large financial report takes a long time, preventing interruptions due to parsing timeout |
| `UPLOAD_FILE_MAX_SIZE` | `200 MB` | Covers complete annual financial report PDFs and attached documents, preventing upload failures due to excessive file size |
| `RERANK_TOP_N` | `Top 4–6 results` | Rerank retrieved fragments to focus on content directly related to TCM business, improving response accuracy |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: Empty content is returned during data processing after local deployment when uploading TCM financial report files. Cause: `PARSE_FILE_TIMEOUT_SECONDS` is not configured with a sufficiently long duration, and valid shard data is not generated after large financial report parsing times out.
- Phenomenon: Knowledge base search works correctly in workflow debugging, but the AI dialogue stage does not reference knowledge base content. Cause: The retrieval scope is not limited to TCM business segments in the prompt, causing the model to prioritize calling the general knowledge base instead of the target financial report data.
- Phenomenon: No conversation history records can be queried in MongoDB. Cause: The conversation history storage switch is not enabled, or the configured database connection string has insufficient permissions to write conversation logs.

## How to Verify Correct Configuration
- Upload a single test TCM financial report file, confirm that the data processing process completes without abnormal errors.
- Initiate multi-turn dialogue containing questions about TCM business segments, verify that the model's responses match specific fields and units in the financial report.
- Log in to the configured MongoDB database, query the corresponding conversation history collection, and confirm that records are written normally.
- Send an HTTP request to call the knowledge base dialogue interface, verify that the returned results contain relevant fragments from the target financial report.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
