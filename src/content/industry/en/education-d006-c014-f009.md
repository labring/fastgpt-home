---
title: Tool Calls and Plugins for School Moral Education and Class Teacher Work: Track Progress and Check Statistics
slug: /en/industry/education-d006-c014-f009
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Tool Calls | Progress
meta_description: Pastoral Education: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Moral Education and Class Teacher Work: Track Progress and Check Statistics

## What this category's data looks like

This page is for school moral education and homeroom teacher work. The materials come from themed class meeting plans, student comprehensive quality records, and home visit records, with updates summarized weekly or monthly. Homeroom teachers and the moral education office separately keep plans, records, and receipts. Fields include date, student name, activity name, quantity, and signature or receipt. When entering tool calls and plugins, the class meeting plan provides the activity scope and planned numbers, the comprehensive quality records provide process entries and scores, and the home visit records provide time and signature status. Together, the three support the progress table and statistical scope description. The table header must state the sources of the record count and statistical count, and exceptional cases must be marked separately, so that totals can be checked when entering the weekly or monthly report.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Check the activity name, date, expected attendance, and signature column in the plan, and determine whether they match the weekly record totals | Open the plan and weekly records, compare name, date, and quantity item by item, and mark missing signatures as exceptions |
| Student comprehensive quality records | Check the fields, dates, and signatures of the record entries, and determine whether the name and quantity of the same activity match across the two materials | Extract the same activity, compare the class meeting plan with the comprehensive quality records, and check whether the versions are synchronized |
| Home visit records | Check the home visit date, student name, receipt, and signature, and determine whether the statistical scope is written in the table header | Use one week of home visit records to check the totals, and check entries with missing receipts or inconsistent dates |
| Tool call node | Check the tool introduction, parameter introduction, and whether they are required, and determine whether the model calls according to the introduction | Run a test with a question missing a required parameter, and inspect `toolChoice`, `functionCall`, and the call record |

## Three common errors

- Symptom: The name, quantity, and date of the same activity do not match between the class meeting plan and the comprehensive quality records. Cause: The two materials are entered separately, without field mapping and total verification.
- Symptom: Home visit records lack signatures or receipts but are still included in the total during statistics. Cause: The scope does not state the exception handling method in the table header, and signature status is not checked item by item during verification.
- Symptom: The model answers directly without calling the tool, and the returned result contains values that do not exist in the business materials. Cause: The tool introduction or parameter introduction is unclear, and when required parameters are missing, it does not ask first.

## How to verify the setup

Acceptance for this feature: Run a test with a question missing a required parameter, inspect the input parameters and return in the call record, and confirm whether it asks first or calls according to the introduction; at the same time, check `toolChoice`, `functionCall`, and the connection status of the tool call node.

Business test: Use one week of records to check the totals, and see whether the scope and exceptions are clearly written; compare the dates, quantities, and signatures of the class meeting plan, comprehensive quality records, and home visit records item by item, and confirm that the record count and statistical count match.

- Open the tool node introduction field, check whether the description can be understood when taken out separately, and verify the parameter introduction and whether they are required.
- On the canvas, check the connection between the diamond interface and the target tool, and run a test with a question missing a required field to confirm that it asks first and does not fabricate directly.
