---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Multilingual
meta_description: Research Progress: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page is intended for the scenario of annual progress and acceptance of research projects, covering three types of materials: annual progress reports, mid-term review materials, and acceptance reports, as well as the unified terminology list and comparison draft formed in multilingual materials and terminology processing. Annual progress reports focus on phase tasks, indicators, and dates; mid-term review materials focus on progress deviations and adjustment explanations; acceptance reports focus on achievement lists, signatures, and receipts. When these three types of materials enter the knowledge base retrieval node, each participates in retrieval as a citation source, and the cited snippets point back to the original paragraphs, for subsequent comparison of fields, ledger writing, and report generation. The update rhythm advances with project milestones, and versions need to be synchronized; field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and the same record should be able to align across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The "unified terminology list and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields include phase tasks, indicators, dates, and signatures; terminology usage must be consistent throughout | Open the citation markers, compare item by item against the source document, and verify whether names, quantities, and dates match the original text |
| Mid-term review materials | Fields include progress deviations, adjustment explanations, and receipts; translated names must be able to point back to the original text | Open the citation markers in the conversation, verify that cited snippets correspond to the original paragraphs, and record the number of array items |
| Acceptance report | Fields include achievement lists, signatures, and receipts; the version must be synchronized with the progress materials | Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues, and verify the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Unified terminology list and comparison draft | The same term is consistent throughout; translated names can point back to the original text | Sample three terms and check whether their usage is consistent throughout, verify that `quoteMaxToken` is the citation content budget, and record the number of array items separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The versions of the two materials are not synchronized, and the cited snippets each point back to different versions of the original text.
- Symptom: Mid-term review materials lack signatures or receipts, and this is only discovered during the acceptance stage. Cause: When the materials entered retrieval, field completeness was not checked; although the citation array is non-empty, it lacks key source identifiers.
- Symptom: There are no citation markers in the answer, or the cited snippets do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, rather than directly attributing it to length trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, verify whether the citation array and markers can point back to the original text, and verify the source identifiers in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Sample three terms and check whether their usage is consistent throughout

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; verify that `quoteMaxToken` is the citation content budget, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
