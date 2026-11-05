---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Multilingual
meta_description: Research Agreements: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology

## What this category's data looks like

Signing a research project task book involves three types of materials: the project task book, the subject task breakdown table, and the budget book. Fields include subject name, undertaking unit, principal investigator, start and end dates, funding categories, signatures, and receipts. In multilingual scenarios, the names, quantities, and dates of the same record in texts of different languages must correspond item by item. When the materials enter the knowledge base retrieval node, each participates in recall as an independent source: the project task book provides overall project information and the signature section, the subject task breakdown table provides subtask division and milestone dates, and the budget book provides funding categories and amounts. The update cadence advances with the signing process; after version iteration, old drafts may still be recalled and must be distinguished by source identifier. Together, the three types of materials support the generation of a unified terminology glossary and a bilingual comparison draft, and terminology translations must be able to point back to the original paragraphs.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "unified terminology glossary and bilingual comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | The subject name, principal investigator, start and end dates, and signature section must be consistent across the three types of materials | Open the citation superscript and check the subject name and signature page date against the source document |
| Subject task breakdown table | Subtask names, undertaking units, and milestone dates correspond to the task book | Compare the subtask names and dates in the cited snippets one by one, and record discrepancies |
| Budget book | Funding categories, amounts, and quantities must correspond between the task book and the budget book | Check the categories and amounts in the cited snippets, and confirm consistency with the task book |
| Citation content output | The number of returned items matches the hit materials; an empty result is also normal | Run a test with a question that has no matching materials, and see whether the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues |

## Three common errors

- Symptom: the same subject name is written differently in the task book and the breakdown table. Cause: the two materials were entered separately from drafts in different languages, and terminology was not unified.
- Symptom: the amount in the budget book does not match the funding column in the task book. Cause: versions were not synchronized, and the old draft was still retrieved and cited.
- Symptom: a missing signature page or receipt still enters the citation array. Cause: the materials were stored before being complete, and the cited snippets only reflect what has already been included.

## How to verify the setup

Acceptance for this feature: ask a terminology translation question that has original-text support, check whether the citation array and superscripts can point back to the original paragraphs, and check the source identifier in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: sample three terms and check whether their spelling is consistent throughout the whole text, and check whether the translations can point back to the original text.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they use the same vector model.
- Open the search parameter panel and check the values item by item, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
