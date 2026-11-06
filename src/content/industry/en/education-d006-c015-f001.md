---
title: HTTP Integrations for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f001
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | HTTP | Progress
meta_description: Student Mental Health: review HTTP for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools, with materials drawn from three types: screening plans, interview records, and referral forms. Screening plans provide rosters and scale batches, interview records carry the process and signatures, and referral forms record destinations and receipts. When these three types of materials enter the HTTP interface, they serve respectively as sources for request body fields, path parameters, and request header authentication information. The update cadence is summarized weekly or monthly, and the field characteristics center on names, quantities, dates, and signatures. The progress table and statistical scope description must state the statistical scope, exception rules, and data sources in the header, ensuring that the record count and the statistical count match up.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "progress table and statistical scope description" is parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the rest. The HTTP node does not replace the external system in writing to the database or approving.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | The roster, scale batches, dates, and signatures in the plan must correspond item by item with the interview records and referral forms | Verify the rendered complete address in the request preview, confirm that the path parameters and request body fields come from the plan, and check the source of each placeholder in the `variables` panel |
| Interview record | The name, quantity, and date of the same record in the plan and the referral form should be consistent, and signatures and receipts must not be missing | Use a sample request to compare the response, verify that the request body fields are consistent with the external interface agreement, and check the `responseData` returned fields in the variables panel |
| Referral form | The receipt status, date, and signature of the referral form must be synchronized with the screening plan and interview records; when versions are not synchronized, the latest signed document prevails | Verify the request header names and value sources, confirm that `Authorization` is passed in according to the external system's requirements, and then compare the receipt marker in the returned fields |
| Progress table and statistical scope description | The header must state the statistical scope, exception rules, and data sources, and the record count and statistical count must match up | Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and verify the counts and dates in the returned fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the screening plan and the interview record. Cause: The two materials are updated separately, without item-by-item verification and version synchronization.
- Symptom: The referral form lacks a signature or receipt, yet it is counted as completed in the statistics. Cause: The scope does not state exception rules, and the signature and receipt fields are not included in the verification.
- Symptom: The request returns 401 or the external system receives empty fields. Cause: Authentication information is not passed in according to the external system's requirements, or variable placeholders are not parsed into actual values.

## How to verify the setup

This feature's acceptance: preview the rendered request, verify the status code and returned fields, then compare the result against a sample; confirm that the three placeholders `Authorization`, `variables`, and `responseData` can all be traced to specific sources.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and confirm that the record count and statistical count match up.

- Check the source of each placeholder in the variables panel, and confirm that the variables in the request address, request headers, and request body are all parsed into actual values.
- Use a sample request to compare the response, check that the request body fields are consistent with the external interface agreement, and verify the counts and dates in the returned fields.
