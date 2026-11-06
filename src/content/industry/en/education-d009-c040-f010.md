---
title: Citations and Source Traceability for New Employee Onboarding and Training: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Multilingual
meta_description: Employee Onboarding: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Handle Multilingual Materials and Terminology

## What this category's data looks like

Onboarding training materials for enterprise new employees consist mainly of onboarding training plans, course sign-in sheets, and job descriptions, plus a unified terminology glossary and a comparison draft. The onboarding training plan gives the course name, date, and responsible position; the course sign-in sheet records personnel, sign-in time, and signature; the job description states the position name, responsibilities, and job requirements. The materials coexist in multiple languages, and the same term must be consistent throughout with a translated name that can be traced back to the original text. When entering the knowledge base retrieval node, the plan, sign-in sheet, and description are each cited as independent sources, and the cited snippets carry source identifiers for subsequent field comparison, ledger writing, and report generation. The update rhythm keeps pace with course scheduling and position adjustments; version desynchronization, missing signatures or receipts, and mismatches in name, quantity, and date for the same record are common problems.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | The course sign-in sheet and the plan must be consistent in the course name, date, and responsible position fields, and signatures and receipts must be complete | Open the citation superscript to compare against the source document, and compare the course name, date, and responsible position item by item; record the number of citations, i.e. the array length |
| Course sign-in sheet | The signed-in personnel, sign-in time, and signature must match the job description and the plan; a missing signature or receipt means inconsistency | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; check the citation array and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Job description | The position name, responsibilities, and job requirements must be consistent with the plan and the sign-in sheet, and the translated name can be traced back to the original text | Open the citation superscript in the conversation and compare against the source document; when the citation limit is involved, check the tokens of the cited text, and record the array length separately |
| Unified terminology glossary and comparison draft | The same term must be written consistently throughout, the translated name can be traced back to the original text, and versions must be synchronized | Sample three terms and check whether their writing is consistent throughout; open the search parameter panel and check the values item by item |

## Three common errors

- Symptom: the name and date of the same course do not match across two materials. Cause: the onboarding training plan and the course sign-in sheet are not version-synchronized, and the cited snippets come from different versions.
- Symptom: the sign-in sheet is missing a signature or receipt. Cause: the signature field was not completed when the material entered the retrieval node, and the cited snippet cannot be traced back to the complete original text.
- Symptom: the citation array is empty but the answer still has content. Cause: no materials were matched in this round; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: sample three terms and check whether their writing is consistent throughout.

- In the node, check the selected collections and their vector models; open the search parameter panel and check the values item by item.
- Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; check the number of citations and source identifiers in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
