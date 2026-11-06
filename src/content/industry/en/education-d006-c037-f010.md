---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Progress
meta_description: Training Subsidies: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification of vocational training subsidy applications come from three types: training class filing records, attendance records, and completion assessment forms. Class filing records provide the institution name, class number, start and end dates, and the filing receipt; attendance records provide the trainee name, attendance date, and personal signature; completion assessment forms provide the assessment score, completion date, and assessor signature. After these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, used for subsequent field comparison, ledger writing, and report generation. The update rhythm is usually aggregated weekly; class filing records are entered before the class starts, attendance records are generated daily, and completion assessment forms are added after the assessment ends. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record may be written differently in different materials, and citation traceability back to the original passage is needed to determine whether the discrepancy comes from the materials themselves or from versions not being synchronized.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The progress table and statistical scope description must be handled subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | Whether the institution name, class number, start and end dates, and filing receipt signature correspond item by item with the attendance records and completion assessment forms | In the node, check the selected collections and their vector models; open the search parameter panel and check item by item; use `quoteList` to view hit materials, and use `responseData` (non-streaming module results returned with detailed output enabled) to record the number of array items |
| Attendance records | Whether the trainee name, attendance date, and personal signature are consistent with the class number and start and end dates of the class filing records, and whether entries missing signatures or receipts are marked separately | In the conversation, open the citation superscript and compare against the source documents; check whether the cited fragment can point back to the original passage; run a test question with no matching materials to confirm the array is empty while the chain continues |
| Completion assessment forms | Whether the assessment score, completion date, and assessor signature match the trainee list in the attendance records and the class number in the class filing records | Compare name, quantity, and date item by item; record the number of citations separately, and check the tokens of the cited text separately against the `quoteMaxToken` budget; do not compare the two as equal |
| Cited content output | The number of returned items is consistent with the hit materials; empty is also normal | Run a test question with no matching materials and see that the output is empty while the chain continues; then ask a question with original-text support and check whether the citation array and superscript can point back to the original text |

## Three common errors

- Phenomenon: The same trainee's name is written differently in the attendance records and the completion assessment form, and the totals do not match. Cause: The two materials were entered separately without name normalization, and the inconsistency in the original text was only discovered during citation traceability.
- Phenomenon: The class number in the class filing records does not match the class number date in the attendance records. Cause: The filing version was updated but not synchronized to the attendance records, and the two materials cite different versions.
- Phenomenon: The completion assessment form lacks the assessor signature, and the attendance records lack the personal signature, but the progress table still counts by number of records. Cause: Aggregation was done before signatures or receipts were fully collected, and the statistical scope did not list exceptions separately.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials and confirm the array is empty while the chain runs through.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly written, and whether the record count and statistical count match.

- In the node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- In the conversation, open the citation superscript, compare against the source documents, use `quoteList` to view hit materials, and use `responseData` to record the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
