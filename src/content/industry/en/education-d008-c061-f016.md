---
title: Forms and User Interaction for Research Outcome Registration and Intellectual Property: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c061-f016
page_type: 行业问题页
application_area: education
meta_title: Research IP | Forms | Access
meta_description: Research IP: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Outcome Registration and Intellectual Property: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms are submitted by the project team according to the project completion schedule, with fields including achievement name, contributors, date, and signature; patent disclosure documents are updated along with application milestones, with fields including technical solution, inventors, application date, and receipt; software copyright materials are iterated by version, with fields including software name, version number, copyright holder, and seal. When these three types of materials enter the authorized access and external services function, the achievement registration form plays the role of entry registration, the patent disclosure document plays the role of ownership evidence, and the software copyright materials play the role of version comparison. The material update cadence is bound to project milestones, application milestones, and version release milestones, and the field characteristics are mainly names, quantities, dates, signatures, and receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Field names correspond one-to-one with the submitted materials, and dates and signatures are complete | Check field names one by one in the node configuration, confirm that required markers cover key material fields, and reference `formInputResult` in subsequent nodes for a trial run |
| Patent disclosure document | Inventors, application date, and receipt are consistent with the registration form records | Compare the names, quantities, and dates in the two materials, check whether signatures or receipts are missing, and confirm that `userSelect` options correspond to the material fields |
| Software copyright materials | Version number and copyright holder are synchronized with the registration records | Check for unsynchronized versions, inspect whether seals are complete, and confirm that field values can be retrieved by subsequent nodes after submission |
| formInput | Subsequent nodes can retrieve the corresponding field values after submission | Reference this field in subsequent nodes and run a trial to confirm that field passing works properly |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are maintained separately, without cross-comparison and a unified receipt.
- Symptom: The version of the software copyright materials is not synchronized, and the registration record still points to the old version. Cause: The version release node and the registration node are not bound to the update cadence, and there is no synchronization action.
- Symptom: The patent disclosure document lacks a signature or receipt, so ownership cannot be proven during external services. Cause: Required markers do not cover the signature and receipt fields, and no completeness check is performed at submission.

## How to verify the setup

Acceptance for this function: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, and confirm that `formInputResult` and `selectResult` pass properly.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` field in subsequent nodes and run a trial to confirm that the field values can be retrieved after submission.
