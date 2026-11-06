---
title: Tool Calls and Plugins for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f009
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Tool Calls | Checks
meta_description: Research Ethics: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Ethics review applications are submitted by researchers and contain the project name, number of subjects, research start and end dates, and researcher signature; informed consent form templates are maintained by the institution or sponsor and contain the version number, version date, and signature field; risk assessment forms are filled out by the ethics committee secretary or researcher and contain the risk level, assessment date, reviewer signature, and receipt. Materials are updated as versions iterate, and multiple versions of the same project may exist at the same time. When entering this feature, the ethics review application serves as the main record, while the informed consent form template and risk assessment form serve as comparison materials, each providing name, quantity, date, and signature fields for the tool calling node to extract and compare item by item by field.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call the tool.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Check the project name, number of subjects, research start and end dates, and researcher signature | Open the tool calling node, check whether the material fields are passed in as input parameters, and inspect the values of `toolChoice` and `functionCall` in the call record |
| Informed consent form template | Check whether the version number, version date, and signature field match the application by name and period | Run a test with a question missing the version number field, see whether the node asks a follow-up question, then check whether the return contains values that do not exist in the material |
| Risk assessment form | Check the risk level, assessment date, reviewer signature, and receipt | Check the diamond-shaped connections and node status on the canvas, and confirm that the material fields are connected to the target tool |
| Tool calling node | Check the three configuration items: tool description, parameter descriptions, and whether required | Open each parameter configuration one by one, check the description and whether required, and use a real record to find fields inconsistent with the ledger |

## Three common errors

- Symptom: The name, quantity, and date for the same project do not match between the ethics review application and the informed consent form template. Cause: The two materials are entered separately and are not compared field by field against the same record.
- Symptom: The informed consent form template version is not synchronized, and the application references an old version number. Cause: The materials are updated at different paces, and the tool calling node did not retrieve the latest version field.
- Symptom: The risk assessment form is missing the reviewer signature or receipt. Cause: The parameter was not marked as required, the model did not ask a follow-up question, and it directly called the tool according to the description and returned a result.

## How to verify the setup

Feature acceptance: Run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description.

Business test: Use a real record to find fields inconsistent with the ledger, and check whether those fields appear in the tool call result.

- Open the tool node description field, check whether this description can be understood on its own, and confirm that the diamond-shaped interface is connected to the target tool.
- Run a test with a question missing that field, see whether it asks a follow-up question first rather than directly fabricating, then check whether the return result contains values that do not exist in the business materials.
