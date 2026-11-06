---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Checks
meta_description: Continuing Education: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences

## What this category's data looks like

Common materials for material verification and discrepancy localization in continuing education credit hour recognition are course filing forms, study certificates, and credit hour recognition forms. The course filing form gives the course name, credit hour count, course start date, and filing signature, and is the recognition baseline; the study certificate is issued by the teaching institution and records the learner's name, course name, completed credit hours, completion date, and receipt, and is the factual proof of study; the credit hour recognition form is used to summarize the declared credit hours and retain the recognition signature. After these three types of materials enter knowledge base retrieval, each participates in comparison as a citation source. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The update rhythm rolls with batches, and the same record often shows abbreviated names, differing quantity calibers, date formats, and version differences, requiring field-by-field reference back to the original text for localization.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The discrepancy list is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, credit hour count, course start date, and filing signature are field-by-field consistent with the study certificate and credit hour recognition form | Open the citation superscript to refer back to the original paragraph in the filing form, record the name, quantity, date, and signature positions, and check the cited text under the `quoteMaxToken` budget |
| Study certificate | Whether the learner's name, course name, completed credit hours, completion date, and receipt are consistent with the same record in the filing form and recognition form | Check the cited snippets item by item against the source document, use `responseData` (non-streaming module results returned with detailed output enabled) to retrieve the citation array, and record the array length separately |
| Credit hour recognition form | Whether the summarized credit hour count, recognition date, and recognition signature match the filing form and study certificate | Open the citation superscript in the conversation, compare the name, quantity, and date of the recognition form with the other two materials item by item, and mark missing signature or receipt items |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and check the citation source identifiers in `quoteList` |

## Three common errors

- Symptom: the course name and credit hour count for the same record do not match between the course filing form and the study certificate. Cause: the versions of the two materials are not synchronized, or the abbreviated name and quantity caliber differ, requiring reference back to the original text for localization.
- Symptom: the study certificate lacks a signature or receipt, but the credit hour recognition form has already been summarized. Cause: the signature was not completed during material circulation, or the receipt was not updated with the batch, so the cited snippet cannot cover the signature field.
- Symptom: there is no citation superscript in the answer, or the cited snippet does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscript can refer back to the original text; then ask a question with no matching materials, confirm the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use a real record to find fields inconsistent with the ledger, mark name, quantity, date, or signature discrepancies, and hand them to the reviewer for confirmation and write-back.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and then check the cited snippets against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
