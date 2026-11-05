---
title: Sharing and Embedding for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c045-f003
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Sharing & Embeds | Access
meta_description: Training Compliance: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services

## What this category's data looks like

Off-campus training compliance filing and penalty response materials include three categories: school operation licenses, course filing materials, and fee disclosure. A school operation license records the institution name, address, validity period, and issuance date, and is the baseline qualification; course filing materials list course names, class hours, instructors, and filing dates, corresponding to the content actually offered; fee disclosure states fee items, standards, and disclosure dates, and must be accompanied by parent receipts or signatures. When the three categories of materials enter the sharing and embedding function in the system, their roles differ: the school operation license serves as a qualification credential for higher-level verification, course filing materials let parents understand course arrangements, and fee disclosure lets parents confirm the basis for payment. The update rhythm of materials changes with filing changes, course adjustments, and fee policy changes. A common field characteristic is that the same record has inconsistent institution names, course counts, and dates between the school operation license and course filing materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The externally available entry point and authorization scope are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with an expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | The institution name, address, validity period, issuance date, and signature/seal must be consistent with the course filing materials | Check the time limit in the link configuration, and verify the license fields item by item against the corresponding items in the course filing materials |
| Course filing materials | The course names, class hours, instructors, and filing dates must correspond to the course count in the fee disclosure | Verify the switch status item by item, access once with an unauthenticated session, and check the quote display items |
| Fee disclosure | The fee items, standards, disclosure date, and parent receipts or signatures must be complete and version-synchronized | Verify the values, and try once with an over-limit request, recording `shareId` and the authentication result |

## Three common errors

- Symptom: The institution name, course count, and dates for the same record do not match between the school operation license and the course filing materials. Cause: The two materials are maintained separately, without cross-checking and version synchronization.
- Symptom: The fee disclosure lacks parent receipts or signatures, and the version of the course filing materials is not synchronized. Cause: The update process has no receipt collection and version archiving steps.
- Symptom: The link cannot be opened after a period of time, and the quoted full text can be seen without logging in. Cause: The expiration time and identity verification were not configured as needed, and the quote display items were not checked item by item.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, and check the allow decision and quote display; check `shareId`, expiration time, per-minute access limit, point limit, and identity verification callback address in the link configuration, and verify the switch status of quoted snippets, quoted full text, and source original text item by item.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- Check the time limit, per-minute access limit, point limit, and identity verification callback address in the link configuration, and access once each with an unauthenticated session and an over-limit request.
- Verify the switch status of quoted snippets, quoted full text, and source original text item by item, record `shareId` and the authentication result, and compare the fields, dates, and signatures of the school operation license, course filing materials, and fee disclosure.
