---
title: Sharing and Embedding for Coke Coal Yield Data
slug: /en/industry/finance-d007-c097-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Coke Coal Yield Data
meta_description: Coke coal market and yield data is sourced from Dalian Commodity Exchange official market APIs and compliant third-party data sources.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Coke Coal Yield Data

## What this type of data looks like
Coke coal market and yield data is sourced from Dalian Commodity Exchange official market APIs and compliant third-party data sources.
Update schedule: Real-time updates for latest transaction prices during continuous trading hours (9:00–23:00 each trading day). Daily settlement data releases before 15:30 after market close.
Each data entry includes contract identifier, delivery month, daily opening price, daily highest price, daily lowest price, daily settlement price, daily trading volume, open interest, and the difference between settlement price and the previous trading day’s settlement price.
Units: Price-based indicators use yuan per ton. Trading volume and open interest use lots.

## Constraints imposed by these characteristics during sharing and embedding
Coke coal market and yield data splits contracts by delivery month. A single daily report includes multi-dimensional metrics for multiple active contracts. This characteristic creates three core constraints for sharing and embedding.
First, the multi-contract structure requires embedding components to configure contract filter parameters. Only show delivery month contracts that target users care about. This avoids redundant page information.
Second, high-frequency updates during trading hours and scheduled release of post-settlement data require embedding components to match data source update rhythms with refresh interval configurations. This ensures displayed data stays timely.
Third, the presence of multiple numeric fields requires explicitly specifying displayed fields during embedding. This reduces page clutter from too many fields. It also requires compliance with compliant data source call frequency limits, and configuration of reasonable request throttling rules to avoid triggering API rate limits.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_embed_show_fields` | `Contract Code, Delivery Month, Daily Settlement Price, Price Change Difference, Daily Trading Volume` | Core metrics for coke coal daily reports include contract identifiers, settlement prices and price changes, and trading scale. This matches industry analysis needs |
| `share_embed_refresh_interval` | `300 seconds (trading hours), 86400 seconds (non-trading hours)` | Data updates frequently during trading hours. A 5-minute refresh balances timeliness and API load. Non-trading hours only see daily settlement data updates, so a daily refresh is sufficient |
| `share_embed_filter_contract` | Configure specific contract codes for the nearest 2-3 active delivery months for coke coal | Active coke coal contracts concentrate in the nearest 2-3 delivery months. Filtering reduces redundant information display |
| `share_embed_show_markdown_export` | `false` | Financial scenario sharing typically does not require Markdown exports. Disabling this simplifies the share interface and aligns with industry usage habits |
| `share_embed_cors_whitelist` | `["https://compliant-business-domain1", "https://compliant-business-domain2"]` | Restrict embedding component access to only specified business domains. Prevents unauthorized calls |
| `share_embed_request_limit` | `10 requests per minute` | Aligns with compliant data source call frequency limits. Avoids triggering API rate limits |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Analyze specific cases individually. Test with your own samples before finalizing settings.

## Three Common Mistakes
- Scenario: The embed component’s preview window without login shows the Markdown export button. It cannot be hidden via interface settings. Cause: The `share_embed_show_markdown_export` parameter is not configured. The button is enabled by default. This does not match the usage habit of not needing exports in financial scenarios.
- Scenario: The embedded page frequently fails to load data or times out during trading hours. Cause: The `share_embed_refresh_interval` parameter is not adjusted for trading hours. High-frequency refresh triggers data source rate limiting rules.
- Scenario: The embed component displays contract data for all delivery months. The page has cluttered, hard-to-read information. Cause: The `share_embed_filter_contract` parameter is not configured. Full contract data loads by default. This exceeds the target user’s focus range.

## How to Confirm Correct Configuration
- Open the share embed preview interface. Check that displayed fields match the `share_embed_show_fields` configuration.
- Test the embed component’s refresh frequency during both trading and non-trading hours. Confirm it matches the configured interval requirements.
- Attempt to embed the component from a domain not added to `share_embed_cors_whitelist`. Confirm it fails to load normally or triggers cross-domain related errors.
- Simulate call frequency exceeding the configured threshold. Confirm rate limit errors trigger. Ensure the API returns data as expected.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
