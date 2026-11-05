---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Multilingual
meta_description: Kindergarten Quality: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page is for the scenario of kindergarten operation behavior and quality self-assessment. Materials include self-assessment reports, issue lists, rectification plans, and multilingual terminology glossaries and comparison drafts. The self-assessment report carries descriptions of operation behavior and quality judgments; the issue list records item-by-item matters to be corrected; the rectification plan gives responsibilities and deadlines. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent source. Retrieval results are returned as an array of cited content, each containing an original text snippet and a source identifier, for subsequent nodes or manual comparison of fields, ledger writing, and report generation. Field characteristics center on names, quantities, dates, signatures, and receipts: the names, quantities, and dates of the same record in two materials often do not match; unsynchronized versions can cause an old draft to overwrite a new one; missing signatures or receipts make the rectification loop incomplete. The update rhythm advances with the self-assessment cycle and rectification batches. Multilingual materials also need to ensure that the same term is consistent throughout and that translated names can refer back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text snippet and a source identifier, and the length can be 0. "Unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether fields, dates, and signatures match the issue list and rectification plan | In the citation array, refer back item by item to the original paragraphs, compare the names, quantities, and dates of the same record, and check whether signatures and receipts are complete |
| Issue list | Whether the names, quantities, and dates of the same record in the two materials are consistent | Open the citation superscripts to compare against the source documents, check whether versions are synchronized, and record the number of array entries and the tokens of the cited text; do not compare the two for equality |
| Rectification plan | Whether the responsibilities, deadlines, and receipts of rectification items can be traced back to the original text | Sample three terms and check whether their spelling is consistent throughout, check whether translated names can refer back to the original text, and list separately items missing signatures or receipts |
| Knowledge base retrieval node | Whether the associated knowledge bases use the same vector model, and whether the search parameters are consistent with the values in the knowledge base retrieval section | In the node, check the selected collections and their vector models, open the search parameter panel and check item by item, and confirm the fields corresponding to `quoteMaxToken`, `responseData` (non-streaming module results returned with detailed output enabled), and `quoteList` |

## Three common errors

- Symptom: The names, quantities, and dates of the same record in the self-assessment report and rectification plan do not match. Cause: The two materials are maintained separately, no field-level comparison is performed, and the cited snippets each refer back to different sources.
- Symptom: The issue list has been updated, but the self-assessment report still cites the old draft. Cause: Versions are not synchronized, the old version remains in the associated knowledge base, and retrieval hits the old snippet.
- Symptom: The rectification plan lacks signatures or receipts, so the loop is incomplete. Cause: Signatures and receipts were not stored in the knowledge base together with the materials, and the corresponding original text snippets cannot be found in the citation array.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline still runs, and record the number of array entries and the tokens of the cited text, without comparing the two for equality.

Business test: sample three terms and check whether their spelling is consistent throughout

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check item by item the fields corresponding to `quoteMaxToken`, `responseData`, and `quoteList`
- Run a trial with a question that has no matching materials, see that the output is empty while the pipeline continues, then open the citation superscripts to compare against the source documents and check whether each citation can refer back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
