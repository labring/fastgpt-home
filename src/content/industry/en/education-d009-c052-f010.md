---
title: Citations and Source Traceability for College Admissions and Application Placement: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Multilingual
meta_description: College Admissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page focuses on multilingual materials and terminology processing in the context of regular higher education institution admissions enrollment and filing. The materials include three categories: enrollment plans, filing rules, and admission rosters. Enrollment plans provide major codes, planned numbers, batches, and dates; filing rules provide filing ratios, volunteer grade differences, tie-breaking sorting, and signature requirements; admission rosters provide candidate numbers, names, admitted majors, admission dates, and receipts. When these three categories of materials enter the knowledge base retrieval node, each is cited as an independent source. Cited snippets retain the original paragraphs and source identifiers for subsequent field comparison, ledger writing, and generation of a unified terminology table and comparison draft. The update rhythm changes with batch progression and version revisions. The same record may have inconsistent names, quantities, or dates across different materials. Version desynchronization, missing signatures, or missing receipts may also occur. Terminology processing must ensure that the same term is consistent throughout the entire text and that translated names can refer back to the original text. Before external release, sample three terms to check their usage throughout the entire text.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content. Each entry contains an original snippet and a source identifier. The length can be 0. The unified terminology table and comparison draft must be subsequently handled by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is retrieved, the output pipeline will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plans | Check the major code, planned number, batch, and date fields, and confirm that the name, quantity, and date of the same record match across the two materials | Open the citation superscript, compare field by field against the source document, record the number of array entries and the tokens of the cited text; `quoteMaxToken` is only a content budget |
| Filing rules | Check the filing ratio, volunteer grade difference, tie-breaking sorting, and signature requirements, and confirm that versions are synchronized and that signatures or receipts are not missing | Open the citation superscript in the conversation to refer back to the original paragraph, use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, and `quoteList` to expand the source identifier |
| Admission rosters | Check the candidate number, name, admitted major, admission date, and receipt, and confirm that the name, quantity, and date of the same record are consistent | Sample three terms to check whether their usage is consistent throughout the entire text. If cited snippets do not match the original text, first check the hit material and then check trimming |
| Unified terminology table and comparison draft | Check that the same term is consistent throughout the entire text and that translated names can refer back to the original text. Complete the comparison before external release | Run a test with a question that has no matching material, observe that the output is empty while the pipeline continues, and record the number of array entries separately |

## Three common errors

- Phenomenon: The same candidate has different spellings of their name or major name in the enrollment plan and the admission roster. Cause: The two materials are entered at different stages, terminology is not unified, cited snippets each refer back to their own original text, and no cross-material comparison has been performed.
- Phenomenon: After the filing rules are updated, cited snippets still point to clauses in the old version. Cause: The knowledge base has not synchronized the version, retrieval hits old materials, and the citation array is inconsistent with the current rules. The version date needs to be checked.
- Phenomenon: The admission roster lacks signatures or receipts, and cited snippets cannot refer back to the complete record. Cause: Material archiving is incomplete, retrieval returns only partial paragraphs, and the number of array entries matches the hit material but fields are missing.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text evidence and check whether the citation array and superscript can refer back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the content budget; the two are not compared for equality.

Business test: Sample three terms to check whether their usage is consistent throughout the entire text, verify that the same term is consistent throughout the entire text and that translated names can refer back to the original text, and complete the comparison before external release.

- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and check the selected collections and their vector models.
- Open the citation superscript in the conversation, check against the source document whether each citation can refer back to the original paragraph, use `responseData` to view the citation array, and `quoteList` to expand the source identifier.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
