---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Access
meta_description: Research Progress: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services

## What this category's data looks like

The annual progress and acceptance materials for research projects include annual progress reports, mid-term inspection materials, and acceptance reports. Fields involve project name, undertaking unit, number of indicators, start and end dates, stage results, fund execution, signatures, and receipts. Annual progress reports focus on stage indicators and dates, mid-term inspection materials focus on milestones and version numbers, and acceptance reports focus on final indicators and signature fields. When materials enter authorized access and external services, annual progress reports serve as the stage basis, mid-term inspection materials serve as the version comparison basis, and acceptance reports serve as the final basis; together, the three support externally available entry points and authorization scope. The update rhythm rolls forward by quarter and milestone. The name, quantity, and date of the same record often appear inconsistent across two materials, and version desynchronization and missing signatures or receipts also occur.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The externally available entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields must include project name, number of stage indicators, start and end dates, signatures, and receipts, and must be consistent with the name, quantity, and date in the mid-term inspection materials and acceptance report | Open the citation superscript to trace back to the original paragraph, and compare the fields and dates of the three materials item by item |
| Mid-term inspection materials | The version number and milestone dates must be synchronized with the annual progress report; missing signatures or receipts are regarded as inconsistent | Check the cited fragments and source documents in `responseData` (non-streaming module results returned with detailed output enabled) to confirm items whose versions are not synchronized |
| Acceptance report | The final number of indicators, acceptance date, and signature fields must match the annual progress report and mid-term inspection materials | Access once with a restricted identity, see whether the visible scope matches the setting, and record the number of array items |
| Knowledge base retrieval node | The associated knowledge base must use the same vector model; cited content is output as an array, and the length can be 0 | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, versions are not synchronized, and cross-checking is lacking.
- Phenomenon: The mid-term inspection materials have a version number but the annual progress report has no corresponding version, and signatures or receipts are missing. Cause: The material circulation step has no receipt, and the update rhythm is not aligned.
- Phenomenon: There is no citation superscript in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, record the number of array items separately, and view the source identifier in `quoteList`.

Business test: Access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
