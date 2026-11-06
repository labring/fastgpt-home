---
title: Tool Calls and Plugins for Peer Review Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c067-f009
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Tool Calls | Checks
meta_description: Peer Review: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Peer Review Organization: Compare Documents and Locate Differences

## What this category's data looks like

The material verification and discrepancy localization for peer review organizations revolves around three types of materials: review invitations, expert review comments, and author revision notes. A review invitation contains the manuscript title, the date sent for review, the expert's name, and the invitation status; expert review comments contain the review comment number, the comment body, the submission date, and the signature; author revision notes contain the revision items, the corresponding comment number, the revision date, and the receipt. The materials come from editorial system exports and email receipts, and the update cadence is synchronized once after each round of review and revision. When entering the tool calling node, the review invitation serves as the primary record to be verified, while the expert review comments and author revision notes serve as the basis for comparison; the field names, counts, and dates of the three must be aligned item by item, and signatures and receipts serve as completeness markers.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | The manuscript title, date sent for review, expert name, and invitation status are consistent across the three materials, and the signature or receipt is complete | Compare the review invitation field by field against the expert review comments and author revision notes, mark the positions where the name or date does not match, and check whether the signature and receipt are missing |
| Expert review comments | The review comment number, comment body, submission date, and signature are consistent across the three materials, and the version is synchronized | Associate the author revision notes by comment number, check whether the name, count, and date of the same record match, and verify the version number and signature status |
| Author revision notes | The revision items, corresponding comment number, revision date, and receipt are consistent across the three materials, and no version is unsynchronized | Trace each revision item back to the expert review comments one by one, locate discrepancies in count and date, and confirm whether the receipt has been written back |
| Tool calling node connections | The diamond interface is connected to the target tool, and the three items of tool description, parameter descriptions, and whether required correspond to the business fields | Check the diamond connections and node status on the canvas, verify whether the tool description can be understood on its own, and run a test with a question that omits a required parameter |

## Three common errors

- Symptom: The name, count, or date of the same record does not match between two materials. Cause: The review invitation and revision notes are each updated separately, and the fields are not aligned to the same version.
- Symptom: The versions of the expert review comments and author revision notes are not synchronized, and the comment number points to an old draft. Cause: The new version was not written back after revision, and a historical record was retrieved during the call.
- Symptom: A signature or receipt is missing, but the material is still treated as a complete record. Cause: The tool description does not state that the returned result includes the signature status, and the model does not ask a follow-up question.

## How to verify the setup

Acceptance of this feature: Run a test with a question that omits a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether the values of `toolChoice` and `functionCall` fall within the call record, and verify the node connection status corresponding to `toolChoice`.

Business test: Use a real record to find fields that are inconsistent with the ledger, compare the name, count, date, and signature of the review invitation, expert review comments, and author revision notes item by item, and record the discrepancy positions.

- Open the tool node description field, confirm that the three sentences of purpose, when to use it, and returned result are complete, then check the parameter descriptions and whether required items one by one.
- Run a test with a question that omits this field, observe whether it asks a follow-up question first rather than directly fabricating, and also check the diamond interface connections and node status.
