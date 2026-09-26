---
title: Sharing and Embedding of Building Construction Project Yield Rates
slug: /en/industry/finance-d007-c066-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Building Construction Project Yield
meta_description: Building construction project yield rate data comes from housing and urban-rural development department regional construction cost guidance prices
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Building Construction Project Yield Rates

## What this category of data looks like
Building construction project yield rate data comes from housing and urban-rural development department regional construction cost guidance prices, project completion settlement filing archives, and monthly building material price monitoring platforms. The update schedule follows monthly updates for building material sub-item costs, and quarterly updates for regional overall revenue benchmark values. The data is delivered as structured tables, with fields including unique project ID, project type, unit cost, financing cost ratio, actual payment collection cycle, and revenue calculation results. Unit cost uses yuan per square meter as its unit. Financing cost ratio uses per mille as its unit. Revenue calculation results are presented as relative coefficients to regional benchmark values.

## Constraints imposed on sharing and embedding by these characteristics
The multi-source update schedule and structured traits of building construction project yield rate data introduce multiple constraints for the sharing and embedding process. Monthly updated building material sub-item data requires embedding components to set cache durations that match the data update cycle, to avoid displaying expired cost data. The multi-field structure of the tables requires embedding configurations to retain field filtering parameters, to support adjustment of displayed fields for different scenarios. Different measurement units for unit cost and financing cost require embedding components to keep original unit identifiers, and prohibit arbitrary unit format changes. The unique project ID field requires sharing links to carry project ID parameters, to enable accurate data matching. Additionally, the public nature of engineering data and domain verification requirements for mini-program embedding require additional cross-domain whitelist configuration, to support multi-terminal embedding scenarios.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedCacheTtl` | `2592000 seconds` | Matches the monthly update cycle of building construction project cost data, prevents data failure caused by cache expiration |
| `embedShowFields` | `["projectId", "projectType", "unitPrice", "financingRate", "incomeCoefficient"]` | Covers core display fields of building construction project yield rate data, adapts to information needs of most business scenarios |
| `embedForceUnit` | `true` | Retains original measurement units, avoids data ambiguity from unit conversion, and complies with engineering data display specifications |
| `embedAllowParams` | `["projectId"]` | Supports accurate matching of yield rate data for corresponding building construction projects via project ID parameters, meets personalized query requirements |
| `embedDomainWhiteList` | `["*.your-domain.com", "mp.weixin.qq.com"]` | Adapts to web and mini-program embedding scenarios, avoids loading interception through cross-domain verification |
| `embedVersion` | `4.9.2` | Fixes the missing history records issue in the login-free window from version 4.9.1, ensures normal display of session data |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material forms, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- The first issue: Using the login-free embedding window from version 4.9.1, the page cannot display history records, but history data can be queried in logs. The cause is that the login-free component in this version does not synchronously load the history record cache configuration, leading the front end to fail to pull stored session data.
- The second issue: Embedding the component into a mini-program via iframe, the page fails to load and displays a domain verification failure prompt. The cause is that the mini-program's business domain is not added to the embedding configuration's whitelist, so cross-domain requests are blocked.
- The third issue: Inserting the login-free window code into a Vue project, the page loads but the link still points to the local debugging address. The cause is that the default local domain in the embedding configuration is not replaced with the official deployed access domain.

## How to confirm the configuration is properly set
- Enter the embedding configuration page, verify whether the displayed field list matches the preset business display requirements.
- Generate sharing links carrying different project identifiers, check whether the links can load yield rate data for corresponding projects.
- Test the loading status of the embedding component on web and mini-program terminals, confirm there are no cross-domain interception prompts.
- Open the session page of the login-free window, verify that history data can be displayed normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
