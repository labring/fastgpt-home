---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Handover
meta_description: Adult Admissions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The data for this category involves three types of materials: registration forms, care bonus materials, and admission rosters. Registration forms record candidate identity, application level, and preferences, with many fields and dense dates; care bonus materials include supporting documents and review opinions, and signatures and receipts are indispensable; admission rosters summarize admission conclusions, majors, and batches, and the quantities and dates must be mutually corroborated with the registration forms and bonus materials. Material sources are dispersed: online registration system exports, scanned paper certificates, and review opinions filled back in. The update rhythm advances through the three stages of registration, review, and admission, with each stage having a version and date. When entering this function, the three types of materials are cited as original text fragments in the knowledge base, each serving as a reference for field comparison, signature verification, and version traceability. The cited content only points back to the original text and does not replace the materials themselves.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text fragment and a source identifier, and the length can be 0. The material drafts and handover records that can be issued are completed subsequently by AI nodes, code nodes, or manual work. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Adult college entrance examination registration form | Fields are complete, responsible persons are clear, versions and dates are consistent, and names and quantities can correspond to the admission roster | In the cited content, verify name, application level, preferences, and dates one by one, open the citation corner mark to point back to the original text, record the number of array entries, and separately view the `quoteMaxToken` budget |
| Care bonus materials | Certificates, review opinions, and signed receipts are complete, and bonus items are consistent with the registration form | Compare the bonus item names, quantities, and dates in the cited fragments, confirm that signature and receipt fields exist, and check whether the citation source identifier can point back to the original certificate |
| Admission roster | Admission conclusions, majors, and batch fields are complete, and dates and signatures are traceable | Check whether the admission conclusions in the cited fragments have the same names, quantities, and dates as the registration form and bonus materials, and confirm which version prevails when versions are not synchronized |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and the citation array length matches the hit materials | In the node, check the selected collection and vector model, run a test with a question that has no matching materials, see that the output is empty while the chain continues, and view the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name, quantity, or date of the same candidate does not match across two materials. Cause: Materials are drafted in stages, cited fragments only point back to the original text, cross-material field comparison is not performed, and responsible persons do not check item by item during handover.
- Phenomenon: Versions are not synchronized, and the admission roster uses old registration information. Cause: Drafts and handover records do not indicate version and date, the citation source identifier does not point to the latest original text, and the next step does not verify the version upon receipt.
- Phenomenon: Care bonus materials lack signatures or receipts but are still treated as issuable drafts. Cause: The completeness judgment only checks content and not signatures and receipts, and the handover record does not list signature items as blocking conditions.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the cited content array and citation corner marks can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the output chain runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the search parameter panel and check the values item by item, record the number of citation array entries, separately view the `quoteMaxToken` budget, and do not compare the number of entries with the budget as equal.
- In the conversation, open the citation corner marks, check whether the cited fragments are consistent with the original text against the source documents, and use `quoteList` within `responseData` to recheck the citation array structure.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
