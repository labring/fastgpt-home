---
title: Forms and User Interaction for Kindergarten and Family Communication: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c004-f016
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Forms | Review
meta_description: Family Communication: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten and Family Communication: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication category. The materials come from daily communication ledgers, observation records, notice receipts, and parent request registrations, with an update cadence mainly driven by weeks or events. When the materials enter the form input node, their roles differ: committed matters and response times are used to check whether the loop is closed, child performance descriptions are used to compare against observation records, parent request categories are used for assigned handling, and notice delivery is used to confirm reach. Field characteristics are mainly text, single select, and date. After submission, original records are formed to support exception tracing and manual review. Subsequent nodes or a reviewer use the submitted field values to organize the exception list and review conclusions. The signed result is then handed to the responsible person.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually. The form does not automatically identify material content, nor does it judge whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Committed matters and response times | When a commitment has not been responded to, the response time field is empty or exceeds the agreed time, and it needs to be compared with the original communication record | Check the field names one by one in the node configuration, and test-run referencing the field values after submission |
| Child performance descriptions | When the statement does not match the observation record, there is a difference between the description field and the observation record text | Compare the description field with the observation record one by one, and mark inconsistent items |
| Parent request categories | When feedback has not been categorized, the request category field is empty or does not match the registered content | Check the values of the category field, and test-run referencing that field in a subsequent node |
| Notice delivery | When the delivery status is inconsistent with the receipt record, the delivery field contradicts the receipt material | Check the delivery field and the receipt material, and confirm the required marker and submission transfer |

## Three common errors

- Phenomenon: A committed matter is shown as responded in the list, but the response time field is empty. Cause: When the commitment has not been responded to, the time was not filled back, causing a tracing breakpoint.
- Phenomenon: The child performance description is inconsistent with the observation record text. Cause: The description field was filled in from impression, without comparing it item by item with the observation record.
- Phenomenon: Parent requests are not categorized, and subsequent nodes cannot retrieve the category value. Cause: The feedback was not categorized, and it was still submitted with an empty category field.

## How to verify the setup

This feature acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that after `formInput` submission the fields can be referenced, and that the `userSelect` selected value is passed correctly.

Business test: create an exception record, see whether the source material can be traced, and check the required markers and field transfer after submission.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the field in a subsequent node and test-run it, confirming that the corresponding field value can be retrieved after submission and that the conversation does not get stuck in the interaction state.
