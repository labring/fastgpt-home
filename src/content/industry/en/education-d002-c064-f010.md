---
title: Citations and Source Traceability for University Laboratory Safety Classification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Checks
meta_description: Lab Safety Categories: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like
Safety grading and classification of university laboratories involves three types of core materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table records, by room or laboratory unit, the name, category level, hazard source type and quantity, date, and signature field; the hazard source list itemizes the hazard source name, quantity, storage location, and responsible person, and often exists in the form of a table or ledger; the safety responsibility statement records the responsibility level, signature, and receipt date. The materials are mostly filled in by the laboratory head, summarized by the department, and reviewed by the school's competent department, with an update cadence synchronized each academic year or when hazard sources change. After entering this function, all three types of materials are retrieved as knowledge base documents, each providing original text fragments for subsequent comparison: the grading and classification table provides level and quantity fields, the hazard source list provides hazard source details, and the safety responsibility statement provides signature and receipt information. The names, quantities, and dates of the three must be consistent, versions must be synchronized, and a missing signature or receipt constitutes a discrepancy.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, quantity, and date of the same laboratory unit in the grading and classification table are consistent with the hazard source list and the safety responsibility statement, and whether the signature field is complete | Retrieve the original text fragments from the citation array, compare the name, quantity, date, and signature field by field, and record inconsistent items; check the source identifier in `quoteList` to trace back to the original text |
| Hazard source list | Whether the hazard source name, quantity, and date match those in the grading and classification table and the safety responsibility statement, and whether the versions are synchronized | Use one real record to locate the hazard source entry in the citation array, check the quantity and date, and check whether the version number or revision date is consistent; record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Safety responsibility statement | Whether the responsibility level, signature, and receipt date are complete, and whether the name, quantity, and date are consistent with the grading and classification table and the hazard source list | Search the cited fragments for the signature and receipt fields, check the date and responsible person, and confirm that no signature or receipt is missing; when the citation limit is involved, check the `quoteMaxToken` budget, and record the array item count separately |
| Knowledge base retrieval node | The cited content is output as an array, the length may be 0, and the output chain still runs even if no content is found | Run a trial with a question that has no matching materials, confirm that the array is empty while the chain continues; open the citation marker to compare against the source document |

## Three common errors

- Symptom: The name or quantity of the same laboratory does not match between the grading and classification table and the hazard source list. Cause: The two materials were filled in by different people at different times, no field-level cross-check was performed, and the versions were not synchronized.
- Symptom: The safety responsibility statement is missing a signature or receipt date, but the grading and classification table has already been marked as confirmed. Cause: Signatures and receipts were not included in the same verification process, and the material update cadence was inconsistent.
- Symptom: The answer has citation markers but the cited fragments do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this function: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text paragraph; then ask a question with no matching materials, confirm that the array is empty while the chain continues, and record the number of citations in `responseData`.

Business test: use one real record to find fields inconsistent with the ledger, such as quantity or date differences between the grading and classification table and the hazard source list, and submit them to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Use one real record to locate the original text fragment in the citation array, compare the name, quantity, date, and signature field by field, record the discrepancy items, and submit them to the reviewer for confirmation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
