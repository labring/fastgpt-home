---
title: Citation Source and Traceability for Minor Metal Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c058-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Minor Metal Investment
meta_description: Minor metals are a segment of non-ferrous metals. Primary data sources include monthly supply and demand reports from a national non-ferrous metals
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Minor Metal Investment Research Knowledge Base Construction

## What Data for This Category Looks Like
Minor metals are a segment of non-ferrous metals. Primary data sources include monthly supply and demand reports from a national non-ferrous metals industry association, listed quotes from a domestic futures exchange, regular announcements from mining enterprises, and third-party industry special research reports. Update frequencies vary: spot prices update every trading day, supply and demand balance data updates monthly, and policy documents update immediately upon release. Most documents are structured tables or semi-structured research report paragraphs. Fields include metal grade, grade proportion, spot price, total inventory, and production capacity data. Common units are yuan/ton, ten thousand tons, and percentage. Some segmented categories such as rare earths additionally mark oxide purity units.

## Constraints on Traceability Posed by These Characteristics
The multi-source, heterogeneous data characteristics of minor metals create multiple constraints for the traceability process. First, there are many segmented categories with large indicator differences. Fields and units must be accurately matched to avoid confusing tungsten concentrate prices with lithium carbonate prices. Second, update frequencies differ significantly. Incremental synchronization rules must be configured to distinguish daily quotes from monthly report update cycles, ensuring the timeliness of traceability data. Third, some third-party research reports are non-public content. Permission verification rules must be configured to ensure compliance of citations. Finally, structured table splitting must retain field associations to avoid losing cross-paragraph indicator context during traceability.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `6000–8000 characters` | Minor metal investment research requires referencing multiple segmented category data simultaneously. This range can carry sufficient recalled content and avoid triggering large model context truncation |
| `recallTopK` | `Top 20 entries` | There are many minor metal segmented categories. A sufficient number of recalled entries is needed to cover supply, demand, and market data across different dimensions |
| `similarityThreshold` | `0.72–0.78` | Minor metal industries have dense technical terms. This threshold range can filter irrelevant documents while retaining research reports related to segmented categories |
| `reRankTopN` | `Top 8 entries` | Balance the number of traceability entries and context length to avoid exceeding large model input limits |
| `sourceLinkEnable` | `Enabled` | Investment research scenarios require clear traceability sources. The publishing organization and time of original documents must be displayed |
| `chunkOverlap` | `150–200 characters` | Most minor metal documents are structured tables. Overlapping characters can retain field associations across table segments and avoid traceability splitting errors |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Scenario: Setting `maxContext` to 3000 characters results in recalled knowledge base content not being passed to the large model generation stage. Cause: The input context reserved space for some large models includes system prompts and user questions. The 3000-character limit is insufficient to carry recalled minor metal segmented data and system instructions, triggering context truncation rules.
- Scenario: After uploading raw data returned by an HTTP interface, citation traceability does not display the corresponding content. Cause: The HTTP response data was not converted to a structured format supported by FastGPT. Response content must be encapsulated into a standard field structure including `title`, `content`, `sourceUrl`, and `publishTime`.
- Scenario: When a workflow calls the knowledge base, the generated result does not reference target minor metal data. Cause: The `knowledgeBaseId` parameter was not bound in the workflow node, or global variables were not correctly mapped to the unique identifier of the target knowledge base.

## How to Verify Proper Configuration
- Navigate to the knowledge base's "Citation Configuration" page. Confirm that the `sourceLinkEnable` switch is in the enabled state. Verify that individual recalled results display links and release times of the original data source.
- Submit a query targeting a minor metal segmented category. Check the "Citation Source" panel of the returned results to confirm that the number of recalled entries matches the preset rules.
- Adjust the `maxContext` parameter. Use the platform log query tool to view the context content input to the large model, confirming that no truncation error is triggered.
- Upload a test set of minor metal market data. Verify that structured fields are correctly parsed, and original units and indicator names are retained during traceability.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
