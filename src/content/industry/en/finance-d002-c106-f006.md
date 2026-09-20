---
title: Conversation Logs and Auditing for Usage Statistics in the All-in-One AI Platform
slug: /en/industry/finance-d002-c106-f006
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Conversation Logs and Auditing for Usage Statistics in the
meta_description: The platform generates usage statistics data from the call links, session management modules, and resource consumption statistics modules of each
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logs and Auditing for Usage Statistics in the All-in-One AI Platform

## What this category of data looks like
The platform generates usage statistics data from the call links, session management modules, and resource consumption statistics modules of each application. Data updates occur either in real time or via minute-level aggregation, and can be adjusted per business requirements. The data uses a standardized structured format. Each individual record includes these fields: application unique identifier, session identifier, user identifier, call timestamp, resource consumption value, status identifier, and error code. Units include tokens, interaction counts, milliseconds, and others. The data covers call behaviors across all business scenarios, and supports aggregated queries across applications and users.

## What constraints do these characteristics impose on conversation logs and auditing
Since data comes from multiple application call links, auditing must support cross-application aggregated filtering. This avoids limited audit scopes for single applications. Real-time or minute-level update cadence requires audit query links to have low latency. High-latency offline statistical data cannot be used. Fields including user identifiers and session identifiers require auditing to meet compliance traceability requirements. Auditing must support tracing full-process interactions by user or session dimension. The association between resource consumption and error code fields requires auditing to connect usage data and abnormal events. This enables full-link problem troubleshooting.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `audit_log_retention_days` | 180–365 days | Meets compliance requirements for audit data retention in the financial industry, covering quarterly and annual audit cycles |
| `usage_report_interval` | 10–60 seconds | Balances real-time traceability needs and platform resource usage, avoiding link pressure from high-frequency reporting |
| `session_trace_enable` | Enabled | Links full-link session data including plugin calls and tool execution, enabling complete audit coverage |
| `user_identifier_field` | `external_user_id` | Connects user identifiers from connected business systems, enabling differentiation of user chat records across systems |
| `usage_query_timeout` | 300 seconds | Adapts to usage query response times for large-scale applications, preventing audit failures from query timeouts |
| `app_usage_filter_enable` | Enabled | Filters usage data by application ID, supporting independent auditing for segmented business scenarios |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Symptom: When calling platform APIs to connect with business systems, chat records of different users cannot be distinguished in audit logs. Cause: The `user_identifier_field` parameter is not configured, and the user identifier from the business system is not passed to the platform.
- Symptom: After upgrading to version 4.9.0, the backend displays the `cannot fetch internal url` error when creating a knowledge base, and corresponding call records are missing from usage statistics logs. Cause: Internal interface access permissions are not configured, causing the usage reporting link to interrupt.
- Symptom: Interaction data from plugin execution is not included in usage statistics logs, and audits cannot cover full business processes. Cause: The `session_trace_enable` parameter is not enabled, and the session link for plugin calls is not associated.

## How to confirm correct configuration
- Access the platform's usage statistics management interface, select a specified application ID, and verify that usage data for the corresponding business scenario can be filtered.
- Initiate a business call, check if the `external_user_id` field is included in the audit log, and confirm that the user identifier has been passed correctly.
- Trigger a plugin call, verify that the audit log links the session ID and usage data from plugin execution.
- Check the value of the backend configuration item `audit_log_retention_days`, and confirm it matches the preset compliance retention period.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
