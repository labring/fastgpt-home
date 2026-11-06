---
title: Forms and User Interaction for Continuing Education Training Hour Recognition: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c038-f016
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Forms | Access
meta_description: Continuing Education: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Continuing Education Training Hour Recognition: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the continuing education credit hour recognition scenario; the materials include course filing forms, study certificates, and credit hour recognition forms. The course filing form is submitted by the training institution before the course starts, and contains the course name, number of class hours, teaching dates, and the signature of the person in charge; it is the source basis for credit hour recognition. The study certificate is issued by the teaching party after the course ends, records the learner's name, course name, completed class hours, and course completion date, and is accompanied by the handler's signature or receipt. The credit hour recognition form is filled out by the recognition handler after summarizing the first two materials, and contains the recognized credit hours, recognition date, and review signature. The three types of materials are updated by batch and are submitted together after each course period ends. The field characteristics are the coexistence of four types of elements: name, quantity, date, and signature. If any element is inconsistent between two materials, a record pending verification is formed. When the materials enter the form input node, each assumes the role of a field source: the course filing form provides the course and class hour baseline, the study certificate provides the fact of learner completion, and the credit hour recognition form carries the final recognition conclusion.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the field values are passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of class hours, teaching dates, and signature of the person in charge are consistent with the study certificate | Check the field names one by one in the node configuration, confirm that the course name, number of class hours, teaching dates, and signature fields are consistent with the filing form, and run a test once using `formInput` |
| Study certificate | Whether the learner's name, course name, completed class hours, and course completion date correspond item by item with the filing form | Check the required markers, confirm that the name, course name, completed class hours, and course completion date are marked as required, and that submission is not allowed when the signature or receipt is missing |
| Credit hour recognition form | Whether the recognized credit hours, recognition date, and review signature match the aforementioned two materials | Reference the `formInputResult` fields in subsequent nodes and run a test, confirming that the recognized credit hours, recognition date, and review signature can retrieve the corresponding values |
| Authorized access scope | Whether the visitor's identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, check whether the visible material scope matches the setting, and ensure unauthorized content does not appear |

## Three common errors

- Phenomenon: The same learner's course name is written differently in the filing form and the study certificate, and the recognition form copies one of them. Cause: The two materials were filled out by different handlers, and field alignment and receipt verification were not performed.
- Phenomenon: The number of class hours does not match between the filing form and the study certificate, and the recognition form is filled out according to one of them. Cause: The versions were not synchronized, and class hours adjusted after the course ended were not written back to the filing form, lacking signature confirmation.
- Phenomenon: After submission, subsequent nodes cannot retrieve the field values, and the conversation remains in the interactive state. Cause: Submission is possible even when required items are empty, or the field names are inconsistent with the references in subsequent nodes.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the course name, number of class hours, date, signature, and other fields output by `formInput` are consistent with the submitted content, and that the `userSelect` options can be passed correctly.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and ensure unauthorized materials are not visible.

- Check the field names and required markers one by one in the node configuration, and confirm that the name, quantity, date, and signature fields of the course filing form, study certificate, and credit hour recognition form correspond one to one.
- Reference the `formInputResult` fields in subsequent nodes and run a test, confirming that the field values can be retrieved after submission and that the conversation does not remain in the interactive state because required items are empty.
