---
title: Vector Models and Indexes for Research Ethics Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c062-f004
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Vector Indexes | Versions
meta_description: Research Ethics: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Research Ethics Review: Maintain Document Versions and Changes

## What this category's data looks like

Research ethics review materials include ethics review applications, informed consent form templates, and risk assessment forms, with fields covering names, quantities, dates, and signature receipts. These materials enter the knowledge base from template libraries, project teams, or historical archives, and their update cadence adjusts with review batches, regulatory revisions, or project changes. When entering this feature, application materials take on the primary index role, while templates and assessment forms serve as associated data in the same group, recording multiple vector identifiers through the index field of the data row. After material versions change, old versions must remain traceable, and references must be kept in sync. Vector models and indexing handle recall: retrieval first recalls vectors, then merges back to the original data by identifier, taking the highest score for data in the same group.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). The "version ledger and change records" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and reference trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Names, quantities, dates, and signature receipts are consistent between the application and attachments; the data row status is indexed or a rebuild task record exists | Open a data row, check whether the index field contains all vector identifiers, and compare the names, dates, and signatures in the application and the informed consent form |
| Informed consent form template | The template version number is unique against the current version, and old versions are traceable; the dates and signature receipts in the fields are complete | In the knowledge base settings, check that the index model matches the vector model actually used by the knowledge base, and check whether the template version references are in sync |
| Risk assessment form | When the names, quantities, and dates of the same record do not match between the risk assessment form and the application, it must be flagged; missing signatures or receipts must be corrected | Run a retrieval once to see whether data in the same group is merged, and confirm that under the `limit` reference budget, the tokens of the reference text and the number of array entries are recorded separately |
| Data row index field | All multiple vector identifiers of a piece of data are present; after changing models, rebuilds are triggered only for data that has already been indexed | Check the data scope covered by the rebuild task, and verify whether the index field is complete when a data row has content but cannot be retrieved |

## Three common errors

- Symptom: duplicate entries appear in retrieval results. Inspect the following: the same group of data corresponds to multiple vector identifiers, and merging did not consolidate by the highest score, resulting in duplicates.
- Symptom: the names, quantities, and dates of the same record do not match between the application and the informed consent form. Inspect the following: versions are not in sync.
- Symptom: recall quality drops after changing models. Inspect the following: rebuild tasks are triggered only for data that has already been indexed, not covering all data rows.

## How to verify the setup

This feature's acceptance: sample a data row to inspect the index field, then run a retrieval once to see whether the same group is merged; check the status values against indexed and the rebuild task records.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- In the knowledge base settings, check that the index model matches the vector model actually used by the knowledge base.
- Open a data row, check whether the index field contains all vector identifiers, and inspect the data scope covered by the rebuild task.
