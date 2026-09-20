---
title: Citation Sources and Attribution for Industrial Metals Research Reports
slug: /en/industry/finance-d009-c059-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Attribution for Industrial Metals
meta_description: Data sources for industrial metals research reports primarily include domestic nonferrous metal industry associations, domestic and overseas futures
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Attribution for Industrial Metals Research Reports

## What the Data for This Category Looks Like
Data sources for industrial metals research reports primarily include domestic nonferrous metal industry associations, domestic and overseas futures exchanges, leading brokerage nonferrous metal research teams, and professional metal information institutions.
Update frequencies follow multiple tiers: spot daily reports are updated daily, weekly supply and demand reports are released weekly, monthly industry reports are published monthly, and brokerage special research reports are updated irregularly alongside market trends.
Most documents are in PDF format. Their content includes embedded data tables, market trend analysis, policy interpretation and other modules. Core fields cover spot prices, futures settlement prices, inventory, and production. Common units are yuan/ton, ten thousand tons, and USD/ton.

## What Constraints Do These Characteristics Impose on Citation Sources and Attribution?
The multi-source data attribute of industrial metals research reports requires the attribution process to accurately match data source units and field information. This prevents distorted citations caused by inconsistent units.
The high-frequency update feature requires the recall logic to prioritize returning the latest version of the data source. It also requires recording the update timestamp for each piece of data to avoid citing outdated content.
The document structure with large numbers of embedded data tables requires the parsing process to support accurate extraction and annotation of table content. Extracting only body paragraphs cannot fully cover core data.
The cross-market data association analysis logic requires the attribution process to integrate fragmented content from multiple sources. This ensures citation completeness.
The dense professional terminology text feature requires the recall threshold to adapt to matching accuracy for professional content. This avoids recalling irrelevant data sources.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `PARSE_TABLE_ENABLE` | Enabled | Industrial metals research reports contain a large number of embedded data tables. Core data within tables must be extracted as citation sources |
| `RECALL_CHUNK_SIZE` | 800–1200 characters | Core data and analysis paragraphs in industrial metals research reports are mostly medium-to-long form. This length can fully cover a single set of data and associated analysis |
| `MAX_CONTEXT` | 6 turns | Analyses in industrial metals research reports often link to multiple periods of industry data. Multiple rounds of context must be retained to accurately trace associated content |
| `UPLOAD_FILE_TIMEOUT_SECONDS` | 300 seconds | Individual industrial metals research report PDFs are large in size and require parsing of embedded tables. This duration can accommodate standard parsing requirements |
| `CITE_SHOW_POSITION` | End of paragraph | Adapted to FastGPT 4.9.7 version citation configuration. This setting clearly marks the citation source position, aligning with reading habits for industry research reports |
| `SIMILARITY_THRESHOLD` | 0.75–0.85 | Industrial metals research reports have dense professional terminology. This threshold filters out irrelevant recall results while retaining accurately matched data sources |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- When accessing the application via a login-free share link, the citation source module displays empty content or fails to jump to the original text. The cause is that the `CITE_SHARE_ENABLE` configuration item is not enabled, or the configuration parameters are not synchronized to the share link.
- The citation marker does not appear at the end of the answer paragraph, or the citation source does not match the corresponding research report fragment. The cause is that `CITE_SHOW_POSITION` is not set to end of paragraph, or `RECALL_CHUNK_SIZE` is set too small to fully extract the citation fragment.
- Citation recall times out, with a `504 Gateway Timeout` error returned in the result. The cause is that `UPLOAD_FILE_TIMEOUT_SECONDS` is set to a value shorter than the time required for research report parsing, or the number of recalled data sources exceeds the system processing limit.

## How to Verify Correct Configuration
- Upload an industrial metals research report PDF to the knowledge base, submit a query involving spot prices or supply and demand data, and check if a citation marker appears at the end of the answer paragraph.
- Click the citation marker in the answer, confirm that it jumps to the correct paragraph position of the corresponding research report, and that the marked units match the original text.
- Generate a login-free share link, access the link, submit the same query, and confirm that the citation function works normally.
- Submit more than 3 consecutive queries related to industrial metal industry trends, confirm that the citation source for each answer is linked to the research report fragment of the current context.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
