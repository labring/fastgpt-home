---
title: Citations and Source Traceability for Student Discipline and Appeals: Find Supporting Evidence
slug: /en/industry/education-d001-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Evidence
meta_description: Student Appeals: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Find Supporting Evidence

## What this category's data looks like

In the student disciplinary actions and appeal handling category, materials include factual materials of disciplinary violations, disciplinary decision letters, and appeal letters. Factual materials of disciplinary violations record the time, place, persons involved, and quantity of items of the conduct, and are the starting point of the disciplinary action; disciplinary decision letters state the applicable provisions, type of disciplinary action, effective date, and signature of the issuer; appeal letters state the appeal request, reasons, submission date, and signature of the appellant. After the three types of materials enter the knowledge base retrieval node, each serves as a citable source fragment for tracing back to the original text during basis queries. In terms of update cadence, disciplinary decision letters are archived synchronously each time a disciplinary action is made, appeal letters are supplemented at the appeal acceptance and reply nodes, and factual materials of disciplinary violations are finalized when the investigation concludes. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record should remain consistent across the three materials, and the current version shall prevail.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. Basis entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work, for replying to parents or writing into a plan.

| Object | Check | Verification action |
| --- | --- | --- |
| Factual materials of disciplinary violations | Fields include the time, place, persons involved, quantity of items, and investigator signature; the date is consistent with the conduct date stated in the disciplinary decision letter; the quantity is consistent with the quantity determined in the disciplinary decision letter | Compare name, quantity, date, and signature item by item, and confirm that the original text paragraph can be traced back to |
| Disciplinary decision letter | Fields include the applicable provisions, type of disciplinary action, effective date, and issuer signature; the version is currently valid; the cited provisions correspond to the factual materials of disciplinary violations | Open the citation marker and check the provisions and effective date against the source document |
| Appeal letter | Fields include the appeal request, reasons, submission date, and appellant signature; the submission date is after the effective date of the disciplinary decision letter; missing signature or receipt is deemed incomplete | Check the signature and receipt, and confirm the date chain between the appeal letter and the disciplinary decision letter |
| Cited content output | The number of returned entries matches the hit materials, and being empty is also normal; the number of array entries is recorded separately, and the tokens of the cited text are controlled by `quoteMaxToken` | Run a test with a question that has no matching materials, and see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the factual materials of disciplinary violations and the disciplinary decision letter. Cause: The two materials were entered separately and were not checked against the same field definitions, so the cited fragments cannot corroborate each other.
- Phenomenon: The disciplinary decision letter has been updated, but the appeal letter still cites the old provisions. Cause: Versions were not synchronized, the current version and historical versions are stored together, and retrieval hits the old fragment.
- Phenomenon: The appeal letter lacks a signature or receipt, and the date chain is broken. Cause: The signature and receipt fields were not validated when the materials were archived, so the submission date cannot connect with the effective date.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array entries and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check in `quoteList` that the source identifier corresponds to the original text fragment.

- In the node, check the selected knowledge base collections and their vector models, and confirm that knowledge bases using the same vector model are selected.
- Open the search parameter panel and check the values item by item, confirming that they are consistent with the settings in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
