---
title: Sharing and Embedding of State-owned Commercial Bank Yield Data
slug: /en/industry/finance-d007-c047-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of State-owned Commercial Bank Yield
meta_description: State-owned commercial bank yield daily report data comes from official disclosure channels of each state-owned commercial bank, including official
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of State-owned Commercial Bank Yield Data

## What the Data Looks Like
State-owned commercial bank yield daily report data comes from official disclosure channels of each state-owned commercial bank, including official website financial market sections, official information release platforms, and regulatory filing channels. Updates are made daily after market close with full daily report data for the day. The document structure uses a standardized structured table, with fields including product category, remaining term range, annualized yield level, issuing institution, release date, and more. The unit for annualized yield level is annualized benchmark. All fields comply with standard financial information disclosure formats. Data dimensions cover core yield-related products such as self-operated deposits and wealth management products. The number of fields per daily report is fixed with no redundant information.

## Constraints for Sharing and Embedding Workflows
First, data sources have official authority. The sharing and embedding process must retain data source annotations, and must not alter or hide issuing institution information, as this would violate financial information disclosure compliance requirements. Second, data updates daily. Sharing links and embedded components must support scheduled refresh, with cache duration matching the update rhythm to avoid displaying outdated data older than 24 hours. Third, field structure is fixed and standardized. Embedded components must support custom filtering of displayed fields, only exposing core yield-related fields externally to avoid disclosing non-public information. Fourth, data units are uniformly annualized benchmark. When embedding, ensure the display format matches the source data, and must not adjust units or add extra symbols without authorization. Additionally, disclosed data must be traceable. Sharing links cannot bypass compliance checks through anonymous methods.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_enable_guest` | `true` | State-owned commercial bank yield daily reports need to be shared with public audiences, and viewing without login is required. Enabling guest-only sharing aligns with usage scenario needs |
| `share_guest_link_limit` | `100` | The default limit for team edition packages is 10 links. Adjusting to 100 meets the need for batch sharing of different product daily reports |
| `share_language` | `zh-CN` | The target audience is domestic financial practitioners. Using the Chinese interface reduces learning barriers and resolves issues caused by the default English setting |
| `iframe_embed_auto_refresh` | `86400 seconds` | Daily reports update once per day. Setting a 24-hour automatic refresh duration ensures embedded components always display the latest data |
| `share_allowed_fields` | `Product Category, Term Range, Annualized Yield Level, Release Date` | Matches the core disclosure fields of state-owned commercial bank yield daily reports, avoids displaying unnecessary information, and complies with compliance requirements |
| `share_cache_max_age` | `86400 seconds` | Cache duration aligns with the data update rhythm, avoids displaying outdated data due to overly long caching, and reduces the frequency of API calls |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. Testing on relevant samples prior to finalization is recommended.

## Three Common Misconfigurations
- Symptom: After FastGPT deployed via Docker on Windows systems is restarted, guest-only sharing links cannot be located, and the backend shows the links have been deleted. Cause: The sharing configuration storage directory was not mounted as a persistent volume. Internal storage of sharing link data is lost after container restart.
- Symptom: The iframe-embedded interface displays English content. Cause: The `share_language` parameter was not configured, and the system uses English as the default sharing interface language without specifying Chinese.
- Symptom: After more than 10 guest-only links are created for a team edition application, new links cannot be created. Cause: The `share_guest_link_limit` parameter was not adjusted. The default limit is 10 links, and the value was not modified to meet batch sharing needs.

## How to Verify Configuration is Active
- A guest-only sharing link is accessed. The interface language is confirmed to be Chinese. This verifies the `share_language` configuration is active.
- Navigate to the sharing settings page of a team edition application. Attempt to create the 11th guest-only link. Successful creation verifies the `share_guest_link_limit` parameter modification is active.
- Wait 24 hours, then refresh the embedded iframe component. Confirm the displayed release date is the current day. This verifies the `iframe_embed_auto_refresh` and `share_cache_max_age` configurations are active.
- Review the displayed fields of the shared content. Confirm only Product Category, Term Range, Annualized Yield Level, and Release Date are shown. This verifies the `share_allowed_fields` configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
