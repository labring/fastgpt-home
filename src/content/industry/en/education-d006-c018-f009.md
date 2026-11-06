---
title: Tool Calls and Plugins for Undergraduate Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c018-f009
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Tool Calls | Progress
meta_description: Program Revision: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Undergraduate Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data involves three types of materials: program plans, course syllabi, and credit structure tables. The sources are the revised drafts submitted by each department and the academic affairs summary tables. The update cadence advances weekly and is summarized monthly. Program plans record course names, credits, semesters offered, and signature fields; course syllabi record course objectives, content, and the signature of the person who wrote them; credit structure tables record the credit amounts, proportions, and signatures of department heads for each module. When these three types of materials enter the tool calling and plugin feature, the program plan serves as the primary record source, the course syllabus serves as course-level supporting evidence, and the credit structure table serves as the source of statistical criteria. The names, quantities, and dates of the same course in the three materials must remain consistent. Unsynchronized versions or missing signature receipts will directly affect the verification results of the progress table and the statistical criteria statement.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical criteria statement" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course names, credits, semesters offered, and signature fields correspond item by item with the course syllabus and credit structure table | Open the tool node description field and confirm that the description states the purpose, when it should be used, and the returned result; verify the values of `toolChoice` and `functionCall` in the call record |
| Course syllabus | Whether the course objectives, content, and signature of the person who wrote it are consistent with the course names, quantities, and dates in the program plan | Open each parameter configuration one by one and verify the parameter description and whether it is required; run a test with a question that is missing a required field to see whether it asks a follow-up question first |
| Credit structure table | Whether the credit amounts, proportions, and signatures of department heads for each module match the totals in the program plan and course syllabus | Verify the diamond connectors and node status on the canvas, and confirm that the tool calling node is connected to the target tool; check whether the returned result contains values that do not exist in the materials |
| Progress table and statistical criteria statement | Whether the record counts and statistical counts match, whether the criteria are written in the header, and whether exceptions are clearly stated | Use one week of records to verify the totals, compare the inputs and returns in the call record one by one, and confirm that the names, quantities, and dates of the same record are consistent across the three materials |

## Three common errors

- Symptom: The names, quantities, and dates of the same course do not match between the program plan and the course syllabus. Cause: The two materials were submitted separately, no field-level comparison was performed, and the versions were not synchronized.
- Symptom: The total module credits in the credit structure table are inconsistent with the record counts in the program plan. Cause: The statistical criteria were not written in the header, and exceptions were not explained separately.
- Symptom: The course syllabus is missing the signature of the person who wrote it, or the program plan is missing the signature receipt of the department head. Cause: The signature step did not flow in sync with the revised draft, and the receipt was not archived.

## How to verify the setup

Feature acceptance: Run a test with a question that is missing required parameters, verify the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, verify `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business testing: Use one week of records to verify the totals and check whether the criteria and exceptions are clearly stated; compare the fields, dates, and signatures of the program plan, course syllabus, and credit structure table one by one.

- Open the tool node description field and check whether this description can be understood when taken out on its own, and whether it states the purpose, when it should be used, and the returned result.
- Open each parameter configuration one by one, verify the parameter description and whether it is required, and confirm whether the required fields correspond to fields that actually exist in the business materials.
