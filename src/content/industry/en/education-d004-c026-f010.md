---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Handover
meta_description: Degree Certificates: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the drafting of materials and the handover of responsibility in degree conferral and certificate information reporting, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information, course and grade fields; the thesis review form carries review comments, review conclusions, and date fields; the defense resolution carries defense conclusions, voting results, and signature fields. During the drafting stage, each of the three types of materials generates its own draft, and after entering the knowledge base retrieval node, they are referenced back one by one as citation sources; during the handover stage, the drafts and handover records are circulated together, and only when the fields are complete, the responsible person is clear, and the version and date are consistent can they be handed over to the next stage for acceptance. The material update rhythm follows batch reporting, and the name, quantity, and date of the same record must be aligned between the two types of materials, and signatures and receipts must not be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Signable material drafts and handover records" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, date, and signature are complete, and whether the name, quantity, and date of the same record in the thesis review form are aligned | Compare field by field the name, degree category, and course grades in the application form with the corresponding items in the review form and defense resolution, check whether signatures and receipts are missing, and record the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Thesis review form | Whether the review comments, review conclusions, and date are consistent with the defense resolution, and whether the version is synchronized | Open the citation marker to trace back to the source document, check whether the review conclusions and the conclusion statements and dates in the defense resolution are the same version, and confirm that the source identifier in `quoteList` can trace back to the original paragraph |
| Defense resolution | Whether the defense conclusion, voting results, and signature are complete, and whether the responsible person is clear | Check the voting results and signature column in the resolution, confirm that the responsible person and version date in the handover record are consistent, and check the value of `quoteMaxToken` as the citation content budget |
| Cited content array | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, record the array length, and separately check the tokens budget of the cited text |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: They were filled in independently during drafting, without cross-checking against the same source.
- Symptom: The versions of the thesis review form and the defense resolution are not synchronized, and different conclusion statements are discovered only at the acceptance stage. Cause: The handover record did not register the version and date, and drafts and final versions were mixed.
- Symptom: The defense resolution lacks a signature or receipt, and the materials cannot enter the next stage. Cause: The responsibility handover did not verify the signature column and receipt item by item, and missing items were not blocked.

## How to verify the setup

Acceptance of this feature: Ask a question with original text support, check whether the citation array and markers can trace back to the original text, and check the source identifiers in `quoteList` within `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- In the conversation, open the citation markers and check against the source documents whether each citation can trace back to the original paragraph; run a test with a question that has no matching materials, record the array length, and separately check the tokens budget of the cited text, confirming that `quoteMaxToken` is not compared for equality with the number of items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
