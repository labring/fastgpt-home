---
title: Vector Models and Indexes for National Key Research and Development Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c057-f004
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Vector Indexes | Multilingual
meta_description: National R&D Grants: review vector indexes for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for National Key Research and Development Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. They are prepared jointly by the lead organization and participating organizations, and are updated by application batch and budget year. The project application form carries the research content, task breakdown, and assessment indicators; the budget application form carries the funding categories and calculation basis; the cooperation agreement carries the task division, intellectual property, and signing information. In multilingual materials and terminology processing, the three types of materials each play a different role: the project application form provides the primary term definitions and Chinese-English equivalents, the budget application form provides the translated names and definitions of funding categories, and the cooperation agreement provides organization names, task names, and signing fields. Field characteristics include project name, subject name, undertaking organization, task number, budget category, start and end dates, signature, and receipt. After materials enter this function, they are first split into multilingual paragraphs, then vectors are generated and written into the index, providing a recallable basis for subsequent terminology consistency and field verification.

## Configuration and implementation checks

This step is executed by the indexing service and vector database, and outputs vectors and index status (whether recall is possible, whether data in the same group is merged). "Unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials). The indexing side is only responsible for converting multilingual paragraphs, terminology entries, and field fragments into a retrievable state; it does not generate terminology glossaries, comparison drafts, or version ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the project name, subject name, task number, undertaking organization, and start and end dates are consistent between the main text and the budget and agreement; whether the same term is written consistently throughout | Sample three terms and check whether their spelling is consistent throughout, and verify whether the name, quantity, and dates of the same record match between the project application form and the cooperation agreement |
| Budget application form | Whether the budget category names, amount definitions, and annual dates are consistent with the fields in the project application form and cooperation agreement; whether versions are synchronized | Open one data row and check the index fields, confirm that the categories, quantities, and dates of the same record are consistent between the budget application form and the project application form, and check whether signatures or receipts are complete |
| Cooperation agreement | Whether the participating organization names, task division, intellectual property clauses, and signing dates are consistent with the fields in the project application form and budget application form; whether signatures or receipts are missing | Verify whether the organization names and task numbers in the cooperation agreement can be traced back to the original text of the project application form, and confirm which material prevails when versions are not synchronized |
| Data row index fields | Whether multiple vector identifiers for one data row are all present, and whether `defaultToken`, `maxToken`, and the index model are consistent with the vector model actually used by the knowledge base | Check the index model in the knowledge base settings, open one data row and check the index fields, and view the data scope covered by the rebuild task and the indexed status |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the project application form and the budget application form. Inspect the following: The two materials were imported separately, versions were not synchronized, and retrieval results were not merged by the same group.
- Symptom: The cooperation agreement lacks a signature or receipt, but retrieval can still recall the corresponding paragraph. Inspect the following: Signing status was not written into the source data, vectors only reflect text content, and index status cannot distinguish signed from unsigned.
- Symptom: After changing models, recall quality drops, or a data row has content but cannot be retrieved. Inspect the following: Rebuilding is triggered only for data that has already been indexed, does not cover all data rows, and the index model is inconsistent with the model actually used by the knowledge base.

## How to verify the setup

This function's acceptance check: sample one data row and inspect the index fields to confirm that multiple vector identifiers are all present and the status is indexed; then run a retrieval to see whether data in the same group is merged and whether the highest score is taken; check the data scope covered by the rebuild task records, and check whether `defaultToken`, `maxToken`, and the index model are consistent.

Business test: sample three terms and check whether their spelling is consistent throughout, confirm that translated names can be traced back to the original text, that the name, quantity, and dates of the same record match across the project application form, budget application form, and cooperation agreement, and that signatures and receipts are complete.

- Check in the knowledge base settings whether the index model is consistent with the vector model actually used by the knowledge base, and view the data scope covered by the rebuild task records.
- Open one data row and check the index fields to confirm that multiple vector identifiers are all present; after retrieval, check whether data in the same group is merged, and record the tokens and array length of the cited text.
