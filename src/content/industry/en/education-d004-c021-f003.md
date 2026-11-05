---
title: Sharing and Embedding for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c021-f003
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Sharing & Embeds | Handover
meta_description: Graduation Eligibility: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Enrollment Changes and Graduation Eligibility: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on drafting materials and handover of responsibility in student status changes and graduation eligibility review. The sources are the academic affairs system and the training program, and the update cadence is synchronized with student status change batches. Field characteristics center on the names, quantities, dates, and signatures of leave/resumption applications, major transfer applications, and graduation review checklists. When materials enter the sharing and embedding stage, leave/resumption applications carry the reason for the change and the effective date, major transfer applications carry course substitutions and credit recognition, and graduation review checklists carry the summary of credits and thesis conclusions. Draft materials that can be issued and handover records are shown to external visitors according to their identity, and the publishing channel is only responsible for generating share links, displaying parameters, and authentication results; it does not generate business materials.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), and outputs the share link, display parameters, and authentication results. Draft materials that can be issued and handover records are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption application | The reason for the change, effective date, and signature fields are complete, and the name, student ID, and date match those in the major transfer application | Draft one according to the template, check the fields and signature, then access the share link with an unauthenticated session to confirm whether the referenced display items are released according to identity |
| Major transfer application | The course substitution and credit recognition fields are complete, and the version number and date match the graduation review checklist | Check the version and date, inspect whether signatures or receipts are missing, and record the tokens and array count of the referenced text |
| Graduation review checklist | The credits, thesis conclusion, and graduation conclusion fields are complete, the responsible person is clear, and the version and date are consistent | Complete one handover sign-off and see whether missing items are blocked, and check the display parameters corresponding to `shareId` |
| Share link | The expiration time, per-minute access limit, point limit, and identity verification callback are set according to usage needs | Check the time limit and values in the link configuration, try once with an over-limit request, and access once with an unauthenticated session |

## Three common errors

- Symptom: The dates for the same record do not match between the leave/resumption application and the major transfer application. Cause: When drafting materials, the same batch data was not used as the baseline, and fields were not compared one by one before handover.
- Symptom: The graduation review checklist version is not synchronized, and signatures or receipts are missing. Cause: The version number was not updated after material modifications, and the responsible person's sign-off status was not checked during handover.
- Symptom: The link cannot be opened after a period of time, and the full referenced text can be seen without logging in. Cause: The expiration time and identity verification callback were not set according to usage needs, and the referenced display item switch was confused with file permissions.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, check release and referenced display, and verify the expiration time, per-minute access limit, and identity verification callback corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, point limit, and identity verification callback address in the link configuration.
- Check item by item the switch status of referenced snippet, referenced full text, and source original download, and record `shareId` and the tokens of the referenced text.
