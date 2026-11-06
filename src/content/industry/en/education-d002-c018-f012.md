---
title: Document Parsing and Chunking for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f012
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Parsing | Checks
meta_description: Program Revision: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

The objects of material verification and discrepancy localization for undergraduate program revision are three types of materials: program plans, course syllabi, and credit structure tables. The program plan provides the professional direction, course modules, and total credit framework; the course syllabus explains course objectives, class hours, and assessment methods course by course; the credit structure table lists the credits, proportions, and study requirements of each module. The material sources are the academic affairs office, departments, and course leaders, and the update cadence follows the revision batches: first draft, consultation draft, submission draft, final draft. The field characteristics are concentrated in course name, course code, credits, class hours, semester offered, signature, and date. When the three types of materials enter the document parsing and chunking function, each is cut into data rows and bound to a unique data identifier, serving as the draft for subsequent retrieval and discrepancy localization, and does not directly produce a discrepancy list.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), outputting data rows and index status (parsed, indexing, indexed). The "discrepancy list" is completed next by retrieval and subsequent processing. After material parsing is completed, it is immediately stored as visible data rows, the index transitions through three states, and data pending indexing does not participate in recall.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, semester offered, and signature date are consistent across the three materials | Compare the credits, class hours, and signature fields of the program plan and the credit structure table item by item by course code, and check whether the data row status after `chunkSize` chunking is parsed |
| Course syllabus | Whether the course name, class hours, assessment method, and date of the same course match the program plan | Extract the course syllabus data rows, check them side by side with the same course record in the program plan, and check whether the `chunkSplitter` split boundary separates the course name from the credits |
| Credit structure table | Whether the total credits, proportions, and signature receipts of each module are consistent with the program plan | Check whether the data row status of the credit structure table is already indexed, confirm the processing mode corresponding to `trainingType`, and then compare the module credits and dates |
| Data row | It is in one of the three states and consistent with the interface display; the rebuild scope only covers data that has completed indexing | Open the data row and check whether the status is parsed, indexing, or indexed, and confirm that the rebuild task does not cover data pending indexing |

## Three common errors

- Symptom: The name and credits of the same course do not match between the program plan and the course syllabus. Cause: The versions of the two materials are not synchronized, the revision draft and the submission draft are mixed, and after parsing the data rows are independent of each other without merging for the same object.
- Symptom: The credit structure table lacks a signature or the receipt field is empty. Cause: The material circulation step was not filled in, and after parsing and storage the data row is visible but fields are missing, so the responsible person and date cannot be located during retrieval.
- Symptom: Newly uploaded materials cannot be found. Cause: Successful parsing does not mean retrieval will definitely hit; the data row is still in indexing, and data pending indexing is naturally isolated at the retrieval layer and is not recalled.

## How to verify the setup

Acceptance of this function: upload one material, observe the data row status transitions and the coverage scope of the rebuild task, and confirm that the status passes through parsed, indexing, and indexed in sequence, and that rebuild only covers data that has completed indexing.

Business test: use one real record to find fields inconsistent with the ledger, record the differences in course name, credits, and date, and submit them to the reviewer for confirmation and write-back.

- Check the file records and data rows separately, confirm that the identities of the file records and data rows are distinguishable, and then compare the names, quantities, and dates of the same course across the three materials.
- View the data rows covered by the rebuild task, and confirm that changing the model only rebuilds data that has completed indexing, and that data pending indexing does not participate in the rebuild chain.
