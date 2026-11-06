---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Progress
meta_description: Skills Competitions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Track Progress and Check Statistics

## What this category's data looks like

Vocational college skills competition organization involves three types of materials: competition regulations, registration forms, and training plans, which respectively serve as the rule basis, personnel confirmation, and process arrangement. Competition regulations include the event name, group, date, scoring method, and signature field; registration forms include the names of contestants and instructors, class, last four digits of the ID number, competition event, and receipt; training plans include week number, training content, guidance records, and signatures. Materials are updated before the competition, during the week, and after the competition, and versions often change with notices. After entering the knowledge base retrieval node, the three types of materials serve as traceable original-text sources, providing a traceability basis in fields, dates, and signatures for progress records and statistical verification, and subsequent comparisons are made accordingly to check whether names, quantities, and dates are consistent.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "progress table and statistical scope description" is completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the event name, group, date, scoring method, and signature field correspond to the registration form | Retrieve the original text of the regulations, check the fields and signatures, and record the source identifier |
| Registration form | Whether the contestant names, competition events, quantities, and receipts are consistent with the training plan | Retrieve the original text of the registration form, compare names, quantities, and receipts, and record the source identifier |
| Training plan | Whether the week numbers, training content, guidance records, and signatures are synchronized with the regulation dates | Retrieve the original text of the training plan, check the dates and signatures, and record the source identifier |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a trial with a question that has no matching materials, see whether the output is empty while the chain continues, and check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the same contestant's name or quantity does not match between the registration form and the training plan. Cause: the two materials are updated separately, and the original text was not checked by referring back to the same record.
- Symptom: after the competition regulation date is adjusted, the training plan week numbers are still arranged according to the old version. Cause: the versions were not synchronized, and the cited source did not mark the update time.
- Symptom: the registration form lacks a receipt or the training plan lacks a signature, but they are still included in the total during statistics. Cause: the scope was not written into the header, and exceptions were not listed separately.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, check whether the citation array and superscripts can refer back to the original text, and record the number of items in the array; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and when citation limits are involved, check the tokens of the cited text; `quoteMaxToken` is the citation content budget, and the number of items in the array is recorded separately.

Business test: use one week of records to verify the total, see whether the scope and exceptions are clearly written, and refer back item by item to the original text of the competition regulations, registration form, and training plan.

- In the node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- In the conversation, open the citation superscripts, compare them with the source documents, and confirm that each citation can refer back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
