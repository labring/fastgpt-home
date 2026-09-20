---
title: Sharing and Embedding for IT Service Revenue Rates
slug: /en/industry/finance-d007-c001-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for IT Service Revenue Rates
meta_description: IT service revenue rate and market data is sourced from internal project accounting modules of financial institutions and public industry financial IT
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for IT Service Revenue Rates

## What the data for this category looks like
IT service revenue rate and market data is sourced from internal project accounting modules of financial institutions and public industry financial IT service market data sources. A daily report document is generated on a fixed schedule each day.
The document includes these fields: statistical cycle, service classification, accounting dimension, core revenue indicators, and daily fluctuation.
Field units follow these rules:
- Statistical cycle uses natural day format
- Service classification uses text identifiers
- Accounting dimension uses project or business line classification
- Core revenue indicators are measured using accounting benchmark units
- Daily fluctuation is measured using relative change values

## Constraints for Sharing and Embedding Workflows
The daily updated nature of the report requires that sharing links or embedded components support scheduled refresh configuration. This prevents expired data from being displayed, which could negatively impact financial business decisions.
The multi-field, multi-classification document structure requires that embedding configurations support custom display fields and dimension filtering. This ensures only business content relevant to the target audience is shown.
The cross internal and external data source attribute requires that sharing functions support permission isolation configuration. This differentiates data scopes for public and internal sharing, preventing leaks of internal project data.
The relative change value unit requirement means embedded components must support custom unit adaptation. This avoids display logic confusion that could harm business judgment.
Additionally, the fixed daily generation schedule for reports requires sharing configurations to align with the data update cycle. This prevents data mismatch issues.

## How to Set Up Configurations
| Configuration Option | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_expire_days` | `7 days` | IT service daily reports have reference value within 7 days. Data timeliness decreases after this period, so sharing links must be regenerated |
| `embed_auto_refresh` | `Enabled` | Daily report data updates each day. Automatic refresh ensures embedded components always display the latest content |
| `embed_show_fields` | `Top 6 core fields` | IT service daily reports have many fields. Displaying only core fields avoids page clutter and aligns with business viewing habits |
| `share_permission_level` | `Configured by data source group` | IT service data includes internal project information. Permission scopes for public and internal sharing must be differentiated to prevent sensitive data leaks |
| `embed_unit_adapt` | `Enabled` | Revenue indicators use benchmark units. Adaptation ensures displays align with business team usage habits |
| `iframe_height` | `400-600 pixels` | Daily report content has moderate length. This height range fully displays content without taking up excessive page space |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. Testing with own samples is recommended before finalizing settings.

## Three Common Configuration Mistakes
- The embedded webpage's iframe displays a Markdown export button by default, and it cannot be turned off directly through the interface settings. This occurs because the `embed_hide_export_btn` parameter was not configured correctly, and the export function is enabled by default.
- The generated sharing configuration cannot be exported as a reusable JSON file, and cannot be directly reused in other projects. This occurs because the `share_export_json` parameter was not enabled in the sharing settings, and only a temporary sharing link was generated.
- In shared applications, different users can view each other's chat dialog boxes, and session data isolation cannot be achieved. This occurs because the `share_user_isolation` parameter was not configured, and the user session isolation function is not enabled by default.

## How to Verify Correct Configurations
- Open the generated sharing link or embedded component, and verify that displayed fields match the preset `embed_show_fields` configuration.
- Wait for the configured refresh cycle, then refresh the embedded page, and confirm that the displayed data has updated to the latest daily report content for the current day.
- Use different anonymous accounts to access the sharing link, and confirm that each account can only view its own session content and cannot access other users' conversations.
- Check the toolbar of the embedded page, and confirm that no Markdown export related buttons appear.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
