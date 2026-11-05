---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Multilingual
meta_description: Compliance Training: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Handle Multilingual Materials and Terminology

## What this category's data looks like

Corporate compliance and safety training materials include three categories: compliance training courseware, safety operating procedures, and exam records. Courseware comes from regulatory compilations and internal policies, updated quarterly with regulatory changes; procedures come from equipment manuals and work standards, replaced by version number; exam records come from training sign-ins and answer receipts, containing name, subject, date, and signature fields. When materials enter the knowledge base retrieval node, the node outputs only an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0; the unified terminology table and comparison draft are completed subsequently by AI nodes, code nodes, or manually. The terminology table requires that the same term be consistent throughout the entire text and that the translated name can refer back to the original text, so the source identifier and original text snippet of each material must appear in pairs, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "unified terminology table and comparison draft" are completed subsequently by AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | The same term is written consistently throughout the entire text, and the translated name can refer back to the original paragraph | Open the citation superscripts, compare them one by one against the source documents, and check the original text snippet and terminology wording in `quoteList` |
| Safety operating procedures | Names, quantities, and dates match the exam records, and the version has been synchronized | Sample three terms and check their wording throughout the entire text, and check that the number of items in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Exam records | Signature or receipt fields are complete, and dates among records do not conflict | Run a test with a question that has no matching materials, and see that the array is empty while the pipeline continues, with `quoteMaxToken` used only as a content budget |
| Unified terminology table and comparison draft | Terminology is consistent throughout the entire text and can refer back to the original text, and the number of citations is recorded separately | Check that the tokens of the cited text and the number of array items are recorded separately, and do not compare them for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The courseware and procedure versions are not synchronized, and the cited snippets are taken from different versions.
- Symptom: There are no citation superscripts in the answer. Cause: No materials were hit in this round, the citation array is empty, and the pipeline still runs through; the hit situation must be checked first.
- Symptom: Exam records are missing signatures or receipts. Cause: The record snippets were not updated with the version, and the citation source identifier still points to the old receipt.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: sample three terms and check whether their wording is consistent throughout the entire text

- In the node, check whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and check the values item by item to be consistent with the knowledge base retrieval section

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
