---
title: Citation Source and Traceability for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Advertising and
meta_description: Advertising and marketing research data primarily comes from ad campaign backends, third-party media monitoring tools, competitor asset libraries
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Advertising and Marketing Research Knowledge Base Construction

## What This Category’s Data Looks Like
Advertising and marketing research data primarily comes from ad campaign backends, third-party media monitoring tools, competitor asset libraries, public industry research reports, and public platform advertising data.
Data update frequencies cover three categories: real-time (exposure and conversion data for individual ads), daily (full account campaign summaries), and weekly (industry trend reviews).
Each individual data document typically includes these fields: asset ID, campaign period, impressions, clicks, conversions, ad copy, landing page link, and advertising platform.
Units are mostly quantitative metrics such as counts, yuan, seconds, and others.
Some documents include asset preview links and targeting tags.
There is no fixed document length. A single document can range from a few hundred characters of ad copy to a several-thousand-character campaign performance summary report.

## What Constraints Do These Characteristics Impose on Citation Traceability
The multi-source mixing, high-frequency updates, and multi-field features of advertising and marketing research data create three core constraints for citation traceability.
First, data sources include internal backends, third-party monitoring tools, public reports, and other types. Traceability requires clear labeling of data source attribution to avoid mixing identical data from different channels.
Second, real-time campaign data updates daily. Traceability must link to data collection timestamps to ensure cited data is valid for the research time point, and expired records are not used.
Third, data includes precise fields such as asset ID, advertising platform, and conversion count. Traceability must support matching original documents based on fields, not just text content, to avoid mismatches between cited content and actual campaign records.

## How to Configure
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `enable_citation` | `true` | Advertising and marketing research scenarios require clear labeling of data sources. Enabling this setting associates returned cited content with original documents |
| `citation_match_threshold` | `0.75–0.85` | Advertising and marketing data includes precise fields and structured content. This threshold balances recall accuracy and coverage |
| `citation_max_results` | `Top 3–5` | Research analysis only requires core campaign data for traceability. Too many entries will distract readers |
| `citation_source_fields` | `Material ID, Delivery Platform, Collection Timestamp` | The core traceability identifiers for advertising and marketing data are asset ID and advertising platform. Specifying these fields avoids errors from generic text matching |
| `citation_link_enable` | `Enabled` | Research personnel need to jump to original campaign backends or monitoring pages to verify data. Enabling this setting generates accessible traceability links |
| `citation_retrieval_timeout` | `30 seconds` | Advertising and marketing data is mostly stored in structured databases, with fast retrieval speeds. 30 seconds covers retrieval needs for most scenarios |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Issue: After upgrading to version 4.9.4, cited content is still returned even when the `enable_citation` configuration is disabled. Cause: The global default configuration logic for this version was adjusted, and the manually disabled citation switch parameter was not synchronized.
- Issue: Cited content does not match actual campaign data, showing incorrect asset IDs or advertising platforms. Cause: The `citation_source_fields` parameter was not configured. Documents were recalled only based on text matching, without linking to the precise field identifiers of advertising and marketing data.
- Issue: An error is returned when using the variable reference format `[{datasetId: xxx}]`. Cause: FastGPT’s variable format specification was not followed. An object array structure was used incorrectly. The correct format must match the variable syntax defined by the platform.

## How to Verify Successful Configuration
- Submit a query targeting ad campaign asset copy, and check whether the returned results include clear source identification fields.
- Review the citation section of the returned results, and confirm that it includes the fields specified in the configured `citation_source_fields`.
- Click the citation source link, and verify that it jumps to the corresponding campaign backend or monitoring page.
- Adjust the `citation_match_threshold` parameter, compare recall results across different thresholds, and confirm that the configured threshold meets the recall accuracy requirements of the current research scenario.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
