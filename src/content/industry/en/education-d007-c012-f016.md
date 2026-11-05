---
title: Forms and User Interaction for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c012-f016
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Forms | Review
meta_description: Teaching Reviews: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results

## What this category's data looks like

For district and county teaching research activities and lesson observation and evaluation materials, there are three common types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. A notice contains the activity name, date, location, participating schools and personnel, and signature or receipt; a lesson observation record contains the instructor, class, subject, lesson period, date, observation points, and signature; lesson evaluation minutes contain the evaluation target, opinion items, conclusion, and signature. The sources are submissions from each school and aggregation by teaching researchers, and the update rhythm advances by activity batch, often with multiple schools and multiple materials for the same activity proceeding in parallel. When materials enter the form input node, the notice provides the activity baseline fields, the lesson observation record provides the classroom fact fields, and the lesson evaluation minutes provide the conclusion fields; the three cross-support anomaly tracing and manual review.

## Configuration and implementation checks

This part is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The anomaly list and review conclusion are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Check whether the activity name, date, participating schools and personnel, and signature or receipt are consistent with the lesson observation record and lesson evaluation minutes | Check the field names one by one in the node configuration, and confirm that the notice fields correspond one-to-one with the material fields to be collected |
| Lesson observation record | Check whether the instructor, class, subject, lesson period, date, observation points, and signature match the notice and lesson evaluation minutes | Check the required settings one by one, confirm that the key material fields have been marked as required, reference the field after submission and run a test |
| Lesson evaluation minutes | Check whether the evaluation target, opinion items, conclusion, and signature are consistent with the notice and lesson observation record, and whether the versions are synchronized | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, and confirm that subsequent nodes can retrieve the corresponding field values |
| Anomaly record and review conclusion | Check whether the anomaly is supported by original records, whether the reviewer has signed, and whether the source material can be traced | Create an anomaly record, fill it in once in the form input node and submit it, and check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name and date of the same activity do not match in two materials. Cause: The notice and lesson observation record are submitted separately, the fields are not checked uniformly, and the versions are not synchronized.
- Symptom: The lesson evaluation minutes lack a signature or receipt, and the anomaly cannot be traced to the source. Cause: Key material fields are not marked as required, and no validation is performed at submission.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation stays in the interaction state. Cause: The field names do not correspond one-to-one with the material fields, or submission is still possible when required items are empty.

## How to verify the setup

This feature acceptance: fill it in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields can be passed and that required items have been validated.

Business test: create an anomaly record, see whether the source material can be traced, and check that the anomaly is supported by original records and that the reviewer has signed.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the teaching research activity notice, lesson observation record, and lesson evaluation minutes.
- Check the required settings one by one, and reference the `formInputResult` and `selectResult` fields in subsequent nodes for a test run, confirming that values can be retrieved after submission.
