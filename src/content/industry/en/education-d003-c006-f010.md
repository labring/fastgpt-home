---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Intake
meta_description: Kindergarten Quality: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the kindergarten operation behavior and quality self-assessment scenario, involving three types of materials: self-assessment reports, issue lists, and rectification plans. The self-assessment report provides an overall description of operation behavior and self-assessment conclusions; the issue list sets out specific missing items and entries to be rectified; the rectification plan gives responsibility assignments and time arrangements. When these three types of materials enter the Q&A intake and missing-item follow-up function, each plays a different role: the self-assessment report serves as background evidence, the issue list serves as the source for identifying missing items, and the rectification plan serves as a reference for subsequent tracking. The material update cadence usually rolls forward by semester or rectification cycle, and field characteristics include kindergarten name, record name, quantity, date, signature, and receipt. Common field inconsistencies appear as the same record's name, quantity, or date not matching across two materials, versions not being synchronized, or missing signatures or receipts. After these materials enter the knowledge base retrieval node, the citation output provides the original text snippets and source identifiers for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of citation content, each entry containing an original text snippet and a source identifier, and its length can be 0; the intake records and the completed follow-up questions must be handled next by subsequent AI nodes, code nodes, or humans. The citation content is output as an array, and its length can be 0; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Check whether the name, quantity, date, and signature are consistent with the issue list and rectification plan | Open the citation superscript to compare against the original paragraphs, and record the number of citations and the `quoteMaxToken` budget values separately |
| Issue list | Check whether missing items are identified and followed up on, and whether answers are grounded in the materials | Run a trial with a question missing key information to see whether it asks a follow-up before answering, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Rectification plan | Check whether versions are synchronized and whether signatures and receipts are complete | Open the citation superscript in the conversation, and compare the original text snippets and source identifiers in `quoteList` against the source documents |
| Associated knowledge base | Check whether the selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models, and open the search parameter panel to verify each item one by one |

## Three common errors

- Symptom: the same record's name, quantity, or date does not match between the self-assessment report and the issue list. Cause: the two materials are maintained separately, without field-level comparison and synchronized updates.
- Symptom: the rectification plan version is not synchronized, and old-version entries are still cited. Cause: after the materials were updated, they were not re-entered into the knowledge base, so retrieval hit old snippets.
- Symptom: missing signatures or receipts, and incomplete intake records. Cause: the signature and receipt fields were not verified during the material circulation step, and the materials directly entered Q&A intake.

## How to verify the setup

This function's acceptance: ask a question that has original-text grounding, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget values separately, without making an equality comparison.

Business test: raise a question missing key information to see whether it asks a follow-up before answering; if the answer has no citation superscripts or there is an answer but the citation array is empty, first check whether this round hit anything and which material was hit, then look at trimming.

- In the conversation, open the citation superscripts, and verify the original text snippets and source identifiers in `quoteList` one by one against the source documents, confirming that each citation can point back to the original paragraph.
- Run a trial with a question that has no matching materials to see the output is empty while the chain continues, and record the number of citations and the `quoteMaxToken` budget values separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
