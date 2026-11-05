---
title: Sharing and Embedding for National Key Research and Development Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c057-f003
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Sharing & Embeds | Access
meta_description: National R&D Grants: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for National Key Research and Development Applications: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the National Key R&D Program project application scenario, covering three types of materials: the project application form, the budget application form, and the cooperation agreement. The application form fields include project name, undertaking unit, person in charge, start and end dates, and signature page; the budget form includes subject, quantity, amount, and preparation date; the cooperation agreement includes partner name, task division, signing date, and receipt. When the materials enter authorized access and external services, the application form and budget form serve as the main subjects of external display, while the cooperation agreement serves as an attachment and supporting evidence. The update rhythm advances with the application stage. A common field characteristic is that the same record's name, quantity, and date must remain consistent across the two types of materials, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. "The externally available entry point and authorization scope" are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, date, and signature page must be consistent with the budget application form and cooperation agreement | Compare the name, quantity, and date of the three materials item by item, and check whether the signature page and receipt are complete |
| Budget application form | Subject, quantity, amount, and preparation date must align with the application form and cooperation agreement | Check the quantity and date of the same record in the two materials, and confirm version synchronization |
| Cooperation agreement | Partner name, task division, and signing date must be consistent with the application form | Check the signing date and receipt, and confirm missing signatures or receipts |
| Sharing link | Expiration time, per-minute access limit, credit limit, identity verification, and quote display items are set as needed | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and check the authentication result and quote display corresponding to `shareId` |

## Three common errors

- Symptom: the link cannot be opened after a period of time. Cause: the expiration time has been reached, and the time limit in the link configuration is not synchronized with the application stage.
- Symptom: the same record's name, quantity, and date do not match between the application form and the budget form. Cause: versions are not synchronized, and the two materials were modified separately without being merged.
- Symptom: the quoted full text can be seen without logging in. Cause: identity verification is not integrated or the quote display item switches are not differentiated by identity, and the file visibility scope is not tightened according to identity.

## How to verify the setup

This feature's acceptance: access once each with an unauthenticated session and an over-limit request, check the allowance and quote display, and check the authentication result corresponding to `shareId` and the switch status of quoted snippets, quoted full text, and source original text.

Business test: access once with a restricted identity, see whether the visibility scope matches the setting, and check the name, quantity, date, and signature receipt of the application form, budget form, and cooperation agreement.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration, and try once with an unauthenticated session.
- Check the display item switches for quoted snippets, quoted full text, and source original text item by item, and compare the name, quantity, date, and signature receipt of the three materials.
