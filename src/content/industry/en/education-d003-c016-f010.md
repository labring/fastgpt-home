---
title: Citations and Source Traceability for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c016-f010
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Citations | Intake
meta_description: Campus Safety: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the school safety hazard inspection and campus incident reporting scenario. The materials include three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are updated weekly or monthly, recording inspection items, discovered hazards, inspector signatures, and dates; hazard rectification ledgers are updated on a rolling basis by rectification milestone, recording hazard names, quantities, rectification deadlines, responsible person signatures, and receipts; emergency incident reports are submitted within a time limit after an incident occurs, recording the incident process, number of people involved, handling measures, and approval signatures. After these three categories of materials enter the knowledge base retrieval node, each plays a different role: safety inspection checklists provide the original records of hazard discovery, hazard rectification ledgers provide the tracking basis for the rectification process, and emergency incident reports provide the complete chain of incident handling. The name, quantity, and date of the same hazard may be inconsistent across different materials. When versions are not synchronized, the old ledger will overwrite the new records. Missing signatures or receipts will prevent the material from serving as a basis for closure.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "acceptance record and completed follow-up questions" are completed subsequently by AI nodes, code nodes, or manual work. The citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection items, hazard names, inspection dates, and inspector signatures are complete, and whether the name and quantity of the same hazard are consistent with those in the ledger | Open the citation superscript to trace back to the original text of the safety inspection checklist, verify the hazard name and quantity, use `quoteList` to view the matched snippet, and record the number of array items |
| Hazard rectification ledger | Whether the rectification deadline, responsible person signature, and receipt are complete, and whether the version is synchronized with the latest inspection checklist | Check the rectification deadline and signature field against the original ledger text, use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation source identifier, and confirm that there is no overwriting by an old version |
| Emergency incident report | Whether the incident date, number of people involved, handling measures, and approval signature match the records with the same names in the safety inspection checklist and ledger | Open the citation superscript in the conversation, trace back to the original report text item by item, verify the date and number of people, use `quoteMaxToken` to check the citation text budget, and record the number of array items separately |
| Knowledge base retrieval node | The cited content is output as an array, the length can be 0, and the chain still runs through when there are no matching materials | Run a test with a question that has no matching materials, and see whether the output is empty while subsequent nodes continue to execute |

## Three common errors

- Phenomenon: The name and quantity of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: The two materials were filled in by different personnel at different times, without field comparison and unified naming.
- Phenomenon: The date in the emergency incident report is inconsistent with the date recorded in the safety inspection checklist. Cause: Versions are not synchronized, old materials are still hit by retrieval, and it is not checked which material was hit in this round.
- Phenomenon: The hazard rectification ledger lacks the responsible person's signature or receipt, so it cannot serve as a basis for closure. Cause: The signature was not added promptly after rectification was completed, and completeness verification was not performed when the material entered the knowledge base.

## How to verify the setup

This feature acceptance: Ask a question with original text evidence, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Ask a question missing key information, and see whether it first asks a follow-up question before answering.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, record the number of citation array items and the value of `quoteMaxToken`, and do not compare the two for equality.
- Open the citation superscript in the conversation, check against the source document whether each citation can trace back to the original paragraph, and use `quoteList` and `responseData` to view the matched snippet and source identifier.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
