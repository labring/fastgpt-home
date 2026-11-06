---
title: Sharing and Embedding for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c064-f003
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Sharing & Embeds | Handover
meta_description: Lab Safety Categories: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the university laboratory safety grading and classification scenario, aggregating three types of issuable materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The materials come from department and laboratory submissions and are archived by the equipment office, updated per semester or per project change. The field characteristics center on name, quantity, date, signature, and receipt: the grading and classification table records room use and risk level, the hazard source list records product name, quantity, and storage location, and the safety responsibility statement records the responsible person, version, and signing date. When the materials enter a share link, the grading and classification table and the hazard source list serve as display items for external visitors to consult according to their identity, while the safety responsibility statement is checked together with its version and date as a handover record; the three together support material drafting and responsibility handover.

## Configuration and implementation checks

This part is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. The issuable material drafts and handover records are completed by external visitors who see the corresponding content according to their identity. The link can be configured with an expiration time, a per-minute access limit, a credit limit, identity verification, and display items for quoted snippet, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Name, quantity, date, and signature must be aligned item by item with the hazard source list, and the version must be synchronized | Check the room name, hazard source quantity, update date, and signature field of the grading and classification table against the hazard source list, and compare the version numbers |
| Hazard source list | Product name, quantity, storage location, and date must be consistent with the grading and classification table; a missing signature or receipt blocks release | Draft one according to the template and complete one handover, check whether missing items in the list are blocked, and verify the record corresponding to `shareId` |
| Safety responsibility statement | Responsible person, version, and signing date must be consistent with the handover record, and receipts must be complete | Check the signature and receipt of the responsibility statement, and confirm that the version and date are consistent with the grading and classification table and the hazard source list |
| Share link | Expiration time, per-minute access limit, identity verification, and quoted display items are set as needed | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and record `shareId` |

## Three common errors

- Symptom: the name, quantity, and date of the same hazard source do not match between the grading and classification table and the hazard source list. Cause: the two materials were submitted separately and were not aligned item by item against the same record.
- Symptom: the safety responsibility statement has been updated, but the grading and classification table is still the old version. Cause: the version was not synchronized, and the version number and signing date were not checked during handover.
- Symptom: the handover record lacks a signature or receipt, but the link can still be opened. Cause: signatures and receipts were not included in the release conditions, and quoted display items were mistakenly treated as the file visibility scope.

## How to verify the setup

Acceptance of this feature: access once each with an unauthenticated session and an over-limit request, check release and quoted display, and record the expiration time, per-minute access limit, and identity verification result corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration, and access once with an unauthenticated session.
- Check the switch status of quoted snippet, quoted full text, and source original text download item by item, and record `shareId`.
