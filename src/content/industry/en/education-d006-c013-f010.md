---
title: Citations and Source Traceability for School Teacher Training Credits: Track Progress and Check Statistics
slug: /en/industry/education-d006-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Progress
meta_description: Teacher Credits: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. Materials include training notices, credit recognition forms, and participant rosters. Training notices provide the project name, training start and end dates, and the organizing unit; credit recognition forms provide the credit amount, recognition conclusion, and signature field; participant rosters provide teacher names, units, participation dates, and receipts. After these three types of materials enter the knowledge base retrieval node, each is retrieved and back-referenced as a cited source, and is used for subsequent field comparison, ledger writing, and report generation. The update cadence advances by training batch: notices are issued first, rosters are updated on a rolling basis with registration and sign-in, and recognition forms are signed afterward upon project completion. Field characteristics center on names, quantities, dates, signatures, and receipts. The same record may have different name spellings, or inconsistent quantities or dates, across different materials, and when versions are not synchronized, missing signatures or receipts are more likely to occur.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, training start and end dates, organizing unit, and signature field are complete, and whether the date scope is written in the header | In the node, check the selected knowledge base and vector model, open the citation marker, and compare it against the original notice paragraph |
| Credit recognition form | Whether the credit amount, recognition conclusion, signature, and receipt match the participant roster, and whether the versions are synchronized | Compare the names, quantities, and dates in the recognition form and the roster one by one, record exceptions, and note the source identifier |
| Participant roster | Whether teacher names, units, participation dates, and receipts correspond to the notice project, and whether missing signatures or receipts are marked | Run a test with a question that has no matching material, see whether the citation array is empty while the chain continues, and record `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; the cited snippets can be traced back to the original text | Open the search parameter panel and check each item; when the citation limit is involved, check the tokens of the cited text, and record the array item count separately |

## Three common errors

- Symptom: The project name, quantity, or date of the same record does not match between the training notice and the participant roster. Cause: The two materials are filled in by different stages, the field scope is not unified, and the statistical scope and exceptions are not written in the header.
- Symptom: The credit recognition form and the participant roster are not synchronized in version, and the old version is still retrieved and matched. Cause: The update cadence is not aligned, and after replacing materials, the document versions in the selected knowledge base are not rechecked.
- Symptom: The recognition form lacks a signature or receipt, and the cited snippet cannot be traced back to the complete original text. Cause: The post-completion supplementary signature is not finished, and the signature field and receipt field are not validated when the materials are ingested, weakening the correspondence between citations and the original text.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and citation markers can be traced back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and record `quoteList` within `responseData`.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written; when the citation limit is involved, check the tokens of the cited text, record the array item count separately, and do not compare it for equality with `quoteMaxToken`.

- In the node, check the selected knowledge bases and their vector models, and open the search parameter panel to check each value item by item.
- Open the citation markers in the conversation, check whether the cited snippets are consistent with the original text against the source documents, and record exceptions.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
