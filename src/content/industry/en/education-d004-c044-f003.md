---
title: Sharing and Embedding for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c044-f003
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Sharing & Embeds | Handover
meta_description: Training Schedules: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The materials for class scheduling and class hour deduction in training institutions mainly cover three types of evidence: class schedules, class hour deduction records, and class adjustment requests. The source is raw records exported weekly or monthly from the academic administration system, and the update rhythm follows scheduling adjustments and class hour verification in real time. When these materials enter the sharing and embedding function, each plays a different role: the class schedule serves as the baseline for class, teacher, time slot, and classroom fields; the class hour deduction record serves as the verification for student, number of class hours, signature, and receipt fields; the class adjustment request serves as the traceability for change reason, original time slot, new time slot, and approver fields. Material drafts must ensure complete fields, clear responsible parties, and consistent version and date before being handed to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The material drafts and handover records that can be issued are then completed by external visitors who see the corresponding content based on their identity. The sharing link can be configured with expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippet, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Class, teacher, time slot, and classroom fields are complete, and version and date are consistent | Check the time limit in the link configuration, and access once with an unauthenticated session to confirm that display items are released based on identity |
| Class hour deduction record | Student, number of class hours, signature, and receipt fields are complete, and match the class schedule date | Check the values, and try once with an over-limit request to confirm that the per-minute access limit takes effect and the quoted display items are correct |
| Class adjustment request | Change reason, original time slot, new time slot, and approver fields are complete; if the version is not synchronized, block it | Check the switch status item by item, and confirm that quoted snippet, quoted full text, and source original text download are enabled as needed |
| Sharing link | Expiration time, per-minute access limit, identity verification, and quoted display items match expectations | Access once each with an unauthenticated session and an over-limit request, check the release and quoted display, and record `shareId` |

## Three common errors

- Symptom: The name, quantity, and date of the same class hour deduction record do not match between the class schedule and the class hour deduction materials. Cause: The two materials were exported from different views and were not checked against the same version and date.
- Symptom: The class adjustment request has been updated, but the class schedule and class hour deduction record still reference the old version, and this was not discovered during handover. Cause: The version was not synchronized, and the same version number was not locked during material drafting.
- Symptom: The class hour deduction record lacks a signature or receipt, but it is still released during handover. Cause: The field completeness determination did not list signature and receipt as required, and missing items were not blocked.

## How to verify the setup

Acceptance of this feature: Access once each with an unauthenticated session and an over-limit request, and check the release and quoted display; check the expiration time, per-minute access limit, identity verification callback, quoted snippet, quoted full text, and source original text display items, and record `shareId`.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- In the link configuration, check the time limit, per-minute access limit, point limit, and identity verification callback address, and access once with an unauthenticated session to confirm that quoted display items are released based on identity.
- Check the fields, dates, and signatures item by item according to the class schedule, class hour deduction record, and class adjustment request, confirm that the versions are consistent, then record `shareId` and hand it to the next stage for sign-off.
