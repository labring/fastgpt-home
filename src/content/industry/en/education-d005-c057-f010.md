---
title: Citations and Source Traceability for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Versions
meta_description: National R&D Grants: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

The application materials for a National Key R&D Program project include three types: the project application form, the budget application form, and the cooperation agreement. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding categories, calculation basis, and disbursement schedule; the cooperation agreement carries the division of labor among participating units, intellectual property ownership, and signing date. The three types of materials often enter the knowledge base in batches in the form of revised drafts, stamped scanned copies, supplementary explanations, etc. The fields include project name, undertaking unit, person in charge, start and end dates, budget categories, amounts, signatures and seals, and receipts. The update rhythm changes as the application stage advances. The name, quantity, and date of the same record in the two types of materials are prone to mismatch. Unsynchronized versions and missing signatures and receipts are also common problems. When the materials enter the citation output of the knowledge base retrieval node, each participates in retrieval as an independent source. The citation snippets and source identifiers are used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text snippet and source identifier, and the length can be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work. The citation array itself is not a difference list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Should be consistent with the budget application form and cooperation agreement in project name, undertaking unit, person in charge, and start and end dates | In the citation output, open the citation superscripts one by one and check the fields against the source documents; after changing one piece of content, see whether the citation snippet is synchronized |
| Budget application form | Should be consistent with the project application form in budget categories, amounts, and disbursement schedule, with complete signatures and seals and receipts | Check the categories and amounts in the citation snippets, and check whether the signature and seal pages and receipts are covered by citations; record the number of array items |
| Cooperation agreement | Should be consistent with the project application form in participating units, division of labor, intellectual property ownership, and signing date | Use the citation source identifier to point back to the original paragraphs of the agreement, and compare dates and unit names; `quoteMaxToken` only checks the tokens of the citation text |
| Knowledge base retrieval node | Citation content is output as an array, the length can be 0, and an empty array is also a normal output | Run a test with a question that has no matching materials, and see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain runs through; then open `quoteList` to check the hit materials |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the project application form and budget application form do not match. Cause: The two materials were uploaded in batches, the current version was not used to unify the wording, and the citation snippets each point to old drafts.
- Symptom: The cooperation agreement has changed the signing date, but the project application form still cites the old date. Cause: The versions are not synchronized, the old version has not been marked invalid, and the citation source still points to the old draft.
- Symptom: The citation snippets do not match the original text, or the answer has content while the citation array is empty. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty array does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the number of citation array items and the superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously; the number of citation items is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, and see that the citation array in `responseData` is empty while the chain continues, and open `quoteList` to check the hit materials.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
