---
title: Citations and Source Traceability for College Entrance Exam Application Eligibility: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c051-f010
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Citations | Multilingual
meta_description: Entrance Exam Eligibility: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Entrance Exam Application Eligibility: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the qualification review stage of general college entrance examination registration, the materials are mainly the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The fields involve the candidate's name, ID number, household registration address, student status number, school attended, guardian information, signature, and receipt date. When these materials enter the knowledge base retrieval node, each plays a different role: the registration form provides the candidate's basic information and examination category, the household registration and student status certificates provide the correspondence between household registration and student status, and the materials for children accompanying migrant workers provide additional conditions such as residence and social insurance. Multilingual materials and terminology handling require a unified terminology glossary and a comparison draft, so that the same term is written consistently throughout the text and the translated name can refer back to the original text. The update pace of materials is affected by registration batches and review nodes. If versions are not synchronized, if the name, quantity, or date of the same record does not match across two materials, or if signatures or receipts are missing, subsequent comparison fields and ledger writing will be affected.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft are then completed by subsequent AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether the fields, dates, and signatures are consistent with the household registration and student status certificates | Check the candidate's name, ID number, examination category, signature, and receipt date, and record the citation source in `responseData` (non-streaming module results returned with detailed output enabled) |
| Household registration and student status certificates | Whether the name, quantity, and date of the same record match across the two materials | Compare the household registration address, student status number, and school attended with the fields in the registration form, and check whether the cited fragment in `quoteList` can refer back to the original text |
| Materials for children accompanying migrant workers | Whether the versions are synchronized, and whether signatures or receipts are missing | Check the guardian information and the versions of residence and social insurance materials, and confirm that the citation array length is consistent with the matched materials |
| Unified terminology glossary and comparison draft | Whether the same term is written consistently throughout the text, and whether the translated name can refer back to the original text | Sample three terms and check their writing throughout the text, and verify the tokens of the cited text under the `quoteMaxToken` budget |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the registration form and the household registration and student status certificates. Cause: The material versions are not synchronized, and the cited fragment only matches one of them.
- Phenomenon: The materials for children accompanying migrant workers lack signatures or receipts, and the review comparison cannot be closed. Cause: The signature and seal page was not checked during upload, and the citation array did not cover that page.
- Phenomenon: There are no citation superscripts in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming.

## How to verify the setup

Acceptance of this function: Ask a terminology question with original text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs.

Business test: Sample three terms and check whether their writing is consistent throughout the text

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model.
- Run a trial with a question that has no matching materials, and see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
