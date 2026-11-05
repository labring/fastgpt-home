---
title: Sharing and Embedding for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c017-f003
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Sharing & Embeds | Handover
meta_description: Undergraduate Programs: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The drafting of materials and handover of responsibility for undergraduate program setup and dynamic adjustment revolve around three types of materials: the program setup application form, the talent training plan, and expert review opinions. The program setup application form records the proposed program name, code, length of study, and degree-granting category; the talent training plan records the curriculum system, credits and class hours, and graduation requirements; the expert review opinions record the review conclusion, list of experts, and signatures. The three types of materials are updated by academic year or adjustment batch, and their fields include name, quantity, date, and signature fields. When entering the sharing and embedding stage, the program setup application form serves as the main record, while the talent training plan and expert review opinions serve as attachment records, each taking on the role of field traceability and signature receipt, for the next stage to view and sign off by identity.

## Configuration and implementation checks

This stage is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. The material drafts and handover records that can be issued are seen by external visitors according to their identity, who then complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | The name, quantity, date, and signature fields are complete, and match the talent training plan and expert review opinions item by item | Check whether the program name, course quantity, and review date in the application form are consistent with the two attachments, and check the signatures and receipts |
| Talent training plan | The curriculum system, credits and class hours, and graduation requirement fields are complete, and the version and date are synchronized | Check whether the plan version number is synchronized with the application form version, and check whether the credits and class hours match the course quantity |
| Expert review opinions | The review conclusion, list of experts, and signature receipts are complete, and the date is consistent with the application form | Check the number of experts and the list, check the signature fields and receipts, and compare the review date |
| Sharing link | The expiration time, per-minute access limit, identity verification, and citation display items are set as needed | Check the time limit and values in the link configuration, try once each with an unauthenticated session and an over-limit request, and check `shareId` |

## Three common errors

- Symptom: the same program name is inconsistent between the application form and the talent training plan. Cause: the two materials were drafted separately, and the names and quantities were not cross-checked.
- Symptom: the expert review opinions lack signatures or receipts. Cause: the signature fields were not checked during handover, and the receipts did not flow along with the materials.
- Symptom: the link cannot be opened after a period of time or access is rate-limited. Cause: the expiration time and per-minute access limit were not set as expected, and no over-limit request was used for verification.

## How to verify the setup

Acceptance of this feature: access once each with an unauthenticated session and an over-limit request, check the allowance and citation display, and check the expiration time and access limit corresponding to `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check whether the name, quantity, date, and signatures of the program setup application form, talent training plan, and expert review opinions are consistent
- Check the expiration time, per-minute access limit, identity verification, and citation display items in the link configuration, and try once each with an unauthenticated session and an over-limit request
