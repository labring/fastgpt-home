---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Review
meta_description: Pastoral Education: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results

## What this category's data looks like

In the context of school moral education and homeroom teacher work, three types of materials often need to be handled: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans contain activity objectives, procedures, dates, and a homeroom teacher signature field; student comprehensive quality records contain dimension fields such as ideological and moral character, academic level, and social practice, along with semester dates; home visit records contain the student visited, home visit time, key communication points, and parent receipt signature. Materials are mostly updated by semester or by month, and the same event may appear simultaneously in a class meeting plan and a comprehensive quality record, while home visit records run in parallel with the homeroom teacher work ledger. When entering the anomaly tracing and manual review function, the three types of materials are retrieved as knowledge base sources, and the cited content is returned as an array, providing the original text basis for subsequent comparison of fields, dates, and signatures.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text snippet and a source identifier, and its length may be 0. The anomaly list and review conclusions must be handled subsequently by AI nodes, code nodes, or humans. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the activity name, implementation date, number of participants, and signature field in the plan are consistent with the corresponding items in the comprehensive quality record and home visit record | Open the citation marker to point back to the original paragraph, verify the name, quantity, date, and signature item by item, and record any inconsistencies |
| Student comprehensive quality record | Whether the dimension fields such as ideological and moral character, academic level, and social practice, along with the dates, are synchronized with the class meeting plan and home visit record | Check the field values and dates against the source document, confirm whether the versions are synchronized, and check whether signatures or receipts are missing |
| Home visit record | Whether the home visit time, student visited, key communication points, and parent receipt signature match the homeroom teacher work ledger and the comprehensive quality record | Use the cited sources to point back to the original text item by item, check whether the receipts are complete, and mark items with missing signatures or unsynchronized versions |
| Citation content output | The number of returned items is consistent with the materials hit; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a trial with a question that has no matching materials, and see whether the array is empty while the chain continues; then check the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the class meeting plan and the comprehensive quality record. Cause: The two materials were entered separately without cross-checking, and the versions were not synchronized.
- Symptom: The home visit record has key communication points but lacks the parent receipt signature. Cause: The receipt was not collected or not scanned into the repository, so the original text cannot be pointed back to during review.
- Symptom: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: The corresponding material was not hit in this round, or the hit material is inconsistent with what the question points to; the hit must be checked first, then the trimming.

## How to verify the setup

Acceptance of this function: ask a question with an original text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: create an anomaly record and see whether the source material can be traced.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and record the array length and the `quoteMaxToken` budget for separate verification.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
