---
title: Sharing and Embedding for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c012-f003
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Sharing & Embeds | Handover
meta_description: Teaching Reviews: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of district and county teaching research activities and lesson observation and evaluation. Material sources include three types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. The update cadence advances with activity batches, and versions and dates must be synchronized after each activity. Field characteristics cover activity name, instructor, observer, evaluation key points, signature, and receipt. When materials enter the sharing and embedding feature, the notice assumes the role of initiation and scope notification, the lesson observation record assumes the role of process documentation, and the lesson evaluation minutes assume the role of conclusions and handover basis. Together, the three support issuable material drafts and handover records. Only when fields are complete, responsible parties are clear, and versions and dates are consistent can they be handed to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. Issuable material drafts and handover records are then completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Fields include activity name, date, participants, signature, and receipt; the name, quantity, and date must be consistent with the lesson observation record and lesson evaluation minutes | Check item by item the field correspondence between the notice and the lesson observation record and lesson evaluation minutes, and check whether signatures and receipts are complete |
| Lesson observation record | Fields include instructor, observer, observation date, and observation key points; the name and quantity of the same record in different materials must be consistent | Draft a lesson observation record according to the template, go through one handover, and see whether missing items are blocked |
| Lesson evaluation minutes | Fields include evaluation conclusions, responsible party, version, and date; the version must be synchronized with the notice and lesson observation record | Check the version number and date, and confirm that the responsible party is clear and consistent with the handover record |
| Share link | Configurable expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippet, quoted full text, and source original text | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and record `shareId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the notice and the lesson evaluation minutes. Cause: Fields were not checked against a unified template during drafting, and no consistency comparison was done before handover.
- Symptom: The versions of the lesson observation record and lesson evaluation minutes are not synchronized, and old versions still appear after issuance. Cause: Version numbers and dates were not updated with the materials, and the handover record did not lock the version.
- Symptom: The notice or lesson evaluation minutes lack a signature or receipt, and the next stage cannot sign off. Cause: Signature and receipt fields were not checked during material circulation, and the responsible party was not clear.

## How to verify the setup

This feature's acceptance: Access once each with an unauthenticated session and an over-limit request, check the allow decision and quote display, record `shareId`, and check the expiration time, per-minute access limit, point limit, identity verification, and quote display items.

Business test: Draft one set according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, point limit, and identity verification callback in the link configuration, access once with an unauthenticated session, and confirm that the display items for quoted snippet, quoted full text, and source original text meet expectations.
- Draft the notice, lesson observation record, and lesson evaluation minutes according to the template, check item by item the name, quantity, date, version, and signature, go through one handover, and record `shareId`.
