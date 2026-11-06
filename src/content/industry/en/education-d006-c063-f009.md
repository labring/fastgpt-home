---
title: Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics
slug: /en/industry/education-d006-c063-f009
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Tool Calls | Progress
meta_description: Research Misconduct: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The materials come from three categories: report materials, investigation reports, and expert appraisal opinions, updated weekly or monthly. Report materials include the reporter, the reported person, factual description, date, and receipt; investigation reports include investigation conclusions, evidence list, handling recommendations, and signatures; expert appraisal opinions include appraisal matters, opinions, expert signatures, and dates. When the three categories of materials enter the tool call node, report materials provide original records and receipts, investigation reports provide summaries and signatures, and expert appraisal opinions provide professional judgments and signatures. Field characteristics are name, quantity, date, signature, and version number. It is common that the same record's name, quantity, and date do not match across different materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, the node executes), outputting the tool call result (the input parameters and return in the call record). The progress table and statistical criteria description are then completed by subsequent AI nodes or manual verification. The model judges whether to call based on the tool introduction, parameter introduction, and whether parameters are required. When there are no required parameters, it may fabricate parameter values; when there are required parameters but the context lacks suitable values, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether fields, dates, and signatures are consistent with the investigation report | Open the tool node introduction fields, verify name, quantity, date, signature, and receipt, and check the `functionCall` input parameters and return |
| Investigation report | Whether fields, dates, and signatures are consistent with the expert appraisal opinions | Open each parameter configuration one by one, verify the introduction and whether it is required, and check the `toolChoice` input parameters and return |
| Expert appraisal opinions | Whether fields, dates, and signatures are consistent with the report materials | Run a test with a question missing a required field to see whether it asks first instead of directly fabricating, and check the `toolChoice` input parameters and return |
| Tool call node connections | The diamond interface is connected to the target tool | Verify the diamond connections and node status on the canvas, and confirm the input parameters and return in the call record |

## Three common errors

- Phenomenon: The same record's name, quantity, and date do not match between the report materials and the investigation report. Cause: The versions of the two materials are not synchronized, and the field criteria are not written in the header.
- Phenomenon: The expert appraisal opinions lack signatures or receipts, but the investigation report has already summarized them. Cause: Signatures and receipts were not included in the verification of whether parameters are required.
- Phenomenon: The model did not call the tool and directly gave an answer. Cause: The tool introduction does not specify when it should be used, or the required parameters have no suitable values in the context.

## How to verify the setup

Acceptance of this feature: Run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks for clarification or calls according to the introduction; also check whether `toolChoice` and `functionCall` are triggered according to the introduction.

Business test: Use one week of records to verify the totals, and see whether the criteria and exceptions are clearly stated; verify the name, quantity, date, and signature of the report materials, investigation report, and expert appraisal opinions item by item.

- Open the tool node introduction fields, check whether this description can be understood on its own, and verify the parameter introduction and whether it is required.
- Verify the diamond connections and node status on the canvas, use one week of records to verify the totals, and confirm that the criteria and exceptions are clearly stated.
