---
title: Citations and Source Traceability for New Employee Onboarding and Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Checks
meta_description: Employee Onboarding: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Compare Documents and Locate Differences

## What this category's data looks like

In the enterprise new employee onboarding training scenario, materials are mainly of three types: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan provides the batch, course names, class hours, and dates, and is the source of the training arrangement; the course sign-in sheet records participants, sign-in times, and signatures by session, and is the evidence of attendance facts; the job description provides the job title, responsibility items, and effective date, and is the baseline for job attribution. The three types of materials come from different sources: plans are mostly compiled by the training management role before the batch starts, sign-in sheets are collected by on-site organizers after the course ends, and job descriptions are updated irregularly as the organization adjusts. In terms of update cadence, plans roll forward by batch, sign-in sheets are produced one by one by session, and description versions may lag behind the actual job. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures: the same employee writes their name in the plan, writes their signature in the sign-in sheet, and writes the job title in the description; quantities are reflected as the number of participants and the number of courses; dates are reflected as the plan date, sign-in date, and effective date; signatures are reflected as sign-in signatures and receipts. After the materials enter the knowledge base retrieval node, each serves as a citable original source for subsequent field comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "discrepancy list" is completed afterward by a subsequent AI node, code node, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | The course names, number of courses, and plan dates of the same batch are consistent between the plan and the sign-in sheet | Locate the original plan snippet in the citation output, check the course name and date fields, and record the number of array items |
| Course sign-in sheet | The number of participants, sign-in date, signature, or receipt of the same session are consistent between the two materials | Open the citation marker to point back to the original sign-in sheet, check the participant count and signature fields, and inspect the source identifier in `quoteList` |
| Job description | The job title and effective date of the same employee are consistent between the description and the plan, and the version is the current version | Compare the original description snippet with the job field in the plan, and mark a discrepancy when the version is not synchronized |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and the cited content is output as an array and the length can be 0 | Check the selected collection and vector model, and view the values of `responseData` (non-streaming module results returned with detailed output enabled) and `quoteMaxToken` |

## Three common errors

- Symptom: the name or participant count for the same employee does not match between the plan and the sign-in sheet. Cause: the two materials are filled in by different roles, and the entry conventions are not unified, so you need to point back to the original text and compare field by field.
- Symptom: the version cited in the job description is inconsistent with the currently effective version. Cause: after organizational adjustment the description was not updated in sync, and the old version still remains in the knowledge base, so you need to check the effective date and version identifier.
- Symptom: the sign-in sheet lacks a signature or receipt, and the cited snippet cannot prove attendance. Cause: on-site collection was incomplete or scanning missed items, so you need to compare against the source document to confirm the missing items and hand them to the reviewer.

## How to verify the setup

This feature's acceptance: first ask a question with original-text support, check whether the citation array and markers can point back to the original paragraph, and record the number of array items and the `quoteMaxToken` budget; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- Open the citation marker and compare the original snippet and source identifier against the source document for consistency
- Run a trial with a question that has no matching material, and confirm that the citation array is empty while the output chain continues

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
