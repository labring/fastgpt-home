---
title: Citations and Source Traceability for New Employee Onboarding and Training: Find Supporting Evidence
slug: /en/industry/education-d001-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Evidence
meta_description: Employee Onboarding: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Find Supporting Evidence

## What this category's data looks like

In the enterprise new employee onboarding training scenario, the materials that enter knowledge base retrieval typically include onboarding training plans, course sign-in sheets, and job descriptions. Onboarding training plans are updated by batch and job line, with fields including course name, training date, responsible department, and version number; course sign-in sheets are collected by session, with fields including name, employee ID, sign-in time, and signature column; job descriptions are revised along with organizational adjustments, with fields including job title, reporting relationship, qualification requirements, and effective date. The three types of materials play different roles in retrieval: training plans provide the basis for courses and timing, sign-in sheets provide the basis for attendance and acknowledgments, and job descriptions provide the basis for job responsibilities and qualification requirements. When a basis question spanning materials is asked, the citation snippets and source identifiers returned by the retrieval node are used for subsequent field comparison, ledger writing, or answer generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and source identifier, and the length can be 0. The basis entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | The course name, training date, responsible department, and version number match the original text, and it is the current version | Open the citation marker, check the fields and version item by item against the original plan text, and record the number of citations, i.e. the array length |
| Course sign-in sheet | The name, employee ID, sign-in time, and signature column can be traced back to the attendance record; missing signatures or acknowledgments must be flagged | Compare the citation snippet with the original sign-in sheet text, check whether signatures and acknowledgments are complete, and record the number of citations separately |
| Job description | The job title, reporting relationship, qualification requirements, and effective date match the original text, and the version is in sync | Check the fields and effective date against the original description text, and confirm that the citation snippet is consistent with the original paragraph |
| Citation content output | The number of returned entries is consistent with the matched materials; an empty result is also normal, and the output pipeline continues | Run a test with a question that has no matching materials, see that the citation array is empty while the pipeline still runs through, and check the `quoteMaxToken` and the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The name or date of the same course does not match across two materials. Cause: The training plan and the sign-in sheet are maintained separately and are not synchronized under the same version number, so the citation snippets each point to a different original passage.
- Symptom: The citation snippet for the job description is inconsistent with the current version. Cause: After revision, the old version was not taken down, retrieval hits the old version, and the effective date and job title do not match.
- Symptom: The citation snippet for the sign-in sheet is missing a signature or acknowledgment. Cause: Session collection is incomplete, the signature column is empty, and the citation still returns that original passage, so manual flagging is required.

## How to verify the setup

This feature's acceptance: ask a question that has an original-text basis, and check whether the citation array and citation markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a basis question spanning materials, see whether the answer gives traceable sources, and check the number of citations and the `quoteMaxToken` budget and record them separately.

- Open the citation marker, check the original text snippets and source identifiers item by item against the source documents, and record the array length.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the output pipeline continues, and check the `quoteMaxToken` and the `quoteList` within `responseData` fields.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
