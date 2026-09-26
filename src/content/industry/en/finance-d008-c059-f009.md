---
title: Citation Sources and Traceability for Industrial Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c059-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Industrial Metals
meta_description: Industrial metal data sources include public market data from global mainstream futures exchanges, statistical reports from industry associations, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Industrial Metals Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Industrial metal data sources include public market data from global mainstream futures exchanges, statistical reports from industry associations, and quotes from spot trading platforms. Data updates follow two primary rhythms: futures market data updates every 15 minutes; industry inventory and import/export data updates daily; spot quotes change in real time during trading hours. Most documents use structured table formats, with fields such as delivery grade, delivery warehouse, pricing currency, daily average price, and price change range. Units use tons, kilograms, or ounces. Some specialized categories include grade indicators.

## What Constraints Do These Characteristics Create for the "Citation Sources and Traceability" Workflow
The multi-source nature of industrial metal data requires clearly marking the specific platform and update time of the data source during traceability, to avoid confusing price differences across exchanges. High-frequency updated futures data requires the traceability chain to associate real-time market timestamps, ensuring cited data is accurate for the corresponding point in time. Specialized fields in structured documents require matching parameters for the corresponding category during traceability. For example, copper grade indicators cannot be mixed with aluminum profile parameters. Fields denominated in multiple currencies must mark both the original currency and the converted functional currency, and complete records of the conversion logic must be retained during traceability.

## How to Set the Configuration
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | Top 8–12 entries | Industrial metal due diligence reports need to cover multi-dimensional data sources; sufficient recall volume avoids missing key market or inventory data |
| `Similarity threshold` | 0.72–0.85 | Balances precision and recall when matching structured fields; this range filters irrelevant cross-category data |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Industrial metal data sources are mostly large structured tables; a longer timeout ensures complete parsing |
| `Rerank result count` | Top 3–5 entries | Due diligence reports require precise citation of core data; retains highly relevant sources after reranking |
| `Chunk size` | 1000–1200 characters | Adapts to the field length of industrial metal structured tables; avoids splitting and losing associated fields |
| `UPLOAD_FILE_MAX_SIZE` | 200 MB | Industry statistical reports are mostly large-capacity structured documents; this value supports complete uploads |

> The parameter values provided on this page are general recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: The `[{datasetId: xxx}]` format is used when referencing configuration variables, the interface displays a parameter parsing failure prompt, and a 400 status code is returned. Cause: Industrial metal data sources include specialized structured fields; the general variable format cannot match the field association logic.
- Symptom: Output results only include question fragments, with no corresponding reply content. Cause: No field extraction rules are configured, and no specific path for extracting reply fields is specified.
- Symptom: Source data has been associated, but no traceability information is displayed in the output results. Cause: The `show_source` configuration item is not enabled, or the source display template is not bound to the correct data source fields.

## How to Confirm Configuration is Complete
- Upload an industrial metal spot quote table, run a due diligence query, and check whether the update timestamp of the corresponding data source is included in the returned results.
- View the traceability module of the returned results, and confirm that the marked fields match the industrial metal-specific fields in the uploaded document.
- Check the format of variable configurations, confirm that reference rules matching structured data are used, and ensure that the field association logic is correct.
- View system logs, confirm that there are no parameter parsing errors or timeout errors, and that the timestamps in the traceability chain match the data source update times.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
