---
title: Sharing and Embedding for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c057-f003
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Sharing & Embeds | Handover
meta_description: National R&D Grants: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in National Key R&D Program project applications, involving three types of materials: the project application form, the budget application form, and the cooperation agreement. Sources are application notices, templates, and historical versions, and the update cadence rolls forward with the application stages. Field characteristics center on names, quantities, dates, signatures, and receipts. When entering this feature, the project application form plays the main-document role, the budget application form plays the funding-field role, and the cooperation agreement plays the partner-and-task-division role; the three share the same record's name, quantity, and date definitions.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. "Issuable material drafts and handover records" are then completed by external visitors who see the corresponding content according to their identity. The sharing link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Names, quantities, dates, and signatures must be consistent with the budget application form and the cooperation agreement | Compare names, quantities, and dates in the three materials item by item, check whether signatures and receipts are complete, and check the display parameters of the link corresponding to `shareId` |
| Budget application form | Funding fields must not conflict with the same record in the project application form and the cooperation agreement | Check whether the name, quantity, and date of the same record match in the two materials, check whether the version and date are synchronized, and access once with an unauthenticated session |
| Cooperation agreement | Partner names, task division, and signature receipts must match the application materials | Check the partner name and task division fields, check signatures and receipts, and test the per-minute access limit once with an over-limit request |
| Sharing link | Expiration time, per-minute access limit, credit limit, and identity verification are set according to usage needs | Check the time limit and values in the link configuration, check the toggle states of the display items for quoted snippets, quoted full text, and source original text item by item, and record `shareId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form, and it is returned during handover. Cause: Drafting and handover were not checked against the same field definitions, and versions were not synchronized.
- Symptom: The cooperation agreement's signature or receipt is missing, and the material is blocked when entering the next stage. Cause: The handover record did not confirm signatures and receipts item by item, and the responsible person and date were not aligned.
- Symptom: The link cannot be opened after some time, or the quoted full text can be seen without logging in. Cause: The expiration time and identity verification were not set according to usage needs, and the quote display items were not checked item by item.

## How to verify the setup

This feature's acceptance: access once each with an unauthenticated session and an over-limit request, check the pass-through and quote display, and check the expiration time, per-minute access limit, and toggles for quoted snippets, quoted full text, and source original text of the link corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time and per-minute access limit in the link configuration, and test once with an over-limit request
- Access once with an unauthenticated session, and check the toggle states of the display items for quoted snippets, quoted full text, and source original text item by item
