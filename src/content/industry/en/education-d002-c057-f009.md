---
title: Tool Calls and Plugins for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f009
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Tool Calls | Checks
meta_description: National R&D Grants: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project application materials usually consist of three types: the project application form, the budget application form, and the cooperation agreement. The project application form is consolidated by the research management department of the lead institution and submitted in a centralized manner according to the application milestones; its fields include project name, principal investigator, start and end dates, participating institutions, and task division. The budget application form is prepared by the finance department and updated in sync with the budget review cycle; its fields include subject name, amount, quantity, calculation basis, and signatures and seals. The cooperation agreement is signed separately by each cooperating party and returned after signing; its fields include cooperating party name, number of tasks, funding allocation, signing date, signature page, and receipt. When these three types of materials enter the tool calling node, the project application form serves as the main record providing the project name and principal investigator, the budget application form serves as the source of amounts and quantities, and the cooperation agreement serves as the source of cooperating parties and signing evidence; they need to be cross-compared with one another.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, dates, and signatures align item by item with the budget application form and cooperation agreement | Extract project name, principal investigator, start and end dates, and participating institutions, and compare them with records of the same name in the budget application form and cooperation agreement; in the verification action, record the input parameters and returns of `toolChoice` and `functionCall` |
| Budget application form | Subject name, quantity, and amount are consistent with the project application form and cooperation agreement | Extract subject name, quantity, amount, and calculation basis, and compare them with the task division in the project application form and the funding allocation in the cooperation agreement; check whether the input parameter fields in the tool call record are taken from the original text of the materials |
| Cooperation agreement | Cooperating party name, number of tasks, signing date, signature page, and receipt are complete | Extract cooperating party name, number of tasks, funding allocation, signing date, signature page, and receipt, and compare them with the participating institutions in the project application form and the subjects in the budget application form; check whether the `functionCall` return contains values that do not exist in the materials |
| Tool calling node connections | The diamond-shaped interface is connected to the target tool, and the description and parameter configuration can be understood on their own | On the canvas, check the diamond-shaped connections and node status, and open the parameter configuration one by one to check the description and whether it is required; run a trial with a question that lacks a required field to see whether it asks a follow-up question first |

## Three common errors

- Symptom: The same project name is written differently in the project application form and the budget application form, and the quantities and dates also do not match. Cause: The two materials are maintained separately by different departments, and the versions are not synchronized.
- Symptom: The cooperation agreement is missing the signature page or receipt, and the signing date is later than the start and end dates of the project application form. Cause: The cooperating party returns it late, and no completeness check is done before the materials enter the tool calling node.
- Symptom: Values that do not exist in the business materials appear in the returned results, and after multiple tools are chained, the results cross over into one another. Cause: When there are no required parameters, the model fabricates parameter values on its own, and the tool description does not state the return boundaries.

## How to verify the setup

Acceptance of this feature: run a trial with a question that lacks a required parameter, check the input parameters and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check the call records of `toolChoice` and `functionCall` to confirm that the returns do not exceed the original text of the materials.

Business test: use one real record to find fields that are inconsistent with the ledger, hand the discrepancy list to the reviewer for confirmation, and write it back.

- Open the tool node description field and check whether this description can be understood when taken out on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open the parameter configuration one by one, check the parameter description and whether it is required, and confirm that the required parameters correspond to fields that actually exist in the business materials.
