---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Handover
meta_description: Foreign Teachers: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of foreign teacher appointment and course scheduling. The core materials include appointment contracts, work permit materials, course schedules, and the issuance drafts and handover records generated around them. The appointment contract carries the employment term, job responsibilities, compensation, and signature fields; the work permit materials carry the document name, number, validity period, and applicant information; the course schedule carries the course name, class, week number, number of class hours, and the teacher. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source: the contract is used to verify the responsible party and dates, the permit materials are used to verify the document fields and validity period, and the course schedule is used to verify the number of courses and the scheduling cycle. Materials are updated with appointment batches, permit approvals, and semester scheduling, and versions and dates must be kept in sync. The field characteristics are multiple parties, multiple dates, and multiple signature positions. The same record often shows inconsistencies in names, quantities, and dates between the contract and the course schedule, and each item must be compared one by one during handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Fields are complete: employment term, job responsibilities, compensation, signature fields, and dates are consistent | Open the citation marker to trace back to the original contract paragraph, verify the name, date, and signature fields item by item, and record the source identifier in `quoteList` |
| Work permit materials | Document name, number, validity period, and applicant information are consistent across all materials | Compare the cited fragment with the original text, verify the number and validity period; when the citation limit is involved, check the `quoteMaxToken` budget, and record the array item count separately |
| Course schedule | Course name, class, week number, number of class hours, and teacher are consistent with the contract position | Use the citation array to trace back to the original course schedule item by item, and compare the name and quantity of the same course in the two materials |
| Handover record | Responsible person is clear, version and date are consistent, and receipts are complete | Draft one according to the template and complete one handover, check whether missing items are blocked, and verify whether the number of citations returned by `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |

## Three common errors

- Phenomenon: The name and number of class hours of the same course do not match between the contract and the course schedule. Cause: The two materials were drafted separately, the fields were not cross-compared, and the version and date were not synchronized.
- Phenomenon: The number or validity period of the work permit materials is inconsistent in two records. Cause: After the materials were updated, only one place was changed, the old version was still cited, and the receipt and signature fields were not checked.
- Phenomenon: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the search parameter panel and verify item by item, confirm that the selected knowledge base uses the same vector model, and verify that the `quoteMaxToken` budget and the array item count are recorded separately.
- Open the citation markers in the conversation, compare them with the source documents, trace back to the original paragraphs item by item, and confirm that the citations correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
