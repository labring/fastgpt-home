---
title: Sharing and Embedding for Laboratory Hazardous Chemical Purchasing and Records: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c065-f003
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Sharing & Embeds | Access
meta_description: Lab Chemicals: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Laboratory Hazardous Chemical Purchasing and Records: Manage Authorized Access and External Services

## What this category's data looks like

Laboratory hazardous chemical procurement and ledger materials originate from three types of records: procurement application forms, usage registration forms, and inventory ledgers. They are updated by batch, and the fields include product name, specification, quantity, date, handler signature, and receipt. After a procurement application enters a share link, it serves as the authorization object for the external entry point; usage registrations and inventory ledgers are displayed as visible content according to identity scope. The three materials must align with each other in name, quantity, date, and signature. If a receipt or signature is missing, they must not be used as an external basis. When the materials enter this function, they each assume the roles of application basis, usage voucher, and balance certificate. The share link is only responsible for handing the entry point and display parameters to external visitors; it does not change the permission ownership of the materials themselves.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. The externally available entry point and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application form | The name, quantity, date, and signature must be consistent with the usage registration and inventory ledger; if the signature or receipt is missing, it does not enter the external scope | Check the product name, quantity, and date on the application form against the ledger, and check whether the signature and receipt are complete |
| Usage registration form | The name, quantity, and date of the usage record must match the procurement application and inventory ledger, and the version must be synchronized | Compare the corresponding fields of the usage registration with the procurement application and inventory ledger item by item, and confirm that no version is unsynchronized |
| Inventory ledger | The balance quantity must reconcile with the procurement application and usage registration, with continuous dates and no missing signatures | Check the quantity difference between the ledger balance and the application and usage records, and inspect the date and signature columns |
| Share link | Set the expiration time, per-minute access limit, credit limit, and identity verification as needed, and toggle quoted snippet, quoted full text, and source original text on or off as required | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and verify the quote display toggles item by item |

## Three common errors

- Symptom: The name, quantity, and date of the same hazardous chemical do not match across two materials. Cause: The procurement application and usage registration were not entered synchronously by the same batch, and the ledger was not reconciled in time.
- Symptom: The externally displayed ledger version is inconsistent with the internal registration version. Cause: The version was not synchronized, and the share link still references the old record and was not replaced with the update.
- Symptom: The usage record lacks a handler signature or receipt. Cause: The registration step was not closed-loop, and when the material entered the external scope, it lacked verifiable signature and receipt basis.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, and check the allowance and quote display; check the expiration time, per-minute access limit, credit limit, and identity verification in the link configuration, verify the quoted snippet, quoted full text, and source original text toggles item by item, and record `shareId`.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; check whether the name, quantity, date, and signature of the procurement application, usage registration, and inventory ledger are consistent.

- Check the expiration time, per-minute access limit, credit limit, and identity verification in the link configuration, and access once each with an unauthenticated session and an over-limit request.
- Verify the quoted snippet, quoted full text, and source original text toggle states item by item, record `shareId`, and confirm that the quote display items do not change the file visibility scope.
