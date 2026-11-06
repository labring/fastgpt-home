---
title: Sharing and Embedding for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c027-f003
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Sharing & Embeds | Handover
meta_description: Graduate Destinations: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses university employment signing and graduation destination statistics, involving three types of materials: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements are used to establish the signing relationship, graduation destination registration forms are used to aggregate destinations, and employer certificates are used to supplement receiving information. The material sources are departmental summary tables, employer receipts, and the school-level registration system, and the update cadence advances with signing batches and the graduation season. Field characteristics center on name, student ID, employer name, position, signing date, signature, and receipt number; the same record should keep names, quantities, and dates consistent across the three materials. When entering the sharing and embedding function, the employment agreement serves as the primary record, the graduation destination registration form serves as the aggregation basis, and the employer certificate serves as supporting attachment evidence; each assumes the role of field verification and responsibility handover, and before issuance it is necessary to confirm that fields are complete, responsible parties are clear, and versions and dates are consistent.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The issuable material drafts and handover records are seen by external visitors according to their identity, who then complete them accordingly.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether name, student ID, employer name, position, signing date, and signature are complete, and whether they are consistent with the corresponding items in the registration form | Compare names, quantities, and dates in the two materials item by item, and check the signature and receipt number |
| Graduation destination registration form | Whether the aggregated destination matches the employer name and signing date in the agreement and employer certificate | Draft one according to the template and complete one handover, and check whether missing items are blocked |
| Employer certificate | Whether the receipt number, receiving date, and signature are complete, and whether the version is synchronized with the current batch | Check the employer name and date in the certificate and agreement, and confirm the version is not lagging |
| Sharing link | Whether the expiration time, per-minute access limit, identity verification, and citation display items are configured as needed | Check the time limit and values of the link corresponding to `shareId`, and access once each with an unauthenticated session and an over-limit request |

## Three common errors

- Symptom: The employer name and signing date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are filled in at different stages, lacking unified comparison and responsibility handover.
- Symptom: The employer certificate has been updated, but the sharing link still displays the old version. Cause: The version is not synchronized, and the link was not republished after the material revision.
- Symptom: The material draft lacks a signature or receipt, and the handover record is incomplete. Cause: Before issuance, items were not checked one by one according to the template, and missing items were not blocked.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, check the allowance and citation display, and confirm the expiration time, per-minute access limit, identity verification callback, and the switch status of citation snippet, citation full text, and source original text for the link corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time and per-minute access limit values, and try once with an over-limit request.
- Check the switch status of citation snippet, citation full text, and source original text item by item, and access once with an unauthenticated session.
