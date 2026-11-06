---
title: Citations and Source Traceability for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c051-f010
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Citations | Intake
meta_description: Entrance Exam Eligibility: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

For question-and-answer intake and missing-item follow-up in general college entrance examination registration qualification review, the materials mainly consist of the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrating parents. The sources are registration documents issued by provincial admissions and examination institutions, electronic forms filled in by candidates, and uploaded scanned copies, and the update cadence rolls with registration batches and correction notices. The three types of materials play different roles in the function: the college entrance examination registration form carries the candidate's basic information and examination category, the household registration and student status certificates carry the household registration address, student status start and end dates, and school seal, and the materials for children accompanying migrating parents carry the parents' residence permit, social insurance payment, and years of schooling. Field characteristics center on name, ID number, household registration address, student status number, start and end dates of schooling, signature, and receipt. The names, quantities, and dates of the same record in two materials often do not match. When versions are not synchronized or signatures and receipts are missing, the citations retrieved can only serve as the original textual basis, and missing-item identification and follow-up questions are completed by subsequent nodes.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "intake record and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether the name, ID number, examination category, signature, and receipt date are consistent with the household registration and student status certificates | In the node, check the selected collections and their vector models, open the citation markers to point back to the original paragraphs, and record the number of array items and the `quoteMaxToken` budget |
| Household registration and student status certificates | Whether the household registration address, student status number, start and end dates of schooling, and school seal are complete and match the registration form | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and then compare the cited fragments against the source documents |
| Materials for children accompanying migrating parents | Whether the names, quantities, and dates of the parents' residence permit, social insurance payment, and years of schooling are synchronized with the version of the registration form | Open the search parameter panel and check the values item by item, and check whether the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the matched materials |
| Intake record and items to be completed | Whether missing items are identified and followed up with questions, and whether the answers have a material basis | In the conversation, open the citation markers, compare them against the source documents, and hand the matched materials and the missing-item list to the case handler |

## Three common errors

- Phenomenon: The name and date of the same record do not match between the college entrance examination registration form and the household registration and student status certificates. Cause: The two materials were filled in at different times, the versions are not synchronized, and retrieval only returns their respective original text fragments.
- Phenomenon: The social insurance payment months in the materials for children accompanying migrating parents are inconsistent with the quantity filled in on the registration form. Cause: The materials are from different update batches, the citations hit paragraphs from an old version, and no comparison was made with the latest receipt.
- Phenomenon: The answer has content but the citation array is empty, or the markers are missing. Cause: No materials were matched in this round; an empty array is a normal output, and the correspondence between citations and original text needs to be checked item by item by pointing back.

## How to verify the setup

Acceptance for this function: ask a question that has an original textual basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and separately record the number of array items and the `quoteMaxToken` budget, and check the `quoteList` field.

Business test: submit a question missing key information, see whether it first asks a follow-up question before answering, confirm that missing items are identified and followed up with questions and that the answer has a material basis, and then forward it to the case handler.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, and confirm that they are consistent with the values set in the knowledge base retrieval section.
- Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; in the conversation, open the citation markers, compare them against the source documents, and check whether each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
