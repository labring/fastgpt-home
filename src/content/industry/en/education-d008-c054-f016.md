---
title: Forms and User Interaction for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c054-f016
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Forms | Access
meta_description: Self-Study Exams: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three core types of materials: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial examination office after each exam registration, with fields including name, exam registration number, ID number, major code, course scores, transfer and exemption records, and review signature; course qualification certificates are issued per exam session, with fields including course code, course name, credits, score, qualification date, and the seal of the host institution; graduation application forms are filled out by candidates during the graduation application period, with fields including name, major, number of courses, practical components, photo, and personal signature. When these three types of materials enter authorized access and external services, their roles differ: registration records are the master data source, course qualification certificates are course-level evidence, and graduation application forms are the entry point for the current application. The update rhythm is that registration records roll with exam sessions, qualification certificates are archived by batch, and graduation application forms are opened by application cycle. Field characteristics manifest as the need for the same record's name, quantity, and date to be aligned item by item across materials, and signatures and receipts are essential requirements for the review loop.

## Configuration and implementation checks

This part is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Externally available entry points and authorization scope" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether the name, exam registration number, ID number, major code, course scores, transfer and exemption records, and review signature are consistent item by item with the course qualification certificates, and whether dates and signatures are complete | Check the field names one by one in the node configuration, mark the required items, and after a trial run reference `formInputResult` in subsequent nodes to retrieve the corresponding field values |
| Course qualification certificates | Whether the course code, course name, credits, score, qualification date, and the seal of the host institution match the name, quantity, and date of the same record in the registration records | Check the required settings one by one, submit once with a restricted identity, and check whether subsequent nodes can retrieve the course code and qualification date |
| Graduation application forms | Whether the name, major, number of courses, practical components, photo, and personal signature are synchronized with the versions in the registration records and course qualification certificates; submission is not allowed if the signature or receipt is missing | Check the field names and required markers in the node configuration, and after a trial run confirm that the `userSelect` selected value and the `formInputResult` field value are both passed to subsequent nodes |
| Form input node | Whether it enters the interaction state and records the workflow state after being triggered, and whether the field values are completely passed to subsequent nodes after submission | Fill in the required items once and submit, then check the field values retrieved by subsequent nodes; empty required items should not be submittable, and the conversation should not remain in the interaction state |

## Three common errors

- Symptom: The course name, quantity, and date of the same record do not match between the registration records and the course qualification certificates. Cause: The two materials were entered in different batches, versions were not synchronized, and field mappings were not checked item by item.
- Symptom: The graduation application form lacks the personal signature or receipt, and the review cannot be closed. Cause: The form's required markers do not cover the signature and receipt fields, and no verifiable receipt is generated after submission.
- Symptom: After submission, subsequent nodes cannot retrieve values, or the conversation remains in the interaction state. Cause: Field names are inconsistent with the references in subsequent nodes, required items can still be submitted when empty, and the interaction state is not correctly recorded and restored.

## How to verify the setup

Acceptance of this feature: Fill in the required items once and submit, check whether the field values retrieved by subsequent nodes are consistent with the form entries, and confirm that the value retrieval paths for `formInputResult` and `selectResult` are correct.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check the field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field values are passed completely.
