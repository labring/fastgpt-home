---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Review
meta_description: Foreign Teachers: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

This page covers the foreign teacher appointment and course scheduling category. The materials include three types: appointment contracts, work permit materials, and course schedules. Appointment contracts record the names of both parties, position, appointment period, compensation, and signatures; work permit materials record the permit number, validity period, issuance date, and receipt; course schedules record the course name, class, week number, number of class hours, and the teacher. The three types of materials are updated on a rolling basis by appointment period and semester, and the fields are mainly dates, names, quantities, and signatures. When the materials enter the knowledge base retrieval node, each serves as an independent citation source and can be hit simultaneously by the same question, to be used for subsequent comparison of whether the fields of the same record are consistent across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and source identifier, and the length can be 0. The "anomaly list and review conclusion" is completed afterward by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the position name, appointment start and end dates, signature, and receipt are consistent with the work permit materials | Open the citation corner mark in the conversation, compare it against the original contract paragraphs, and record differences in names and dates |
| Work permit materials | Whether the permit number, validity period, and issuance date connect with the contract appointment period, and whether the receipt is complete | Check the source identifier of the cited snippet, and compare the date fields and signature page item by item |
| Course schedule | Whether the course name, class, week number, and number of class hours correspond to the contract position and the permit scope | Retrieve with the same question, and check whether the number of entries in the citation array matches the hit materials |
| Citation output | The array length is consistent with the hit materials; being empty is also normal, and no equality comparison is performed | Run a trial with a question that has no matching materials, and check that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` is empty while the chain still runs through |

## Three common errors

- Symptom: the same teacher's name is written differently in the contract and the course schedule, and the source cannot be traced. Cause: the name field was not unified when the two materials were entered, the cited snippets each point to a different passage, and no field comparison was performed.
- Symptom: the version of the work permit materials was not synchronized, and the old receipt is still cited. Cause: after the new version was uploaded, the old document was still in the knowledge base, retrieval hit the old snippet, and the citation source identifier points to expired materials.
- Symptom: the course schedule lacks a signature or receipt, and the anomaly record cannot be attributed. Cause: the signature page was not collected completely when the materials were archived; although the citation array has entries, the original text paragraphs do not contain the signature field.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: create an anomaly record and see whether the source material can be traced.

- In the conversation, open the citation corner mark, compare it against the source document, check whether the cited snippet is consistent with the original text paragraph, and record the number of citations and the value of the `quoteMaxToken` budget separately.
- Run a trial with a question that has no matching materials, check that the citation array in `quoteList` within `responseData` is empty, and confirm that the output chain continues to run through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
