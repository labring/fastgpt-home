---
title: Tool Calls and Plugins for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f009
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Tool Calls | Progress
meta_description: National R&D Grants: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

This category's data for National Key R&D Program project applications includes three types of materials: the project application form, the budget application form, and the cooperation agreement. The sources are submissions entered in the application system, internal unit approval documents, and consortium-signed documents, and the update cadence changes on a rolling basis with application milestones, budget adjustments, and cooperation agreement signing receipts. The project application form contains the project name, breakdown into subprojects, task indicators, start and end dates, and signature page; the budget application form contains subject amounts, sources, calculation bases, and dates; the cooperation agreement contains the names of cooperating units, division of work, funding allocation, signing date, and signatures and seals. When these three types of materials enter the tool calls and plugins feature, the project application form and budget application form serve as verification objects providing record fields, while the cooperation agreement serves as a cross-comparison source providing unit and date fields. The plugin decides whether to read or compare based on the introduction and parameters, and returns the inputs and returns in the call record, for subsequent nodes to generate the progress table and statistical scope explanation.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical scope explanation" is then completed by a subsequent AI node or manual verification. The model judges whether to call based on the tool introduction, parameter introductions, and whether parameters are required. When there are no required parameters, it may fabricate values on its own; when there are required parameters but the context lacks suitable values, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, date, and signature must correspond item by item with the budget application form and cooperation agreement | Open the tool node introduction field and check whether the introduction can be understood independently; run a test with a question missing the project name and see whether it asks a follow-up question first; check the values of `toolChoice` and `functionCall` in the call record |
| Budget application form | Subject amounts, calculation bases, dates, and signatures must be consistent with the project application form and cooperation agreement | Open each parameter configuration one by one and check the two items: parameter introduction and whether it is required; run a test with a question missing the amount field and see whether it asks a follow-up question rather than directly fabricating; check that the diamond interface is connected to the target tool |
| Cooperation agreement | Names of cooperating units, division of work, funding allocation, signing date, and signatures and seals must match the two application forms | Check the diamond connections and node status on the canvas; use one week of records to verify the totals and see whether the scope and exceptions are clearly stated; check whether the returned result contains values that do not exist in the materials |
| Progress table and statistical scope explanation | Record counts and statistical counts must match, the scope must be written in the header, and exceptions must be listed separately | Check whether the inputs and returns of the tool call return are consistent with the one-week record totals; confirm that the scope explanation is completed by a subsequent AI node or manual verification |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are entered separately, no field-level cross-check is performed, and versions are not synchronized.
- Symptom: The cooperation agreement lacks a signature or receipt, and the date on the signature page of the application form is inconsistent with the agreement signing date. Cause: The signing process and the entry process run in parallel, receipts are not archived, and versions are not synchronized.
- Symptom: Values that do not exist in the business materials appear in the returned result. Cause: Marking a parameter as required does not guarantee that the model will ask a follow-up question, and when there are no required parameters the model may fabricate parameter values on its own.

## How to verify the setup

Feature acceptance: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the behavior of `toolChoice` and `functionCall` in the call record, and confirm that no values appear that do not exist in the materials.

Business test: use one week of records to verify the totals and see whether the scope and exceptions are clearly stated; confirm that record counts and statistical counts match, the scope is written in the header, and exceptions are listed separately.

- Open the tool node introduction field and parameter configuration one by one, check the three items: introduction, parameter introduction, and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first.
- Check the diamond interface connections and node status on the canvas, check whether results cross over after multiple tools are chained, and confirm that the returned results correspond to the fields in the business materials.
