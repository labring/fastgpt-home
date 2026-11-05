---
title: Forms and User Interaction for Vocational School Student Internships: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c030-f016
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Forms | Handover
meta_description: Student Internships: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational School Student Internships: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on three types of materials in vocational school student internship management: internship agreements, internship plans, and internship logs. Internship agreements are finalized through negotiation between the school and the internship organization, and include student information, position, duration, responsibility clauses, and signature fields; internship plans are prepared by the professional teaching and research group according to the training program, and include internship objectives, rotation arrangements, supervisory personnel, and date milestones; internship logs are filled in by students daily or weekly, and include position tasks, duration, supervisory feedback, and signatures. The three types of materials are updated on a rolling basis as the internship progresses; agreements and plans are finalized before the internship, while logs are continuously generated during the internship. When the materials enter the form input node, agreements and plans assume the role of responsibility division and progress baseline, while logs assume the role of process records and receipts. The fields need to cover name, quantity, date, signature, and version identifier, so that subsequent nodes can proceed with handover based on the same set of field values.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Fields must cover student information, position, duration, responsibility clauses, and signature fields, and be consistent with the name, quantity, and date in the internship plan | Check the field names and required settings one by one in the node configuration, and after submission confirm that subsequent nodes can retrieve the corresponding field values |
| Internship plan | Fields must cover internship objectives, rotation arrangements, supervisory personnel, and date milestones, and the version identifier must be synchronized with the agreement | Check the required markers in the node configuration, and after a trial run reference `formInputResult` in subsequent nodes to retrieve field values |
| Internship log | Fields must cover position tasks, duration, supervisory feedback, and signature, and the date must match the agreement and plan | Check the field names in the node configuration, and after a trial run reference `selectResult` in subsequent nodes to retrieve field values |
| Handover record | The responsible person, version, and date must be consistent with the materials being handed over; if signature or receipt is missing, it must not proceed to the next stage | Run a handover trial once, check whether the field values retrieved by subsequent nodes are complete, and whether missing items are blocked by required markers |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the internship agreement and the internship plan. Cause: The two materials were drafted separately, field names were not unified, and versions were not synchronized.
- Symptom: The internship log lacks a signature or receipt but is still circulated as completed material. Cause: Key fields were not marked as required, and no one checked the receipt after submission.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation remains in the interaction state. Cause: Field names are inconsistent with subsequent node references, or required items can still be submitted when empty.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult`, and required markers all take effect as configured.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm that they correspond one-to-one with the material fields to be collected.
- Reference `formInputResult` and `selectResult` in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission.
