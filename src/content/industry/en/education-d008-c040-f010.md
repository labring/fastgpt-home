---
title: Citations and Source Traceability for New Employee Onboarding and Training: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Access
meta_description: Employee Onboarding: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Manage Authorized Access and External Services

## What this category's data looks like

Enterprise new-employee onboarding training materials include three types: onboarding training plans, course sign-in sheets, and job descriptions. Fields include name, position, date, quantity, and signature. The onboarding training plan lists courses and trainees; the sign-in sheet records actual attendance and acknowledgments; the job description defines responsibilities and reporting lines. Materials are updated by batch. When versions are not synchronized, the name, quantity, and date of the same record do not match across the two materials, and missing signatures or acknowledgments are also common. When materials enter the knowledge base retrieval node, each serves as a citable original-text passage, used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text fragment and a source identifier, and the length can be 0. The externally available entry point and authorization scope are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Fields include course, date, and trainees; compare names and dates item by item with the sign-in sheet | Open the citation marker and compare against the original-text passage of the plan; check the number of items in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Course sign-in sheet | Fields include sign-in time, signature, and acknowledgment; compare with the planned number of people and date | Access once with a restricted identity and see whether the visible scope matches the setting; check the source identifier in `quoteList` |
| Job description | Fields include position name, responsibilities, and reporting line; compare with the position field in the plan | In the search parameter panel, check that `quoteMaxToken` is consistent with the value in the knowledge base retrieval section |
| Citation content output | The number of returned items matches the materials hit; empty is also normal | Run a test with a question that has no matching materials and see that the output is empty while the flow continues |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the plan and the sign-in sheet. Cause: The two materials are updated separately, and no field-level comparison was performed.
- Symptom: The version of the job description is not synchronized, and responsibilities and reporting lines are still the old version. Cause: The update cadence is inconsistent, and the version was not checked when citing.
- Symptom: The sign-in sheet lacks a signature or acknowledgment but is still cited as a valid record. Cause: The completeness of signatures and acknowledgments was not checked before the materials entered the retrieval node.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and marker can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the flow runs through.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- Open the citation marker, compare against the source document, and check that the cited fragment corresponds to the original text.
- Run a test with a question that has no matching materials and see that the output is empty while the flow continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
