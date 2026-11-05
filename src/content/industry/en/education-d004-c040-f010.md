---
title: Citations and Source Traceability for New Employee Onboarding and Training: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Handover
meta_description: Employee Onboarding: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and responsibility handover in corporate new employee onboarding training. The materials include onboarding training plans, course sign-in sheets, job descriptions, draft materials that can be issued, and handover records. The onboarding training plan is drafted by the training lead, the course sign-in sheet is filled in by the instructor or assistant per session, the job description is jointly confirmed by the hiring department and Human Resources, and the handover record is used for sign-off in the next step. The material update cadence is: revise the plan before each onboarding batch, add sign-in records after each training session, synchronize the job description when a position changes, and freeze the version at handover. The field characteristics center on name, position, course name, date, version number, and signature or receipt. When these materials enter the citation output of the knowledge base retrieval node, each serves as a citable original text snippet, and subsequent steps compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The draft materials that can be issued and the handover records are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the course names, dates, version numbers, and signature fields in the plan are consistent with the course sign-in sheet | Open the plan and the sign-in sheet and compare course names, dates, and version numbers item by item, and check whether the signature fields are complete |
| Course sign-in sheet | Whether the names, positions, and session dates in the sign-in sheet match the job description and handover record | Check the names, positions, and dates in the sign-in sheet against the job description by session, and mark missing signatures or receipt items |
| Job description | Whether the position name, responsibilities, and version in the description are from the same source as the responsibility description in the handover record | Check the position name, version number, and responsibility clauses in the job description and handover record, and confirm the dates are consistent |
| Cited content array | The number of array entries matches the materials hit; being empty is also normal; the cited snippets can point back to the original text | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, open `quoteList` to compare against the source document, record the number of entries, and separately check the `quoteMaxToken` budget |

## Three common errors

- Symptom: The course name and date for the same record do not match between the training plan and the sign-in sheet. Cause: The two materials were drafted separately, and field comparison and version freezing were not done before handover.
- Symptom: The job description has been updated, but the handover record still cites the old version. Cause: The version was not synchronized, and the version number and effective date were not checked at handover.
- Symptom: The sign-in sheet or handover record is missing signatures or receipts. Cause: The sign-off step was not closed-loop, and the signature fields and receipt items were not checked against the template after the materials were drafted.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline still runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base uses the same vector model, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the citation array in `responseData` is empty while the pipeline continues, and separately record the number of array entries and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
