---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Intake
meta_description: Kindergarten Care: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data involves three core types of materials: the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule specifies time periods, activity names, and responsible persons; the morning and afternoon check records log body temperature, oral cavity, skin, and mental state day by day; the health observation records track water intake, meals, sleep, bowel movements, and emotional abnormalities. The three types of materials are updated daily; the morning and afternoon check records and observation records must be signed by the teacher on duty, and the schedule is adjusted weekly or monthly with versions retained. When the materials enter the question acceptance and missing-item follow-up function, the schedule serves as the process basis, the morning and afternoon check records and health observation records serve as the fact source, and the citation output is responsible for bringing out the original text fragments together with source identifiers, for subsequent field comparison, missing-item identification, and generation of follow-up questions.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "acceptance records and follow-up questions" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Check whether the fields include activity name, start and end time, responsible person, date, and version number, and whether signatures or receipts are complete | Locate the original schedule fragment in the citation output, compare activity name, time, and responsible person item by item, record the date and version, and list it as a pending follow-up item when a signature or receipt is missing |
| Morning and afternoon check records | Check whether the fields include child name, body temperature, oral cavity and skin status, mental state, check time, and teacher signature | Open the citation marker to refer back to the original text, compare whether the date, quantity, and name for the same child are consistent between the morning check and afternoon check records, and mark a follow-up when a signature is missing |
| Child health observation records | Check whether the fields include water intake, meals, sleep, bowel movements, descriptions of emotional abnormalities, observation time, and teacher signature | Use the citation array to refer back to the original paragraphs item by item, verify whether the name, quantity, and date of the same record match between the schedule and the observation records, and mark separately when the version is not synchronized |
| Citation output of the knowledge base retrieval node | Check whether the number of returned items matches the hit materials; being empty is also normal; the array length in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the number of hits | Run a test with a question that has no matching materials, and see whether the citation array in `responseData` is empty while the chain continues; then check that `quoteMaxToken` only constrains the citation text budget, that the array item count is recorded separately, and that `quoteList` can be expanded to show each source identifier |

## Three common errors

- Phenomenon: the same child's name is written differently in the morning and afternoon check records and the health observation records, and the quantity and date do not match. Cause: the two materials were filled in by different teachers, and the child identifier and date conventions were not unified.
- Phenomenon: the daily life schedule has been adjusted, but the morning and afternoon check records are still registered under the old activity names. Cause: the version was not synchronized, and the old schedule is still being retrieved and hit in the knowledge base.
- Phenomenon: the morning and afternoon check records lack a teacher signature or receipt, but the cited fragment is still treated as evidence. Cause: the signature field was not checked when the materials were ingested, and the missing item was not identified and followed up.

## How to verify the setup

Acceptance of this function: ask a question with original-text evidence, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check that the array length in `responseData` is not compared for equality with the `quoteMaxToken` budget.

Business test: ask a question missing key information, and see whether it first follows up before answering.

- In the node, check whether the selected knowledge base collections and their vector models use the same vector model.
- Open the search parameter panel and check the values item by item, and open the citation markers against the source documents to confirm that each citation can refer back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
