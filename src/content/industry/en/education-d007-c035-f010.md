---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Review
meta_description: Employee Skills: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Trace Exceptions and Review Results

## What this category's data looks like

This category's data looks like this. Category materials for enterprise independent skilled-talent evaluation include three types: evaluation filing forms, evaluation specifications, and candidate rosters. The evaluation filing form records the evaluation entity, occupational direction, and filing date, and is the starting point for the legality of the evaluation activity; the evaluation specification states the assessment method, scoring criteria, and version number for each skill level, and determines the uniformity of the evaluation scale; the candidate roster carries names, identity information, declared levels, and batches, and is the connection point between people and evaluation records. The three types of materials play different roles in exception tracing and manual review: the filing form provides the authorization basis, the specification provides the judgment scale, and the roster provides the scope of objects. Materials are updated with batch declarations, specification revisions, and personnel additions or removals, and the same record may show inconsistencies in names, quantities, or dates across different materials, unsynchronized specification versions, or missing signatures and receipts. When entering the knowledge base retrieval node, the three types of materials are cited as original text fragments, and each citation carries a source identifier for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

Configuration and implementation checks. This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text fragment and a source identifier, and its length can be 0. Even if no content is retrieved, the output chain still runs through. The "exception list and review conclusion" is completed afterward by subsequent AI nodes, code nodes, or humans; the citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation filing form | The evaluation entity, occupational direction, filing date, and signature receipt in the filing form must be aligned item by item with the evaluation specification and roster | Open the citation corner mark to point back to the original paragraph of the filing form, check the occupational direction and filing date, confirm whether the signature or receipt is complete, and record the source identifier in `quoteList` |
| Evaluation specification | The level names, assessment methods, scoring criteria, and version number in the specification must be consistent with the corresponding fields in the filing form and roster | Check the specification version number and effective date against the cited fragment, verify whether the names and quantities of the same level match across the two materials, and confirm cases where the version is not synchronized |
| Candidate roster | The names, declared levels, batches, and dates in the roster must be consistent with the scope of objects recorded in the filing form and specification | Use one exception record to trace back to the original text of the roster, check the names, levels, batches, and dates, confirm entries missing signatures or receipts, and record the number of citations and the respective values of the `quoteMaxToken` budget |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and the output chain continues to run through | Run a trial query with no matching materials and see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and do not judge the empty array as a retrieval failure |

## Three common errors

- Phenomenon: the declared level or batch date of the same candidate does not match between the roster and the filing form. Cause: the two materials are filled in by different links, have different update rhythms, and no field-level comparison was performed.
- Phenomenon: the evaluation specification has been revised, but the filing form still cites the old version number, resulting in two sets of standards for assessment methods and scoring criteria. Cause: the version was not synchronized, and the revision receipt was not archived into the same batch of materials.
- Phenomenon: when an exception record is traced to the source material, the filing form is found to lack a signature or the roster is found to lack a receipt, so the review conclusion cannot be written. Cause: signatures and receipts were not stored in the knowledge base together with the materials, and the cited fragments only cover the main text.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, check whether the citation array and corner marks can point back to the original text, confirm that each citation can point back to the original paragraph, and record the number of citations and the respective values of the `quoteMaxToken` budget; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: create an exception record, see whether it can be traced to the source material, compare the fields, dates, and signatures of the evaluation filing form, evaluation specification, and candidate roster, and form an exception list and review conclusion.

- In the node, check the selected knowledge base collections and their vector models, confirm that the selected knowledge bases use the same vector model, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation corner marks, check against the source documents whether each citation can point back to the original paragraph, and inspect the source identifiers and number of citations in `quoteList` and `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
