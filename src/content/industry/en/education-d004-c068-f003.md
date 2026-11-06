---
title: Sharing and Embedding for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c068-f003
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Sharing & Embeds | Handover
meta_description: Journal Editing: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Materials for journal three-review three-proof and editorial quality usually come from three types of source documents: three-review forms, proofs, and proofreading records. Their update cadence follows editions and proof rounds, and their fields center on name, quantity, date, signature, and receipt. Three-review forms carry the circulation opinions and approvals of initial review, re-review, and final review; proofs carry traces of layout and text changes; proofreading records carry the issue lists and handling results of each proof round. When materials enter the sharing and embedding stage, the three-review forms, proofs, and proofreading records are each referenced and displayed as independent objects for the next stage to sign off and verify.

## Configuration and implementation checks

This stage is executed by the share link in the publishing channel (the publishing service performs authentication), and outputs the share link, display parameters, and authentication result. The material drafts that can be issued and the handover records are seen by external visitors according to their identity, who then continue to complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | Name, quantity, date, and signature match item by item in the handover record | Check the name, quantity, date, and signature of the three-review form against the handover record; check the display item pointed to by `shareId` |
| Proof | Version and date are synchronized with the handover record, and change traces are not lost | Check the proof version number and date; access once with an unauthenticated session to see the referenced display item |
| Proofreading record | The issue lists and handling results of each proof round have consistent quantities, and receipts are complete | Check the number of proofreading record entries and receipts; try once with an over-limit request to see whether it is allowed through |
| Handover record | Responsible person is clear, version and date are consistent, and missing items are blocked | Draft one according to the template and complete one handover; check `shareId` and display parameters |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the three-review form and the handover record. Cause: when drafting, it was not copied from the same source document, and fields were not compared item by item.
- Symptom: the proof version is not synchronized, and the handover record still points to the old version. Cause: after the proof round was updated, the version number and date were not synchronized, and the responsibility handover was not re-signed.
- Symptom: signatures or receipts are missing, but the material is still allowed through. Cause: the sign-off stage did not check signatures and receipts, and the missing-item blocking rule did not take effect.

## How to verify the setup

Acceptance of this feature: access once each with an unauthenticated session and an over-limit request, and check the allow-through and referenced display; check `shareId`, expiration time, identity verification, and referenced display items.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback address.
- Check item by item the switch status of referenced snippets, referenced full text, and source original download, and record the number of array entries.
