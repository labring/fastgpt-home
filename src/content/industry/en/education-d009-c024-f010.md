---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Multilingual
meta_description: Graduate Admissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, three types of materials are used in parallel: re-examination plans, candidate score sheets, and transfer lists. Fields cover candidate name, ID, preliminary and re-examination scores, ranking, proposed admission conclusion, dates, and signature receipts. The same record often appears in two materials with mismatched names, quantities, or dates; versions may be out of sync, and signatures or receipts may be missing. Multilingual materials and terminology handling require the same term to be consistent throughout and translated names to be traceable back to the source text. Therefore, when materials enter the knowledge base retrieval node, each plays a different role: the re-examination plan provides the original process and rules, the candidate score sheet provides itemized data and ranking basis, and the transfer list provides personnel changes and confirmation records. The update rhythm advances with admission batches, materials are replaced on a rolling basis by batch, and citation sources must retain the original text snippets and source identifiers to facilitate subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The "unified terminology table and comparison draft" is completed afterward by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields include process nodes, dates, and signature fields; the dates and signatures of the same record in two materials must match | Check the dates and signature fields in the plan against the score sheet and transfer list item by item; open the search parameter panel to check the values, and record the citation array length and `quoteMaxToken` |
| Candidate score sheet | Fields include candidate ID, preliminary and re-examination scores, and ranking; quantities and names must be consistent with the plan and list | Extract three terms and check whether their spelling is consistent throughout; check the names, quantities, and dates in the score sheet and plan; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array structure |
| Transfer list | Fields include transferred personnel, confirmation status, and receipts; versions must be in sync and signatures or receipts must not be missing | Check the names, quantities, and dates of the same record in the list and score sheet; open the citation marker to compare with the source document, and use `quoteList` to view a single citation snippet |

## Three common errors

- Symptom: the name, quantity, or date of the same candidate in two materials does not match. Cause: material versions are not in sync, each is updated independently, and citation sources do not point back to the same original text passage.
- Symptom: the transfer list is missing signatures or receipts. Cause: the confirmation step is not closed-loop, signing is not completed before the material enters retrieval, and citation snippets cannot cover the signature page.
- Symptom: there is no citation marker in the answer. Cause: no material was matched in this round or the citation array is empty; the chain still runs through, so first check the hit situation before looking at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with source-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget without comparing the two for equality.

Business test: extract three terms and check whether their spelling is consistent throughout

- Open the search parameter panel and check the values item by item; run a test with a question that has no matching material and see that the output is empty while the chain continues
- Open the citation marker in the conversation, compare with the source document, and check whether each citation can point back to the original text passage

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
