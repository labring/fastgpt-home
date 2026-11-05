---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Multilingual
meta_description: Degree Certificates: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. Materials include degree application forms, thesis review forms, defense resolutions, as well as multilingual certificate information and terminology entries. The degree application form carries the applicant's identity, discipline, and date fields; the thesis review form carries review comments, reviewers, and signature fields; the defense resolution carries the defense conclusion, voting results, date, and signatures. When these three types of materials enter this feature, they serve as the original text sources for knowledge base retrieval, providing traceable original text snippets for the terminology glossary and the bilingual draft. The name, discipline name, and date of the same record in the application form and the resolution must be consistent, and the quantity and conclusions in the review form and the resolution must correspond. After materials are updated, the knowledge base documents must be replaced accordingly to prevent the old version from continuing to be retrieved. Field characteristics are concentrated in name, discipline, date, signature, and receipt; multilingual materials also need to ensure that translated names can be traced back to the original text paragraphs.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text snippet and a source identifier; the length can be 0. The unified terminology glossary and the bilingual draft must be handled subsequently by AI nodes, code nodes, or manually. Even if no content is found, this output pipeline will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The name, discipline name, and date fields must be consistent with the defense resolution, and the signature field must not be blank | Open the citation marker to trace back to the original text paragraph, and compare the wording of the application form and the resolution field by field |
| Thesis review form | The quantity and conclusions in the review comments must correspond to the defense resolution, and the reviewer signatures and receipt must be complete | Check whether the cited snippet is consistent with the original text, and verify whether the dates and quantities in the review form and the resolution match |
| Defense resolution | The defense conclusion, voting results, date, and signatures must form a closed loop with the application form and the review form | Cross-check the same record across the three materials to confirm version synchronization and no missing signatures |
| Multilingual terminology entry | The same term is written consistently throughout, and the translated name can be traced back to the original text paragraph | Sample three terms to check whether their wording is consistent throughout, and verify the translated names against the original source identifiers |

## Three common errors

- Phenomenon: The name and discipline name of the same record do not match between the degree application form and the defense resolution. Cause: Multilingual material translated names are not unified, or fields were entered without checking against the same terminology glossary.
- Phenomenon: The dates and quantities in the thesis review form and the defense resolution are inconsistent, and versions are not synchronized. Cause: After materials were updated, the knowledge base documents were not replaced, and the old version is still being retrieved.
- Phenomenon: The defense resolution is missing signatures or receipts, and the cited snippet does not match the original text. Cause: The scanned copy has missing pages or was cropped, the retrieved snippet is incomplete, and it does not trace back to the original text paragraph.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Record the number of array items, `quoteMaxToken`, and the cited snippets in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled); do not compare the number of items and the budget for equality.

Business test: sample three terms to check whether their wording is consistent throughout, verify whether the translated names can trace back to the original text paragraphs, and compare the fields, dates, and signatures of the application form, review form, and resolution.

- Open the search parameter panel and check item by item, confirm that the selected knowledge base uses the same vector model, and record the number of citations and the tokens of the cited text.
- Open the citation markers in the conversation, check against the source documents whether each citation can trace back to the original text paragraph; if a mismatch is found, first check the materials hit in this round, then check the cropping.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
