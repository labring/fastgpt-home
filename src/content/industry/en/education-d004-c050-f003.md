---
title: Sharing and Embedding for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c050-f003
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Sharing & Embeds | Handover
meta_description: Foreign Teachers: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Foreign Teacher Recruitment and Course Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the foreign teacher appointment and course scheduling scenario, covering three types of materials: appointment contracts, work permit materials, and course scheduling tables. The sources are original records drafted by on-campus HR and foreign affairs positions, and the update cadence keeps pace with appointment batches, permit processing progress, and semester scheduling. Appointment contracts carry the position, appointment period, compensation, and signature fields; work permit materials carry fields such as identification documents, academic qualifications, and criminal record checks; course scheduling tables carry course names, week numbers, class hours, and instructors. When these three types of materials enter the sharing and embedding stage, each plays a different role: contracts and permit materials serve as the finalized basis pending issuance, while course scheduling tables serve as the execution checklist at handover. All must correspond item by item with the handover records, and only after fields are complete, responsible parties are clear, and versions and dates are consistent may they be passed to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. The draft materials that can be issued and the handover records are seen by external visitors according to their identity, who then complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Position, appointment period, compensation, and signature fields are complete; version and date are consistent with the handover records | Check the contract and handover records item by item for alignment of name, term, and date; check whether signatures and receipts are retained |
| Work permit materials | Identification document, academic qualification, and criminal record check fields are complete; issuance date is consistent with processing progress | Compare item by item against the materials checklist; confirm that the name and date of the same record do not conflict across the two materials |
| Course scheduling table | Course name, week numbers, class hours, and instructor are complete; no contradiction with the contract appointment period | Check the scheduling table against the contract start and end dates; confirm the instructor matches the handover responsible party |
| Share link | Expiration time, per-minute access limit, credit limit, and identity verification are configured as needed; referenced display items are toggled as needed | Check the time limits and values in the link configuration; test once each with an unauthenticated session and an over-limit request; record the `shareId` |

## Three common errors

- Symptom: The name and date of the same record do not match between the contract and the permit materials. Cause: During drafting, each material was entered separately without cross-comparison, and at handover only totals were checked, not fields.
- Symptom: The course scheduling table has been revised, but the handover records still reference the old version. Cause: The version was not synchronized; after revision, the handover records were not written back, and the share link was not regenerated.
- Symptom: The handover form lacks a signature or receipt, so the next stage cannot sign off. Cause: The responsible party did not confirm at handover, the receipt was not archived together with the materials, and responsibility boundaries were unclear.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request, check the allowance and referenced display, and check the expiration time and access limit values of the link corresponding to the `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check item by item the expiration time, per-minute access limit, credit limit, and identity verification callback address
- Check item by item the toggle status of quoted snippets, quoted full text, and source original text download
