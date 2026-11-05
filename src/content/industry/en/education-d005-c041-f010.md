---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Versions
meta_description: Compliance Training: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Maintain Document Versions and Changes

## What this category's data looks like

The daily materials for corporate compliance and safety training are concentrated in three categories: compliance training courseware, safety operating procedures, and exam records. Courseware carries institutional clauses and cases, operating procedures carry work steps and prohibitions, and exam records carry personnel, dates, and signature receipts. When these materials enter the knowledge base retrieval node, each plays a different role: courseware and procedures are citation sources, while exam records are the underlying draft for field comparison. The category verification dimensions fall on fields, dates, and signatures: the names, quantities, and dates of the same record in two materials must match, versions must be synchronized, and signatures or receipts must not be missing. The update rhythm is triggered by institutional revisions, procedure version changes, and exam batches. Every change must leave a traceable version trail to avoid mixing old versions with current versions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | Fields, dates, and signatures must be consistent with the exam records, and the version number must correspond to the current version | Open the citation marker to trace back to the original paragraph, and verify the courseware name, clause number, effective date, and signature field |
| Safety operating procedures | Names, quantities, and dates match in the two materials, and the old version is traceable | Compare the source document to verify the operating procedure version number and cited fragment, and confirm that old-version clauses have not been mixed in |
| Exam records | Personnel, dates, signatures, or receipts are complete and synchronized with the courseware batch | Compare the exam record fields item by item with the courseware batch, and check whether signatures or receipts are missing |
| Knowledge base retrieval node | The number of items in the cited content array matches the hit materials, and being empty is also normal | Run a test with a question that has no matching materials, see whether the array is empty while the chain continues; verify whether `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` trace back to the original text |

## Three common errors

- Symptom: The names, quantities, and dates of the same record in two materials do not match. Cause: Courseware and exam records are maintained separately, and fields have not been cross-compared.
- Symptom: Versions are not synchronized, and old-version clauses are still cited. Cause: After the procedure version was changed, the knowledge base was not updated, and the cited fragment still points to the old version.
- Symptom: Signatures or receipts are missing, and the ledger cannot be closed. Cause: The exam records only retain the roster and do not backfill the signature field or receipt number.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and verify whether the cited content array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; the number of citations is recorded separately according to the array length, and `quoteMaxToken` only verifies the tokens of the cited text. The two are not compared for equality.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that knowledge bases using the same vector model are selected.
- Open the search parameter panel and verify the values item by item, then run a test with a question that has no matching materials to confirm that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
