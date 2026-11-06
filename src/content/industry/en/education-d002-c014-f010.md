---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Checks
meta_description: Pastoral Education: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences

## What this category's data looks like

In the school moral education and homeroom teacher work scenario, thematic class meeting plans, student comprehensive quality records, and home visit records are the three core types of materials. A thematic class meeting plan usually contains activity objectives, procedure, time, host, and signature fields; a student comprehensive quality record contains fields such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, along with semester dates; a home visit record contains the student visited, home visit time, location, key communication points, parent signature, and receipt. Materials are mostly submitted separately by grade groups, homeroom teachers, and the moral education office, with an update cadence that rolls weekly or per semester, and the names, quantities, and dates of the same object in different materials often differ because versions are not synchronized. After entering the knowledge base retrieval node, the three types of materials serve as retrieved objects, each providing original text snippets and source identifiers for subsequent field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is completed afterward by a subsequent AI node, code node, or manual work; this node is only responsible for handing over the matched material snippets together with their sources.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Whether the name, quantity, date, and signature of the same class meeting theme are consistent across two plans | Check the original text snippets and source identifiers in the citation array, compare them against the plan signature fields and receipts, and record inconsistent fields |
| Student comprehensive quality record | Whether fields such as ideological and moral character, academic level, and physical and mental health, as well as semester dates, match for the same student across two records | Open the citation corner mark to trace back to the original paragraph, compare field by field, and mark locations where versions are not synchronized or dates do not match |
| Home visit record | Whether the home visit time, location, key communication points, parent signature, and receipt for the same visited student are complete and consistent | Check the cited snippets and source documents, inspect records missing signatures or receipts, and write them into the discrepancy list for review |
| Cited content output | The number of returned items matches the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the name, quantity, and date of the same class meeting theme do not match across two plans. Cause: the two materials were submitted under different versions and were not updated in sync, so different snippets were matched during retrieval.
- Symptom: a semester date in a student comprehensive quality record conflicts with the time in a home visit record. Cause: entries were written back in different batches, versions were not synchronized, and the cited snippet traces back to an old draft.
- Symptom: a home visit record is missing a parent signature or receipt, yet the cited snippet can still be matched. Cause: signatures and receipts were not completed when the materials were archived, and retrieval matches only by text without validating completeness.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence and check whether the citation array and corner marks can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs through, and separately record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use a real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and check whether the cited snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` correspond.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
