---
title: Sharing and Embedding for Environmental Monitoring Yield Data
slug: /en/industry/finance-d007-c103-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Environmental Monitoring Yield
meta_description: Organizations collect environmental monitoring yield and market data in financial scenarios from three main sources: fixed pollution source online
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Environmental Monitoring Yield Data

## What This Category of Data Looks Like
Organizations collect environmental monitoring yield and market data in financial scenarios from three main sources: fixed pollution source online monitoring systems supporting green credit projects, air and water environment monitoring reports from partners, and real-time data gathered through internal ESG assessments.

Update frequencies vary based on the monitored object:
- Second-level updates: e.g., flue gas emission concentration change rates for supporting projects
- Minute-level updates: e.g., real-time regional air quality index values
- Hour-level updates: e.g., monthly average water quality summaries for green projects

Each data entry includes these fields: unique monitoring point identifier, collection timestamp, environmental parameter type, measured value, value change rate (the yield for this category), legal unit of measurement, device operation status code, and threshold warning level. All fields use structured numerical or enumeration data types, with no nested rich text content.

## Constraints on Sharing and Embedding From These Characteristics
Environmental monitoring data in financial scenarios must meet compliance requirements. The traits of high-frequency updates, many structured fields, and strong timeliness create multiple constraints for the sharing and embedding process.

Directly embedding high-frequency real-time data increases page loading bandwidth usage. Configure cache expiration times to match the data update rhythm.

The raw format of structured numerical and enumeration fields has low readability. Set preset field rendering rules before embedding to avoid displaying original device status codes or unlabeled numerical values directly.

The strong timeliness of data requires sharing links or embedded components to support custom expiration durations. This prevents outdated monitoring results from being displayed, which could negatively impact financial decision-making.

Monitoring scenarios often require filtering content by monitoring point or parameter type. Embedding configurations must retain parameter input entry points. Avoid embedding fixed single-scenario content to adapt to customized needs of different financial customers.

Financial industries require strict control over data access permissions. The sharing process must support permission verification to prevent leaks of sensitive monitoring data.

## How to Configure the Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_expire_seconds` | `300–3600 seconds` | Match the update rhythm of environmental monitoring data. Use 300 seconds for real-time monitoring data, 3600 seconds for hour-level aggregated data |
| `embed_cache_ttl` | `60–1800 seconds` | Balance embedded page loading speed and the freshness of monitoring data. Adjust the cache duration as needed |
| `export_disable_markdown` | `true` (login-free sharing scenarios) | Most environmental monitoring data consists of structured numerical values. Skip Markdown format exports to avoid non-standard content output and sensitive data leakage |
| `embed_param_filter` | `enabled` | Allow passing custom parameters such as monitoring point ID and pollutant type. Implement customized embedded content to adapt to the needs of different financial customers |
| `iframe_sandbox_policy` | `allow-same-origin allow-scripts` | Ensure normal loading of embedded components while avoiding cross-domain security risks. Comply with security and compliance requirements of financial scenarios |
| `share_auth_required` | `false` (public customer scenarios) / `true` (internal employee scenarios) | Control access permissions based on usage scenarios. Prevent unauthorized access to sensitive monitoring data and comply with financial industry data compliance rules |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: The Markdown export button on the embedded page remains visible, and exported content includes undescensitized monitoring point IDs and customer-related information. Cause: The `export_disable_markdown` parameter is not set to `true`, and structured monitoring data is not desensitized, with original fields exported directly.
- Phenomenon: The embedded component fails to load, and the page displays a `504 Gateway Timeout` error. Cause: The `embed_cache_ttl` configuration duration is too short. High-frequency updated data triggers frequent interface requests, exceeding server load thresholds.
- Phenomenon: The monitoring data displayed after opening the sharing link does not match expectations, and monitoring parameters for specified green projects are missing. Cause: The `embed_param_filter` configuration is not enabled, and the correct monitoring point ID parameter is not passed. The system loads full unfiltered data by default.

## How to Verify the Configuration Is Complete
- Access the embedded component preview page, check whether the Markdown export button matches the configured hidden or displayed state.
- Pass custom monitoring point ID parameters, confirm that the embedded page only displays monitoring data for the corresponding green project.
- Wait for the configured cache duration to expire, refresh the embedded page, and confirm that the data updates to the latest collected results.
- Test the access permissions of the sharing link, confirm that unauthorized users cannot access sharing content in internal scenarios.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
