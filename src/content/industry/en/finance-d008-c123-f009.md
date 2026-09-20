---
title: Citation Sources and Traceability for Energy Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c123-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Energy Metals
meta_description: Energy metals data sources include public industry association statistics, commodity spot exchange quotes, customs import and export clearance data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Energy Metals Intelligent Due Diligence Reports

## What data for this category looks like
Energy metals data sources include public industry association statistics, commodity spot exchange quotes, customs import and export clearance data, and public disclosure information from mines and smelting enterprises. Update frequencies follow multiple tiers:
- Spot quotes are updated daily
- Monthly supply and demand reports are released monthly
- Corporate financial reports and industry updates are updated quarterly or in real time

Document structures include two types: structured tabular data (such as daily spot prices, monthly supply and demand balance sheets) and unstructured analytical report data. Fields include transaction date, product name, origin, purity specification, settlement price, and trading unit. Some reports include additional content such as downstream application proportions and production capacity values, with common units including yuan/ton, ton, and ten thousand tons.

## Constraints Imposed on Citation Sources and Traceability
The multi-source and multi-update frequency characteristics require the traceability process to distinguish data source credibility weights and update timeliness. Scheduled synchronization tasks must be configured to ensure referenced data uses the latest version.

The mixed structure of structured and unstructured data requires differentiated recall and parsing rules. Structured data needs precise field matching to ensure traceability accuracy. Unstructured data needs extraction of key analytical content to meet due diligence report requirements.

Category-specific fields and unit requirements demand standardized field mapping rules to prevent specification and unit mismatches during traceability. Some data sources have copyright restrictions, so compliant citation annotation formats must be configured to follow industry data usage specifications.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall count` | Top 8-12 entries | Energy metals data is mostly structured tabular data. Excessive recall causes redundancy, while insufficient recall fails to cover supply and demand and price data required for due diligence |
| `similarity threshold` | 0.75-0.85 | The energy metals category has many segments and similar terms. A threshold that is too low introduces irrelevant data, while a threshold that is too high misses valid traceability content |
| `referenceDisplayMode` | Only display source and update time | Due diligence reports require rigorous data source labeling to avoid unsupported conclusions. Simplified display avoids interfering with the main report body |
| `data source synchronization cycle` | Daily/Monthly | Spot data requires daily synchronization, while industry reports require monthly synchronization, matching the category's update rhythm |
| `field mapping rules` | Match using category preset fields | Energy metal fields include category-specific content such as purity specifications and trading units. Preset mapping prevents unit or field mismatches during traceability |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Energy metal industry reports are lengthy and take longer to parse. Extending the timeout prevents parsing failures |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Phenomenon: Workflow invocation returns content that includes original input and response fragments from knowledge base searches. Cause: `referenceDisplayMode` is not set to only display compliant sources, or intermediate step display for tool calls is not disabled in workflow nodes.
- Phenomenon: Traceability content includes unit-mismatched fields, such as labeling "yuan/ton" as "yuan/kilogram". Cause: `field mapping rules` are not configured, and standardized matching is not applied to energy metal-specific fields.
- Phenomenon: Timeout errors occur when parsing large energy metal industry reports, with status code `ETIMEDOUT`. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted. The default timeout duration is insufficient for long document parsing.

## How to Verify Proper Configuration
- Review knowledge base recall results to confirm the recall count matches the configured `recall count`, and that fields align with category-specific specifications.
- Trigger a due diligence report generation, and check that citation annotations in the returned content include source names and update times, with no intermediate step content present.
- Upload a large energy metal industry report, confirm that parsing completes without timeout errors, and verify that the `PARSE_FILE_TIMEOUT_SECONDS` parameter matches the document length.
- Modify the `similarity threshold`, test searches for similar terms, and confirm that the relevance of recall results meets expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
