---
title: Tool Calls and Plugins for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f009
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Tool Calls | Intake
meta_description: Journal Submissions: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the initial review stage of academic journal submissions, and the materials come from three categories: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts enter on a rolling basis by column and issue, with fields including title, author byline, affiliation, funding, date, and signature; author information forms are updated by submission batch, with fields including author name, order, affiliation, contact information, and contribution statement; plagiarism check reports are generated one by one per manuscript, with fields including similarity rate, comparison database, detection date, and receipt. When these three categories of materials enter this feature, the submitted manuscript carries the main content and version baseline, the author information form carries the verification of byline and order, and the plagiarism check report carries the evidence for similarity rate and detection time point. In terms of update rhythm, manuscripts may be replaced over multiple rounds, the information form is resent as bylines are adjusted, and the plagiarism check report is based on the latest version. Field characteristics manifest as the same record being prone to inconsistencies in name, quantity, and date; versions not being synchronized and missing signatures or receipts are also common, and missing items need to be identified first during the acceptance and follow-up questioning stage.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). "Acceptance records and items to be completed" are then completed by subsequent AI nodes or manual verification. The model judges whether to call the tool this time based on the tool description, parameter descriptions, and whether it is required.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the title, author byline, affiliation, funding, date, and signature are complete, and whether the version is consistent with the information form | Open the tool calling node's description fields and verify the purpose, when it should be used, and what it returns; run a test with a question missing a signature or date to see whether it asks a follow-up question first |
| Author information form | Whether the author name, order, affiliation, contact information, and contribution statement are consistent with the manuscript, and whether the date and receipt are missing | Open each parameter configuration one by one and verify the parameter description and whether it is required; check whether the `toolChoice` and `functionCall` related configurations affect the call judgment |
| Plagiarism check report | Whether the similarity rate, comparison database, detection date, and receipt correspond to the same manuscript version, and whether the quantity and date match | On the canvas, verify the diamond connectors and node status, and confirm that the tool calling node is connected to the target tool; run a test with a question missing a required parameter, and verify the input parameters and return |

## Three common errors

- Phenomenon: The author order and affiliation names in the submitted manuscript and the author information form for the same record do not match. Cause: The two materials' versions are not synchronized; after the byline adjustment, only one was updated, while the other remained the old draft.
- Phenomenon: The detection date of the plagiarism check report is inconsistent with the manuscript version date, and the receipt is missing. Cause: The report was generated based on an old version, and after the manuscript was replaced it was not rechecked, and the signature or receipt step was skipped.
- Phenomenon: Values that do not exist in the business materials appear in the returned result, and the model answers directly without calling the tool. Cause: The tool description or parameter descriptions are written vaguely, there is no suitable value for a required parameter in the context, and the model fabricates one on its own.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, verify the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, verify `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; if a quote limit is involved, verify the tokens of the quoted text, record the number of array items separately, and `quoteMaxToken` is the quote content budget.

- Open the description field in the tool node and check whether this description can be understood when read on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, verify the description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
