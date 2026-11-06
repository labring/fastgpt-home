---
title: Deployment and Upgrades for Sino-Foreign Education Establishment and Annual Reports: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c048-f017
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Upgrades | Operations
meta_description: Joint Education: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Sino-Foreign Education Establishment and Annual Reports: Coordinate Operations and Application Handover

## What this category's data looks like

Materials for the establishment and annual reports of Chinese-foreign cooperative education institutions include the establishment application, cooperation agreement, articles of association, and annual report. Their sources are the approving authority and both cooperating parties, and their update cadence changes with the establishment approval and the annual report cycle each year. The field characteristics center on institution name, cooperating parties, education level, enrollment number, signing date, and signatures and seals. When the materials enter the deployment, operations, and application handover function, the establishment application and cooperation agreement serve as the basis for institutional identity and authorization, the articles of association serve as the basis for organizational and operating rules, and the annual report serves as the basis for continuous operating status. The deployment and upgrade stage needs to organize the versions, dates, signatures, and receipt statuses in the above materials into handover-ready operation records, so that versions, connections, and task records are consistent.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. The handover-ready deployment status and operation records must then be completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields, dates, and signatures must be consistent with the cooperation agreement and articles of association | Check the institution name, cooperating parties, education level, signing date, and signatures and seals, and check whether signatures or receipts are missing |
| Cooperation agreement | The name, quantity, and date of the same record in the application and articles of association must match | Compare the cooperating party names, enrollment number, validity period, and signing date item by item, and record inconsistent items |
| Articles of association | The version must be synchronized with the establishment application and cooperation agreement | Check the version identifier and signing date of the articles of association, and check whether signatures or receipts are missing |
| Annual report | The annual data must be consistent with the name, quantity, and date in the establishment materials | Check the institution name, enrollment number, and submission date in the annual report against the handover form, and review the receipt status |

## Three common errors

- Phenomenon: the same institution name is written differently in the establishment application and the cooperation agreement. Cause: the two materials were filled out separately, without field-level comparison and receipt archiving.
- Phenomenon: the articles of association version is not synchronized and still has the old signature page. Cause: after the version update, it was not re-signed, and the receipt record is missing.
- Phenomenon: the service can start, but the data row status is still the old marker. Cause: the migration scripts were not executed in order, and a consistent image version does not mean the business data migration has been completed.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order.

Business test: check once item by item against the handover form, and see which record is missing.

- On the administrator version upgrade page, view the execution records of the historical chunked training task migration and the knowledge base rebuild status migration, and confirm that the previous one is completed before triggering the next one.
- Sample one data row to check the index status field, and check whether the connections corresponding to `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are consistent in the deployment records.
