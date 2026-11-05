---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Multilingual
meta_description: Foreign Teachers: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Handle Multilingual Materials and Terminology

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three types of materials: appointment contracts, work permit materials, and course schedules. Appointment contracts contain the appointment period, position, compensation terms, and signatures of both parties; work permit materials contain name, ID number, permit number, validity period, and receipt; course schedules contain course name, week number, classroom, instructor, and academic affairs signature. The three types of materials enter the knowledge base as scanned copies and electronic drafts, respectively serving the roles of authorization basis, compliance evidence, and scheduling basis. The update rhythm runs in parallel across three lines—contract renewal, permit extension, and semester scheduling—making version misalignment easy. The field characteristic is that the name, quantity, and date of the same record need to be aligned across materials, and multilingual materials also require that translated names can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The unified terminology glossary and comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | The teacher name, appointment period start and end, position name, and signature page in the contract must be aligned item by item with the work permit materials and course schedule | Extract the contract name and appointment period, compare with the permit materials and course schedule; check whether signatures and receipts are complete; check whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) can be traced back to the original contract paragraphs |
| Work permit materials | The permit number, ID number, validity period, and receipt date must be consistent with the contract appointment period and course scheduling week numbers | Check the permit number and validity period; compare the contract appointment period with the course scheduling week numbers; run a test with a question that has no matching materials to confirm the citation array is empty while the pipeline continues |
| Course schedule | The course name, week number, instructor, classroom, and academic affairs signature must be consistent with the contract position and permit validity period | Check whether the course name and instructor translated name are consistent throughout; check whether the week numbers fall within the permit validity period; check whether the number of citations in `quoteList` corresponds to the matched materials |
| Unified terminology glossary and comparison draft | The same term is written consistently throughout, and the translated name can be traced back to the original text paragraph | Sample three terms and check their writing throughout; open the citation superscript to compare with the source document; record the cited text tokens and the number of array entries, registering the two separately |

## Three common errors

- Phenomenon: The same teacher name is written differently in the contract and the permit materials. Cause: Multilingual transliteration rules are not unified, and versions are not synchronized.
- Phenomenon: The contract appointment period does not match the week numbers in the course schedule. Cause: After renewal, the contract has been updated, but the course schedule still uses the old version.
- Phenomenon: The permit materials lack a receipt or the contract lacks a signature page. Cause: When supplementary scanned copies were uploaded, the signature and receipt fields were not checked.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscript can be traced back to the original text; then ask a question with no matching materials, and confirm the array is empty while the pipeline runs through.

Business test: sample three terms and check whether their writing is consistent throughout, and whether the translated names can be traced back to the original text.

- Open the search parameter panel and check the values item by item, confirming they are consistent with the settings in the knowledge base retrieval section.
- Run a test with a question that has no matching materials, view `quoteList` within `responseData`, and confirm the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
