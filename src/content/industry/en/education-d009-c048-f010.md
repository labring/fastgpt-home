---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Multilingual
meta_description: Joint Education: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-Foreign cooperative education institutions. The core materials are the establishment application, the cooperation agreement, the articles of association, the annual report statements, and the receipt. The establishment application contains the institution name, education level, program offerings, enrollment scale, signature, and date fields; the cooperation agreement contains the names of the Chinese and foreign parties, the contribution amounts, the validity period, and the signature page; the articles of association contain the governance structure, the rules of procedure, and the signing and effective dates; the annual report statements contain the annual enrollment number, the number of enrolled students, the number of graduates, the financial data, and the submission receipt. In multilingual materials and terminology handling, the establishment application is used to extract fields and original wording, the cooperation agreement is used to verify the names of both parties, the amounts, and the dates, the articles of association are used to check the governance clauses and effective information, and the annual report statements are used to compare the annual data and the receipt status. The material update rhythm is centralized submission during the establishment stage and rolling annual submission for annual reports, with versions anchored by the signature page and the receipt date. When the materials enter the knowledge base retrieval node, each is retrieved as a citation source, outputting citation snippets and source identifiers for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and a source identifier, and the length may be 0. The "unified terminology table and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the name, quantity, date, and signature are consistent with the cooperation agreement and the articles of association | Retrieve the institution name and enrollment scale in the citation output, compare them with the corresponding fields in the cooperation agreement and the articles of association, and check the signature page date and signature |
| Cooperation agreement | Whether the names of the Chinese and foreign parties, contribution amounts, validity period, and signing date are consistent with the application and the annual report | Retrieve the citation snippets, compare the names of both parties and the amounts item by item, check the validity period and the signature page, and view the source identifier in `quoteList` |
| Articles of association | Whether the governance clauses, effective date, and signature are synchronized with the application and the cooperation agreement | Retrieve the effective clauses of the articles of association, compare the dates and signatures with the application and the cooperation agreement, and check whether the versions are synchronized |
| Annual report statements | Whether the annual enrollment number, number of enrolled students, number of graduates, and receipt are consistent with the establishment materials | Extract the annual data in the citation output, compare it with the establishment application and the cooperation agreement, and check whether the receipt is complete |

## Three common errors

- Phenomenon: the same institution name is written differently in the establishment application and the cooperation agreement. Cause: terminology was not unified during the transcription of multilingual materials, so the same record's name does not match across the two materials; this can be found after the citation snippet points back to the original text.
- Phenomenon: the enrollment scale or contribution amount is inconsistent between the application and the annual report. Cause: the versions are not synchronized, the old material is still hit in the knowledge base, and the citation output returns an outdated snippet.
- Phenomenon: the articles of association or the cooperation agreement lacks a signature or a receipt. Cause: an omission occurred during the material submission step, the signature page in the citation snippet is empty, and the ledger and report therefore cannot confirm the effective status.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and the superscript can point back to the original text, and view the number of citations and the source identifier in `responseData` (non-streaming module results returned with detailed output enabled); then ask a question with no matching material, confirm that the array is empty while the pipeline runs through, and note that `quoteMaxToken` is only the citation content budget, with the array count recorded separately.

Business test: sample three terms and check whether their spelling is consistent throughout the document, whether the translated name can point back to the original text, and whether the source identifier in `quoteList` corresponds to the original paragraph.

- In the node, check whether the selected knowledge base uses the same vector model, open the search parameter panel, and check the values item by item to be consistent with the knowledge base retrieval section.
- Run a test with a question that has no matching material, see that the citation output is empty while the pipeline continues, and record the array length and the tokens of the citation text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
