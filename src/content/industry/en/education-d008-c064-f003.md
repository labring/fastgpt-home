---
title: Sharing and Embedding for University Laboratory Safety Classification: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c064-f003
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Sharing & Embeds | Access
meta_description: Lab Safety Categories: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for University Laboratory Safety Classification: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses university laboratory safety grading and classification materials, including laboratory grading and classification tables, hazard source lists, and safety responsibility statements. The three types of materials come from different sources: the grading and classification table is consolidated by the Laboratory and Equipment Management Office, the hazard source list is reported by each laboratory on a semester basis, and the safety responsibility statement is signed level by level by the departments and laboratory heads. In terms of update cadence, the grading and classification table is adjusted as laboratories are renovated or added, the hazard source list is reviewed each semester, and the responsibility statement is re-signed per academic year or upon personnel changes. Field characteristics center on names, quantities, dates, and signatures: the same laboratory may be recorded as level three in the classification table but written as level two in the hazard source list; the same hazardous chemical may have inconsistent quantities, storage locations, and validity periods in the list and the appendix to the responsibility statement; and missing signatures from the person in charge or missing receipts in the responsibility statement are also common. When these materials enter the sharing and embedding feature, the grading and classification table determines the visibility level, the hazard source list determines the displayed entries, and the responsibility statement determines the authorization scope and receipt status; together, the three constitute the authorization basis for the external entrance.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The externally accessible entrance and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the names, quantities, dates, and signatures correspond item by item with the hazard source list, and whether the grading result is consistent with the authorization level | In the link configuration, check the time limit and identity verification callback, access once with a restricted identity, and check whether the visible level matches the grading result |
| Hazard source list | Whether the names, quantities, storage locations, and validity periods of the same hazard source are consistent in the list and the appendix to the responsibility statement, and whether the versions are synchronized | Check item by item the switches for quoted snippets, quoted full text, and source original download, and confirm that the displayed entries are consistent with the list version |
| Safety responsibility statement | Whether signatures and receipts are complete, whether the signing date is within the validity period, and whether the responsible person is consistent with the personnel registered in the classification table | Check the expiration time and per-minute access limit of the sharing link, try once with an over-limit request, and check the receipt status and authorization scope |
| shareId | Whether the sharing link identifier corresponds to this external entrance, and whether the authentication result changes with identity | Access once with an unauthenticated session, check the release and quote display, and record the display parameters corresponding to this identifier |

## Three common errors

- Symptom: The names, quantities, and dates of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: The two materials are reported separately by different positions, and no cross-check is performed during updates.
- Symptom: The responsibility statement lacks a signature or receipt, yet the external entrance still shows authorized. Cause: The signing status is not synchronized to the authentication result of the sharing link, and the version is not synchronized.
- Symptom: The quoted full text can be seen without logging in. Cause: The quote display item controls snippets and full text, but does not control the file visibility scope; the visibility scope is determined by file permissions.

## How to verify the setup

Feature acceptance: Access once each with an unauthenticated session and an over-limit request, check the release and quote display, confirm that quoted snippets, quoted full text, and source original download take effect according to the switches, and record the authentication result corresponding to `shareId`.

Business testing: Access once with a restricted identity, see whether the visible scope matches the settings, and ensure unauthorized content is not visible.

- In the link configuration, check the expiration time, per-minute access limit, point limit, and identity verification callback address, and check item by item the switch status of quoted snippets, quoted full text, and source original download.
- Access once each with a restricted identity and an unauthenticated session, compare the names, quantities, dates, and signatures of the grading and classification table, hazard source list, and safety responsibility statement, and confirm that versions are synchronized and unauthorized content is not visible.
