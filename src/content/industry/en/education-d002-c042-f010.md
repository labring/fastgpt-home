---
title: Citations and Source Traceability for Corporate Sales and Product Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Checks
meta_description: Sales Training: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: product manuals, sales communication statements, and channel training schedules. Product manuals carry functional parameters and version numbers, sales communication statements carry commitment boundaries, and channel training schedules carry sessions, instructors, and sign-in records. The three types of materials are updated on a fixed cadence: manuals iterate with product versions, communication statements refresh with compliance reviews, and schedules are planned quarterly. Field characteristics are concentrated in four items: name, quantity, date, and signature; the same record must be aligned item by item across the three materials. When the materials enter the knowledge base retrieval node, each participates in vector search as a citable source; manual paragraphs, statement entries, and schedule rows each become independent citation snippets, to be used for subsequent comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | The function name, quantity, version date, and approval signature are consistent within the manual | Open the citation marker to trace back to the manual paragraph, transcribe each field, and compare it against the ledger |
| Sales communication statements | The same product name, quantity, effective date, and statement entries are consistent | Check the citation snippet against the original statement text, and record entries whose name or date does not match |
| Channel training schedule | The schedule sessions, instructors, and sign-in receipts are consistent with the manual version date | Compare schedule rows against sign-in receipts, and flag records missing a signature or missing a receipt |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal | Check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled), record the count separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the name and quantity of the same record do not match between the product manual and the sales communication statements. Cause: the two materials are updated separately, and no field-level check was performed.
- Symptom: the manual version cited by the channel training schedule is inconsistent with the current version. Cause: the version was not synchronized, and the schedule still points to old-version entries.
- Symptom: the citation snippet does not match the original text, and there is no citation marker in the answer. Cause: first check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: use one real record to find fields that are inconsistent with the ledger

- In the node, check whether the selected knowledge base collections and their vector models are the same
- Open the search parameter panel, check the values item by item, and view `quoteList` to confirm the materials hit

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
