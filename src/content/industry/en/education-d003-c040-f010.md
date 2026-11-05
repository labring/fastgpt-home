---
title: Citations and Source Traceability for New Employee Onboarding and Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Intake
meta_description: Employee Onboarding: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Handle Questions and Collect Missing Information

## What this category's data looks like

Enterprise new-employee onboarding training materials usually include three types: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan states the batch, course name, class hours, date, and the signature of the person in charge; the course sign-in sheet records the trainee's name, department, sign-in time, and attendance receipt; the job description contains the job title, responsibility items, qualification requirements, and the signature of the department head. The three types of materials play different roles in Q&A intake and missing-item follow-up: the plan provides the basis for courses and time, the sign-in sheet provides the basis for attendance and presence, and the job description provides the basis for responsibilities and job attribution. In terms of update cadence, plans are published by batch, sign-in sheets are collected by session, and job descriptions are revised as the organization adjusts. Field characteristics are concentrated in four items: name, quantity, date, and signature. It is common for the same record to have mismatched names or dates across two materials, unsynchronized versions, or missing signatures or receipts. When materials enter this feature, they are first output as citations to locate the original text fragments, and then subsequent nodes compare fields, write ledgers, and generate reports. When key information is missing, they ask follow-up questions first before answering.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The intake records and the completed follow-up questions are then handled by subsequent AI nodes, code nodes, or humans. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the batch, course name, class hours, date, and signature of the person in charge are complete, and whether the name and date of the same record match between the plan and the sign-in sheet | In the node, check the selected knowledge base and vector model; open the citation marker, compare it against the original paragraphs of the plan, and compare fields and signatures item by item |
| Course sign-in sheet | Whether the trainee's name, department, sign-in time, and attendance receipt are complete, whether the session date is consistent with the plan, and whether the version is synchronized | Run a test with a question that has no matching materials, and see whether the cited content array is empty while the chain continues; then check whether the cited fragments can point back to the original text of the sign-in sheet |
| Job description | Whether the job title, responsibility items, qualification requirements, and signature of the department head are complete, and whether the job title is consistent between the job description and the plan | Open the search parameter panel and check the values item by item; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |

## Three common errors

- Symptom: the same trainee's department or date does not match between the sign-in sheet and the plan. Cause: the two materials are maintained separately, versions are not synchronized, and receipts are not collected.
- Symptom: the job description lacks the signature of the department head or the attendance receipt is missing. Cause: the revision process was not completed, and the signature step was skipped.
- Symptom: there is no citation marker in the answer, or the cited fragment does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, and check whether the cited content array and citation marker can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality; in the `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled), view the citation source identifiers and confirm that each citation can point back to the original text paragraph.

Business test: ask a question that lacks key information, and see whether it asks follow-up questions first before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and run a test with a question that has no matching materials to see whether the cited content array is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
