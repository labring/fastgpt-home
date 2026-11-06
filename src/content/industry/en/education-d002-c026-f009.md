---
title: Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f009
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Tool Calls | Checks
meta_description: Degree Certificates: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

In the degree conferral and certificate information reporting scenario, the three materials—the degree application form, the thesis review form, and the defense resolution—each play a different role: the application form records the applicant's identity and course information, the review form carries expert scores and comments, and the defense resolution formalizes the voting results and signatures. Materials usually enter in batches, and the update cadence is driven by review and defense scheduling. Fields mainly consist of name, student ID, thesis title, review score, defense date, signature, and receipt status. After these three types of materials enter this function, they serve as objects to be verified, and the tool call node compares them item by item by field, locating discrepancies in names, quantities, and dates for the same record across two materials, as well as situations such as unsynchronized versions, missing signatures, or missing receipts.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Check whether fields, dates, and signatures are consistent with the ledger | Retrieve the application form record and compare name, student ID, thesis title, and signature date item by item |
| Thesis review form | Check whether review scores, review dates, and expert signatures are consistent with the ledger | Retrieve the review form record, compare the score, date, and signature fields, and mark missing items |
| Defense resolution | Check whether voting results, defense dates, and committee signatures are consistent with the ledger | Retrieve the resolution record, compare the voting conclusion, date, and signatures, and mark version discrepancies |
| Tool call node | Check whether `toolChoice`, `functionCall`, and required parameters are triggered as described | Check the diamond-shaped connections and node status on the canvas, and test-run with a question missing a required field |

## Three common errors

- Symptom: The thesis title or date for the same record does not match between the application form and the review form. Cause: The two material versions are not synchronized, and each was filled in independently without consistency write-back.
- Symptom: A defense date or score that does not exist in the business materials appears in the returned result. Cause: When required parameters are missing, the model may fabricate parameter values on its own, causing the call input parameters to deviate from the materials.
- Symptom: The defense resolution lacks committee signatures or the receipt is not archived. Cause: Signature and receipt status are not included in the comparison fields, and the tool call result does not cover this item.

## How to verify the setup

Acceptance for this function: test-run with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls as described; at the same time, check `toolChoice`, `functionCall`, and the three items of tool description, parameter description, and whether required.

Business test: use a real record to find a field inconsistent with the ledger, and hand it to the reviewer for confirmation and write-back.

- Open the tool node description field, check whether this description can be understood when read on its own, and verify the two items of parameter description and whether required.
- Check the diamond-shaped connections and node status on the canvas, and confirm that the tool call node is connected to the target tool.
