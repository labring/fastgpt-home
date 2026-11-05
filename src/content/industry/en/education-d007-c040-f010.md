---
title: Citations and Source Traceability for New Employee Onboarding and Training: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Review
meta_description: Employee Onboarding: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the enterprise new employee onboarding training category; the materials include onboarding training plans, course sign-in sheets, and job descriptions. An onboarding training plan usually contains training objectives, a course list, a schedule, and an owner field, and is revised before each onboarding batch; a course sign-in sheet records trainee name, department, sign-in time, and a signature column, and is generated per session; a job description contains the job title, responsibilities, qualification requirements, and a signature confirmation column, and is updated as the organization changes. When these three types of materials enter the knowledge base retrieval node, each serves as a citation source candidate; the citation output returns only the original text snippet and the source identifier, and does not perform field comparison or ledger generation. The dates, names, quantities, and signature statuses among the materials need to be checked item by item by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and the source identifier, and the length may be 0. The "exception list and review conclusions" are completed subsequently by a downstream AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the course names, training dates, and owner signatures in the plan are consistent with the corresponding fields in the job description and sign-in sheet | Open the source identifiers one by one in the citation array, and check the course names, dates, and signature columns against the original text snippets |
| Course sign-in sheet | Whether the trainee names, departments, and sign-in times in the sign-in sheet match the roster in the onboarding training plan and the job titles in the job description | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the length of the citation array, and trace each entry back to the original text to verify names, quantities, and dates |
| Job description | Whether the job title, responsibilities, and qualification requirements are consistent with the job fields in the training plan, and whether signatures or acknowledgments are complete | Open the citation markers to check against the source documents, verify the version number and signature column, and record inconsistent entries |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials, see that the array is empty while the chain continues, and record the number of entries separately |

## Three common errors

- Symptom: the same trainee name is written differently in the sign-in sheet and the training plan. Cause: the two materials were entered by different people without field standardization, and the discrepancy is only exposed after the citation snippets are traced back to their respective original texts.
- Symptom: the job description version is not synchronized, and old responsibilities are still cited. Cause: historical versions are retained in the knowledge base, retrieval hits old snippets, and filtering by effective date is not applied.
- Symptom: the sign-in sheet lacks a signature or acknowledgment, so the review conclusion cannot be closed. Cause: the signature column was not checked when the materials were archived, the citation output only presents the original text, and missing signatures require manual identification.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check `quoteList` and `responseData` to record the number of entries.

Business test: create an exception record, see whether it can be traced to the source materials, and verify the fields, dates, and signatures of the onboarding training plan, course sign-in sheet, and job description.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, open the search parameter panel to check the values item by item, and confirm that `quoteMaxToken` only constrains the citation text budget.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues; then open the conversation citation markers and check against the source documents whether each citation can trace back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
