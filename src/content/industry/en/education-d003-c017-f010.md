---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Intake
meta_description: Undergraduate Programs: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the category of undergraduate program setup and dynamic adjustment typically include program setup application forms, talent cultivation plans, expert review opinions, and internal deliberation records and receipts. The application form carries fields such as the proposed program name, code, length of study, degree-granting category, faculty, and conditions, and includes the form completion date and the signature of the person in charge; the talent cultivation plan carries the cultivation objectives, course structure, credits and class hours, and study requirements, and includes the version number and approval date; the expert review opinions carry the review conclusion, expert list, professional titles and affiliations, and signing date, and include expert signatures. When the materials enter Q&A acceptance and missing-item follow-up, each plays a different role: the application form is used to confirm whether the applying entity and the program name are consistent, the talent cultivation plan is used to check the course and credit standards, and the expert review opinions are used to confirm whether the review procedure has been completed. The update rhythm changes with application batches and version revisions, and multiple versions of the plan may coexist for the same program. Field characteristics are cross-table relationships, dense dates, and signatures and receipts that are easily missing; names and quantities often need to be compared item by item between the form and the plan.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. "Acceptance records and completed follow-up questions" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether fields, dates, and signatures are complete, and whether the program name and code are consistent with the talent cultivation plan | Check the application form fields item by item, compare names, quantities, and dates, check signatures and receipts, and record the citation source identifiers |
| Talent cultivation plan | Whether the cultivation objectives, course structure, credits and class hours, and version number are consistent with the standards in the application form, and whether the approval date is traceable | Compare the plan version and approval date, check the credits and class hours quantities, and open the citation superscript to trace back to the original paragraph |
| Expert review opinions | Whether the review conclusion, expert list, professional titles and affiliations, and signing date are complete, and whether signatures are missing | Check the expert list and signing date, inspect the signature fields, and confirm that the cited snippets correspond to the original text |
| Cited content output | Whether the number of returned entries is consistent with the matched materials; being empty is also normal, and the number of citations is recorded by the array length | Run a test with a question that has no matching materials and see whether the output is empty while the pipeline continues; when the citation limit is involved, check the tokens of the cited text, record the array entry count separately, and check the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The same program name is written differently in the application form and the talent cultivation plan, and the quantities and dates also do not match. Cause: The two materials were filled in separately without cross-checking, and the versions were not synchronized.
- Symptom: The expert review opinions lack signatures or receipts, and the review date and deliberation date contradict each other in order. Cause: The signing step was not closed-loop, and the signature fields and receipts were not verified when the materials were archived.
- Symptom: There are no citation superscripts in the answer, or the cited snippets do not match the original text. Cause: It was not checked whether this round had a match or which material was matched, and the issue was directly attributed to length truncation.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, check whether the citation array and superscripts can trace back to the original text, and check the `quoteList` within `responseData` fields; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through.

Business test: ask a question missing key information and see whether it first asks a follow-up question before answering.

- In the node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
