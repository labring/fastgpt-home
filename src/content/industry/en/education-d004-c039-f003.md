---
title: Sharing and Embedding for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c039-f003
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Sharing & Embeds | Handover
meta_description: Exam Administration: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of examination organization and violation handling, the category materials that enter the drafting and responsibility handover stage include examination manuals, examination room records, and violation fact records. The examination manual defines the examination process, time nodes, and job responsibilities; the examination room record documents the expected, actual, absent, and abnormal situations for each session; the violation fact record registers the time, location, behavior, and evidence of suspected violations. These materials come from the examination organization team, invigilators, and inspectors, and their update rhythm rolls forward with the progress of examination sessions and violation handling. Field characteristics are concentrated in four categories: name, quantity, date, and signature: the name, quantity, and date of the same candidate or the same examination room in two materials must be consistent, versions must be synchronized, and signatures and receipts must be complete. When materials enter this function, the examination manual is referenced as the process basis, and the examination room record and violation fact record are shared and embedded as drafts to be issued and handover records, for the next stage to view according to identity.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. "Issuable material drafts and handover records" are seen by external visitors according to identity to continue completing the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Examination manual | Check the name, date, and signature according to the category verification dimensions: the manual version number and effective date must be consistent with the examination room record and violation fact record, and job responsibilities and signature fields must be complete | Check the time limit in the link configuration, access once with an unauthenticated session, verify item by item the display switches for referenced fragments, referenced full text, and source original text, and record `shareId` |
| Examination room record | Check the name, quantity, and date according to the category verification dimensions: the expected, actual, and absent quantities must match the corresponding entry names, quantities, and dates in the violation fact record | Check the value of the per-minute access limit, and try once with an over-limit request to confirm the rate-limiting behavior; check whether the signature and receipt fields are complete |
| Violation fact record | Check the date and signature according to the category verification dimensions: the violation time, location, and behavior description must be consistent with the examination room record, the evidence list, signature, and receipt must be complete, and issuance is not allowed when the version is not synchronized | Access once with an unauthenticated session to confirm that the referenced full text is not visible; check the correspondence between the identity verification callback address and `shareId` |
| Sharing link | Check whether the expiration time, per-minute access limit, point limit, and identity verification are set according to usage needs, and whether the reference display items are switched on or off as needed | Check the time limit and values in the link configuration, verify item by item the switch status of referenced fragments, referenced full text, and source original text, and record `shareId` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same candidate or the same examination room in two materials do not match. Cause: They were entered separately during drafting, without item-by-item comparison according to the category verification dimensions, and there was a lack of consistency checking before handover.
- Phenomenon: The examination manual has been updated, but the examination room record and violation fact record still reference the old version. Cause: The versions were not synchronized, the sharing link pointed to the old draft, and the handover record did not indicate the version and date.
- Phenomenon: The violation fact record lacks a signature or receipt, but the next stage still signs for acceptance. Cause: The handover record did not list signature and receipt as release conditions, and the display items of the sharing link were mistakenly treated as the visible scope.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, check release and reference display, and confirm that the reference display items only control fragments and full text, not the file visible scope; record the authentication result corresponding to `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, point limit, and identity verification callback address, and verify item by item the display switches for referenced fragments, referenced full text, and source original text.
- Draft the examination manual, examination room record, and violation fact record according to the template, compare item by item the name, quantity, date, and signature, complete one handover, and record `shareId` and the version date.
