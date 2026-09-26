---
title: Conversation Logging and Auditing for Coke Research Knowledge Base Construction
slug: /en/industry/finance-d006-c096-f006
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Conversation Logging and Auditing for Coke Research
meta_description: Coke-related data comes from four main sources: domestic futures exchange real-time quotes, monthly production and inventory reports from the China
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logging and Auditing for Coke Research Knowledge Base Construction

## What this category’s data looks like
Coke-related data comes from four main sources: domestic futures exchange real-time quotes, monthly production and inventory reports from the China Coking Industry Association, coastal port spot price systems, and third-party industry research reports.
Real-time quote data updates every minute. Spot prices update daily. Monthly industry reports are released by the 5th of each month.
Data documents include structured market tables with fields such as trading date, settlement price, and open interest (units: yuan/ton, lots). Inventory data fields include port inventory and steel mill inventory (units: 10,000 tons). Unstructured industry analysis documents are also provided, covering supply-demand logic and policy interpretation content.

## What constraints these characteristics impose on conversation logging and auditing
Real-time quotes update every minute. Conversation logs must record exact call timestamps down to the second, and retain snapshot versions of corresponding data. This ensures actual market conditions at call time can be matched during audits.
Structured data includes multi-unit fields. Logs must fully record field names and their corresponding units. This ensures the true meaning of data can be restored during audits.
Scenarios may recall both structured and unstructured data. Logs must distinguish recall types. They must separately record field IDs for structured data and unique identifiers for unstructured documents.
A large volume of industry chain-related data exists. Logs must additionally record traceability IDs for upstream and downstream associated data sources. This facilitates cross-link audit tracing.

## How to configure the settings
| Configuration Key | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `LOG_RECORD_LEVEL` | `info` and above | Coke research conversations require full coverage of the user question, data recall, and model response workflow. The info level retains enough contextual information required for audits |
| `LOG_SNAPSHOT_ENABLE` | `Enabled` | Real-time quote data updates every minute. Enabling snapshots retains the exact data version at the time of the call, meeting audit tracing requirements |
| `LOG_EXPIRE_DAYS` | `180 days` | Financial compliance requirements mandate retaining at least six months of operation records, matching the audit cycle needs of coke research |
| `MONGO_LOG_COLLECTION_PREFIX` | `fastgpt_coke_research_` | Separates log collections for the coke category from other industries, avoids cross-category data confusion, and facilitates separate retrieval for audits |
| `LOG_RECALL_DATA_DETAIL` | `Enabled` | Coke data includes multi-unit structured fields. Enabling this option fully records recalled field names, values, and units, restoring real data for audit scenarios |
| `LOG_ERROR_STACK_ENABLE` | `Enabled` | Research scenarios have high requirements for problem troubleshooting. Complete error stacks allow rapid localization of log anomalies and call failure causes |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common misconfigurations
- Symptom: Cannot retrieve conversation logs for coke research applications in MongoDB. The details page only shows basic session information. Cause: `MONGO_LOG_COLLECTION_PREFIX` is not configured, or the configured prefix does not match the prefix used when writing to the collection, causing logs to be written to the wrong collection.
- Symptom: No snapshot data for real-time quotes is retained in conversation logs. Auditors cannot match the coke settlement price at the time of the call. Cause: `LOG_SNAPSHOT_ENABLE` is not enabled, so only data indexes are recorded, not specific numerical snapshots.
- Symptom: The conversation details page cannot display operation logs for user modification notes or viewing historical records. Cause: `LOG_RECALL_DATA_DETAIL` is not enabled, so custom operation context from user interactions is not recorded, resulting in no corresponding content on the details page.

## How to verify successful configuration
Log in to the MongoDB management console, search for collections with the prefix `fastgpt_coke_research_`, and confirm that conversation log data exists.
A conversation related to coke research is initiated, and the conversation details page is checked to confirm that user questions, recalled coke data fields, and model response content are recorded.
The backend configuration interface is checked to confirm that `LOG_SNAPSHOT_ENABLE` and `LOG_RECALL_DATA_DETAIL` are both enabled.
A call failure scenario is simulated, and it is confirmed that complete error stack information and call context are recorded in the logs.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
