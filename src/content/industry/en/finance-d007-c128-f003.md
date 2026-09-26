---
title: Sharing and Embedding of Shipping Port Yield Data
slug: /en/industry/finance-d007-c128-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Shipping Port Yield Data
meta_description: Data related to shipping port yields primarily comes from public market APIs of domestic shipping exchanges and official reporting systems of port
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Shipping Port Yield Data

## What this type of data looks like
Data related to shipping port yields primarily comes from public market APIs of domestic shipping exchanges and official reporting systems of port operators. Data update cycles fall into two categories: berth and throughput data is synchronized every hour, while route freight rates and yield data is updated after daily settlement in the early morning. The data documentation uses structured JSON format, including fields such as unique port identifier, Chinese name, affiliated main trunk route, daily operating vessel count, container throughput unit, benchmark yield range, and data update timestamp. Field units include TEU, vessel count, hour, and others.

## What constraints these characteristics impose on the sharing and embedding process
Because data update cycles differ between hourly and daily frequencies, the sharing and embedding process must adapt to different caching strategies to avoid displaying expired data. Structured fields include dedicated units and unique identifiers. Unit information must be retained during embedding, otherwise data readability will decrease. Port data has multiple dimensions, and full API responses have large payloads. Sharing links must include port code parameters to return targeted data and reduce transmission overhead. Additionally, embedding applications for shipping port scenarios are often deployed on internal enterprise systems or vertical shipping platforms. Cross-domain access whitelists must be configured to prevent loading failures after embedding.

## How to configure settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `shareExpireTime` | `3600 seconds` or `86400 seconds` | Matches the hourly and daily update cycles of port data, prevents expired data from being returned by sharing links |
| `iframeAllowList` | `["https://shipping-platform.com", "https://internal-port-system.com"]` | Adapts to embedding scenarios for vertical shipping platforms and internal enterprise systems, restricts cross-domain access scope |
| `workflowShareUrlEnable` | `true` | When enabled, sharing application URLs can be generated via workflow nodes, meeting the need to obtain sharing links through code |
| `shareAuthType` | `tokenBased` or `public` | Use `tokenBased` if user authorized access is required, use `public` for public scenarios, matches permission requirements for shipping scenarios |
| `maxResponseSize` | `2048 kilobytes` | Limits the response payload size of a single sharing API, avoids transmission timeouts or slow page loading |
| `cacheControlHeader` | `max-age=3600` or `max-age=86400` | Matches data update frequencies, reduces server load from repeated requests |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Symptom: Sharing links do not trigger an authorization process after access, and full data is displayed directly. Cause: The `shareAuthType` configuration is set to `public`, and token-based authorization mode is not enabled, which fails to meet the permission control requirements for shipping data sharing.
- Symptom: The node for generating sharing application URLs cannot be called in workflows. Cause: The `workflowShareUrlEnable` switch is not enabled, or the FastGPT version is lower than v4.9.7. This function was added in that version.
- Symptom: Different browsers accessing the same embedded link return inconsistent user identifiers. Cause: Session-based user identity verification is not configured, or the Cookie policy of the embedded page is not unified, resulting in failure to synchronize session state across browsers.

## How to confirm configuration is properly set up
- Copy the generated sharing link, open it in a browser corresponding to the embedded domain, check that the target port's yield data loads normally, and that data units and fields are complete.
- Call the node for generating sharing URLs in a workflow, check that the returned link format is correct and accessible, and confirm that required port code parameters are included.
- View the `shareLog` logs in the FastGPT backend, check that the response status code for sharing requests is 200 OK, with no data truncation or cross-domain errors.
- Adjust the value of `shareExpireTime`, verify that expired links return an expiration prompt, and confirm that the caching policy takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
