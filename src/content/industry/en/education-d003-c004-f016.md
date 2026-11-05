---
title: Forms and User Interaction for Kindergarten and Family Communication: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c004-f016
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Forms | Intake
meta_description: Family Communication: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten and Family Communication: Handle Questions and Collect Missing Information

## What this category's data looks like

For question acceptance and missing-item follow-up in kindergarten home-school co-education communication, the materials come from questions submitted by parents, teacher observation records, notice receipts, and lists of committed matters. The category is kindergarten home-school co-education communication, and the update rhythm rolls with daily drop-off and pick-up and class group messages. Parent questions often lack the child's name, class, or the specific time of the behavior; observation records contain descriptions of the child's behavior; notice delivery receipts contain committed matters and response times; and the classification of parent requests needs to be extracted from the questions. When the materials enter the form input node, each takes on a field role: the question provides the request text, the observation record provides the basis for the behavior, the receipt provides delivery and commitment clues, and the commitment list provides the response deadline. Field characteristics are a mix of short text, multiple choice, and dates, and missing items are concentrated in the child's behavior description and the classification of parent requests.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and it outputs the field values filled in by the user (passed to subsequent nodes after submission). The acceptance record and the completed follow-up questions are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected, covering committed matters and response times, the child's behavior description, the classification of parent requests, and notice delivery | Check the field names one by one in the node configuration, and use `formInput` to reference the fields in a test run |
| Required markers | Key material fields are marked as required, and submission is not allowed when the child's behavior description or request classification is missing | Check the required settings one by one, and submit empty values to observe whether they are blocked |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and the acceptance record and follow-up questions can be generated based on them | Reference the field in a subsequent node and run a test, and check the `userSelect` value |
| Acceptance record and completed follow-up questions | Missing items are identified and followed up on, answers are based on materials, and unresponded commitments and statements that do not match are marked | Verify the follow-up content item by item against the observation records and notice receipts |

## Three common errors

- Phenomenon: committed matters are not responded to. Cause: the commitment list field is not marked as required, so after submission subsequent nodes cannot retrieve the response time, and the follow-up is missing.
- Phenomenon: the statement does not match the observation record. Cause: the child's behavior description field is not compared with the record, and the acceptance record directly adopts the parent's one-sided statement.
- Phenomenon: feedback is not categorized. Cause: submission is still allowed when the classification of parent requests field is empty, and subsequent nodes cannot route it to the handler by category.

## How to verify the setup

This feature acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` are passed correctly.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering.

- Check the form field names one by one to ensure they correspond one-to-one with the material fields; submission should be blocked when required items are empty.
- Reference the fields in subsequent nodes and run a test to confirm that committed matters, the child's behavior description, request classification, and notice delivery can all be retrieved.
