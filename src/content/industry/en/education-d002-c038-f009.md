---
title: Tool Calls and Plugins for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c038-f009
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Tool Calls | Checks
meta_description: Continuing Education: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences

## What this category's data looks like

The data for this category typically enters the workflow through three routes: course filing forms, study certificates, and credit recognition forms. Course filing forms come from the training institution filing database and are updated with course batches; their fields include course name, course code, filing date, and responsible person's signature. Study certificates are returned by the learner side or training site and are uploaded on a rolling basis by study cycle; their fields include learner name, course name, number of credit hours, study start and end dates, and training site receipt. Credit recognition forms are summary ledgers and are updated by recognition batch; their fields include recognition object name, recognition quantity, recognition date, and review signature. When the three materials enter the same tool call node, each has a different role: the filing form provides the course baseline, the study certificate provides the study facts, and the recognition form provides the ledger to be checked. Field characteristics are concentrated in five categories: name, quantity, date, signature, and receipt. The update rhythm is interleaved by batch and study cycle, so the same record can easily fail to match across two materials.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, course code, filing date, and responsible person's signature correspond to the study certificate | Open the tool node introduction fields and check the purpose, when it should be used, and the returned result; then compare item by item the course name, code, date, and signature between the filing form and the study certificate |
| Study certificate | Whether the learner name, course name, number of credit hours, study start and end dates, and training site receipt are consistent with the recognition form | Open each parameter configuration one by one and check the parameter introduction and whether it is required; run a test with a question missing a required field to see whether it asks a follow-up question first rather than directly fabricating |
| Credit recognition form | Whether the recognition object name, recognition quantity, recognition date, and review signature are consistent with the filing form and study certificate | Check the diamond-shaped connections and node status on the canvas to confirm that the tool call node is connected to the target tool; check whether the returned result contains values that do not exist in the materials |
| Tool call node | Whether the model decides to call based on the tool introduction, parameter introduction, and whether it is required | Check `toolChoice`, `functionCall`, and the input parameter return in the call record to confirm that after multiple tools are chained, the results do not cross over into each other |

## Three common errors

- Symptom: the same learner's name or course name does not match across two materials. Cause: the study certificate and recognition form are entered separately and are not written back according to the filing form baseline.
- Symptom: the number of credit hours or recognition quantity is inconsistent across two materials. Cause: the study certificate is updated by study cycle, while the recognition form is updated by recognition batch, and the versions are not synchronized.
- Symptom: the recognition form lacks a review signature or training site receipt. Cause: signatures and receipts are not included in the tool parameter required validation and are skipped during material circulation.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check whether the values of `toolChoice` and `functionCall` are consistent with the tool introduction, parameter introduction, and whether it is required.

Business test: use a real record to find fields inconsistent with the ledger, place the course filing form, study certificate, and credit recognition form side by side for comparison, and locate which item among name, quantity, date, signature, and receipt does not match.

- Open the tool node introduction fields, check whether this description can be understood when taken out on its own, and confirm whether the returned result explanation is stated.
- Open each parameter configuration one by one, check the two items of parameter introduction and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first.
