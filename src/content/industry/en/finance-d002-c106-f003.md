---
title: Usage Statistics for Unified AI Platforms: Sharing and Embedding
slug: /en/industry/finance-d002-c106-f003
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Usage Statistics for Unified AI Platforms: Sharing and
meta_description: Usage statistics data comes from the platform's application call logs, session interaction records, and resource consumption monitoring data. It is
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Usage Statistics for Unified AI Platforms: Sharing and Embedding

## What the data for this category looks like
Usage statistics data comes from the platform's application call logs, session interaction records, and resource consumption monitoring data. It is updated via batch aggregation on preset hourly, daily, or other cycles, or pushes real-time incremental data. The document structure is a structured table with fields including statistical cycle, application unique identifier, total call times, cumulative token consumption, and active session count. The statistical cycle uses ISO time format. The unit for total call times is "times", the unit for cumulative token consumption is "token", and the unit for active session count is "counts". The data only associates the call behavior of the corresponding application, and does not include unauthorized user privacy information.

## What constraints do these characteristics impose in the "Sharing and Embedding" workflow
The periodic aggregation feature of usage statistics data requires the embedded statistics panel to match the preset update cycle. Second-level real-time refresh is not supported. The update cycle parameter must be synchronized in the configuration. The data includes sensitive fields such as application unique identifier and caller identifier. The embedding link must configure a domain name whitelist to restrict only trusted business system domains from loading components, preventing data leakage. The structured fields include multi-dimensional statistical items. The embedded component must support custom display fields. It cannot force all fields to be displayed fixedly, and must adapt to the display needs of different business systems. The data is associated with the call behavior of a specific application. The sharing link must be bound to the permission context of the corresponding application to avoid cross-application access to statistical data.

## How to configure the settings
| Configuration Parameter | Recommended Value | Rationale |
| --- | --- | --- |
| `embed_domain_whitelist` | `["https://bank.example.com", "https://insurance.example.com"]` | Restrict only trusted financial and insurance business system domains from loading embedded components, preventing unauthorized access to statistical data |
| `statistic_refresh_interval` | `300 seconds` or `3600 seconds` | Match the aggregation cycle of platform usage data, balancing real-time display requirements and server resource usage |
| `allowed_stat_fields` | `["call_total", "token_usage", "active_sessions"]` | Only display necessary statistical fields that comply with compliance requirements, avoiding leakage of sensitive internal call details |
| `share_link_access_mode` | `signed_url` | Generate signed access credentials for sharing links to prevent malicious misuse of links, adapting to security specifications for financial scenarios |
| `custom_embed_css` | Configure according to business system UI specifications | Maintain consistent visual style between the embedded component and the business system, improving user operation consistency |

> The parameter values provided on this page are all conventional recommendations used as a starting point for configuration. The actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing the configuration.

## Three common configuration errors
- Inconsistent styling between the embedded component and the business system after loading, with no way to modify it via custom CSS. This occurs because the `custom_embed_css` parameter is not correctly configured, or the embedded domain name is not added to the `embed_domain_whitelist`, resulting in custom style resources being blocked.
- A password verification popup appears when the sharing link is first opened. This occurs because the `share_link_access_mode` is not configured for password-free mode, or the generated sharing link does not carry a valid access signature, causing the platform to fail access permission verification.
- The statistical data displayed on the embedded panel deviates from the actual application call volume. This occurs because the value of `statistic_refresh_interval` does not match the aggregation cycle of the platform's usage data, causing the panel to load expired statistical snapshots.

## How to confirm the configuration is complete
- Access the configured embedded link, confirm that the current business system's domain name is in the list configured in `embed_domain_whitelist`, and that the component loads normally without style interception errors.
- Check the refresh frequency of the embedded panel, confirm that it matches the value configured in `statistic_refresh_interval`, with no abnormal refresh intervals.
- Verify the statistical fields displayed on the panel, confirm that only the items configured in `allowed_stat_fields` are included, with no unauthorized sensitive fields displayed.
- Generate a new sharing link, access it without logging in, confirm that it complies with the verification rules configured in `share_link_access_mode`, with no additional permission verification popups.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
