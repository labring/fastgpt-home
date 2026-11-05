---
title: Citations and Source Traceability for School Enrollment Records and Status Changes: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c007-f010
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Citations | Checks
meta_description: School Enrollment: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Enrollment Records and Status Changes: Compare Documents and Locate Differences

## What this category's data looks like

Student status establishment and changes in primary and secondary schools involve three core types of materials: student status archives, transfer applications, and suspension/resumption materials. Student status archives are established by the school's student status administrator upon enrollment or transfer, with fields including name, ID number, date of birth, guardian, class, and student status number; the signature section requires confirmation by the homeroom teacher and parent. Transfer applications are filled out separately by the transferring-out and transferring-in schools, including the transferring-out opinion, transferring-in opinion, date, seal, and receipt, and versions are updated as approval progresses. Suspension/resumption materials include the reason for application, start and end dates, hospital certificate, parent signature, and school approval opinion; a recovery certificate must be attached upon resumption. When the three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets point back to the original paragraphs, for subsequent comparison of whether field names, quantities, dates, and signatures are consistent. In terms of update cadence, student status changes are summarized monthly, transfers and suspensions/resumptions are archived per instance, and the latest approved document prevails as the material version, with old versions retained for reference.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and source identifier, and the length can be 0. The discrepancy list is completed subsequently by AI nodes, code nodes, or manual work. The citation array is not a discrepancy list, ledger, or report; the number of entries is the array length, and `quoteMaxToken` is the content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status archive | Name, ID number, date of birth, class, student status number, and signature section are consistent across the two materials | Open the citation marker to point back to the original text, compare field by field, and record discrepancies |
| Transfer application | Transferring-out opinion, transferring-in opinion, date, seal, and receipt are complete and versions are synchronized | Check the cited snippets against the original documents, and see whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Suspension/resumption materials | Reason for application, start and end dates, hospital certificate, parent signature, and approval opinion correspond | Retrieve with one real record, and check whether the source identifiers in `quoteList` match the original paragraphs |
| Knowledge base retrieval node | The selected collection uses the same vector model, and the length of the cited content array matches the hit materials | Check the selected collection and vector model in the node, and run a test with a no-match question to confirm the array is empty while the pipeline works |

## Three common errors

- Symptom: The name or date of birth of the same student does not match between the student status archive and the transfer application. Cause: The two materials were entered by different handlers, without field-level comparison and write-back.
- Symptom: Suspension/resumption materials lack a parent signature or school receipt. Cause: Versions were not synchronized during material circulation, the old version was not replaced, and the signature section was left blank.
- Symptom: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: First check whether this round hit and which materials were hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

Feature acceptance: Ask a student status field question with textual evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the pipeline works.

Business test: Use one real record to find fields inconsistent with the ledger, record the name, quantity, and date discrepancies, then hand them to the reviewer for confirmation and write-back.

- Open the search parameter panel and check the values item by item, and confirm that the cited content is output as an array and the length can be 0.
- Open the citation markers in the conversation, and check against the source documents whether each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
