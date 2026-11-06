---
title: Sharing and Embedding for Kindergarten and Family Communication: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c004-f003
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Sharing & Embeds | Handover
meta_description: Family Communication: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Kindergarten and Family Communication: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the drafting of materials and the handover of responsibilities in kindergarten home-school co-education communication. The material sources are class records, notice receipts, and parent request registrations, with an update cadence of daily aggregation and weekly issuance. The category's verification dimensions include committed items and response times, descriptions of children's performance, classification of parent requests, and notice delivery. When issuable material drafts and handover records enter the sharing and embedding stage, their roles differ: the draft is responsible for providing the fields to be confirmed, the handover record is responsible for locking the responsible person and version date, and the share link only carries display and authentication and does not replace the material itself.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), and outputs the share link, display parameters, and authentication result. "Issuable material drafts and handover records" are then completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Issuable material draft | Whether committed items and response times correspond one by one, and whether descriptions of children's performance are consistent with observation records | Draft one according to the template, check the committed response times against the observation records, and after confirming the fields are complete, hand it to the next step for sign-off |
| Handover record | Whether the responsible person is clear, whether the version and date are consistent, and whether parent requests are classified into the corresponding categories | Complete one handover, check the responsible person, version, date, and request classification, and if any item is missing, the signing party returns it |
| Share link | Whether the expiration time, per-minute access limit, identity verification, and cited display items are set as needed | Check the time limit and values in the link configuration, access once with an unauthenticated session, and try once with an over-limit request |
| `shareId` | Whether the share link corresponding to this identifier points to the scope of this material | Open the link by `shareId`, check the display parameters and authentication result, and confirm the status of the cited snippet and full-text toggles |

## Three common errors

- Phenomenon: parent commitments are not responded to. Cause: the draft's committed items and response times do not correspond one by one, and the commitment dimensions were not checked during handover.
- Phenomenon: descriptions of children's performance do not match the observation records. Cause: the original observation records were not reviewed during drafting, and the handover record did not include the version date.
- Phenomenon: parent requests are not classified. Cause: feedback was not registered by request classification, the handover record lacks the classification field, and the signing party cannot return it.

## How to verify the setup

This feature's acceptance: access once each with an unauthenticated session and an over-limit request, check the allow/deny and cited display, and check the display parameters and authentication result corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, identity verification, and cited display items in the link configuration, and access once with an unauthenticated session.
- Open the link by `shareId`, check the cited snippet, cited full text, and source original text display items, and record the number of citations and the cited text tokens.
