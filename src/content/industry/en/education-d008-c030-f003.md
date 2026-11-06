---
title: Sharing and Embedding for Vocational School Student Internships: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c030-f003
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Sharing & Embeds | Access
meta_description: Student Internships: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Vocational School Student Internships: Manage Authorized Access and External Services

## What this category's data looks like

Vocational school student internship management involves three types of materials: internship agreements, internship plans, and internship logs. Their respective fields, dates, and signatures must correspond to one another. The internship agreement contains the organization name, position, start and end dates, and three-party signatures; the internship plan contains the batch, rotation arrangements, and supervising teacher confirmation; the internship log records the position, tasks, and mentor signature on a daily basis. When the materials enter the sharing and embedding feature, the agreement and plan serve as the basis for external authorization, while the log serves as the process record display. The update rhythm advances with batches and monthly receipts. It is common for the same record to have mismatched names, quantities, and dates across the two materials, for versions to be out of sync, and for signatures or receipts to be missing.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. "Externally available entry points and authorization scope" are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | The organization name, position, start and end dates, and three-party signatures are consistent across the two materials | Check the organization name, position, and dates in the agreement and plan, and check whether signatures and receipts are complete |
| Internship plan | The batch, rotation arrangements, and supervising teacher confirmation dates correspond to the agreement | Check the batch and dates in the plan and log, and check whether versions are in sync |
| Internship log | The daily recorded position, tasks, and mentor signature are consistent with the plan | Check the task names, quantities, and dates in the log and plan, and check for missing signatures or receipts |
| Sharing link | The expiration time, per-minute access limit, identity verification, and citation display items are configured as needed | Check the link configuration, access once with a restricted identity, and view the authentication result for the link corresponding to `shareId` |

## Three common errors

- Symptom: The same record has mismatched names, quantities, and dates in the agreement and plan. Cause: The two materials are maintained separately, without cross-checking and a unified version.
- Symptom: The link cannot be opened after a period of time. Cause: The expiration time has passed, or the version is out of sync so the old link is still being referenced.
- Symptom: The full cited text can be seen without logging in. Cause: The identity verification callback is not connected, or the citation display item switches are not set according to the visibility scope.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, and check the allowance and citation display; check the expiration time, per-minute access limit, identity verification callback, and the citation snippet, full citation, and source original text display items of the `shareId` link.

Business test: access once with a restricted identity and see whether the visibility scope matches the setting.

- Check the expiration time, per-minute access limit, point limit, and identity verification callback address in the link configuration.
- Check the switches for the citation snippet, full citation, and source original text display items one by one, and verify the visibility scope with a restricted identity.
