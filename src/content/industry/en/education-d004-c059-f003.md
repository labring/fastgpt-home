---
title: Sharing and Embedding for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c059-f003
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Sharing & Embeds | Handover
meta_description: Research Finance: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Material drafting and responsibility handover for research funding budget adjustments and reimbursements involves three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, and adjustment reason; reimbursement forms record expense details and the handler; contract invoices record the name, quantity, date, and signature. The material sources are the project leader, financial handler, and contract administrator, and the update cadence advances with the budget cycle and reimbursement batches. When the materials enter the sharing and embedding function, they each serve as drafts pending issuance and handover records, displaying the corresponding content by role. Only when the fields are complete, the responsible person is clear, and the version and date are consistent can they be handed off to the next stage for receipt.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The issuable material drafts and handover records are seen by external visitors according to their identity, who then continue to complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The account, amount, adjustment reason, and signature are complete, and the version and date are consistent | Check the application fields and signature, and verify whether the version number and date are synchronized |
| Reimbursement form | The expense details, handler, and receipt are complete, and the name and quantity match the contract invoice | Compare the name, quantity, and date of the reimbursement form and the contract invoice item by item |
| Contract invoice | The contract name, invoice quantity, date, and signature are complete, and correspond to the reimbursement form | Check the correspondence between the contract invoice and the reimbursement form as well as the signature receipt |
| Sharing link | The expiration time, per-minute access limit, identity verification, and citation display items are set as needed | Check the configuration corresponding to `shareId`, and access once each with an unauthenticated session and an over-limit request |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were drafted separately, without field comparison and version synchronization.
- Symptom: The versions of the contract invoice and the reimbursement form are not synchronized, and the signature or receipt is missing. Cause: The handover step did not verify the version number and signature status, and proceeded directly to the next step.
- Symptom: The link cannot be opened after a period of time, or the full cited text can be seen without logging in. Cause: The expiration time and identity verification were not set according to usage needs, and the citation display items were not checked one by one.

## How to verify the setup

How to verify the setup: Acceptance for this function: access once each with an unauthenticated session and an over-limit request, verify the allowance and citation display, and check the configuration corresponding to `shareId`.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, and identity verification callback address, and access once with an unauthenticated session.
- Check the switch status of the citation snippet, full citation text, and source original text download item by item, and record the tokens and array count of the citation text.
