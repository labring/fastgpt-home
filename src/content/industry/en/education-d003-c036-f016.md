---
title: Forms and User Interaction for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c036-f016
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Forms | Intake
meta_description: Professional Exams: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

For the review of professional and technical personnel vocational qualification examination registration, the materials mainly consist of the registration form, education certificate, and work experience certificate. The sources are the applicant's submission and the certificate issued by the employer. Submissions open by batch and are updated on a rolling basis according to the review cycle. When the three types of materials enter the Q&A intake and missing-item follow-up function, their roles differ: the registration form carries the main fields such as name, ID number, examination specialty, and level; the education certificate corresponds to the graduating institution, specialty, certificate number, and date of obtaining; the work experience certificate corresponds to the position, start and end dates, cumulative years, and employer seal. Field characteristics are concentrated in date formats, name writing, and signature and receipt positions. The same record often shows inconsistencies in names, quantities, and dates across materials, or versions not synchronized, missing signatures and receipts, requiring intake first and then follow-up to complete them.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). After triggering, the conversation enters an interactive state and records the workflow state. The user fills in the required items and submits, and the form information is passed on. The "intake record and completion questions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Whether the fields, dates, and signature correspond item by item with the education certificate and work experience certificate, and whether the name writing is consistent | Check the field names and required markers one by one in the node configuration, and after submitting with `formInput`, check the values referenced by subsequent nodes |
| Education certificate | Whether the certificate number, specialty, and date of obtaining are consistent with those filled in the registration form, and whether there is any unsynchronized version | Compare the dates and numbers item by item against the registration form. When items are missing, use `userSelect` to choose the supplementary submission type and then follow up |
| Work experience certificate | Whether the start and end dates, cumulative years, employer name, and seal are complete, and whether signatures or receipts are missing | Check the seal and receipt positions, submit after unifying the date format, and confirm that subsequent nodes can retrieve the corresponding field values |
| Intake record | Whether missing items are identified and followed up, and whether the answers have a material basis | Run a submission once, and check whether it can be submitted when required items are empty and whether the conversation stays in the interactive state |

## Three common errors

- Phenomenon: The names and dates of the same record do not match between the registration form and the education certificate. Cause: The two places were filled in separately, without item-by-item comparison and version synchronization.
- Phenomenon: The work experience certificate lacks a signature or receipt but is still accepted as complete material. Cause: The required markers do not cover the seal and receipt fields.
- Phenomenon: After submission, subsequent nodes cannot retrieve the values, and follow-up cannot continue. Cause: The field names are inconsistent with subsequent references, or submission is possible even when required items are empty.

## How to verify the setup

Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the values and required markers of `formInputResult` and `selectResult` are consistent.

Ask a question missing key information and see whether it follows up first before answering.

- Check the field names and required markers one by one in the node configuration, run a test submission, and check the values referenced by subsequent nodes.
- Compare names, quantities, dates, and seal receipts item by item against the registration form, education certificate, and work experience certificate.
