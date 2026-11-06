---
title: Sharing and Embedding for Research Outcome Registration and Intellectual Property: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c061-f003
page_type: 行业问题页
application_area: education
meta_title: Research IP | Sharing & Embeds | Access
meta_description: Research IP: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Outcome Registration and Intellectual Property: Manage Authorized Access and External Services

## What this category's data looks like

Research achievement registration and intellectual property management involves three core types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the name, contributors, date, and signatures; patent disclosure documents carry the technical solution, inventors, filing date, and receipt; software copyright materials include the version number, copyright holder, development completion date, and seals. The three types of materials play different roles in authorized access and external services: the registration form serves as the indexing basis for the external entry point, while the disclosure document and copyright materials serve as restricted display objects. The source of the materials is archiving by the research management department, and the update cadence changes with filing, review, and registration milestones. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and it is common for the same record to have inconsistent names or dates across two materials, unsynchronized versions, or missing signatures or receipts.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. The externally available entry point and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, quantity, and date must be consistent with the corresponding records in the patent disclosure document, and signatures and receipts must be complete | Compare the name, quantity, and date in the two materials item by item, and check whether signatures and receipts are missing |
| Patent disclosure document | The version number is synchronized with the version description in the software copyright materials, and the inventor's signature and receipt are complete | Check whether the version number is synchronized with the copyright materials, and inspect the inventor's signature and receipt |
| Software copyright materials | The copyright holder and development completion date are consistent with the registration form, and seals and receipts are not missing | Compare the copyright holder with the registration form record, and check the date and seal receipt |
| Sharing link | The expiration time, per-minute access limit, identity verification, and citation display items are configured as needed | Check the time limit and access limit of the link corresponding to `shareId`, and try once each with an unauthenticated session and an over-limit request |

## Three common errors

- Symptom: the name or date of the same achievement does not match between the registration form and the disclosure document. Cause: the two materials are entered separately, and no cross-validation is performed.
- Symptom: the version of the copyright materials is not synchronized, and an old version is displayed externally. Cause: the update cadence is inconsistent, and there is a lack of version check actions.
- Symptom: the disclosure document is missing the inventor's signature or receipt. Cause: the completeness of signatures and receipts was not checked during archiving.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, check the allowance and citation display, and verify the expiration time and per-minute access limit of the link corresponding to `shareId`.

Business test: access once with a restricted identity, and see whether the visible scope matches the settings.

- Check the expiration time, per-minute access limit, and identity verification callback address of the link corresponding to `shareId`
- Check item by item the display toggle states of the cited snippet, the full cited text, and the source original text
