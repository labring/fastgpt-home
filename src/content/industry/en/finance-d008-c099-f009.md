---
title: Citation Sources and Traceability for Gas Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c099-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Gas Intelligent Due
meta_description: Gas due diligence data mainly comes from operation ledgers of local gas operating enterprises, GIS geographic information archives of urban gas
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Gas Intelligent Due Diligence Reports

## What This Category of Data Looks Like
Gas due diligence data mainly comes from operation ledgers of local gas operating enterprises, GIS geographic information archives of urban gas pipeline networks, gas safety inspection records from emergency management departments, upstream gas supply agreements, and user safety inspection archives.
Update rhythm: Pipeline basic archives are updated quarterly, operation data is synced daily, and safety inspection records are archived monthly.
Document formats mostly include structured tables (with pipeline number, pressure value, inspection date), PDF-format inspection reports, and CSV-format user ledgers.
Fields include gas pipeline nominal diameter (unit mm), supply pressure (unit MPa), inspector ID, inspection qualification status. Some documents include latitude and longitude coordinates.

## Constraints on Citation Sources and Traceability
The spatial attributes and professional field characteristics of gas data impose specific constraints on the traceability process:
- Associate latitude and longitude coordinates to match the geographic scope of the target pipeline, preventing irrelevant cross-region data from being included.
- Differences in update frequencies across data types require marking the collection timestamp of corresponding data during traceability, to ensure the timeliness of due diligence reports.
- The coexistence of multiple document formats requires adapting field extraction rules for structured tables, long-text PDFs, and CSV ledgers, to ensure complete extraction of core parameters.
- Professional fields use fixed units; the traceability process must retain unit information to avoid parameter ambiguity.
- Gas data involves public safety compliance; source organization identifiers must be fully retained to ensure traceability back to regulatory or operating entities.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8 entries` | Gas due diligence data has numerous professional fields. Too many recalls will introduce irrelevant pipeline data, too few will fail to cover core due diligence indicators |
| `Similarity Threshold` | `0.75–0.85` | Gas data has high density of professional terminology. This range filters low-match non-professional documents while retaining relevant domain data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Large GIS archive PDF parsing takes significant time. Sufficient time must be reserved for structured field extraction |
| `Chunk Length` | `1000–1200 characters` | Gas inspection reports mostly consist of long paragraphs. Overly long chunks cause context breaks, overly short chunks lose field association relationships |
| `source_field_whitelist` | `["管道编号","供气压力","检测日期","巡检机构"]` | Only retain core traceability fields required for due diligence reports, to avoid interfering redundant metadata |
| `RECALL_RERANK_ENABLE` | `Enabled` | Gas data has strong spatial correlation. Reranking prioritizes recall of documents matching the target pipeline location |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Scenario: After local deployment, the gas knowledge base is linked, and the citation list shows corresponding pipeline data, but the answer body does not mention this content. Cause: `RECALL_RERANK_ENABLE` is not enabled, or the similarity threshold is set too high, causing the recalled core fields to not be included in the context window.
- Scenario: A `408 Request Timeout` error occurs when parsing large gas GIS archives. Cause: The value of `PARSE_FILE_TIMEOUT_SECONDS` is lower than 300 seconds, and large documents time out before parsing is complete.
- Scenario: The unit (mm) for gas pipeline nominal diameter or the unit (MPa) for supply pressure is missing from the traceability fields. Cause: `source_field_whitelist` is not configured to retain unit fields, or structured field extraction rules are not enabled during parsing.

## How to Verify Proper Configuration
- Upload a single gas inspection PDF document, view the parsed metadata list, and confirm that core traceability fields have been extracted and displayed normally.
- Initiate a query containing a specific pipeline ID, check whether the answer body includes the corresponding parameters of that pipeline, and the citation source marks the correct inspection organization and inspection date.
- Adjust `Recall Count` and `Similarity Threshold`, compare the number of recall results under different configurations, and confirm that they meet the professional matching requirements of gas data.
- Call an external API to initiate a query, check whether the `source` field in the returned results includes complete document source information and core fields.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
