---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Multilingual
meta_description: Dropout Prevention: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses multilingual materials and terminology processing in the context of compulsory education dropout prevention and schooling guarantee. The materials come from three categories: dropout risk ledgers, return-to-school persuasion records, and home visit records. The ledger carries students' basic information, risk levels, and dates; the persuasion records carry the number of persuasion attempts, outcomes, and receipts; the home visit records carry visit dates, signatures, and attachments. The three categories of materials often exist in parallel in different language versions. After entering the knowledge base retrieval node, each serves as a citation source, providing original text fragments and source identifiers for the unified terminology glossary and the comparison draft. The update rhythm rolls forward with the progress of persuasion and home visits, and the field characteristics center on names, quantities, dates, and signature receipts. The terminology glossary must ensure that the same term is consistent throughout the entire text and that the translated name can refer back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content. Each entry contains an original text fragment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Names, quantities, dates, and signatures must be consistent across the three categories of materials | Extract the student identifiers and risk levels from the ledger, and compare them with the same record names and dates in the return-to-school persuasion records and home visit records |
| Return-to-school persuasion records | The number of persuasion attempts, outcomes, and receipts must align with the ledger and home visit records | Check the dates, signatures, and receipts in the persuasion records, and inspect whether signatures or receipts are missing |
| Home visit records | Home visit dates, signatures, and attachments must be consistent with the ledger and persuasion records | Compare the same student names and dates in the home visit records and the ledger, and confirm that versions are synchronized |
| Citation content output | The number of entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, and check that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues; when the citation limit is involved, check the tokens of the citation text, record the number of array entries separately, and treat `quoteMaxToken` only as a content budget, not as something to compare for equality with the number of entries |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The multilingual versions were entered separately, without referring back to the original text for verification according to the unified terminology glossary.
- Symptom: Versions are not synchronized; the persuasion record and the home visit record cite the same event but have different dates. Cause: The update rhythm is inconsistent, and the old version is still participating in retrieval in the knowledge base.
- Symptom: Signatures or receipts are missing, and the cited fragments do not match the original text. Cause: The materials were not fully ingested into the knowledge base, or the citation superscript was not opened to verify the source document.

## How to verify the setup

Acceptance for this feature: ask a question that has original text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check the number of citations in `quoteList` and `responseData`.

Business test: select three terms and check whether their spelling is consistent throughout the entire text, and confirm that the translated names can refer back to the original text.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model.
- Open the citation superscripts in the conversation, compare them with the source documents, and check whether each citation can refer back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
