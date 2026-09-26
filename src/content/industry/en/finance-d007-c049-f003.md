---
title: Sharing and Embedding for Infrastructure Construction Project Yield Data
slug: /en/industry/finance-d007-c049-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Infrastructure Construction
meta_description: Infrastructure construction project yield data comes from financial institution internal project accounting systems and industry engineering cost
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Infrastructure Construction Project Yield Data

## What This Category of Data Looks Like
Infrastructure construction project yield data comes from financial institution internal project accounting systems and industry engineering cost information platforms. Updates follow a monthly regular schedule, with key ongoing projects syncing progress data weekly. The reports are structured documents that include: unique project identifier, project name, construction region, planned total investment amount, cumulative completed investment amount, cumulative revenue amount, unit project cost proportion, and labor cost proportion. Investment and revenue amounts are measured in ten thousand yuan. Cost proportions are presented as decimal values, with no percentage display fields.

## Constraints on Sharing and Embedding From These Characteristics
The source and update characteristics of infrastructure construction project yield data create multiple constraints for the sharing and embedding process. Data connects to internal financial institution accounting systems, so internal identity authentication rules must be configured during embedding to restrict unauthorized access. Update cycles are split into monthly regular updates and weekly key project updates. The expiration time of embedded caching must match the corresponding update cycle to avoid data lag or redundant requests. Fields include dimensions such as project unique identifier and region, so sharing links and embedding components must support dynamic parameter passing to load corresponding data for specified projects. The unit formats of ten thousand yuan and decimal values require embedded display components to perform unified formatting processing to avoid unit confusion. The real-time requirements for key projects require adapting reasonable polling intervals to balance data freshness and resource consumption.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_allow_iframe` | `true` | Allow target web pages to load shared yield report content via iframe, to meet embedding scenario requirements |
| `share_allowed_domains` | Fill in a whitelist of actual connected domain names | Restrict only specified domains from loading shared content, preventing internal data leaks from unauthorized embedding |
| `share_allowed_query_params` | `["projectId", "region"]` | Only allow passing preset project ID and region parameters, matching the business logic of loading dedicated data for infrastructure construction projects by project dimension |
| `embed_cache_ttl` | Regular projects: `2592000 seconds`, key projects: `604800 seconds` | Match monthly/weekly update cycles, avoid cache expiration mismatch with data updates |
| `api_timeout` | `30 seconds` | Adapt to the conventional response duration of infrastructure construction data interfaces, avoid embedding loading failures caused by network fluctuations |
| `share_enable_voice` | `false` | Infrastructure construction yield reports are primarily structured data, voice broadcasting is not a core requirement. Disabling this reduces permission verification and resource consumption |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: Query parameters such as `custId` carried in the embedded system do not take effect, and global variables cannot be updated. Cause: The corresponding parameter is not added to the `share_allowed_query_params` whitelist. FastGPT's sharing parameter verification blocks unauthorized passed parameters, resulting in failure to correctly assign global variables.
- Symptom: The iframe embedded in the mini program fails to load normally, prompting a domain verification failure. Cause: The mini program's business domain name is not added to the `share_allowed_domains` whitelist. FastGPT's security verification blocks embedding requests from non-whitelist domains.
- Symptom: When using bubble form to embed into other web pages, a `permission denied` error is prompted, with version 4.8.23. Cause: In version 4.8.23, there is an adaptation issue with the permission verification of the embedded scenario for the voice recognition function. When `share_enable_voice` is not enabled, the embedded page does not carry valid authentication parameters, resulting in permission verification failure.

## How to Confirm Successful Configuration
- Open the FastGPT application sharing configuration page, confirm that the switch status of `share_allow_iframe` matches the configured value.
- Access the shared link with the preset `projectId` parameter in the embedded test page, confirm that the loaded report data matches the specified project.
- After configuring `embed_cache_ttl`, wait for the corresponding cache expiration duration, refresh the embedded page, confirm that the data has been updated to the latest version.
- Try embedding on a web page domain name not added to the whitelist, confirm that loading fails, verifying that the whitelist configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
