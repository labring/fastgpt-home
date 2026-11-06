---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Intake
meta_description: Teaching Reviews: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

District and county teaching research activity and lesson observation and evaluation materials include three types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices contain the activity name, time, location, participants, agenda, and receipt requirements; lesson observation records contain the instructor, class, topic, observation dimensions, classroom transcript, and signature; lesson evaluation minutes contain evaluation points, improvement suggestions, signature, and date. The material sources are district and county teaching research institutions, school academic affairs offices, and observing teachers. The update rhythm is: notices are issued before the activity, observation records are written during the activity, and minutes are written after the activity, often summarized weekly or per session. When these three types of materials enter Q&A acceptance and missing-item follow-up, notices are used to verify activity sessions and participation scope, lesson observation records are used to verify classroom facts and signatures, and lesson evaluation minutes are used to verify evaluation conclusions and receipts. The field characteristic is that the name, quantity, date, and signature of the same record must be consistent across the notice, record, and minutes, and versions must be synchronized.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Acceptance records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Check whether the activity name, date, participants, and receipt requirements are consistent with the lesson observation record and lesson evaluation minutes | Open the original notice and citation markers, compare the name, date, participant list, and receipt fields item by item, and record inconsistencies |
| Lesson observation record | Check whether the instructor, class, topic, date, and signature correspond to the notice and lesson evaluation minutes | Compare the classroom facts and signature field in the cited fragment, and check whether the name, quantity, and date of the same record match across the two materials |
| Lesson evaluation minutes | Check whether the evaluation points, improvement suggestions, signature, and date are consistent with the notice and lesson observation record | Check whether the number of items in the citation array matches the hit minute paragraphs; when the array is empty, confirm the chain is working, then verify the signature and receipt |
| Search parameters | Check whether the search parameter values are consistent with the settings in the knowledge base retrieval section | Open the search parameter panel and check item by item, and check whether the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields are returned with the citation output |

## Three common errors

- Symptom: the name and date of the same activity do not match across two materials. Cause: the notice and minutes versions are not synchronized, the old version overwrites the new version, and there is no unified number.
- Symptom: the lesson observation record lacks a signature or the receipt is not attached. Cause: signatures were missed during post-activity supplementary entry, receipts were not archived with the minutes, and field validation did not cover the signature field.
- Symptom: there are no citation markers in the answer, or the cited fragment does not match the original text. Cause: first check whether this round hit and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still works. Record the number of citations as the array length, and `quoteMaxToken` as the citation content budget; do not compare the two for equality; when citation limits are involved, check the tokens of the cited text, and record the array item count separately.

Business test: ask a question missing key information, and see whether it first asks a follow-up before answering.

- In the conversation, open the citation markers, compare each citation against the source document to check whether it can point back to the original paragraph, and record the array item count.
- Open the search parameter panel and check item by item, check whether the `quoteList` within `responseData` fields are returned with the citation output, and confirm that the chain continues when the array is empty.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
