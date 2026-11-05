---
title: Citations and Source Traceability for Student Discipline and Appeals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Checks
meta_description: Student Appeals: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Compare Documents and Locate Differences

## What this category's data looks like

In student disciplinary and appeal handling scenarios, the materials that enter the verification stage usually include three types: disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials record the course of conduct, names and quantities of involved items, date of occurrence, and the signature of the investigator; disciplinary decision documents state the type of disciplinary action, the clauses relied upon, the effective date, and the approval signature; appeal statements contain the appeal request, reasons, submission date, and the signature of the appellant. The three types of materials come from different sources and are updated at different paces: fact materials are supplemented as the investigation progresses, decision documents are finalized after approval, and appeal statements enter the process after being submitted by the student. When entering the knowledge base retrieval node, the three types of materials are each associated as independent documents, and the retrieval output is only responsible for returning original text fragments and source identifiers, not for determining whether fields are consistent. Field verification must be performed by subsequent nodes or manually by comparing names, quantities, dates, signatures, and receipts to form a discrepancy list.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. Even if no content is found, the output chain will still run through. The discrepancy list must then be handled by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Check whether names, quantities, dates, and investigator signature are consistent with the ledger | Open the citation marker to trace back to the original paragraph and compare field by field; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |
| Disciplinary decision documents | Check whether the type of disciplinary action, clauses relied upon, effective date, and approval signature correspond to the fact materials | Check whether the selected knowledge base uses the same vector model; check whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty and trace back to the original text |
| Appeal statements | Check whether the appeal request, reasons, submission date, appellant signature, and receipt are complete | Open the search parameter panel and check the values item by item; in `detail`, check whether the cited fragments match the original text |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the fact materials and the decision document. Cause: The two materials were entered separately, no field-level comparison was performed, and the discrepancy was not exposed before review.
- Phenomenon: The appeal statement version was not synchronized, and the cited version is still the old draft. Cause: After the materials were updated, the knowledge base was not re-associated, and the retrieval hit historical fragments.
- Phenomenon: The disciplinary decision document lacks an approval signature or the appeal statement lacks a receipt. Cause: Signatures and receipts were not archived together with the materials, and only the main text was checked during verification.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business testing: use a real record to find fields inconsistent with the ledger, and submit them to the reviewer for confirmation and write-back.

- In the node, check the selected collections and their vector models, and confirm that knowledge bases using the same vector model are associated.
- Open the citation markers against the source documents, check item by item whether the cited fragments correspond to the original text, and separately record the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
