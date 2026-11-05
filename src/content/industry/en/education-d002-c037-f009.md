---
title: Tool Calls and Plugins for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f009
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Tool Calls | Checks
meta_description: Training Subsidies: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Vocational training subsidy applications involve three types of materials: training class filing, attendance records, and completion assessment forms. Class filing is submitted by the training institution before the class starts, containing the course name, class start date, student roster, and the signature of the person in charge; attendance records are updated daily, containing student names, attendance dates, and personal signatures; completion assessment forms are compiled after the assessment ends, containing assessment subjects, scores, assessment dates, and assessor signatures. When these three types of materials enter this function, the filing form serves as the baseline ledger, while attendance records and completion assessment forms serve as sources to be verified, each taking on the role of field comparison and discrepancy localization, with update cadence varying by class batch and assessment cycle.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Whether fields, dates, and signatures are complete, and whether they align item by item with attendance records and completion assessment forms | Verify whether the tool introduction states its purpose and return results, check the parameter introduction and whether it is required, and run a test with a query missing a required field to observe whether the call record first asks a follow-up question in the inputs |
| Attendance records | Whether the same student's name, quantity, and dates are consistent across the two materials | Open each parameter configuration one by one, check the parameter introduction and whether it is required, confirm that required items correspond to business material fields, and check whether the return results contain values that do not exist in the materials |
| Completion assessment forms | Whether versions are synchronized, and whether signatures or receipts are missing | Check the diamond connectors and node status on the canvas, confirm that the tool calling node is connected to the target tool, and check whether results from multiple tools connected in series interfere with each other |
| Tool calling node connections | Whether the diamond interface is connected to the target tool, and whether the node status is normal | Run a test with a real record, check the inputs and returns in the call record, and confirm that the model decides whether to call based on the tool introduction and whether parameters are required, rather than answering directly |

## Three common errors

- Symptom: The same student's name and dates do not match between attendance records and completion assessment forms. Cause: The two materials are entered separately and are not compared item by item against the class filing as the baseline.
- Symptom: The completion assessment form version is not synchronized, and the old version lacks signatures. Cause: After materials are updated, they are not written back to the ledger, and the tool call results are not aligned with the latest version.
- Symptom: Return results contain values that do not exist in the business materials. Cause: When there are no required parameters, the model fabricates parameter values on its own without asking a follow-up question first.

## How to verify the setup

Acceptance for this function: Run a test with a query missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check whether `toolChoice` and `functionCall` related configurations affect the call decision.

Business test: Use a real record to find fields inconsistent with the ledger, check names, quantities, dates, and signatures, and confirm that the discrepancy list is completed by subsequent AI nodes or manual verification.

- Open the tool node introduction field, check whether the description can be understood on its own, and verify the parameter introduction and whether it is required.
- Check the diamond connectors and node status on the canvas, confirm that the tool calling node is connected to the target tool, and run a test with a query missing a field to observe whether it asks a follow-up question first.
