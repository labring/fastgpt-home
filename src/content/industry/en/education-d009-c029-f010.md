---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Multilingual
meta_description: Vocational Curricula: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data looks like this

The formulation of talent cultivation programs in vocational colleges involves three types of materials: talent cultivation programs, course standards, and job competency analysis tables. A talent cultivation program contains fields such as cultivation objectives, curriculum system, class hours and credits, and graduation requirements, along with the formulation date and signature fields; a course standard contains fields such as course name, teaching objectives, teaching content, and assessment methods, along with the review date and signature; a job competency analysis table contains the job name, competency items, corresponding courses, analysis date, and signature. The three types of materials often come from different departments and different versions. The same program name, course name, number of class hours, and date may not match across two materials, and versions being out of sync, missing signatures, or missing receipts also occur from time to time. In multilingual materials and terminology processing, the three types of materials respectively play the roles of terminology source, translation basis, and job competency cross-reference, and each term needs to be traced back to the original paragraph by way of citation sources and traceability, forming a unified terminology glossary and comparison draft for checking before external release.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether the fields of cultivation objectives, curriculum system, class hours and credits, and graduation requirements, as well as the formulation date and signature, are complete, and whether the name, quantity, and date of the same record match those in the course standard | In the knowledge base retrieval node, check the selected collections and their vector models; turn on the citation markers, compare field by field against the source documents, and record the array length and the `quoteMaxToken` budget |
| Course standard | Whether the fields of course name, teaching objectives, teaching content, and assessment methods, as well as the review date and signature, are complete, and whether the name and number of class hours of the same course are consistent across the two materials | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues; check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can be traced back to the original paragraph |
| Job competency analysis table | Whether the job name, competency items, corresponding courses, analysis date, and signature are complete, and whether the correspondence between competency items and course standards is version-synchronized | Open the search parameter panel and check the values item by item; extract three terms and check whether their spelling is consistent throughout the whole text, and confirm that each translated name can be traced back to the original text |
| Unified terminology glossary and comparison draft | Whether the same term is spelled consistently throughout the whole text, whether the translated name can be traced back to the original text, and whether the number of citations and the cited content budget are recorded separately | Open the citation markers in the conversation, and check the source identifiers and original text fragments in `quoteList` against the source documents |

## Three common errors

- Phenomenon: the same program name or course name is written differently in the two materials. Cause: during multilingual materials and terminology processing, terminology was not unified, versions were not synchronized, and cited fragments do not match the original text.
- Phenomenon: the number of class hours or the formulation date of the same course does not match across the two materials. Cause: the materials come from different departments and different versions, signatures or receipts are missing, and traceability was not performed item by item according to citation sources.
- Phenomenon: there are no citation markers in the answer, or an empty citation array is treated as a retrieval failure. Cause: the number of citations and the `quoteMaxToken` budget are conflated, and it was not first checked whether this round hit any materials.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has an original-text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs through, and record the array length and the `quoteMaxToken` budget.

Business test: extract three terms and check whether their spelling is consistent throughout the whole text, confirm that the same term is consistent throughout the whole text and that the translated name can be traced back to the original text, and complete field comparison and ledger recording before external release.

- In the knowledge base retrieval node, check the selected collections and their vector models, open the search parameter panel and check the values item by item, and check the source identifiers in `quoteList` within `responseData`.
- Extract three terms and check whether their spelling is consistent throughout the whole text, compare the fields, dates, and signatures of the talent cultivation program, course standard, and job competency analysis table, and record the number of citations and the cited content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
