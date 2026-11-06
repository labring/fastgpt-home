---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Find Supporting Evidence
slug: /en/industry/education-d001-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Evidence
meta_description: Vocational Curricula: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Find Supporting Evidence

## What this category's data looks like

This category's data involves three types of materials: talent cultivation programs, course standards, and job competency analysis tables. A talent cultivation program records the program name, program length, cultivation objectives, course setup, and graduation requirements, with the formulation date and approval signature attached; a course standard records the course name, credits, class hours, teaching content, and assessment methods, with the preparation date and teaching and research office signature attached; a job competency analysis table records the job title, competency items, corresponding courses, and survey date, with an enterprise receipt or survey signature attached. The three types of materials often belong to different departments, and their update rhythms are inconsistent: talent cultivation programs are revised with program adjustments, course standards are updated with course reforms, and job competency analysis tables are supplemented with enterprise surveys. When the materials enter the knowledge base retrieval node, each participates in vector search as an independent knowledge base or as a document collection within the same knowledge base, and the citation output returns the original text snippets and source identifiers according to the hit materials, for subsequent field comparison, version verification, and checking of signatures and receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are completed by subsequent AI nodes, code nodes, or manual work. Even if no content is retrieved, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether the fields, dates, and signatures are complete and consistent with the current version | In the node, check the selected knowledge base collection and vector model, open the citation superscript to compare with the source document, and verify item by item the program name, program length, course setup, formulation date, and approval signature |
| Course standard | Whether the course name, credits, class hours, and assessment methods can correspond to the talent cultivation program | Run a trial with a cross-material question, check whether the number of returned items in the citation array matches the hit materials, and verify whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original paragraphs |
| Job competency analysis table | Whether the job title, competency items, corresponding courses, survey date, and receipt are complete | Open the search parameter panel and verify the values item by item, record the number of citations and the `quoteMaxToken` budget, and check whether the cited snippets trace back to the original paragraphs |
| Citation content output | The number of returned items matches the hit materials; empty is also normal | Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and check the length of the citation array and the source identifiers in `quoteList` |

## Three common errors

- Phenomenon: The same program name is written differently in the talent cultivation program and the course standard, and the quantities and dates do not match. Cause: The two materials are maintained by different departments, and no field-level comparison has been made.
- Phenomenon: The course standard has been revised, but the talent cultivation program still cites the old course name and class hours. Cause: The versions are not synchronized, and the citation output only returns according to the hit materials without judging version order.
- Phenomenon: The job competency analysis table lacks an enterprise receipt or survey signature, and the cited snippets cannot trace back to the complete original text. Cause: The signature and receipt fields were not checked when the materials were archived.

## How to verify the setup

Acceptance of this feature: ask a question with an original text basis, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: ask a cross-material basis question, and see whether the answer gives a traceable source.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, record the number of citations and the `quoteMaxToken` budget, and check whether the cited snippets in `quoteList` within `responseData` can trace back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
