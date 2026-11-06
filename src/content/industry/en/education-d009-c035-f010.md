---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Multilingual
meta_description: Employee Skills: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of enterprise independent skilled talent evaluation. The materials are the enterprise evaluation filing form, evaluation specifications, and candidate roster. The filing form carries the evaluation institution, occupation name, level, and filing date; the evaluation specifications carry the assessment method, scoring rules, and terminology definitions; the roster carries candidate names, ID numbers, declared levels, and signature fields. When these three types of materials enter the knowledge base retrieval node, each is split and stored as a citation source. After a retrieval hit, the original text fragments and source identifiers are returned for subsequent nodes to compare fields, write ledgers, and generate reports. Material updates advance with the filing batches and candidate registration pace. The names, quantities, and dates of the same record must be aligned across the three materials, and versions and signature receipts must be synchronized.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology table and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Institution name, occupation name, level, filing date, and signature field are consistent across the three materials | Compare field by field the filing form with the evaluation specifications and roster; verify names, quantities, dates, and signature receipts |
| Evaluation specifications | The wording of terminology definitions and scoring rules is consistent throughout, and translated names can refer back to the original text | Open the citation superscript to compare against the source document; verify the source identifiers in `quoteList` and `responseData` (non-streaming module results returned with detailed output enabled) |
| Candidate roster | Candidate names, ID numbers, and declared levels are consistent with the corresponding records in the filing form and evaluation specifications | Spot-check three records; verify whether quantities, dates, and signature fields are missing or versions are not synchronized |
| Associated knowledge base | The selected knowledge base uses the same vector model | In the node, check the selected collections and their vector models; verify `quoteMaxToken` as the citation content budget |

## Three common errors

- Symptom: The same candidate's name, quantity, or date does not match between the roster and the filing form. Cause: Materials were entered in batches, and fields and signature receipts were not aligned by batch.
- Symptom: After the evaluation specifications are updated, the terminology table still uses the old translated names. Cause: Versions are not synchronized, and old materials are still retrieved from the knowledge base.
- Symptom: The answer has content but the citation array is empty, or the cited fragments do not match the original text. Cause: No materials were hit in this round, or the superscript source identifiers are misaligned with the original paragraphs.

## How to verify the setup

Acceptance for this feature: Ask a terminology question that has original text support, verify whether the citation array and superscripts can refer back to the original paragraphs, and verify the source identifiers in `quoteList` and `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs.

Business test: Select three terms and check whether their wording is consistent throughout, verify whether the translated names can refer back to the original text, and record the number of citations and the `quoteMaxToken` budget for separate verification.

- Run a test with a query that has no matching materials; see that the output is empty while the pipeline continues, and record the citation count separately by array length.
- Open the search parameter panel and check the values item by item, and compare the cited fragments with the original paragraphs against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
