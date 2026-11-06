---
title: Citations and Source Traceability for New Employee Onboarding and Training: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Versions
meta_description: Employee Onboarding: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Maintain Document Versions and Changes

## What this category's data looks like

This category of data looks like this: Enterprise new employee onboarding training involves three core types of materials: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan specifies the training cycle, course names, class hours, and responsible persons; the course sign-in sheet records participants, dates, sessions, and signatures; the job description defines responsibilities, reporting relationships, and qualification requirements. These three types of materials often enter the knowledge base in document form, and retrieval nodes recall original text fragments based on the question. In terms of update cadence, the training plan is revised as courses are adjusted, sign-in sheets are generated session by session, and job descriptions are revised as the organization and responsibilities change. Field characteristics are concentrated in names, quantities, dates, and signatures: if the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or signatures or acknowledgments are missing, the cited fragments will contradict one another. When materials enter this feature, each serves as a retrievable original source, providing the basis for subsequent comparison and ledgers.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the name, class hours, and date of the same course are consistent across the two materials, and whether the version number and change records are synchronized | Open the citation marker to trace back to the original paragraph, and compare the course name, date, and signature in the plan and the sign-in sheet |
| Course sign-in sheet | Whether participants, sessions, dates, and signature acknowledgments are complete, and whether they can correspond one by one to the courses listed in the plan | Check the sign-in sheet fields by session, confirm records missing signatures or acknowledgments, and mark them as pending supplementation |
| Job description | Whether responsibilities, reporting relationships, and qualification requirements are consistent with the current version, and whether the old version is traceable | Check the version number and effective date, confirm that the old version is still traceable and that citations point to the current version |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output pipeline continues to work | Run a test with a question that has no matching materials, and see whether the array is empty while the pipeline continues; record the array length, and view the tokens of the cited text separately as `quoteMaxToken` |

## Three common errors

- Symptom: The course name and date of the same record do not match between the training plan and the sign-in sheet. Cause: The two materials were revised separately, without field-level comparison and version synchronization.
- Symptom: The job description has been revised, but citations still point to the old version. Cause: Versions are not synchronized; the old version is traceable, but the current version is not uniquely identified, so retrieval hits the old fragment.
- Symptom: The sign-in sheet is missing signatures or acknowledgments, and the cited fragments cannot prove participation. Cause: Material archiving is incomplete; retrieval returns only existing original text, and missing items are not marked.

## How to verify the setup

Feature acceptance: ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline continues, and separately record the array length and the `quoteMaxToken` of the cited text.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; open `responseData` (non-streaming module results returned with detailed output enabled) to check whether the source identifier in `quoteList` points to the current version.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, and confirm that the citation array is empty while the output pipeline continues to work.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
