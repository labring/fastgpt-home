---
title: Tool Calls and Plugins for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c054-f009
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Tool Calls | Checks
meta_description: Self-Study Exams: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three core types of materials: registration records, course qualification certificates, and graduation application forms. Registration records come from the provincial registration database, recording the candidate's basic information, program plan, and past examination statuses, and are updated in sync with registration changes; course qualification certificates are issued by the main examining institution or the provincial examination office, and contain the course code, name, qualification date, and seal; graduation application forms are filled out by the candidate and preliminarily reviewed by the study assistance center, and contain the name, ID number, program, number of courses, signature, and receipt. When these three types of materials enter the tool calling node, the registration records serve as the baseline ledger, while the course qualification certificates and graduation application forms serve as the objects to be verified; the node compares name, quantity, date, and signature field by field, and returns the discrepant fields and their corresponding values for subsequent nodes or manual review to write back.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call at all.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The name, ID number, program plan, and course status in the registration records must be consistent field by field with the course qualification certificates and graduation application forms | Open the tool node description field and check whether it states the purpose, when it should be used, and what result it returns; run a test with a query missing a required field to see whether it asks a follow-up question first |
| Course qualification certificates | The course name, quantity, qualification date, and seal in the course qualification certificates must be consistent with the corresponding records in the registration records and graduation application forms | Open each parameter configuration one by one and check the two items: parameter description and whether it is required; check the diamond-shaped connections and node status on the canvas to confirm that `toolChoice` and `functionCall` are connected to the target tool |
| Graduation application forms | The name, number of courses, signature, and receipt in the graduation application form must be consistent with the registration records and course qualification certificates; a missing signature or receipt is listed as a discrepancy | Use a real record to compare against the ledger, record the fields where the name, quantity, or date are inconsistent, and check whether the returned result contains values that do not exist in the business materials |
| Tool calling node connections | The diamond-shaped interface is connected to the target tool, the node status is normal, and after multiple tools are chained, the results do not cross-contaminate each other | Check the diamond-shaped connections and node status on the canvas, and confirm that the inputs and returns of `toolChoice` and `functionCall` are traceable |

## Three common errors

- Symptom: the name or number of courses for the same record does not match between the registration records and the graduation application form. Cause: versions are not synchronized, the materials come from different points in time, and no field-level comparison was performed.
- Symptom: the date on the course qualification certificate is inconsistent with the qualification date in the registration records. Cause: the date fields for the same record are not aligned across the two materials, and the update cadence differs.
- Symptom: the graduation application form is missing a signature or receipt but still enters review. Cause: required parameters are not guided to prompt a follow-up question in the prompt, and the model directly calls according to the description and returns a result.

## How to verify the setup

Acceptance of this feature: run a test with a query missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` appear in the call record, and whether the returned result contains values that do not exist in the business materials.

Business test: use a real record to find the fields inconsistent with the ledger, verify name, quantity, date, and signature item by item, record the discrepant fields and their corresponding values, and hand them to the reviewer for confirmation and write-back.

- Open the tool node description field and check whether this description can be understood when taken out on its own, and whether it states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the two items: parameter description and whether it is required, confirm that the required fields correspond to fields that actually exist in the business materials, and run a test with a query missing that field to see whether it asks a follow-up question first.
