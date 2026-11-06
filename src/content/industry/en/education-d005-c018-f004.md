---
title: Vector Models and Indexes for Undergraduate Curriculum Planning: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c018-f004
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Vector Indexes | Versions
meta_description: Program Revision: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Undergraduate Curriculum Planning: Maintain Document Versions and Changes

## What this category's data looks like

Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. The program plan provides total credits and course modules, the course syllabus details the objectives and credit hours of each course, and the credit structure table summarizes the credits and proportions of each module. Materials mostly come from academic affairs system exports and departmental submissions, and the revision cycle rolls by academic year or program cycle. Field characteristics include course name, course code, credits, credit hours, semester offered, revision date, and signature field. When entering the vector model and indexing stage, the program plan serves as the main document providing the version number and effective date, the course syllabus serves as a sub-document providing course-level fields, and the credit structure table serves as a summary table providing module-level fields; together, the three determine whether a record can be recalled and whether data in the same group is merged.

## Configuration and implementation checks

This stage is executed by the indexing service and vector database, outputting vectors and index status (whether it can be recalled, whether data in the same group is merged). The "version ledger and change records" are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, revision date, and signature field are consistent with the course syllabus and credit structure table | Open a data row to check the index fields and confirm that multiple vector identifiers are complete; during retrieval, see whether data in the same group is merged and whether the highest score is taken |
| Course syllabus | Whether the course code, credit hours, and semester offered match the corresponding fields in the program plan | In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base; check the settings related to `defaultToken` and `maxToken` |
| Credit structure table | Whether module credits, proportions, dates, and signatures or receipts are complete | After changing the model, check the data scope covered by the rebuild task, and trigger it only for data that has already been indexed; check the status value indexed against the rebuild task records |
| Data row | Whether multiple vector identifiers for one piece of data are all present | Open the data row to check the index fields; if recall quality drops after changing the model, check whether the rebuild task covers that row |

## Three common errors

- Symptom: duplicate entries appear in retrieval results. Inspect the following: the name, quantity, and date of the same record do not match across the two materials, and the vector identifiers are not merged into the same group of data.
- Symptom: recall quality drops after changing the model. Inspect the following: the version is not synchronized, the rebuild task only applies to data that has completed indexing, and data rows that have not completed indexing do not participate in recall, so indexing must be completed before rebuilding.
- Symptom: a data row has content but cannot be retrieved. Inspect the following: a missing signature or receipt prevents the material from entering the index, and the index fields are empty or the corresponding vector identifiers are missing.

## How to verify the setup

Acceptance for this feature: sample one data row to check the index fields and confirm that multiple vector identifiers are present; then retrieve once to see whether data in the same group is merged and whether the highest score is taken.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; check the number of citations and the tokens of the citation text, and record the number of array entries separately.

- In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and open a data row to check whether the index fields are complete.
- After changing the model, check the data scope covered by the rebuild task, confirm that it is triggered only for data that has already been indexed, and check the status value indexed against the rebuild task records.
