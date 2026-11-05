---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Review
meta_description: Kindergarten Quality: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results

## What this category's data looks like

Kindergarten operation behavior and quality self-assessment materials usually include a self-assessment report, an issue list, and a rectification plan. The three are updated by semester or academic year, and their fields include operating conditions, safety and hygiene, care and education, faculty and staff, and internal management, as well as name, quantity, date, signature, and receipt. The self-assessment report is a conclusive text, the issue list is a record item by item, and the rectification plan is the follow-up arrangement. When the materials enter the knowledge base retrieval node, each plays the role of being retrieved and cited: the report provides conclusions and basis, the list provides entries and fields, and the plan provides responsibility and deadlines. In terms of update rhythm, the self-assessment report and the issue list are often uploaded in the same batch, and the rectification plan is supplemented afterward, which gives rise to version differences and missing signatures.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length can be 0. The "anomaly list and review conclusion" is completed subsequently by an AI node, a code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the name, quantity, date, and signature are consistent with the issue list | Open the citation marker to point back to the original paragraph of the report, and check the fields and signature column |
| Issue list | Whether the name, quantity, and date of the same record match in the two materials | Compare the entries of the list and the rectification plan one by one, and record inconsistencies |
| Rectification plan | Whether the version is synchronized, and whether signatures or receipts are missing | Check the plan version number and receipt, and confirm that the date connects with the self-assessment report |
| Cited content output | The number of items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match in the self-assessment report and the issue list. Cause: The two materials were entered separately, and no field-level comparison was made.
- Phenomenon: The version of the rectification plan is not synchronized, and the date does not connect with the self-assessment report. Cause: The plan was finalized before the report, and was not backfilled and updated afterward.
- Phenomenon: The issue list lacks signatures or receipts, and the review conclusion cannot be stamped. Cause: The signature documents were not fully collected during the material circulation process.

## How to verify the setup

This function's acceptance check: ask a question with original text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: create an anomaly record and see whether it can be traced back to the source material.

- In the conversation, open the citation markers, compare them with the source document, and check the cited fragments in `quoteMaxToken` and `responseData` (non-streaming module results returned with detailed output enabled).
- Open the search parameter panel and check item by item, record the number of array items, and separately view the matched materials in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
