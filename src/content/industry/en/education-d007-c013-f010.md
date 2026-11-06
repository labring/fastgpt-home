---
title: Citations and Source Traceability for School Teacher Training Credits: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Review
meta_description: Teacher Credits: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on credit management for primary and secondary school teacher training. The materials include training notices, credit recognition forms, and participant rosters. Training notices provide the project name, training dates, and a signature field for the organizer; credit recognition forms carry the credit amount, recognition date, and review signature; participant rosters record teacher names, units, participation dates, and receipts. Materials enter the knowledge base by project batch, and the update cadence follows notice reissues, roster supplements, and credit recognition form revisions. The field characteristics are four categories: name, quantity, date, and signature. The same record often appears in two materials with different name spellings, mismatched quantities or dates, unsynchronized versions, or missing signatures or receipts. After materials enter this feature, each is retrieved as a cited source, and the original text snippet is returned together with the source identifier for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and the source identifier, and the length can be 0. The "exception list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models |
| Training notice | The project name, training dates, and organizer signature field are complete | Compare against the original notice and verify the name, dates, and signature field |
| Credit recognition form | The credit amount, recognition date, and review signature can be traced back | Open the citation marker and compare against the source document of the recognition form |
| Participant roster | Teacher names, units, participation dates, and receipts are consistent | Compare the fields and dates of the roster with the notice and recognition form |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match across two materials. Cause: The notice and recognition form were revised separately, without field-level comparison.
- Symptom: The cited snippet does not match the original text. Cause: First check whether this round hit a match and which material was hit, then look at trimming.
- Symptom: Missing signatures or receipts, and versions are not synchronized. Cause: After materials are supplemented, they are not re-entered into retrieval, and the old version is still cited.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain still runs. Record the number of array items, and look separately at the citation text budget of `quoteMaxToken`; do not compare the two for equality.

Business test: create an exception record and see whether it can be traced to the source material.

- Open the search parameter panel and check item by item, and view the cited source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then compare against the source documents to verify the citation markers.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
