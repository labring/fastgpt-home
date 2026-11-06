---
title: Forms and User Interaction for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c014-f016
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Forms | Access
meta_description: Pastoral Education: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services

## What this category's data looks like

School moral education and homeroom teacher work involves three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans are updated weekly or monthly and include the class meeting theme, time, location, host, activity flow, student sign-in, and homeroom teacher signature; student comprehensive quality records are updated per semester and include dimensions such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, with student self-assessment, peer assessment, teacher comments, and parent receipt attached; home visit records are updated per visit and include the home visit date, student name, visiting teacher, key points of communication, parent opinions, and signatures of both parties. When the three types of materials enter the form input node, each plays a different role: themed class meeting plans provide activity fields and signature positions, comprehensive quality records provide multi-dimensional fields and receipt positions, and home visit records provide date fields and signature positions for both parties. The form input node is only responsible for collecting and passing on the filled-in values; it does not identify the content of the materials, nor does it judge whether the materials are authentic.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the fields, date, and signature are complete, and whether the name, quantity, and date of the same record match in the two materials | Check the field names one by one in the node configuration, compare the class meeting theme, time, location, host, flow, sign-in, and homeroom teacher signature; reference the fields with `formInputResult` and run a trial |
| Student comprehensive quality record | Whether the dimension fields, date, and parent receipt are complete, and whether the versions are synchronized | Check the field names and required settings one by one for ideological and moral character, academic level, physical and mental health, artistic literacy, social practice, etc.; use `userSelect` to select a record and run a trial, and check the field values obtained by subsequent nodes |
| Home visit record | Whether the home visit date, key points of communication, parent opinions, and signatures of both parties are complete, and whether it can be submitted when a signature or receipt is missing | Check the fields one by one for home visit date, student name, visiting teacher, key points of communication, parent opinions, and signature; reference this field in subsequent nodes and run a trial to confirm that submission is impossible when a required item is empty |
| Form input node | Whether the required markers and the field passing after submission take effect | Check the required settings one by one in the node configuration, and after submission check whether subsequent nodes can obtain the corresponding field values, confirming that the conversation does not remain stuck in the interactive state |

## Three common errors

- Phenomenon: The name, quantity, and date of the same class meeting plan do not match between the class record and the moral education office summary. Cause: The two places fill in separately, not based on the same form field values, and the versions are not synchronized.
- Phenomenon: The number of dimensions and the date of the student comprehensive quality record are inconsistent in the two materials, and the parent receipt is missing. Cause: The form fields do not correspond one to one, and the required markers do not cover the receipt field.
- Phenomenon: After the home visit record is submitted, subsequent nodes cannot obtain the parent opinion or signature field values. Cause: The field names are inconsistent with the references in subsequent nodes, and the field passing after submission has not been checked by a trial run.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, confirm that submission is impossible when a required item is empty, and that the conversation does not stop due to the interactive state.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and that unauthorized content is not visible.

- Check the form field names and required settings one by one in the node configuration, ensuring they correspond one to one with the material fields to be collected.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field passing after submission is usable.
