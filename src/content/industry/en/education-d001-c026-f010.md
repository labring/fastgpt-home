---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Evidence
meta_description: Degree Certificates: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Find Supporting Evidence

## What this category's data looks like

This page focuses on the business basis query in degree conferral and certificate information reporting, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form records the applicant's identity, discipline, and training unit fields; the thesis review form carries review comments, review date, and reviewer signature; the defense resolution records the defense conclusion, voting result, defense date, and defense committee signature. When these three types of materials enter the knowledge base retrieval node, each is vector-indexed as an independent source, and after a retrieval hit, the cited snippet points back to the original paragraph. Materials are updated by batch, the version is based on the current archived document, and historical versions should be distinguishable. In terms of field characteristics, names, quantities, dates, signatures, and receipts are the key points for verification, and the same record across materials must correspond item by item in the cited sources.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text snippet and source identifier; the length can be 0, and the basis entries that can point back to the original text must be handled subsequently by AI nodes, code nodes, or humans. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields must include applicant name, discipline, training unit, application date, and signature, and must match the same record's name and date in the thesis review form and defense resolution | Open the citation marker, compare against the original paragraph of the application form, and check names, quantities, dates, and signatures item by item |
| Thesis review form | Review comments, review date, and reviewer signature must be complete, and must be consistent with the review conclusion and date in the defense resolution | Check whether the cited snippet points back to the original paragraph of the review form, check whether signatures and receipts are missing, and whether the recorded version is current |
| Defense resolution | Defense conclusion, voting result, defense date, and defense committee signature must be complete, and must match the same record in the application form and review form | Check that the number of items in the citation array matches the hit materials, use `quoteList` to view the source identifier, and confirm version synchronization |
| Knowledge base retrieval node | The selected knowledge base must use the same vector model, the search parameters must be consistent with the values in the knowledge base retrieval section, and the cited content is output as an array whose length can be 0 | Open the search parameter panel and check item by item, and use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteMaxToken` to distinguish the number of citation items from the content budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: Cross-material entry was not aligned to the same record, and after a retrieval hit, the original text was not pointed back to item by item.
- Symptom: The versions of the thesis review form and the defense resolution are not synchronized, and the cited snippet points to an old version. Cause: The knowledge base was not updated with the current archived document by batch, and historical versions were not distinguished.
- Symptom: The defense resolution is missing a signature or receipt, but the citation array still returns a snippet. Cause: Signature and receipt fields were not validated when the material was ingested, and retrieval only matches by text.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the `quoteList` source identifier and the `responseData` return structure.

- Open the search parameter panel, check item by item the vector model and values of the associated knowledge base, and confirm they are consistent with the knowledge base retrieval section.
- In the conversation, open the citation markers, compare against the source documents, check whether each cited snippet can point back to the original paragraph, and separately record the number of citation items and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
