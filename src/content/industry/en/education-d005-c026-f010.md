---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Versions
meta_description: Degree Certificates: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes

## What this category's data looks like

Degree conferral and certificate information reporting involves degree application forms, thesis review forms, defense resolutions, and other materials, and each material carries different fields: the application form contains basic personal information and course grades, the review form contains review comments and scores, and the defense resolution contains voting results and signatures. When these materials enter the knowledge base retrieval node, each is retrieved and output as an independent citation source. Data versions and change maintenance require the same record to be consistent across materials in name, quantity, and date, with complete signatures and receipts. The update cadence usually advances with batch reporting, and after materials are revised, the knowledge base or external documents must be updated in sync to ensure the current version is unique, old versions are traceable, and citations are synchronized. When materials enter this feature, each material is cited as an original text snippet, and the source identifier points to the corresponding document, for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks
The citation output of the knowledge base retrieval node outputs only the citation content array, each entry containing an original text snippet and a source identifier, and the length can be 0. The version ledger and change records must be handled afterward by subsequent AI nodes, code nodes, or manual work. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures are consistent with the defense resolution, and whether the name, quantity, and date of the same record match | Open the citation marker to trace back to the original text, check the name, student ID, date, and signature fields item by item; check whether the version number is consistent with the current version |
| Thesis review form | Whether the review comments, scores, and dates match the application form and defense resolution, and whether signatures or receipts are complete | Verify the reviewer's signature and date against the source document; confirm that the cited snippet comes from the current version and that old versions are traceable |
| Defense resolution | Whether the voting results, defense date, and signatures are consistent with the application form and review form, and whether the version is synchronized | Open the citation marker in the conversation, check the resolution fields and signatures; check whether the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal; `quoteMaxToken` is the citation content budget, and the number of array entries is recorded separately | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; check that the source identifiers in `quoteList` correspond to the original text paragraphs |

## Three common errors
- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: After the materials were revised, the knowledge base was not updated in sync, and the citation still points to the old version of the original text.
- Symptom: The thesis review form lacks a signature or receipt, but the cited snippet appears complete. Cause: The scanned copy and the original version were not synchronized, and the retrieval hit an unsigned version.
- Symptom: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length trimming.

## How to verify the setup
Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content, and see whether the version number and citations are updated in sync.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model, and that the number of citations matches the array length in `responseData`.
- Open the citation marker in the conversation, verify the fields, dates, and signatures against the source document, and check that the original text snippets in `quoteList` correspond to the source identifiers.

The citation output of the knowledge base retrieval node outputs only the citation content array, each entry containing an original text snippet and a source identifier, and the length can be 0. The version ledger and change records must be handled afterward by subsequent AI nodes, code nodes, or manual work. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: After the materials were revised, the knowledge base was not updated in sync, and the citation still points to the old version of the original text.
- Symptom: The thesis review form lacks a signature or receipt, but the cited snippet appears complete. Cause: The scanned copy and the original version were not synchronized, and the retrieval hit an unsigned version.
- Symptom: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length trimming.

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
