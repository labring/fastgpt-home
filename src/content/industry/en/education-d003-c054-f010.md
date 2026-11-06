---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Intake
meta_description: Self-Study Exams: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

The intake materials for self-taught examination registration records and graduation review are centered on registration records, course qualification certificates, and graduation application forms. Registration records carry name, exam registration number, ID document number, major name, course name, and score records; dates include registration date, change date, and filing date; signature fields include the handling officer's seal and the reviewer's seal. Course qualification certificates carry course code, course name, qualification date, score, issuing unit, and seal, and serve as the basis for determining course credits and course count in the graduation application form. Graduation application forms carry application batch, major, intended graduation time, number of courses, total credits, photo, personal signature, and intake receipt. When these three types of materials enter the Q&A intake and missing-item follow-up function, registration records serve as the draft for identity and enrollment status, course qualification certificates serve as the evidence for courses and scores, and graduation application forms serve as the carrier for the summary of graduation conditions and the signed receipt; the fields, dates, and signatures of the three are cross-checked against one another, and any missing name, quantity, date, or seal in any one of them will form an item pending follow-up. Materials are updated according to the rhythm of batch intake, review, and filing; when old versions are not synchronized, the same record may appear as two materials that do not match.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The "intake records and completed follow-up items" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, exam registration number, ID document number, major name, course name, and score records are complete; whether registration date, change date, and filing date are readable; whether the handling officer's and reviewer's seals are in place | In the node, check the selected knowledge base collection and vector model, use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, open each citation marker one by one to trace back to the original paragraph in the registration records, and compare the three places: fields, dates, and signatures |
| Course qualification certificates | Whether course code, course name, qualification date, score, and issuing unit are consistent with the course record names, quantities, and dates in the registration records; whether seals and receipts are missing | Run a test with a question that only mentions the course name and does not provide the exam registration number, and see whether the citation array hits the original text of the qualification certificate; after a hit, compare the course name and date; if there is no hit, record it as an empty array and continue the chain |
| Graduation application forms | Whether application batch, major, intended graduation time, number of courses, total credits, personal signature, and intake receipt match the registration records and course qualification certificates; whether versions are synchronized | Open the search parameter panel and check the values item by item, paying attention to `quoteMaxToken` as the citation content budget; record the number of citations separately according to the array length, do not compare it for equality with the budget, and list missing signatures or receipts as items pending follow-up |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, whether the citation content output is returned as an array and its length may be 0, and whether `quoteList` retains the source identifier | Run a test with a question that has no matching materials, confirm that the citation array is empty while the output chain continues to run through; then switch to a question with original text evidence and check whether the cited fragments match the original text |

## Three common errors

- Phenomenon: The name, quantity, or date of the same course does not match between two materials. Cause: The materials are entered in different batches, versions are not synchronized, the old qualification certificate and the new application form coexist, and whichever one is hit by retrieval is cited.
- Phenomenon: A graduation application form lacks a personal signature or intake receipt but is still treated as acceptable material. Cause: The signature field and receipt are not included in field verification, the missing item is not identified as an item pending follow-up, and the follow-up step is skipped.
- Phenomenon: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: It is attributed first to length truncation, without first checking whether there was a hit in this round and which material was hit, and only then looking at truncation and budget.

## How to verify the setup

Acceptance of this function: ask a question with original text evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Open the citation markers in the conversation, check each citation against the source document to see whether it can trace back to the original paragraph, and record the array length.
- Open the search parameter panel and check the values item by item, confirm that `quoteMaxToken` is the citation content budget, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
