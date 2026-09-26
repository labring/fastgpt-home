---
title: Sharing and Embedding of Baijiu Yield Rates
slug: /en/industry/finance-d007-c113-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Baijiu Yield Rates
meta_description: Data sources for baijiu yield rate and daily market reports include public financial market APIs, alcohol industry monitoring platforms, and temporary
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Baijiu Yield Rates

## What the data for this category looks like
Data sources for baijiu yield rate and daily market reports include public financial market APIs, alcohol industry monitoring platforms, and temporary announcements from listed companies. Unlike market data for other food and beverage segments such as beer and dairy products, baijiu yield rate data is mostly linked to listed company stock codes, with fields focused on financial trading attributes.
Daily market data updates after market close each day. Weekly summaries update weekly. Monthly statistics update monthly.
Most data uses multi-column structured Excel or CSV files. Each row corresponds to a single daily data entry. Fields include stock code, product name, daily settlement price, transaction amount, circulating market capitalization, daily price change value, and more. Settlement price is measured in yuan. Transaction amount is measured in ten thousand yuan.

## What constraints these characteristics impose on the sharing and embedding workflow
The single-entry per row, multi-column structured format requires strict retention of field correspondence during embedding. Random splicing causes data confusion.
The daily update schedule requires embedding components to support scheduled refresh mechanisms. This prevents display of expired data.
Fields focused on financial trading attributes require retaining original field names during embedding configuration. Arbitrary replacement is not allowed.
Data sources rely on public APIs, so permission scope must be limited during embedding. This avoids unauthorized access to sensitive data.
Additionally, the tight binding between baijiu category stock codes and product names requires embedding to support filtering data by code or name. This requirement differs from other categories focused on sales data.

## Configuration Setup
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `split_method` | Split by row | Baijiu yield rate daily reports are multi-column structured tables, with each row corresponding to a single daily data entry. Splitting by row preserves field integrity |
| `SPLIT_CHUNK_OVERLAP` | 0 characters | Single row data has no redundant content. No overlapping segmentation is needed to avoid field confusion |
| `share_expire_time` | 86400 seconds | Baijiu yield rate data updates daily. Setting a 24-hour cache balances update timeliness and interface load |
| `api_key_scope` | Read-only market data | Only share and embedding permissions for yield rate data are granted, to avoid leakage of sensitive fields |
| `recall_top_k` | Top 10 entries | The number of listed baijiu enterprises is limited. Recalling too many entries increases embedding rendering load |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: Embedded pages display disordered spliced fields that cannot correspond to single daily data entries. Cause: `split_method` is not configured to split by row, and the default paragraph-by-paragraph split is used, resulting in mixed multi-column fields.
- Phenomenon: Shared links return 403 Forbidden errors. Cause: `api_key_scope` is not configured to restrict permissions, or the shared link has expired, resulting in interface authentication failure.
- Phenomenon: Embedded components take a long time to load without response. Cause: A reasonable cache expiration time is not set, or `recall_top_k` is set too large, resulting in interface request timeout or excessive resource usage.

## How to Confirm Correct Configuration
- Upload a baijiu yield rate daily Excel file, check the parsed segment results, confirm each segment corresponds to a complete row of data.
- Generate a shared link or embedding code, load it in a test environment, confirm the displayed fields match the original document, with no missing or mixed fields.
- Modify the value of `share_expire_time`, verify the availability of the shared link before and after the expiration time, confirm the cache logic takes effect.
- Adjust the value of `recall_top_k`, observe the number of entries returned by the embedded component, confirm it meets the configuration requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
