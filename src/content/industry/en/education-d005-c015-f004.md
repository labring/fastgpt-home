---
title: Vector Models and Indexes for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f004
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Vector Indexes | Versions
meta_description: Student Mental Health: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: screening plans, interview records, and referral forms. A screening plan contains the scale name, screening date, batch number, and the signature of the person in charge; an interview record contains the student's pseudonym, interview time, interviewer, and review signature; a referral form contains the referral subject, referral reason, recipient's receipt, and date. When these three types of materials enter the knowledge base, each plays a different role: the screening plan serves as the basis for batch determination, the interview record serves as the basis for individual tracking, and the referral form serves as the basis for closing the circulation loop. The update cadence is synchronized revision after each round of screening. A common field characteristic is that the name, quantity, and date of the same record across the three materials must be consistent, and the version number must be unique with the old version traceable.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). The "version ledger and change records" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Index model | Consistent with the vector model actually used by the knowledge base; a model change must trigger a rebuild | Check the index model in the knowledge base settings, and view the data scope covered by the rebuild task |
| Index fields of a data row | Multiple vector identifiers of one piece of data are all present and can correspond to the same group of source data | Open a data row and check the index fields, confirming the status is indexed |
| Mental health screening plans and interview records | The name, quantity, and date of the same record in the two materials match, and signatures and receipts are complete | Compare the fields, dates, and signatures in the screening plans and interview records one by one, and check whether the version numbers are synchronized |
| Referral form | The referral reason, recipient's receipt, and date are consistent with the screening plans and interview records | Check the record name, quantity, and date in the referral form, screening plans, and interview records, and confirm there are no missing signatures or receipts |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the screening plan and interview record do not match. Inspect the following: Only one material was changed during an update, and the related materials were not revised in sync.
- Symptom: The version is not synchronized; the old version is still retrievable and coexists with the current version. Inspect the following: Data rows whose indexing is not complete do not participate in recall; indexing must be completed before rebuilding.
- Symptom: The referral form lacks a signature or receipt, making the circulation loop incomplete. Inspect the following: When the referral form was updated, the signature and receipt fields were not checked, and cross-validation with the screening plan and interview record was not performed.

## How to verify the setup

This feature's acceptance check: sample a data row and look at the index fields, confirming that multiple vector identifiers are all present and the status is indexed; then run a retrieval once to see whether the same group is merged. Check the values of `limit`; the number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array count separately.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Check the index model in the knowledge base settings, view the data scope covered by the rebuild task records, and confirm that after changing the model, a rebuild is triggered only for data that has completed indexing.
- Open a data row and check the index fields, confirming that multiple vector identifiers are all present and the status is indexed, and check whether data in the same group is merged and the highest score is taken.
