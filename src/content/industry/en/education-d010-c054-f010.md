---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Operations
meta_description: Self-Study Exams: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Coordinate Operations and Application Handover

## What this category's data looks like

In the self-taught examination registration records and graduation review scenario, the materials entering the deployment, operations, and application handover stage are mainly of three types: registration records, course qualification certificates, and graduation application forms. Registration records carry the candidate's identity, examination registration number, major, and all previous examination registration history, with fields mainly consisting of name, ID number, major code, course name, score, and date obtained; course qualification certificates are the proof of a single subject's score, with fields including course code, course name, qualification date, and seal; graduation application forms are the summary document of graduation review, with fields including major, number of courses, total credits, review opinion, signature, and receipt date. The three types of materials come from different sources: registration records come from exports of the provincial registration record system, course qualification certificates come from certificate printing after score release, and graduation application forms come from candidate submissions and preliminary review by the main examining institution. In terms of update cadence, registration records are updated on a rolling basis with examination registration and score release, course qualification certificates are generated in batches by examination session, and graduation application forms are produced in a concentrated manner according to the graduation application cycle. When entering this function, registration records and course qualification certificates serve as the comparison working papers, and the graduation application form serves as the object to be verified; together, the three support consistency judgment of versions, connections, and task records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. "Handover-ready deployment status and operation records" are then completed by subsequent AI nodes, code nodes, or humans. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, ID number, major code, course name, score, date obtained, and signature are complete, and whether the name, quantity, and date of the same record match across the two materials | Retrieve the registration records and course qualification certificates and compare them field by field, and check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original document paragraphs |
| Course qualification certificates | Whether course code, course name, qualification date, seal, and receipt are complete, and whether the version is synchronized with the registration records | Check the certificate fields and dates item by item according to the handover sheet, and check whether the source identifier recorded in `quoteList` is consistent with the original text |
| Graduation application forms | Whether major, number of courses, total credits, review opinion, signature, and receipt date are consistent with the registration records and course qualification certificates | Compare the graduation application form side by side with the two working papers, check whether the tokens of the cited text under the `quoteMaxToken` budget are complete, and record the number of array entries separately |
| Deployment status and operation records | Whether versions, connections, and task records are consistent, and which record is missing | Check item by item once according to the handover sheet, see which record is missing, and confirm that the length of the citation array matches the number of hit materials |

## Three common errors

- Phenomenon: The course name, quantity, and date of the same record do not match between the registration records and the graduation application form. Cause: The two materials come from different batches, and field-by-field comparison was not performed before handover.
- Phenomenon: The version of the course qualification certificate is not synchronized, and the old version's seal coexists with records from the new batch. Cause: The update cadences differ, and the version number and generation time were not checked during handover.
- Phenomenon: The graduation application form lacks a signature or receipt date. Cause: The preliminary review step did not backfill them, and the handover sheet did not list signature and receipt as mandatory check items.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, check whether the citation array and superscripts can point back to the original text, and confirm that each citation contains an original text fragment and a source identifier; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business testing: check item by item once according to the handover sheet, see which record is missing, and confirm that versions, connections, and task records are consistent.

- Open the search parameter panel and check item by item, confirm that the selected collections are consistent with their vector models, and record the number of citations separately according to the array length.
- Open the citation superscripts in the conversation, check each citation against the source documents to see whether it can point back to the original document paragraphs, and check the tokens of the cited text under the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
