---
title: Context and Token Budgets for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f002
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Context & Tokens | Checks
meta_description: Research Ethics: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

In the research ethics review scenario, materials usually come from three types of documents: ethics review applications, informed consent form templates, and risk assessment forms, entering the verification process in forms such as ledgers, attachments, and receipts. Applications focus on the research plan and review points, consent form templates focus on the signature page and version identifier, and risk assessment forms focus on risk levels and handling records. The update rhythm is mostly version iterations and supplementary signing receipts, and the field characteristics are concentrated in names, quantities, dates, and signature fields. After entering this feature, the ledger provides the baseline records, the two materials respectively provide the fields to be compared, the discrepancy list is used to locate inconsistent items, and after the reviewer confirms, it is written back to the ledger.

## Configuration and implementation checks

Application settings (such as the response limit) only output the length of a single answer and the range of context it can accommodate; the discrepancy list must still be produced by the model. The response limit is controlled by a slider for the length of a single answer. If set too low, the answer will be truncated; if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The name, quantity, and date must be compared item by item with the ledger, and the signature field must have a corresponding signature | Check the project name, number of subjects, and review date in the application, and verify whether the signature and receipt are complete |
| Informed consent form template | The version number and signing date must match the ledger, and the signature page must not be missing | Compare the template version identifier with the ledger record, and confirm that the signing date corresponds to the receipt |
| Risk assessment form | The risk level, handling quantity, and date must match the ledger | Check the risk level, handling quantity, and assessment date, and verify whether the signature field is complete |
| Discrepancy list | The name, quantity, and date of the same object are consistent across the two materials | Use one real record to find fields inconsistent with the ledger, mark them, and submit them to the reviewer for confirmation and write-back |

## Three common errors

- Phenomenon: The same subject count does not match between the application and the ledger. Cause: The two materials were updated separately, and no field-level comparison was performed.
- Phenomenon: The consent form template version was not synchronized, and the signature page still uses the old version. Cause: The version identifier was not updated with the ledger write-back.
- Phenomenon: The risk assessment form lacks a signature or receipt. Cause: The supplementary signing process was not closed-loop, and the signature field was not validated when the materials entered verification.

## How to verify the setup

This feature acceptance: ask a question that requires a long answer and see whether the ending is complete; at the same time, check whether the `maxResponse` and `maxContext` settings match the answer length, and confirm that `quoteMaxToken` only constrains the quoted content budget.

Business test: use one real record to find fields inconsistent with the ledger.

- In the application settings, check the response limit switch and slider position, and confirm that the single-answer length matches the page requirements.
- Compare the usage of two runs, check the change in single-run usage after adjusting the limit, and confirm that the answer ending is complete.
