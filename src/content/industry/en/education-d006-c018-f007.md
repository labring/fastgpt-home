---
title: Conversation Records and Traceability for Undergraduate Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c018-f007
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Chat Records | Progress
meta_description: Program Revision: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Undergraduate Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials involved in undergraduate program planning: the program plan, course syllabi, and the credit structure table. Fields include course name, course code, credits, class hours, semester offered, revision date, and signature field. The materials come from academic affairs system exports and departmental submissions, with updates summarized weekly and archived monthly. When entering this feature, the program plan serves as the main record, the course syllabi serve as course-level attachments, and the credit structure table serves as the summary verification table. Each of the three plays a different role: the main record defines the version, the attachments define course details, and the summary table defines the credit totals. Conversation logs are retained by application and session dimensions, providing session evidence for progress records and statistical verification, but they do not serve as the business ledger.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimensions), which outputs a list of session messages and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Fields, dates, and signatures are complete; the version number matches the archive | Check the course name, course code, credits, revision date, and signature field; when the version is not synchronized, the latest signed version prevails |
| Course syllabi | Course names, counts, and dates match the program plan | Compare course names and credits one by one; check whether the counts and dates for the same record are consistent across the two materials; if the receipt is missing, return it |
| Credit structure table | The credit total matches the item-by-item sum from the course syllabi | Aggregate credits by course code; check the statistical scope stated in the header; list exceptional courses separately and note the basis |
| Conversation record interface | The record count matches the total; role and reference information are retrievable | Pull pages by `chatId`; check `dataId` and `value`; confirm the total record count total matches response `code` of 200 |

## Three common errors

- Symptom: the name and credits of the same course do not match between the program plan and the course syllabi. Cause: the two materials were revised separately, versions were not synchronized, and verification was not done against a unified course code.
- Symptom: the total in the credit structure table does not equal the item-by-item sum from the course syllabi. Cause: the statistical scope was not written into the header, exceptional courses were not listed separately, and counts and dates were not compared one by one.
- Symptom: revision records lack signatures or receipts, and the progress table cannot confirm the effective version. Cause: the signature field and receipts were not archived in sync with the materials, and dates and version numbers were not checked.

## How to verify the setup

Feature acceptance: page through all records by total count, sample one record to check role, reference information, and time; check the message identifiers and content fields `_id`, `dataId` and `value`, and confirm the total record count total matches response `code` of 200.

Business test: use one week of records to verify the total and see whether the scope and exceptions are clearly stated; record the reference count separately by array length, and verify the reference limit against the tokens of the reference text, without comparing it for equality with the array count.

- Pull pages by application and session dimensions; pull two consecutive pages and compare the total and offset to confirm the record count matches the total.
- Open one record to check role, reference, and elapsed-time fields; confirm that message roles correspond to the original conversation and that reference information is complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
