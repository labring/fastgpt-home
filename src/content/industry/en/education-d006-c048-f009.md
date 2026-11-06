---
title: Tool Calls and Plugins for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics
slug: /en/industry/education-d006-c048-f009
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Tool Calls | Progress
meta_description: Joint Education: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification for the establishment and annual reports of Chinese-foreign cooperative education institutions. The materials come from establishment applications, cooperation agreements, articles of association, and annual report filing drafts, updated weekly or monthly. The establishment application focuses on the institution name, education level, enrollment scale, signatures, and dates; the cooperation agreement focuses on partner names, capital contributions and term, and the signature page; the articles of association focus on governance structure, decision-making procedures, seals, and receipts. When these materials enter the tool calling node, each serves as a parameter source: the application provides establishment fields and dates, the cooperation agreement provides partners and quantities, and the articles of association provide procedural and signature/seal information. The tool calling node determines whether to call based on the tool description, parameter description, and whether it is required, and returns the input parameters and return results for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call results (the input parameters and returns in the call record). The "progress table and statistical scope description" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the institution name, education level, enrollment quantity, signatures, and dates are consistent with the cooperation agreement and articles of association | Compare the name, quantity, dates, and signature page field by field, open the tool calling node description fields, and check whether the description can be understood on its own |
| Cooperation agreement | Whether the partner names, capital contributions, term, and signature page correspond to the application and articles of association | Verify the signature page and receipt, run a test with a question missing a required field, and see whether it asks a follow-up question first rather than fabricating directly |
| Articles of association | Whether the governance structure, decision-making procedures, seals, and receipts are synchronized with the application and cooperation agreement | On the canvas, verify the diamond-shaped interface connections and node status, and confirm the input parameters and returns of `toolChoice` and `functionCall` in the call record |
| Annual report draft | Whether the record count and statistical count match, whether the scope is written in the header, and whether exceptions are clearly stated | Use one week of records to verify the total, check the statistical scope and exception notes item by item, and check whether the return results contain values that do not exist in the materials |

## Three common errors

- Phenomenon: the same institution name is written differently in the application and the cooperation agreement. Cause: versions are not synchronized; when updating, only one material is changed while the other retains the old name.
- Phenomenon: the enrollment quantity does not match between the articles of association and the annual report draft. Cause: the statistical scope is not written in the header, and the counting range and exceptions are not explained.
- Phenomenon: the signature page lacks signatures or receipts. Cause: the material circulation step did not collect everything, and values that do not exist in the materials appear in the tool call return results.

## How to verify the setup

Acceptance of this feature: run a test with a question missing required parameters, check the input parameters and returns in the call record, confirm whether it asks a follow-up question or calls according to the description, and verify the behavior of `toolChoice` and `functionCall` in the record.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly stated.

- Open the parameter configurations one by one, check the description and whether it is required, and confirm that they correspond to the business material fields.
- On the canvas, verify the diamond-shaped connections and node status, and confirm that the tool calling node is connected to the target tool.
