---
title: Sharing and Embedding for Vocational Training Subsidy Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c037-f003
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Sharing & Embeds | Access
meta_description: Training Subsidies: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Vocational Training Subsidy Applications: Manage Authorized Access and External Services

## What this category's data looks like

Application materials for vocational training subsidies mainly consist of training class filing records, attendance records, and completion assessment forms. They come from training institutions' business systems and offline paper receipts, and are pushed in batches as each class cohort starts and completes. When these three types of materials enter the sharing and embedding stage, they play different roles: class filing records provide subject and course fields, attendance records provide personnel and date fields, and completion assessment forms provide assessment result and signature fields. Field characteristics are concentrated in four places: name, quantity, date, and signature. It is common for the name, quantity, and date of the same record to fail to match across two materials, for versions to be out of sync, and for signatures or receipts to be missing. External entry points distinguish visible scope by visitor identity; parents or higher-level authorities can only see the fields and files that match their identity.

## Configuration and implementation checks

This step is carried out by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. The externally available entry points and authorization scope are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with an expiration time, a per-minute access limit, a points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Sharing link | The expiration time is set as needed, and when identity verification is connected to third-party authentication, there is a callback address | Check the time limit in the link configuration, and access it once with an unauthenticated session |
| Training class filing record | The name, quantity, date, and signature match across the filing form, attendance records, and completion assessment form | Compare the name, quantity, date, and signature of the same record item by item; if a receipt is missing, return it for supplementary signing |
| Attendance record | The personnel and date fields are in sync with the versions of the filing form and completion assessment form | Check the date and number of people, and verify whether the two materials reference the same version |
| Completion assessment form | The assessment result and signature fields are complete and consistent with the filing form and attendance records | Check the signature and receipt, and confirm the switch status of the quoted display items |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record fail to match between the filing form and attendance records. Cause: The two materials are entered separately, without field-level comparison.
- Phenomenon: The version of the completion assessment form is not in sync, and the old version is still referenced by the sharing link. Cause: The publishing channel does not uniformly update material versions by class cohort.
- Phenomenon: Signatures or receipts are missing, but they are still visible in external display. Cause: The quoted display items only control snippets and full text, not the visible scope of files.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, check the allow decision and quoted display, and record the expiration time, per-minute access limit, and points limit of the link corresponding to `shareId`.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, check the tokens and array count of the quoted text and record them separately; `quoteMaxToken` is only used as the quoted content budget.

- Check the expiration time, per-minute access limit, points limit, and identity verification callback address in the link configuration, and try once with an unauthenticated session.
- Check the switch status of the display items for quoted snippets, quoted full text, and source original text item by item, and compare the name, quantity, date, and signature of the training class filing record, attendance record, and completion assessment form.
