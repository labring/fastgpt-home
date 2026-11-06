---
title: Citations and Source Traceability for Research Ethics Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Operations
meta_description: Research Ethics: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Coordinate Operations and Application Handover

## What this category's data looks like

The materials on a research ethics review page are mainly ethics review applications, informed consent form templates, and risk assessment forms. The three often enter the knowledge base retrieval node in the same batch, and are used to answer verification questions such as fields, dates, and signatures. The ethics review application carries fields such as project name, review category, acceptance date, and signature column; the informed consent form template carries fields such as version number, signature page, and receipt requirements; the risk assessment form carries fields such as risk level, assessment date, signature, and review record. The material update cadence follows review batches and template revisions, and the names, quantities, and dates of the same record in different materials must be able to cross-reference each other. After the materials enter this feature, each serves as a citation source candidate, and after being hit by retrieval, is returned as an original text snippet plus a source identifier, for subsequent use in comparing fields, writing ledgers, or generating reports.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, review category, acceptance date, and signature column can be traced item by item in the original text snippet | Open the citation marker and check against the source document whether the fields, dates, and signatures are consistent |
| Informed consent form template | Whether the version number, signature page, and receipt requirements can match the names and dates in the review application | Check the citation snippets against the original paragraphs item by item, and record entries missing signatures or receipts |
| Risk assessment form | Whether the risk level, assessment date, and review signature can corroborate each other with the same batch of materials | Check the citation source identifiers to confirm that the names, quantities, and dates of the same record are not misaligned |
| Citation content output | The number of returned entries is consistent with the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see that the array is empty while the chain still runs through, and check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The names and dates of the same record do not match between the review application and the informed consent form template. Cause: The two materials were updated in different batches, and the citation snippets each trace back to the original text but no cross-check was performed.
- Symptom: The version of the risk assessment form was not synchronized, and the citation snippet still points to the old signature page. Cause: After the template was revised, it was not re-ingested, retrieval hit the old paragraph, and the source identifier was not updated with the version.
- Symptom: The answer has content but the citation array is empty, or the citation snippets do not match the original text. Cause: This round did not hit materials or the hit entries are misaligned; this cannot be directly attributed to length truncation. First check the hit entries, then look at truncation.

## How to verify the setup

Acceptance for this feature: ask a field question that has an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs through, and record `quoteMaxToken` as the citation content budget, with the number of array entries recorded separately.

Business test: check item by item once according to the handover sheet, see which item is missing from the record, and after confirming that the version, connection, and task record are consistent, hand over to operations or the next shift.

- In the node, check whether the selected knowledge base collections and their vector models use the same vector model, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, check against the source documents whether each citation can trace back to the original paragraph, and run a test with a question that has no matching materials to confirm that the empty-array chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
