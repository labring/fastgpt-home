---
title: Citations and Source Traceability for National Key Research and Development Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Multilingual
meta_description: National R&D Grants: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

National Key R&D Program project applications involve categories of materials such as the project application form, budget application form, and cooperation agreement. The material sources are multilingual originals and existing translations, and the update cadence advances with application rounds and version iterations. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding categories, calculation basis, and amounts and quantities; the cooperation agreement carries the participating units, division of labor, intellectual property, and signature receipts. When multilingual materials and terminology processing enter the knowledge base retrieval node, their respective roles are: the project application form provides the context of a term's first occurrence and the indicator wording; the budget application form provides the comparison anchors for quantity and date fields; the cooperation agreement provides the unit names, seals, and receipt fields. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. The same term must be consistent throughout the entire document, and the translated name must be able to refer back to the original text. The same record must keep names, quantities, and dates comparable across the three materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the context of the term's first occurrence and the assessment indicator wording are consistent with the comparison draft; whether the names, quantities, and dates of the same term match across the project application form, budget application form, and cooperation agreement | In the node, check the selected collections and their vector models; open the search parameter panel and check each item; run a test with a question that has no matching materials, and see whether the output is empty while the chain continues |
| Budget application form | Whether the funding categories, quantities, and date fields can be compared item by item with the project application form and cooperation agreement; whether the version number and signature receipt are synchronized | In the conversation, open the citation superscripts and compare against the source documents; check whether the cited fragments correspond to the original paragraphs; record the number of items in the citation array and the value of `quoteMaxToken` |
| Cooperation agreement | Whether the participating unit names, division of labor, intellectual property, and signature receipt fields are consistent with the project application form and budget application form; whether the names, quantities, and dates of the same record fail to match | Check the citation array and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled); refer back to the original paragraphs item by item; check materials whose versions are not synchronized or that lack signature receipts |

## Three common errors

- Symptom: the names, quantities, and dates of the same record fail to match between the project application form and the budget application form. Cause: the versions of the two materials are not synchronized, terminology and fields are updated separately, and the cited fragments hit only one of them.
- Symptom: the cooperation agreement lacks a signature or receipt, yet the citation array still has content. Cause: the knowledge base contains a non-final version, and citations can refer back to the original text, but the original text itself is incomplete, so signatures and receipts need manual supplementary verification.
- Symptom: there are no citation superscripts in the answer, or the cited fragments do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure, and an empty array is normal output.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has a basis in the original text, check whether the citation array and superscripts can refer back to the original paragraphs, and check the number of items in the array and the `quoteList` field in `responseData`; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and note that `quoteMaxToken` is only the citation content budget and is not compared for equality with the number of items in the array.

Business test: sample three terms and check whether their spelling is consistent throughout the entire document, and refer back to the original text to confirm that the translated names correspond.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check each value item by item.
- In the conversation, open the citation superscripts, compare against the source documents and refer back to the original paragraphs item by item, and record the number of items in the citation array and the value of `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
