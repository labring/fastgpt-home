---
title: Deployment and Upgrades for Enterprise Employee Skills Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c035-f017
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Upgrades | Operations
meta_description: Employee Skills: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Enterprise Employee Skills Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data revolves around three types of materials: the enterprise evaluation filing form, the evaluation specification, and the candidate roster. The filing form records the evaluation agency, occupation (work type), and filing date, and must correspond item by item with the occupation name, level, and assessment method in the evaluation specification; the evaluation specification stipulates the application conditions, assessment subjects, and scoring standards, and is the basis for determining candidate qualifications and subjects in the roster; the candidate roster carries names, ID numbers, declared levels, and subjects, and must mutually corroborate with the filing form and evaluation specification in terms of names, quantities, and dates. The three types of materials play different roles in deployment, operations, and application handover: the filing form and evaluation specification constrain the scope and standards of evaluation, while the roster is the base ledger for person-by-person verification. Materials are updated by batch, and fields are verified by names, quantities, dates, signatures, and receipts; a common inconsistency is that the same record's name, quantity, or date does not match across two materials, versions are not synchronized, or signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" is then completed by operations handover and business use. This upgrade includes version updates for two images, the main service and the commercial edition, as well as two manually triggered migration scripts; the scripts do not block service startup, and the latter depends on the former's completion.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | The version identifiers of the two images must match the version notes, and both must be the same target version | Check the version identifiers of the two images against the version notes, and record the image version identifiers |
| Historical chunk training task migration | Trigger only after the old instance has fully stopped and the old task lease has expired; the execution record must have a trigger time and status | View the execution record of this task on the administrator version upgrade page, and check the trigger time and status |
| Knowledge base rebuild status migration | Trigger only after the previous migration is complete; the times and statuses of the two records must correspond | Compare the times and statuses of the two migration task records to confirm the order of sequence |
| Data row index status | After migration, the data row status field is the new index status system, no longer the old marker | Sample one data row to check the status field, and check the records of the connection strings `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the two migration scripts were not triggered in order, and the latter was not executed after the former completed.
- Symptom: the same record's name, quantity, or date does not match between the filing form and the roster. Cause: material versions were not synchronized, and handover was not checked item by item against the handover sheet.
- Symptom: the evaluation specification lacks a signature or receipt. Cause: the handover sheet did not list signature items, and operations and the next shift completed handover without item-by-item confirmation.

## How to verify the setup

This feature's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and check the data row index status field and the records of the connection strings `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK`.

Business test: check once item by item against the handover sheet to see which record is missing, focusing on checking the names, quantities, dates, and signatures of the filing form, evaluation specification, and candidate roster.

- On the administrator version upgrade page, view the execution records of the two migration scripts, check the trigger times and statuses, and confirm that the latter was triggered after the former completed.
- Sample one data row to check the status field, and check the entries and records of the connection strings `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` to confirm consistency with the handover sheet.
