---
title: Tool Calls and Plugins for Corporate Sales and Product Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c042-f009
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Tool Calls | Checks
meta_description: Sales Training: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Corporate Sales and Product Training: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on category material verification and discrepancy localization in the enterprise sales product training scenario. Materials come from three types: product manuals, sales communication scripts, and channel training schedules; their update cadence follows product versions and channel scheduling, and their field characteristics center on names, quantities, dates, and signed receipts. When a product manual enters a function, it serves as the baseline object, the sales communication script serves as the comparison object, and the channel training schedule serves as the scheduling object; the three are compared field by field against the same record.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The discrepancy list is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether the name, quantity, date, and signature fields are item-by-item consistent with the sales communication script | Open the tool call node, check whether the tool description states the purpose and return result, run a test with a record containing a name and date, and see whether the return contains values that do not exist in the material |
| Sales communication script | Whether the name, quantity, and date of the same record match the product manual | Open the parameter configuration one by one, check the parameter description and whether it is required, and confirm that the required fields correspond to fields that actually exist in the script material |
| Channel training schedule | Whether the scheduling date and signed receipt are in sync with the product manual version | On the canvas, check the connections between the diamond interface and the tool node, and check whether the `toolChoice` and `functionCall` related configurations point to the target tool |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent across the two materials | Use a real record to find the field that is inconsistent with the ledger, record the call inputs and returns, and hand it to the reviewer for confirmation and write-back |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the product manual and the sales communication script. Cause: The two materials are maintained separately and are not compared field by field against the same record.
- Symptom: The channel training schedule date is not in sync with the product manual version. Cause: After a version update, the schedule was not refreshed in sync with the product manual.
- Symptom: The material is missing a signature or receipt. Cause: The verification step did not list the signed receipt as a required field, and the model did not follow up when calling.

## How to verify the setup

This function's acceptance: run a test with a question that is missing a required parameter, check the inputs and returns in the call record, and confirm whether it follows up or calls according to the description; check whether the `toolChoice` and `functionCall` related configurations take effect.

Business test: use a real record to find the field that is inconsistent with the ledger, record the call inputs and returns, and hand it to the reviewer for confirmation and write-back.

- Open the tool node description field, check whether the description can be understood when taken out on its own, and run a test with a question missing a required field to see whether it follows up first.
- Open the parameter configuration one by one, check the parameter description and whether it is required, and confirm that they correspond to fields that actually exist in the product manual, sales communication script, and channel training schedule.
