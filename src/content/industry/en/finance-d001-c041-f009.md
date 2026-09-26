---
title: Citation Sources and Traceability for List Screening KYC
slug: /en/industry/finance-d001-c041-f009
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for List Screening KYC
meta_description: Data for list screening KYC mainly comes from authoritative channels including sanction lists released by national financial regulatory authorities
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for List Screening KYC

## What This Type of Data Looks Like
Data for list screening KYC mainly comes from authoritative channels including sanction lists released by national financial regulatory authorities and international anti-money laundering organizations, politically exposed persons (PEP) databases, and official public disclosure platforms for persons subject to enforcement for dishonesty. Update rhythm aligns with regulatory release schedules; some public data sources update daily. Document structure primarily uses structured tables, with fields including name, alias, identification number, affiliated institution, effective date, sanction basis, and others. Most fields are identity-related or affiliation-related. Effective dates use ISO standard format. Affiliated institutions are mostly marked with unified social credit codes or official names.

## Constraints Imposed on Citation Sources and Traceability
The structured nature of list screening data requires traceability to precisely match core identity fields, to avoid false recalls or missed recalls caused by generic text matching. The high-frequency update feature of data sources requires traceability information to include the latest update time, to ensure compliance in financial scenarios. The multi-field structure requires traceability to clearly mark the specific matched fields, to avoid vague citations. Meanwhile, the authoritative nature of list data requires traceability to clearly mark the publishing entity, to meet the traceability verification requirements of financial regulators.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Matching Field` | `Name, ID Number, Affiliated Organization Code` | Matches core identity and affiliation fields of list screening data, avoiding false recalls caused by generic text matching |
| `Data Source Sync Cycle` | `2:00 AM Daily` | Adapts to the daily update rhythm of most regulatory data sources, ensuring timeliness of traceability information |
| `Recall count` | `Top 3 entries` | List screening only needs to return hit core entries; excessive entries will interfere with compliance review and result display |
| `Similarity threshold` | `0.85–0.95` | Strictly matches core fields, avoiding non-associated entries with low similarity from being incorrectly included in traceability scope |
| `Citation source display format` | `Data Source: {source}, Last Updated: {update_time}, Matching Field: {matched_field}` | Clearly marks the authority, timeliness and matching details of traceability, meeting compliance requirements for financial traceability |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After calling the dialogue interface, the `cite` field in the returned result is empty. Cause: The traceability switch for the knowledge base is not enabled, or the `Citation source display format` parameter is not configured.
- Phenomenon: Unclosed citation marker garbled text appears in dialogue output. Cause: The `Citation source display format` configuration does not properly close the format string, or the complete content of citation markers is truncated during segmented matching.
- Phenomenon: When retrieving questions outside the knowledge base, citations from list data sources are still returned. Cause: The `Recall count` is not set to 0, or the "Only match target data sources" configuration is not enabled, leading to incorrect recall of irrelevant content.

## How to Verify Proper Configuration
- Navigate to the knowledge base configuration page, check if the `Recall Matching Field` has been set to the core identity and affiliation fields of list data.
- Initiate a test dialogue involving personnel or institutions on the list, confirm if the output includes complete citation information of data source, update time and matched fields.
- Call the dialogue interface, check if the `cite` field in the returned result contains non-empty matching information and source identification.
- Adjust the `Similarity threshold` to 0.9, input an approximately matching query, verify that only strictly matched list entries are returned.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
