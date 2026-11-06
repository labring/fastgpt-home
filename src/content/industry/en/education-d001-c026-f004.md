---
title: Vector Models and Indexes for Degree Awards and Certificate Information Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c026-f004
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Vector Indexes | Evidence
meta_description: Degree Certificates: review vector indexes for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Degree Awards and Certificate Information Reporting: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. Materials include three types: degree application forms, thesis review forms, and defense resolutions. The degree application form records applicant information, degree category, and date signature; the thesis review form carries the review conclusion, reviewer signature, and date; the defense resolution states the defense conclusion, voting result, and signature. When these three types of materials enter this function, each is stored as an independent data row in the business database. The indexing service generates vectors and writes them to the vector database. The original data is retained in the business database, and the index field records the corresponding vector identifier. Materials are updated with batch reporting, and the version is based on the currently effective one. The name, quantity, and date of the same record in different materials must remain consistent. Field characteristics are concentrated in dates, signatures, conclusions, and numbers. A missing signature or receipt will directly affect whether the basis entry can match the original text.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible and whether data in the same group is merged). The basis entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials). Vectors are stored in the vector database, and the original data is stored in the data table of the business database, with the index field recording the corresponding multiple vector identifiers. Retrieval first recalls vectors, then merges back to the original data by identifier, and the highest score is taken for the same group of data.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields, dates, and signatures must match those in the thesis review form and defense resolution; the name, quantity, and date of the same record must be consistent | Open the data row to check whether the index field contains multiple vector identifiers, whether the status is indexed, and record the values of `defaultToken` and `maxToken` |
| Thesis review form | The review conclusion, reviewer signature, and date are complete, and the version is currently effective | In the knowledge base settings, check that the indexing model is consistent with the vector model actually used, and perform a retrieval to see whether data in the same group is merged |
| Defense resolution | The defense conclusion, voting result, and signature are complete; if a signature or receipt is missing, it must be returned for correction | Check the data range covered by the rebuild task record, and confirm that after changing the model, rebuild is triggered only for data that has already been indexed |
| Data row index field | Multiple vector identifiers for one piece of data are all present, and data in the same group can be merged | Sample a data row to inspect the index field, then perform a retrieval to see whether the same group is merged, and check that the tokens of the cited text and the number of array entries are recorded separately |

## Three common errors

- Symptom: Duplicate entries appear in retrieval results. Inspect the following: The name, quantity, or date of the same record in the degree application form and thesis review form do not match, and the index field has not been merged into the same group of data.
- Symptom: Recall quality drops after changing the model. Inspect the following: The version is not synchronized, and the rebuild task record covers only part of the data that has already been indexed, not the currently effective materials.
- Symptom: A data row has content but cannot be retrieved. Inspect the following: The defense resolution lacks a signature or receipt, the material has not entered the currently effective version, and the index field has no corresponding vector identifier.

## How to verify the setup

This function's acceptance: sample a data row to inspect the index field, confirm that multiple vector identifiers are all present and the status is indexed, then perform a retrieval to see whether data in the same group is merged, and check the coverage of the rebuild task record.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source, and whether the entries can match the original text of the degree application form, thesis review form, and defense resolution.

- In the knowledge base settings, check that the indexing model is consistent with the vector model actually used by the knowledge base, and open a data row to check the index field.
- Check the data range covered by the rebuild task record, confirm that after changing the model, rebuild is triggered only for data that has already been indexed, and check that cited text tokens and the number of array entries are recorded separately.
