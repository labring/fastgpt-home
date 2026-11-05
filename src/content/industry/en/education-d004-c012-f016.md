---
title: Forms and User Interaction for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c012-f016
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Forms | Handover
meta_description: Teaching Reviews: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for District Teaching Research and Classroom Reviews: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses district and county teaching research activities and lesson observation and evaluation scenarios, focusing on three types of materials: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices are usually drafted by the teaching research department and include the activity name, time, location, participating schools and teachers, agenda, and submission requirements; lesson observation records are filled in by observers and include the teaching teacher, class, topic, observation dimensions, and classroom facts; lesson evaluation minutes are compiled by the host or recorder and include key points of remarks, improvement suggestions, and signature fields. Material sources are scattered across teaching research groups, paper forms, and online documents, with an update rhythm of issuing notices before the activity, recording observations during the activity, and producing minutes and handing over after the activity. When entering the form input node, notice fields are used to generate a signable draft, lesson observation record fields are used to summarize observation facts, and lesson evaluation minutes fields are used to form a handover record; together, the three support sign-off in the next stage.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The signable material draft and handover record are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Fields are complete, responsible persons are clear, version and date are consistent, and signatures or receipts are not missing | Check field names and required settings one by one in the node configuration, and confirm that the notice name, date, and responsible person can be referenced by subsequent nodes |
| Lesson observation record | When the name, quantity, or date of the same record does not match across two materials, it can be blocked | Check the teaching teacher, class, topic, and observation dimension fields, and after a trial run, reference the field in subsequent nodes and compare |
| Lesson evaluation minutes | If the version is not synchronized or signatures or receipts are missing, it is not released | Check the key points of remarks, improvement suggestions, and signature field fields, and confirm that field values are fully passed after submission |
| Form fields | One-to-one correspondence with the material fields to be collected | Check field names one by one, and use `formInputResult` and `selectResult` to verify the values |

## Three common errors

- Phenomenon: The name and date of the same record do not match between the notice and the minutes. Cause: Fields are not marked as required, each is filled in separately during drafting, and there is no unified check.
- Phenomenon: The version is not synchronized, and an old draft is signed off as a new draft. Cause: Version and date fields are not included in the form, and there is no basis for comparison during handover.
- Phenomenon: Missing signatures or receipts still enter the next stage. Cause: The signature field is not marked as required, and after submission, subsequent nodes cannot retrieve the corresponding field values.

## How to verify the setup

This feature acceptance: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` outputs are consistent with what was filled in.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the field in subsequent nodes and run a trial to confirm that field passing after submission is usable.
