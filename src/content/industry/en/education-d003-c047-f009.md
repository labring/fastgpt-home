---
title: Tool Calls and Plugins for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c047-f009
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Tool Calls | Intake
meta_description: Study Abroad Safety: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the pre-departure training and overseas safety reminder scenario. Materials include pre-departure training courseware, a safety reminder checklist, and an accommodation contact sheet. The courseware provides training topics, class hours, instructors, and dates; the safety reminder checklist lists risk items, handling suggestions, and receipt requirements; the accommodation contact sheet records accommodation names, addresses, contacts, check-in dates, and signature fields. Materials come from the training organizer and overseas liaisons, are updated by batch, and versions within the same batch should be consistent. When entering the Q&A intake and missing-item follow-up function, the courseware serves as the factual basis for training, the safety reminder checklist serves as the basis for reminder items, and the accommodation contact sheet serves as the basis for accommodation and contact fields; together they support the intake record and the completed question items. Missing items are completed through follow-up questions before being forwarded to the handler.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The intake record and the completed question items are then finished by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Check whether the courseware fields, dates, and signatures are complete, and whether they are consistent with the training session names and dates in the safety reminder checklist | Open the courseware fields and compare dates and signatures item by item; run a test with a missing-date question; check the input parameters and return of `toolChoice` and `functionCall` in the call record |
| Safety reminder checklist | Check the risk items, receipt requirements, and version number, and whether they match the session names and quantities in the courseware | Compare the item names and quantities in the checklist and courseware one by one; check for unsynchronized versions or missing receipts; check whether the call record return contains values outside the materials |
| Accommodation contact sheet | Check the accommodation name, address, contact, check-in date, and signature field, and whether they are consistent with the accommodation reminders in the safety reminder checklist | Open the contact sheet and check the fields and signatures; run a test with a missing-contact question; see whether it asks a follow-up first; check whether the `functionCall` return is consistent with the materials |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status is consistent with the canvas connections | Check the diamond connections and node status on the canvas; confirm that after multiple tools are connected in series, the results do not get mixed up with each other |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the courseware and the safety reminder checklist. Cause: The two materials were updated in different batches, the fields were not aligned, and the model answered directly without first asking about missing items.
- Symptom: The accommodation contact sheet version is not synchronized, and the old contact is still in use. Cause: After the materials were updated, they were not synchronized to the tool parameter description; the model returned based on the old values and did not trigger a follow-up question.
- Symptom: The safety reminder checklist is missing a signature or receipt, but the intake record is still completed directly. Cause: The parameters were not marked as required, so the model may fabricate values on its own and give an answer without first asking a follow-up question.

## How to verify the setup

Acceptance for this function: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check `toolChoice`, `functionCall`, and whether the parameter is required, and confirm that no values outside the materials appear in the return.

Business test: ask a question missing key information and see whether it asks a follow-up before answering; if it answers directly, check whether the tool description and parameter description clearly state the purpose, values, and whether it is required.

- Open the tool node description field and check whether the description can be understood on its own, clearly stating the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the parameter description and whether it is required, and ensure that required items correspond to fields that actually exist in the business materials.
