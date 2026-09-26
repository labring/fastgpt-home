---
title: Sharing and Embedding for Tourist Attraction Revenue Yield
slug: /en/industry/finance-d007-c077-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Tourist Attraction Revenue Yield
meta_description: Statistical data for tourist attraction revenue yield is sourced from the attraction's internal ticketing system, passenger flow statistics module
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Tourist Attraction Revenue Yield

## What the data for this category looks like
Statistical data for tourist attraction revenue yield is sourced from the attraction's internal ticketing system, passenger flow statistics module, and financial reconciliation system. Full daily statistical results are generated at a fixed time after park closing each day. The structure of a single data document includes fields such as statistical date, unique attraction identifier, attraction name, number of visitors, ticket revenue, secondary consumption revenue, total operating costs, and net revenue. The corresponding units for each field are person, Chinese Yuan, Chinese Yuan, Chinese Yuan, Chinese Yuan, and Chinese Yuan respectively.

## What constraints these characteristics impose on the "Sharing and Embedding" workflow
The daily full data update requires embedded components to support scheduled refresh to match the attraction's data update rhythm, avoiding the display of outdated information. Multiple fields contain sensitive financial data, so embedded configurations must enable identity authentication to restrict access by unauthorized entities and prevent revenue information leaks. Attraction reports are often embedded on official websites, official accounts, and other owned channels, so support for iframe embedding and interface call integration with mainstream front-end frameworks is required. Additionally, the domain range of callable interfaces must be restricted to reduce security risks.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `enableEmbedMode` | Enabled | Supports embedding FastGPT-generated tourist attraction revenue yield reports into third-party front-end pages |
| `shareAuth` | Enabled and bound to the attraction's own account system | The report contains sensitive financial data, requiring restrictions on unauthorized access |
| `iframeAutoRefresh` | `86400 seconds` | Matches the daily update rhythm of tourist attraction revenue yield data |
| `apiWhiteList` | Add the attraction's own front-end domain names and official account backend domain names | Restrict embedding channels to prevent unauthorized domain names from calling interfaces |
| `responseTimeout` | `30 seconds` | Attraction data needs to be aggregated from multiple systems, reserving sufficient query time |
| `maxResponseSize` | `20000 characters` | Accommodate complete statistical data with multiple fields of the attraction report |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- Phenomenon: After embedding a FastGPT page in a Vue3 project, the page loads with a timeout or appears blank. Cause: The attraction's own domain name was not added to the `apiWhiteList`, and interface calls were blocked.
- Phenomenon: After iframe embedding, FastGPT-generated report data cannot be obtained, and the interface returns a 403 status code. Cause: `shareAuth` was not enabled, or correct identity verification parameters were not configured, and access was denied.
- Phenomenon: The embedded report displays data that does not match the actual revenue of the attraction. Cause: `iframeAutoRefresh` was not configured to a duration matching the data update cycle, and outdated statistical results were displayed.

## How to confirm the configuration is complete
- Open the embedded page under the attraction's own front-end domain name, and check whether the complete revenue yield report data loads normally.
- Attempt to access the embedded link using an unauthorized external domain name, and confirm that a permission error prompt is returned.
- Wait for one data update cycle, refresh the embedded page, and confirm that the displayed data is the latest version.
- Call FastGPT's dedicated interface to obtain report data, and check whether the returned fields include all required statistical items.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
