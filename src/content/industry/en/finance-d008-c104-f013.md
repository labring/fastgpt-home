---
title: Knowledge Base Retrieval and Recall for Glass Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c104-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Glass Intelligent
meta_description: Data sources for glass due diligence reports include national building material industry standard documents, factory quality inspection reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Glass Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Data sources for glass due diligence reports include national building material industry standard documents, factory quality inspection reports from glass manufacturers, glass installation archives from construction project completion acceptance, and special quality inspection reports from third-party testing institutions.
Update rhythm adjusts with national standard revisions, manufacturer product line iterations, and project delivery cycles. No fixed cycle exists, but core parameter documents remain relatively stable.
Document structure mostly combines structured tables and technical descriptions. Fields include glass type, thickness, light transmittance, wind pressure resistance rating, heat transfer coefficient, and more. Common units are millimeters (mm), percentage (%), pascals (Pa), and watts per square meter kelvin (W/(㎡·K)).

## Constraints Imposed by These Characteristics on Knowledge Base Retrieval and Recall
Glass due diligence data uses structured tables as its core carrier, with detailed parameters paired with professional units. Retrieval requires precise matching of fields and units to avoid confusion across units.
Data from multiple sources has differences in parameter calibers. Credibility weights for different data sources must be distinguished during the recall phase.
The lack of a fixed update cycle requires the knowledge base synchronization mechanism to support on-demand trigger updates. This avoids calls to outdated old-version parameters.
Nested table structures in long documents increase the risk of context fragmentation during segmented retrieval. Segmentation rules must be optimized to retain complete associated information for tables.

## Configuration Settings
| Configuration Item | Recommended Approach | Basis for This Approach |
| --- | --- | --- |
| `PARSE_TABLE_ENABLE` | Enabled | Core information of glass due diligence documents is concentrated in structured tables. Enabling table parsing accurately extracts fields and units |
| `maxContext` | 800–1200 characters | Adapts to the nested table structure of glass documents, retains complete context of a single table, and avoids segmentation fragmentation |
| `Recall count` | Top 6–8 entries | Covers multi-dimensional retrieval needs for glass parameters, avoids excessive redundant results interfering with matching |
| `Similarity threshold` | 0.75–0.85 | Ensures matching accuracy for professional parameters, avoids recalling glass data from non-corresponding categories |
| `API_UPLOAD_FILENAME_ENCODING` | UTF-8 | Resolves garbled characters when uploading Chinese file names, complies with general coding specifications |
| `NOTION_SYNC_ENABLE` | Enabled on demand | Supports synchronizing glass manufacturer documents from Notion links, adapting to collaborative data sources for some teams |

> The parameter values provided on this page are all common recommended starting points for determining configurations. Actual values are affected by material forms, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: Retrieval from the knowledge base returns non-glass category building material data. Cause: The similarity threshold is set too low, which recalls parameter documents of other categories with low matching degrees.
- Phenomenon: After uploading a document with a Chinese file name via the API, the file name is displayed as garbled characters. Cause: `API_UPLOAD_FILENAME_ENCODING` is not configured to UTF-8, and the default non-UTF-8 encoding format is used.
- Phenomenon: Glass documents synchronized from Notion links cannot be retrieved. Cause: The `NOTION_SYNC_ENABLE` configuration is not enabled, or the link permission is not granted to the synchronization account of the corresponding knowledge base.

## How to Confirm Proper Configuration
- Confirm that the currently used FastGPT version is V4.8.17 or higher. Upload a glass quality inspection report with structured tables, check whether the parsed text completely retains fields such as thickness and light transmittance and their corresponding units, and confirm that `PARSE_TABLE_ENABLE` is effective.
- Call the API to upload a test document with a Chinese file name, check the display status of the file name in the knowledge base list, and confirm that the encoding configuration is correct.
- Initiate a retrieval for "5mm tempered glass wind pressure resistance rating", check the number and matching accuracy of returned results, and adjust the number of recalled entries and similarity threshold to a range that meets requirements.
- Try adding a Notion-format glass document link, check whether the synchronization task is completed normally, and confirm that the `NOTION_SYNC_ENABLE` configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
