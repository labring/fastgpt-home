---
title: Sharing and Embedding for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c001-f003
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Sharing & Embeds | Handover
meta_description: Kindergarten Care: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Kindergarten childcare daily life management involves three types of materials: the daily life schedule, morning and afternoon health check records, and child health observation records. The daily life schedule comes from the childcare and education department and is updated per semester or week. Its fields include activity time slot, activity name, venue, lead and assistant caregivers, and remarks. Morning and afternoon health check records come from the morning and afternoon check sessions and are updated daily. Their fields include child name, class, temperature or health status, check time, checker signature, and abnormal handling. Child health observation records come from all-day observation and are updated as needed or daily. Their fields include observation time, description of performance, drinking, eating, sleeping, and bowel movement conditions, handling and parent communication, and recorder signature. When the materials enter the sharing and embedding function, the daily life schedule is referenced as the process basis, while morning and afternoon health check records and child health observation records are referenced as handover evidence of responsibility. The three respectively assume the roles of scheduling, screening, and tracking, and together support issuable drafts and handover records.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. Issuable material drafts and handover records are completed by external visitors according to their identity seeing the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include activity time slot, activity name, venue, lead and assistant caregivers, and remarks; date and version are consistent; signatures are complete | Check whether the activity time slots and activity names in the table match the actual situation of the day, and check the lead and assistant caregiver signatures and version date |
| Morning and afternoon health check records | Fields include child name, class, temperature or health status, check time, checker signature, and abnormal handling; date and class are consistent | Check whether the same child's name, class, and date match across the two materials, and check the checker signature and abnormal handling receipt |
| Child health observation records | Fields include observation time, description of performance, drinking, eating, sleeping, and bowel movement conditions, handling and parent communication, and recorder signature | Check whether the observation time and handling records form a closed loop, and check whether the recorder signature and parent communication receipt are complete |
| Sharing link | Expiration time, per-minute access limit, identity verification, referenced snippet and referenced full-text display items are set according to usage needs | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and record `shareId` and authentication result |

## Three common errors

- Phenomenon: The same child's name and class do not match between the morning and afternoon health check records and the health observation records. Cause: The two materials were drafted separately and fields were not checked against the same roster.
- Phenomenon: The version of the daily life schedule was not synchronized, and the old version is still referenced. Cause: After updating, the version pointed to by the sharing link was not replaced, and the date and version number were not checked in sync.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot be signed for. Cause: The responsible person was not specified in the fields, and the signing step did not verify missing items according to the template.

## How to verify the setup

Acceptance of this function: access once each with an unauthenticated session and an over-limit request, check the pass-through and referenced display, and record `shareId`, authentication result, and display parameters.

Business test: draft one copy according to the template and complete one handover to see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, identity verification callback, and referenced snippet, referenced full text, and source original text display items.
- Check fields, dates, and signatures item by item according to the daily life schedule, morning and afternoon health check records, and child health observation records, confirm the versions are consistent, and then hand over to the next step for signing.
