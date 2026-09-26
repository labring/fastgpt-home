---
title: Sharing and Embedding Cosmetic Profit Margin Data
slug: /en/industry/finance-d007-c030-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding Cosmetic Profit Margin Data
meta_description: Cosmetic profit margin data comes primarily from publicly available supplier guide prices from brands, listed prices at physical counters and online
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding Cosmetic Profit Margin Data

## What Data for This Category Looks Like
Cosmetic profit margin data comes primarily from publicly available supplier guide prices from brands, listed prices at physical counters and online channels, and channel sales review data from third-party beauty industry monitoring agencies. The primary update cycle is monthly. Core SKUs for some top brands may have data adjusted alongside quarterly marketing campaigns. Most data documents use structured tables with fields including SKU number, product name, supply cost, terminal selling price, and accounting cycle. All field units are uniformly Chinese Yuan. Some data entries also include specification parameters for the corresponding SKU.

## Constraints for Sharing and Embedding
The multiple data sources and monthly/quarterly update cycles for cosmetic profit margin data require embedding components to support custom refresh intervals. This prevents displaying outdated information. Structured fields contain multi-dimensional content. Embedding must support selecting and displaying specific fields, otherwise irrelevant redundant information will appear. All data units are uniformly Chinese Yuan. Embedding configurations must retain the native currency format, and cannot be directly replaced with other units. Some core SKU data has brand authorization restrictions. Shared links must bind corresponding authorization identifiers to prevent unauthorized calls. Additionally, single data documents cover a large number of SKUs. Embedding must support pagination or scrolling display to avoid page layout overflow.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `refreshInterval` | `2592000 seconds` | Matches the monthly update cycle of cosmetic profit margin data to avoid displaying outdated information |
| `displayFields` | `["skuId", "productName", "supplyPrice", "retailPrice"]` | Corresponds to core structured fields for cosmetic profit margin data, filtering out irrelevant redundant content |
| `allowedDomains` | `["your-business-domain.com"]` | Restricts embedded business system domains to prevent unauthorized iframe embedding |
| `authTokenScope` | `["core_sku_group"]` | Binds authorized SKU groups to meet brand authorization requirements for cosmetic data |
| `currencyDisplay` | `Retain native Chinese Yuan format` | All data units are uniformly Chinese Yuan, no additional format conversion needed |
| `embedCustomStyle` | `Set based on actual testing` | Adapts to the layout style of the business system to avoid style conflicts |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: The embedded iframe component style does not match the business system layout, resulting in element overflow or visual misalignment. Cause: The `embedCustomStyle` parameter is not configured, the default embedded style is used directly, and the business system's layout specifications are not adapted.
- Phenomenon: An identity verification password pop-up appears when the shared link is opened for the first time. Cause: The business system domain name is not added to the `allowedDomains` configuration item, or the authorized SKU group is not bound, triggering the default access restriction mechanism.
- Phenomenon: The front-end directly calls the interface and returns a 403 Forbidden status code. Cause: The `allowedDomains` configuration does not allow the front-end domain name to access, or a valid authorization token is not carried, violating the security rules of interface access.

## How to Confirm Configuration is Complete
- Visit the configured embedded page, verify that the displayed fields match the content of the preset `displayFields` configuration item, with no additional redundant information.
- Attempt to embed using a domain name not added to `allowedDomains`, confirm that the page cannot load data normally, verifying that the domain restriction configuration is effective.
- Wait for the preset `refreshInterval` cycle, then refresh the page, confirm that the data has been updated to the latest version, verifying that the refresh cycle configuration is effective.
- Call the interface bound with authorization, check that the returned data only includes SKU information within the configured `authTokenScope` range, verifying that the authorization scope configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
