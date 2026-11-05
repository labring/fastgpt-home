---
title: Citations and Source Traceability for New Employee Onboarding and Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Progress
meta_description: Employee Onboarding: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the enterprise new employee onboarding training scenario, and the materials include three types: onboarding training plans, course sign-in sheets, and job descriptions. An onboarding training plan usually contains course names, dates, instructors, participant lists, and planned class hours, with fields mainly consisting of tables plus signature columns; a course sign-in sheet records sign-in time, signer, absence reason, and receipt by session, with fields centered on dates and signatures; a job description contains the job title, responsibility items, qualification requirements, and version number, with fields characterized by version and effective date. When the three types of materials enter the knowledge base retrieval node, each is cited as an independent source: the training plan provides the progress baseline, the sign-in sheet provides attendance records, and the job description provides the job and responsibility definitions. In terms of update cadence, the training plan is updated monthly or by batch, the sign-in sheet is updated by session, and the job description is updated by version. After the materials enter this feature, the citation output is only responsible for returning the original text snippets and source identifiers, and subsequent nodes or humans use them to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "progress table and statistical definition explanation" is completed afterward by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the course name, planned date, participant list, planned class hours, and signature column are complete, and whether they match the sign-in sheet item by item | Locate the original text snippet of the training plan in the citation array, verify the course name and date fields, and then compare them with the same-session records in the sign-in sheet |
| Course sign-in sheet | Whether the sign-in date, signer, absence reason, and receipt signature are complete, and whether the name, quantity, and date of the same record are consistent between the plan and the sign-in sheet | Use one week of sign-in records to verify the total, check whether the cited snippet can point back to the original paragraph, and confirm whether exceptions such as missing signatures or receipts are clearly stated |
| Job description | Whether the job title, responsibility items, qualification requirements, and version number are consistent with the job definitions in the training plan, and whether the version is synchronized | Open the citation marker to compare against the source document, verify the version number and effective date, and confirm that the name and date of the same job are consistent in both materials |
| Citation content output | Whether the number of returned items matches the hit materials; empty is also normal; the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is recorded separately | Run a test with a question that has no matching materials to see whether the output is empty while the chain continues; when the citation limit is involved, check the `quoteMaxToken` budget, and do not compare the number of items for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the training plan and the sign-in sheet. Cause: The two materials are maintained separately, no field-level comparison is performed, and the cited snippets can only point back to their respective original texts.
- Symptom: The job description version is not synchronized, and the training plan still cites the old version of responsibilities. Cause: The version number and effective date were not updated with the materials, and the citation source identifier points to the old paragraph.
- Symptom: The sign-in sheet lacks a signature or receipt, but the statistical count is still included in the total. Cause: The exception is not clearly stated in the definition explanation, and subsequent nodes directly aggregate by the number of citations.

## How to verify the setup

Feature acceptance: ask a question with original-text support and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and verify that the number of citations in `quoteList` and the `quoteMaxToken` budget are recorded separately.

Business test: use one week of records to verify the total, see whether the definitions and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the definitions are written in the header.

- In the knowledge base retrieval node, verify the selected collections and their vector models, and confirm that the knowledge bases associated are using the same vector model.
- Open the search parameter panel and verify the values item by item, keeping them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
