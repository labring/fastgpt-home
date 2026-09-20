---
title: Citation Sources and Traceability for Identity and Timeliness Insurance Claim Initial Review
slug: /en/industry/finance-d003-c141-f009
page_type: Industry scenario page
article_section: Insurance Claim First-Level Review
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Identity and
meta_description: Data for identity and timeliness insurance claim initial review comes from three main sources: official identity verification APIs, OCR results of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Identity and Timeliness Insurance Claim Initial Review

## What this category of data looks like
Data for identity and timeliness insurance claim initial review comes from three main sources: official identity verification APIs, OCR results of offline submitted identity materials, and node timestamp data from claim workflows.
Data updates align with claim process progress. A new timeliness record is generated when a node is completed. Identity verification data updates in real time after submission.
Document structure splits into structured fields and associated metadata. Identity fields include name, ID number, and verification status. Timeliness fields include report time, application time, and review time limit.
All field units follow ISO 8601 time format and standard string formats, with no custom units added.

## What constraints do these characteristics impose on citation sources and traceability?
The structured nature of identity and timeliness data requires traceability to accurately match fields and source channels. Do not confuse OCR-recognized ID text with compliant status from official verification.
The timestamp attribute of timeliness data requires traceability to bind to specific workflow nodes. Ensure referenced time data matches the correct claim stage.
Since this category of data involves compliance audits, traceability must clearly distinguish online and offline collection channels. Limit the scope of referenced fields to prevent leakage of sensitive identity information.
The real-time update nature of data requires traceability to link to data generation time. Avoid using expired timeliness or identity data.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `enableCitation` | `true` | Identity and timeliness data requires clear traceability to meet traceability requirements for initial review compliance |
| `topK` | `Top 8 entries` | The data volume of this category is relatively concentrated. Recalling too many entries increases the burden of invalid matching, while recalling too few may miss key timeliness nodes |
| `similarityThreshold` | `0.72–0.85` | Identity fields require high matching accuracy to avoid misjudgments. Timeliness timestamps must match within a reasonable time difference |
| `rerankTopN` | `Top 3 entries` | Focus on documents associated with core identity and timeliness data, avoiding interference from irrelevant content in initial review judgments |
| `citationFields` | `["real_name", "certificate_no", "report_time", "apply_time"]` | Only allow referencing core fields of this category to prevent leakage of unrelated sensitive information |
| `apiTimeout` | `120 seconds` | Identity verification APIs typically have response delays. Reserve sufficient time to complete data traceability and recall |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The citation list only returns document titles, and does not display core identity or timeliness fields. Cause: The `citationFields` parameter is not configured. The default setting only returns document metadata, and does not extract specified business fields.
- Phenomenon: Knowledge base variables passed when calling the workflow do not take effect. Search results do not match identity and timeliness data. Cause: The knowledge base parameter of the knowledge base search node is not bound to the workflow input variable, resulting in the call using the default knowledge base.
- Phenomenon: The citation list returned by the chat interface is disordered, with low matching degree with the response content. Cause: The `rerankTopN` parameter is not enabled, or the `similarityThreshold` value is too low, resulting in irrelevant documents being recalled and mixed into the citation list.

## How to confirm the configuration is correct
- Send a test request, check the `citations` field in the returned results, confirm that the preset fields such as `real_name` and `report_time` are included.
- Pass a custom knowledge base variable in the workflow debugging interface, run the workflow, and confirm that the knowledge base search node calls the specified identity and timeliness knowledge base.
- Adjust the `similarityThreshold` to below 0.7, check the matching degree of the recalled results, and confirm that the threshold configuration takes effect.
- Call the chat interface, check that the number of citation lists in the response matches the `topK` parameter setting.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
