---
title: Conversation Logging and Auditing for Traditional Chinese Medicine (TCM) Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f006
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Conversation Logging and Auditing for Traditional Chinese
meta_description: TCM investment research data primarily comes from national pharmacopeias, TCM clinical research literature, herb planting quality standards, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logging and Auditing for Traditional Chinese Medicine (TCM) Investment Research Knowledge Base Construction

## What this category of data looks like
TCM investment research data primarily comes from national pharmacopeias, TCM clinical research literature, herb planting quality standards, and pharmaceutical company internal quality control reports. Update cycles vary. National pharmacopeias are formally revised every 5 years. Clinical research literature updates in real time alongside academic progress. Enterprise quality control data updates alongside batch production. The document structure centers on single herbs, compound formulas, and clinical protocols. It includes fields such as herb name, origin, harvest period, nature, flavor and meridian tropism, efficacy and indications, processing methods, active ingredient content (units are mostly mg/g or %), compatibility contraindications, and literature DOI.

## What constraints do these characteristics impose on conversation logging and auditing
The multi-source, multi-field nature of TCM investment research data requires complete logging of call sources, associated document fragments, and core field values. This supports investment research logic tracing and compliance verification. Data sources with different update cycles require marking data versions and update times in logs. This prevents research deviations caused by referencing expired content. Core fields such as active ingredient content and compatibility contraindications relate to clinical safety. The auditing process must enforce verification of the completeness and accuracy of corresponding fields in logs. This prevents omission of key investment research information. Investment research conversations often involve multi-round cross-referencing of literature. Logs must associate session IDs and context from each round of calls. This ensures complete logic chains can be traced during audits.

## How to configure settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `LOG_RETENTION_DAYS` | `180 days` | TCM investment research data must comply with industry compliance audit cycles. 180 days covers standard investment research review and regulatory inspection cycles |
| `AUDIT_FIELD_WHITELIST` | `Herbal Name, Active Ingredient Content, Compatibility Contraindications, Literature DOI` | Matches core fields of focus for TCM investment research. Reduces storage usage from unrelated logs |
| `MAX_HISTORY_LENGTH` | `Previous 6 conversation turns` | TCM investment research conversations often involve multi-round literature tracing and formula derivation. 6 turns covers complete logic chains without redundancy |
| `API_CALL_LOG_SAMPLING_RATE` | `100%` | Full auditing of investment research API calls is required. This prevents missed compliance verification points |
| `API_AUTH_TOKEN` | `Custom random string` | Prevents unauthorized calls. Meets security audit requirements for TCM investment research APIs |
| `CONVERSATION_LIST_PAGE_SIZE` | `First 50 entries` | Balances log loading speed and full data acquisition needs. Adapts to standard scale of investment research sessions |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. Testing against local samples is recommended before finalizing settings.

## Three Common Configuration Errors
- Symptom: API calls return 401 unauthorized errors. Logs show the token field is `fastgpt`, which does not match the configured value. Cause: The `API_AUTH_TOKEN` parameter is not configured correctly, or front-end calls do not carry the correct token. This causes the logged token to not match the actual configured value.
- Symptom: Calls to the `listAllConversation` API return an unexpected number of results. Full conversation records cannot be retrieved. Cause: The `CONVERSATION_LIST_PAGE_SIZE` parameter is not set. The default pagination limit is too small, so full sessions are not traversed.
- Symptom: Large numbers of API call requests occur outside working hours. Account balance is consumed abnormally. Cause: The `API_CALL_RATE_LIMIT` parameter is not configured. IP whitelists are not bound. This leads to unauthorized requests calling investment research APIs.

## How to Confirm Correct Configuration
- Navigate to the platform audit log page. Filter session IDs related to TCM investment research. Verify that fields configured in `AUDIT_FIELD_WHITELIST` appear fully in log details.
- Initiate a conversation that includes herb name and active ingredient content. Check that logs fully record all configured core fields. Confirm that the storage period matches the `LOG_RETENTION_DAYS` parameter value.
- Initiate two multi-round conversations using the same session ID. Confirm that both pulls of context use consistent turn counts. Each includes complete historical conversation logic chains.
- Call the `listAllConversation` API. Verify that the total number of returned sessions matches the number of investment research sessions displayed in the platform backend.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
