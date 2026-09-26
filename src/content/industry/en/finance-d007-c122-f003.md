---
title: Share and Embed for Joint-Stock Bank Yield and Market Daily Reports
slug: /en/industry/finance-d007-c122-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Share and Embed for Joint-Stock Bank Yield and Market Daily
meta_description: Data for joint-stock bank yield and market daily reports comes from in-house retail business systems, wealth management subsidiary product net value
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Share and Embed for Joint-Stock Bank Yield and Market Daily Reports

## What this type of data looks like
Data for joint-stock bank yield and market daily reports comes from in-house retail business systems, wealth management subsidiary product net value ledgers, and public market APIs.
Full updates complete each day by T+1 morning. Some real-time market fields sync every hour.
Most documents use multi-column structured table formats.
Fields include product unique identifier, product type, annualized yield, 7-day annualized yield, 10,000-share income, investment threshold, update date, and additional relevant fields.
Units include percentage, yuan, ten thousand yuan, and other standard units.

## Constraints imposed by data characteristics on share and embed workflows
The multi-column structured format requires embed components to support custom field display and sorting. This prevents irrelevant fields from occupying display space.
The daily T+1 update cadence requires embed-side cache refresh cycles to match. This ensures displayed data aligns with official update timelines.
The high-frequency sync requirement for real-time market fields requires embed APIs to support on-demand pulling. This avoids wasting network resources from full refreshes.
Financial data compliance rules require share links and embed components to support identity authentication configuration. This prevents unauthorized access.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `embed_cache_ttl` | 86400 seconds | Matches the T+1 update cadence of joint-stock bank daily reports. Prevents cached stale data or overly long retention of old data |
| `embed_custom_fields` | Product name, annualized yield, 7-day annualized yield, update date | Aligns with core fields users view most frequently. Reduces display of non-essential information |
| `share_auth_enabled` | Enabled | Meets financial data compliance requirements. Restricts access to shared content for unauthorized users |
| `share_expire_time` | 7 days | Balances link availability and data security. Shared links expire after the set period and can be regenerated |
| `embed_auto_refresh` | Every hour | Adapts to sync requirements for real-time market fields. Balances network resource usage |
| `parse_multi_column_mode` | Segment by row | Preserves column-to-row correspondence from original tables. Avoids broken field associations during RAG training |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Incorrect display fields in embed components, with extra or missing columns. This occurs when the `embed_custom_fields` parameter is not configured correctly, or when field names do not match those in the data source.
- Shared links without authentication enabled, allowing unauthorized users to directly access yield data. This occurs when the `share_auth_enabled` configuration is not enabled, or when internal bank identity verification rules are not bound.
- Chaotic RAG segmentation results for multi-column daily report documents, with broken field associations across each row of data. This occurs when `parse_multi_column_mode` is not set to segment by row. The default automatic segmentation logic disrupts column correspondence in tables.

## How to Confirm Proper Configuration
- Load the embed component on the bank’s official test site. Verify that displayed fields match the list set in `embed_custom_fields`.
- Access the generated shared link using a browser without internal permissions. Confirm that data fails to load normally, or that an identity verification prompt appears.
- Modify the `embed_cache_ttl` parameter, then wait for the set duration. Confirm that page data automatically updates to the latest daily report content.
- Upload a test multi-column daily report document. Review RAG segmentation results. Confirm that each row of data maintains complete column associations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
