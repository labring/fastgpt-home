---
title: Sharing and Embedding for the Unified AI Platform with Model Allocation
slug: /en/industry/finance-d002-c081-f003
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for the Unified AI Platform with Model
meta_description: Model allocation data comes from connected large model instance information, team-configured call quotas, and preset traffic routing rules.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for the Unified AI Platform with Model Allocation

## What the data for this category looks like
Model allocation data comes from connected large model instance information, team-configured call quotas, and preset traffic routing rules.
Data updates follow these rules: real-time sync when connected instances change, immediate effect when call quotas are adjusted, and activation on the next request match after route rules are modified.
The data structure uses structured JSON format, including fields such as `model_id` (string, unique model identifier), `quota_limit` (integer, maximum calls per minute, unit: times), `route_strategy` (enumerated values such as round-robin or weight allocation), and `bind_team` (string, bound business team ID). No nested complex levels are present.

## What constraints these characteristics impose on the sharing and embedding workflow
Sensitive call quotas and routing rules are included in the data, so internal fields require desensitization during the sharing and embedding process to avoid resource configuration leaks.
The real-time update feature means the cache period of share links cannot be too long. Otherwise, old links cannot match the latest configuration after quota or rule changes.
The `bind_team` field requires embedded components to carry authentication parameters for the corresponding team. Otherwise, access to the bound model resource pool is not possible.
Routing strategy configuration affects post-sharing traffic distribution. Embedded requests must strictly match the corresponding rules, otherwise quota allocation exceptions will occur.
Compliance requirements for financial scenarios also limit the cross-domain access scope of share links, to prevent unauthorized external systems from calling model resources.

## How to set the configuration
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `shareLinkCacheTtl` | `300 seconds` | Matches the update cycle of model quotas, balances real-time performance and cache performance |
| `allowedEmbedDomains` | `["https://corp.financial-domain.com", "https://agent.financial-domain.com"]` | Limits embedding sources, complies with security and compliance requirements of the financial industry |
| `maskShareModelFields` | `["quota_limit", "route_strategy"]` | Desensitizes internal quota and routing configurations, prevents sensitive information leakage |
| `shareLoginRequired` | `false` | Adapts to customer self-service access requirements in financial scenarios, works with port isolation to secure background access |
| `maxShareRequestsPerMin` | `80` | Limits the call frequency of a single share link, prevents model quotas from being exhausted |
| `embedAuthTokenExpire` | `1800 seconds` | Balances authentication security and usage convenience for embedded components |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common errors
- Phenomenon: Unauthenticated share links can directly access background management login pages. Cause: The sharing service port is not separated from the management port, and cross-domain access restrictions are not configured. This allows external requests to bypass authentication and access management interfaces.
- Phenomenon: Embedded components report quota exhaustion errors when calling models, or traffic distribution does not match preset rules. Cause: The share link is not correctly bound to the corresponding model routing rules, or field desensitization configuration is not enabled. This leads to leakage of internal resource information and calls that do not match the correct strategy.
- Phenomenon: Embedded knowledge base question and answer quick recommendation buttons cannot trigger scope narrowing logic, or recommended content does not match the knowledge base allocated by the current model. Cause: The model allocation routing configuration is not associated with the knowledge base context, so the recommendation logic is not bound to the currently used model resource pool.

## How to confirm the configuration is complete
- Access the configured share link, check that the page only displays the question and answer interface after model allocation, and does not show a background management entry.
- Embed components from non-allowed domains, confirm that the browser console returns a prompt that cross-domain access is denied.
- Modify the model allocation routing rules or quota parameters, wait for the cache to expire, then access the share link again. Confirm that the new configuration takes effect.
- Send continuous requests to the embedded component, observe that the call frequency does not exceed the preset limit, and there are no abnormal errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
