---
title: Sharing and Embedding of Semiconductor Yield Data
slug: /en/industry/finance-d007-c036-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Semiconductor Yield Data
meta_description: Data for semiconductor yield and daily market reports comes from public market APIs of domestic and overseas stock exchanges, and official data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Semiconductor Yield Data

## What the data for this category looks like
Data for semiconductor yield and daily market reports comes from public market APIs of domestic and overseas stock exchanges, and official data streams from semiconductor industry index compiling institutions.
During trading days, real-time market data updates alongside trading activities.
Full consolidated closing price and daily yield data is fully updated after 16:00 on the same day.
Data is stored as structured tables, with fixed fields: target code, target full name, trading day, daily closing price, previous closing price, trading volume (unit: shares), trading amount (unit: yuan).
No nested sub-documents or unstructured content are included.

## Constraints imposed by these characteristics on sharing and embedding
High-frequency real-time market data updates require shared API interfaces to support short-cycle data pulling or real-time pushing.
Embedded display components cannot synchronize the latest yield changes without this support.
Fixed structured fields require embedded frontends to pre-set field mapping rules.
Data parsing mismatches may occur without these rules, leading to displayed content that does not match actual data.
Full post-trading data updates follow a set schedule.
Embedded scenario cache expiration times must align with official update timelines.
This prevents expired previous-day data from being displayed.
Exclusive data scope for semiconductor sub-sectors requires knowledge base recall configurations to limit targets to their respective industries.
Cross-industry data will otherwise be included, reducing query accuracy.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Knowledge base recall count` | Top 8 entries | Data fields related to semiconductor yields are fixed, and each entry is moderate in length. 8 entries cover complete daily information without exceeding the context window |
| `Similarity threshold` | 0.75–0.85 | Semiconductor yield queries have high semantic similarity. This range filters irrelevant recalls while retaining valid data |
| `APIRequest timeout` | 15 seconds | Real-time market data pulling waits for API responses. 15 seconds covers request latency across most network environments |
| `Frontend Embedding CORS Whitelist` | Add target site domain names | Embedded scenarios must avoid cross-domain blockages that cause component loading failures |
| `Image External Link Whitelist` | Add official domain names of market data sources | Embedded replies with market charts must display properly. This allows external access to resources from the corresponding domains |
| `maxContext` | 8000–12000 characters | The total length of structured semiconductor yield daily report data and reply text is moderate. This range fully accommodates content |

> All parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing values.

## Three common misconfigurations
- Phenomenon: When calling the sharing API, some semiconductor yield queries do not return knowledge base results, while results can be obtained normally on the debug page. Cause: The API call does not limit the recall scope to the semiconductor industry-specific knowledge base, leading to failure to hit the corresponding index or inclusion of irrelevant data.
- Phenomenon: When the intelligent agent reply on the embedded webpage includes semiconductor market charts, the images can only be scaled inside the iframe and cannot be viewed in full screen externally. Cause: The allowfullscreen permission for the embedded frontend component is not enabled, or security jump rules for the image external link white list are not configured.
- Phenomenon: After modifying the embedded frontend code, the browser console returns the error "Connection blocked because it was initiated by a public page and intended to connect to a device or server on the local network". Cause: The embedded code references an interface address on the local network, or the target site domain name is not added to the cross-domain white list.

## How to verify successful configuration
- Call the sharing API, enter a query related to semiconductor yields, and check that the returned results only include market data for the semiconductor industry, with no content from other sectors.
- Open browser developer tools on the embedded page, check network requests, and confirm there are no timeout or cross-domain block errors for API calls.
- Click the market chart in the embedded intelligent agent reply, and confirm it can be scaled and viewed normally in a browser external pop-up window or new tab.
- Adjust the search keyword to yield content for non-semiconductor categories, and confirm the API does not return irrelevant results, verifying that the recall scope configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
