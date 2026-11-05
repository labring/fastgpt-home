---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Operations
meta_description: Campus Safety: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

School safety hazard inspections and campus incident reporting involve three types of materials: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are updated weekly or monthly, containing inspection items, locations, dates, and inspector signatures; hazard rectification ledgers roll forward by rectification cycle, containing hazard names, quantities, rectification deadlines, responsible person signatures, and receipts; emergency incident reports are updated immediately when an incident occurs, containing incident names, involved quantities, occurrence dates, reporters, and receiving receipts. When these three types of materials enter the knowledge base retrieval node, each is retrieved as a citation source: safety inspection checklists provide the original inspection records, hazard rectification ledgers provide rectification closed-loop evidence, and emergency incident reports provide the basis for incident reporting. Field characteristics center on four categories: names, quantities, dates, and signatures. Common discrepancies arise from inconsistent naming conventions, quantity calibers, or date nodes for the same record across two materials, unsynchronized versions, or missing signatures and receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text fragment and a source identifier, and the length can be 0. "Handover-ready deployment status and operation records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether inspection items, locations, dates, and inspector signatures match the corresponding records in the hazard rectification ledger | Open the citation superscript in the conversation, check names, quantities, dates, and signatures against the source documents, and record the number of array entries |
| Hazard rectification ledger | Whether hazard names, quantities, rectification deadlines, responsible person signatures, and receipts match the corresponding records in the emergency incident report | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Emergency incident report | Whether incident names, involved quantities, occurrence dates, reporters, and receiving receipts match the corresponding records in the safety inspection checklist | Open the search parameter panel and check item by item, confirm that `quoteMaxToken` is the citation content budget, and record the number of array entries separately |
| Associated knowledge base | Whether the selected knowledge bases use the same vector model | Check the selected collections and their vector models in the node, and view `quoteList` to confirm that citations point back to paragraphs |

## Three common errors

- Symptom: The name and quantity of the same hazard do not match across two materials. Cause: The caliber was not unified during entry, retrieval hits paragraphs from different sources, and the citation fragments each point to a different place.
- Symptom: Versions are not synchronized, and an old checklist and a new ledger are cited at the same time. Cause: Historical versions are retained in the knowledge base, retrieval is not filtered by date, and expired materials are mixed into the citation array.
- Symptom: Signatures or receipts are missing, and citation fragments only reach the body text but not the approval page. Cause: Uploaded materials are incomplete, and the correspondence between citations and the original text breaks at the approval fields.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business testing: check item by item once according to the handover form, see which record is missing, and focus on checking the names, quantities, dates, and signatures of the safety inspection checklist, hazard rectification ledger, and emergency incident report.

- Open the citation superscript in the conversation, check against the source documents whether each citation can point back to the original paragraph, and record the number of array entries separately
- Open the search parameter panel and check item by item, confirm that `quoteMaxToken` is the citation content budget, and do not compare the number of entries with the budget as if they were equal

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
