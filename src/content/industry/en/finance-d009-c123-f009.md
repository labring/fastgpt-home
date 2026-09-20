---
title: Citation Source and Traceability for Energy Metals Research Reports
slug: /en/industry/finance-d009-c123-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Energy Metals Research
meta_description: Energy metals research report data originates primarily from metals and mining research reports from top securities firms, monthly statistics from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Energy Metals Research Reports

## What Data for This Category Looks Like
Energy metals research report data originates primarily from metals and mining research reports from top securities firms, monthly statistics from domestic non-ferrous industry associations, spot and futures quotes from the Shanghai Futures Exchange and London Metal Exchange, and public production capacity announcements from mining enterprises.
Update cycles cover daily spot prices, weekly inventory data, monthly supply and demand balance sheets, and quarterly industry trend analyses.
Most documents include structured data tables, excerpts of policy clauses, and snippets of supply and demand forecasting models.
Fields include metal type, grade value, total inventory, and price range. Common units are tons, yuan per ton, and US dollars per kilogram. Some reports include historical data comparison tables.

## How These Characteristics Create Constraints for Citation Traceability
The multi-frequency update pattern of energy metals research reports requires traceability information to include both the report publication date and data collection timestamp. This prevents cross-cycle use of expired spot or inventory data.
A high proportion of structured data tables means traceability must match the exact table title and page number. Using only section titles cannot ensure accurate citation of specific fragments.
Different sources use varying units: some overseas reports use US dollars per ounce, while domestic reports use yuan per ton. Traceability must retain original unit labels to avoid unit confusion.
Most industry data comes from public exchanges and associations, so official source names must be clearly marked.

## Configuration Settings
| Configuration Item | Recommended Range | Rationale |
| ---- | ---- | ---- |
| `similarity threshold` | `0.75–0.85` | Energy metals research reports have high data accuracy requirements, so low-relevance general research report snippets must be filtered. This range balances recall precision and recall volume |
| `rerank return count` | `Top 6–8 results` | Energy metals research reports contain abundant structured data, so enough candidate snippets must be retained to match precise traceability. Too few results risk losing core data tables |
| `maxContext` | `1200–1500 characters` | Structured table paragraphs in energy metals research reports are lengthy. This length can fully include the core content of a single data table, preventing truncation that causes missing traceability information |
| `PARSE_FILE_TIMEOUT_SECONDS` | `90 seconds` | Some large industry research report documents include multi-page structured tables, which take longer to parse. This duration covers the parsing process for standard research reports |
| `citation limit` | `5–7 entries` | Core data from energy metals research reports is concentrated in a small number of precise fragments. Too many citations reduce answer focus, while this range also simplifies traceability organization |
| `rerankScoreThreshold` | `0.65–0.7` | After enabling reranking, the base similarity threshold should be lowered appropriately. This avoids filtering some accurately recalled structured data fragments from the initial recall phase |

> The parameter values provided on this page are general recommendations to serve as a starting point for configuration. Actual values are affected by material format, data volume, and business rules. Specific cases require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Errors
- Symptom: After enabling reranking functionality, the retrieved citation snippets are empty or show no matching results. Cause: The rerank score threshold is set too high, or the rerank return count is set too low, filtering out all eligible research report data fragments.
- Symptom: The system returns a `504 Gateway Timeout` error when parsing large energy metals research reports. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter value is less than the actual time required to parse the research report, forcing the parsing process to terminate early.
- Symptom: Citation traceability information does not include the research report publication date or data units. Cause: A custom citation template has not been configured, or the template does not extract the publication date and original data unit fields from the research report metadata, resulting in incomplete traceability information.

## How to Confirm Correct Configuration
- Upload a single energy metals research report document, verify the parsed segment results, and confirm that segment length matches the configuration item value logic.
- Submit a search request for energy metals-related topics, check the total number of returned citation snippets, and confirm compliance with the citation limit setting rules.
- Review the displayed citation traceability content, and confirm that required fields such as source channel, publication time, and original data unit are included.
- Check the current FastGPT version, and confirm that custom citation template functionality is supported, to avoid being unable to configure traceability templates due to an outdated version.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
