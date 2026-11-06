---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Evidence
meta_description: Campus Safety: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Find Supporting Evidence

## What this category's data looks like

Materials for school safety hazard inspection and campus incident reporting usually include three types: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists record inspection time, inspector, hazard description, and signature item by item by area or project; hazard rectification ledgers record discovery date, rectification responsible person, rectification deadline, review result, and signature by hazard number; emergency incident reports record occurrence time, location, involved personnel, handling process, reporting receipt, and signature by incident. When these three types of materials enter the knowledge base retrieval node, each plays a different role: safety inspection checklists provide the original inspection facts, hazard rectification ledgers provide evidence of process closure, and emergency incident reports provide the incident handling and reporting chain. Materials are continuously updated with semesters, monthly inspections, special inspections, and incident milestones, and the current effective text prevails for versions. Field characteristics are concentrated in four categories: dates, quantities, names, and signatures. The same record may have mismatched names, quantities, or dates across two materials, and versions may be out of sync or signatures and receipts may be missing.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier; the length may be 0, and the basis entries that can be traced back to the original text must be handled next by subsequent AI nodes, code nodes, or humans. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Inspection date, inspector signature, hazard description, and quantity match the original text; the version is currently effective | Open the citation marker to trace back to the original paragraph, and verify the three fields of date, quantity, and signature |
| Hazard rectification ledger | Hazard number, discovery date, rectification deadline, review result, and signature can be traced back to the original text; the version is currently effective | Use the same hazard number to compare names, quantities, and dates across materials, and record the number of citation array items and the `quoteList` source identifier |
| Emergency incident report | Occurrence time, location, involved personnel, handling process, reporting receipt, and signature can be traced back to the original text; the version is currently effective | Verify whether the receipt and signature are complete, and compare the cited fragment with the original text sentence by sentence |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues |

## Three common errors

- Phenomenon: the name, quantity, or date of the same hazard does not match across two materials. Cause: the materials are entered separately, no cross-material field comparison is performed, and the cited fragment covers only a single material.
- Phenomenon: the cited fragment does not match the original text. Cause: the materials and hit positions matched in this round are not verified first, and the issue is directly attributed to length truncation, ignoring the hit range.
- Phenomenon: the answer has content but the citation array is empty. Cause: an empty array is treated as retrieval failure, without distinguishing that an empty array is a normal output and the chain still runs through.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and verify whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and verify and record the number of citations and the `quoteMaxToken` budget separately.

- Open the search parameter panel and verify the values item by item, confirming that the associated knowledge base uses the same vector model.
- Open the citation markers in the conversation, and verify `quoteList` and the original paragraph against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
