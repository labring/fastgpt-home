---
title: Sharing and Embedding for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c061-f003
page_type: 行业问题页
application_area: education
meta_title: Research IP | Sharing & Embeds | Handover
meta_description: Research IP: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Research achievement registration and intellectual property management draws on sources including achievement registration forms, patent disclosure documents, and software copyright materials, with an update cadence that follows version iterations and approval circulation. Achievement registration forms record the name, contributors, date, classification level, and registration number; patent disclosure documents carry the technical solution, implementation methods, and a list of drawings; software copyright materials list the source program, documentation, and ownership of rights. When entering the sharing and embedding stage, the achievement registration form serves as the master record anchoring the name and date, while the patent disclosure document and software copyright materials stand as independent attachment materials, and the fields across all three must be cross-consistent. After materials enter this feature, the master record is responsible for the version and responsible-person identification, the attachment materials are responsible for technical details and signature receipts, and the sharing link only carries display and authentication, without changing the materials' own fields or signature status.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The signable material drafts and handover records are completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, quantity, date, and registration number are consistent across the patent disclosure document and software copyright materials, and the responsible person's signature and receipt are complete | Compare the name, quantity, and date field by field across the three materials, check the signature and receipt, and record the `shareId` |
| Patent disclosure document | The technical solution, implementation methods, and drawing list fields are complete, and the version number and date are synchronized with the master record | Check the version number and date, verify whether the drawing list corresponds to the references in the body text, and record the `shareId` |
| Software copyright materials | The source program, documentation, and ownership of rights fields are complete, and the signature and receipt are not missing | Check the signature position and receipt status, and compare whether the number of source program pages and documentation pages matches the registration form |
| Sharing link | The expiration time, per-minute access limit, credit limit, identity verification, and citation display items are configured as needed | Check the time limit and values, access once each with an unauthenticated session and an over-limit request, and verify item by item the toggles for citation snippet, full citation text, and source original text |

## Three common errors

- Symptom: The name, quantity, and date of the same achievement do not match across two materials. Cause: The master record was not used as the anchor during drafting, and the attachment materials were filled in independently without cross-comparison.
- Symptom: The version is not synchronized, and the handover record still points to the old version of the materials. Cause: After the materials were updated, the version number and date were not refreshed in sync, and the handover step was not checked by version.
- Symptom: A signature or receipt is missing, and the materials cannot be issued. Cause: During the approval circulation, the responsible person was not clearly defined, the receipt was not archived, and the handover record lacks a receipt field.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, check the pass-through and citation display, and verify the expiration time, per-minute access limit, credit limit, identity verification, and the toggle states for citation snippet, full citation text, and source original text corresponding to the `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Draft one copy of the materials according to the template, verify the name, quantity, date, and signature field by field, record the `shareId`, and check that the version and date are consistent.
- Complete one handover, verify the responsible person, receipt, and version number, and confirm that missing items are blocked during the handover step.
