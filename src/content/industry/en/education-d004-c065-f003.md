---
title: Sharing and Embedding for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c065-f003
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Sharing & Embeds | Handover
meta_description: Lab Chemicals: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Laboratory Hazardous Chemical Purchasing and Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the laboratory hazardous chemical procurement and ledger category. Materials include hazardous chemical procurement applications, usage registrations, inventory ledgers, as well as signable material drafts and handover records derived from these materials. Sources are the laboratory's internal requisition, usage, and inventory counting processes. The update cadence advances by batch, usage event, and monthly inventory count. Field characteristics center on name, quantity, date, responsible person, signature, and receipt. When materials enter the sharing and embedding feature, the procurement application handles initiation and approval trail, the usage registration handles circulation and consumption confirmation, the inventory ledger handles balance and version baseline, and the handover record handles responsibility transfer and sign-off. Each material is displayed by identity in the link. Only when fields are complete, the responsible person is clear, and version and date are consistent can it enter the next step of sign-off.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. Signable material drafts and handover records are seen by external visitors according to their identity, who then complete them accordingly.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Name, quantity, date, and responsible person's signature are complete; version is consistent with the ledger | Check the name, quantity, and date on the application form against the inventory ledger; access once with an unauthenticated session to check the release and reference display of the link corresponding to `shareId` |
| Usage registration | Usage name, quantity, date, and user's signature and receipt are complete | Check item by item the name, quantity, and date on the registration against the procurement application; try once with an over-limit request to check the per-minute access limit value |
| Inventory ledger | Balance quantity, date, and version number are consistent; responsible person is clear | Check the ledger version against the handover record version; check item by item the toggle status of the reference snippet, reference full text, and source original text display items |
| Handover record | Signatures and receipts of both handover parties are complete; version and date are consistent | Draft one according to the template and complete one handover to see whether missing items are blocked; check the time limit and identity verification callback of `shareId` in the link configuration |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: The two materials are maintained separately and are not checked against the same version baseline.
- Symptom: The handover record lacks a signature or receipt, and the next step cannot be signed off. Cause: Fields were incomplete at drafting time, and missing items were not blocked according to the template.
- Symptom: The link cannot be opened after a period of time, and the reference full text can be seen without logging in. Cause: The expiration time and identity verification callback were not set according to usage needs, and the toggle status of reference display items was not checked item by item.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request to check release and reference display; check the expiration time, per-minute access limit, and identity verification callback of the link corresponding to `shareId`, as well as the toggle status of the reference snippet, reference full text, and source original text display items.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- In the link configuration, check the expiration time and per-minute access limit values, and try once with an over-limit request.
- Check item by item the toggle status of the reference snippet, reference full text, and source original text display items, and access once with an unauthenticated session to check the identity verification callback.
