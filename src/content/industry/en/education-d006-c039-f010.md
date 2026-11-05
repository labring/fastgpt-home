---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Progress
meta_description: Exam Administration: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Track Progress and Check Statistics

## What this category's data looks like

This category's data falls into three types: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual provides process nodes and statistical criteria; the examination room record sheet carries the progress and personnel signatures for each session; the violation fact record carries violation entries, dates, and receipts. When these three materials enter the knowledge base retrieval node, each assumes its own source role: the manual is used to verify criteria and exception notes, the record sheet is used to verify sessions and quantities, and the violation record is used to verify names, dates, and signatures. The update cadence advances by exam session: the manual version is issued before the exam, record sheets are filled in session by session during the exam, and violation facts are summarized and countersigned after the exam. Field characteristics center on four items: name, quantity, date, and signature. If the same record has inconsistent names or quantities across two materials, it is necessary to return to the original text passage to confirm whether the versions are synchronized.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier, and its length can be 0. The progress table and statistical criteria notes must be handled subsequently by an AI node, code node, or manually. The cited content is output as an array, and its length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Fields include process nodes and statistical criteria; dates and version numbers must correspond to the exam session | In the node, verify the selected collections and their vector models, and confirm that the manual version is consistent with the exam session |
| Examination room record sheet | Fields include session name, quantity, date, and signature; missing signature or receipt is regarded as incomplete | Open the search parameter panel and verify item by item, comparing the name, quantity, and date of the record sheet with the manual |
| Violation fact record | Fields include violation entry name, date, and receipt; the same record as in the record sheet must match | In the conversation, open the citation marker, compare against the source document, and verify the original text fragment in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the examination room record sheet and the violation fact record. Cause: The two materials were filled in separately, without returning to the original text passage to compare field by field.
- Symptom: The exam administration manual version is not synchronized, and the old criteria are still cited. Cause: Multiple versions exist simultaneously in the knowledge base, and the selected collections and vector models were not verified.
- Symptom: The record sheet lacks a signature or receipt, but the statistical total is still adopted. Cause: The progress table did not list signature and receipt as completeness conditions, and exceptions were not written into the criteria notes.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, verify whether the citation array and citation markers can point back to the original text, and check the source identifier corresponding to each citation in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the total, check whether the criteria and exceptions are clearly written, record the number of citations separately by array length, and use `quoteMaxToken` only as a content budget.

- In the node, verify the selected collections and their vector models, and confirm that the three materials—exam administration manual, examination room record sheet, and violation fact record—all come from the knowledge base of the same vector model.
- Open the search parameter panel and verify item by item, using the four items name, quantity, date, and signature as comparison fields, and write them into the headers of the progress table and statistical criteria notes.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
