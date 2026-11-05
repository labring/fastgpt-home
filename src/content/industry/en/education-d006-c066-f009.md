---
title: Tool Calls and Plugins for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c066-f009
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Tool Calls | Progress
meta_description: Journal Submissions: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics

## What this category's data looks like

The category materials for initial review of academic journal submissions usually include three types: submitted manuscripts, author information forms, and plagiarism check reports. Manuscripts are submitted by authors and contain the title, author, affiliation, date, and signature; author information forms are registered by the editorial office and contain name, order, contact information, and receipt; plagiarism check reports are returned by the detection system and contain the duplication rate, detection time, and report number. When these three enter progress records and statistical verification for initial review, their roles differ: the manuscript is the primary record source, the author information form is used to verify the authorship and contact fields, and the plagiarism check report is used to verify the detection node and date. The update rhythm rolls forward by submission batch, and each batch added or returned changes the record count. Field characteristics center on name, quantity, date, signature, and receipt. The same record must match across the three materials, versions must be synchronized, and missing signatures or receipts must be separately marked as exceptions.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by a subsequent AI node or manual verification. Based on the tool introduction, parameter introduction, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the manuscript fields, date, and signature match the author information form and plagiarism check report item by item | Open the tool node introduction fields and verify the manuscript name, quantity, and date; run a test query missing a required parameter and check whether the call record shows a follow-up question or a call according to the introduction; verify the diamond interface and node status on the canvas, and confirm that the values of `toolChoice` and `functionCall` come from the materials |
| Author information form | Whether the author names, order, contact information, and receipt match the manuscript, and whether the versions are synchronized | Open each parameter configuration one by one and verify the two items: parameter introduction and whether it is required; compare the author information form and the manuscript side by side for name, quantity, and date; mark records missing a signature or receipt separately and do not include them in the total |
| Plagiarism check report | Whether the detection time, report number, and duplication rate fields correspond to the manuscript record, and whether the receipt is missing | Verify the name and date of the plagiarism check report and the manuscript; check whether the tool call node connection is connected to the target tool; confirm that the returned result contains no values that do not exist in the business materials |

## Three common errors

- Phenomenon: the name and quantity of the same manuscript do not match between the progress table and the author information form. Cause: the two materials are registered separately, versions are not synchronized, and the verification action using the manuscript as the primary record is missing.
- Phenomenon: the plagiarism check report date and the manuscript registration date are inconsistent, and the total does not match. Cause: the detection node and the submission node are recorded separately, the scope is not written into the header, and exceptions are not marked separately.
- Phenomenon: the author information form is missing a signature or receipt but is still included in the total. Cause: the required-field setting and the business materials are not aligned, and after the tool call there is no subsequent node or manual verification.

## How to verify the setup

Acceptance of this feature: run a test query missing a required parameter, verify the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check whether `toolChoice` and `functionCall` fall within the allowed values.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and whether the record count and statistical count match.

- Open the tool node introduction fields, check whether this description can be understood when taken out on its own, and verify the two items: parameter introduction and whether it is required.
- Run a test query missing that field and see whether it asks a follow-up question first rather than directly fabricating; then verify the diamond connection and node status on the canvas.
