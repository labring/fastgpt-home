---
title: Citations and Source Traceability for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c007-f010
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Citations | Intake
meta_description: School Enrollment: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on three types of materials in primary and secondary school student status establishment and changes: student status records, transfer applications, and suspension/resumption materials. Student status records carry students' basic information, family information, and enrollment registration, with fields including name, ID document number, date of birth, guardian signature, and school seal; transfer applications carry the transferring-out and transferring-in schools, grade, date, and seals of both parties; suspension/resumption materials carry the reason for suspension, start and end dates, hospital certificate, and approval signature. The three types of materials serve as mutual references in Q&A intake: student status records are used to confirm identity and enrollment status, transfer applications are used to confirm the direction of change and effective date, and suspension/resumption materials are used to confirm the interruption and resumption nodes of student status. The material update rhythm follows concentrated submissions during semester changes, with supplementary submissions, withdrawal and resubmission, and version replacement. Field characteristics are many dates, many signatures, and school names and student status numbers repeatedly appearing across materials; the name, quantity, and date of the same record in different materials are prone to mismatch, and when versions are not synchronized or signatures and receipts are missing, Q&A intake needs to first identify missing items and then follow up.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "intake records and items to be completed" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status record | Whether name, ID document number, date of birth, guardian signature, and school seal are complete, and whether dates are readable | At the citation superscript, refer back to the original paragraph of the student status record, and check the fields and signature positions |
| Transfer application | Whether the names of the transferring-out and transferring-in schools, grade, application date, and seals of both parties are consistent, and whether the receipt is attached | Compare the school names, dates, and seals in the two materials item by item against the cited fragments |
| Suspension/resumption materials | Whether the reason for suspension, start and end dates, hospital certificate, and approval signature correspond, and whether the version is the latest | Open the search parameter panel to check the values, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Cited content output | The array length matches the hit materials; being empty is also a normal output, and the chain continues | Run a trial with a question that has no matching materials, observe that the array is empty while the chain runs through, and record the `quoteList` and `quoteMaxToken` budget |

## Three common errors

- Symptom: The name or date of birth of the same student does not match between the student status record and the transfer application. Cause: The two materials were entered separately, no field-level comparison was made, and the cited fragments each refer back to their own original text.
- Symptom: The suspension/resumption materials lack an approval signature or receipt, but the Q&A still gives a conclusion. Cause: Missing items were not identified and followed up; the citation array only reflects hit materials, not material completeness.
- Symptom: The transfer application version is not synchronized, and the old and new versions of school names and dates appear at the same time. Cause: The version was not marked after material replacement, and the correspondence between cited fragments and the original text was not checked item by item.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array count separately.

Business test: ask a question missing key information, and see whether it follows up first before answering.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation superscripts, check against the source documents whether each citation can refer back to the original paragraph, and record the number of citations in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
