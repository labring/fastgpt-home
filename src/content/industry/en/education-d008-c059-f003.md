---
title: Sharing and Embedding for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c059-f003
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Sharing & Embeds | Access
meta_description: Research Finance: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services

## What this category's data looks like

Materials for research funding budget adjustments and reimbursements consist of three types: budget adjustment applications, reimbursement forms, and contract invoices. Sources are submissions from the research group and returns from the financial system, with updates refreshed on a rolling basis according to approval milestones. Budget adjustment applications record the adjusted account, amount, and approval date; reimbursement forms record expense details, quantity, date, and handler signature; contract invoices provide name, quantity, date, and receipt basis. When these three types of materials enter the sharing and embedding feature, budget adjustment applications play the role of defining the authorization scope, reimbursement forms play the role of field comparison, and contract invoices play the role of voucher verification, jointly determining the entry points and content boundaries that external visitors see according to their identity.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The externally available entry points and authorization scope are then completed by external visitors seeing the corresponding content according to their identity. Citation display items only control the display of snippets, full text, and source original text, and do not change the file visibility scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The adjusted account, amount, and approval date are consistent across the three materials, and signatures and receipts are complete | Check name, quantity, and date item by item against the reimbursement form and contract invoice, inspect signatures and receipts, and verify the expiration time in the link configuration |
| Reimbursement form | The quantity and date of expense details match the contract invoice, and the version is the latest synchronized version | Test the per-minute access limit once with an over-limit request, and verify the display item toggles for citation snippets, citation full text, and source original text |
| Contract invoice | The invoice name, quantity, and date are consistent with the reimbursement form, with no missing signature or receipt | Access once with an unauthenticated session, check whether the identity verification callback intercepts, and record the authentication result of the link corresponding to `shareId` |
| Sharing link | The visitor identity matches the visible scope, and unauthorized content is not visible | Verify the display parameters and authentication result by `shareId`, and confirm that restricted identities cannot see content beyond authorization |

## Three common errors

- Symptom: The name, quantity, and date of the same reimbursement do not match between the reimbursement form and the contract invoice. Cause: The two materials were entered separately without field comparison, and versions were not synchronized.
- Symptom: The budget adjustment application has been updated, but the sharing link still displays the old amount and approval date. Cause: Versions were not synchronized, and the publishing channel did not regenerate the authentication result.
- Symptom: The contract invoice is missing a signature or receipt, but external visitors can still see the citation full text. Cause: The identity verification callback did not intercept the unauthenticated session, and the citation display items were not turned off as needed.

## How to verify the setup

Acceptance for this feature: Access once each with an unauthenticated session and an over-limit request, check the allow-through and citation display, and verify the display parameters and authentication result of the link corresponding to `shareId`.

Business test: Access once with a restricted identity and see whether the visible scope matches the settings

- In the link configuration, verify the expiration time, per-minute access limit, credit limit, and identity verification callback address, and check item by item the toggle status of the display items for citation snippets, citation full text, and source original text.
- Record the display parameters and authentication result of the sharing link by `shareId`, and compare whether the name, quantity, date, signature, and receipt of the budget adjustment application, reimbursement form, and contract invoice are consistent.
