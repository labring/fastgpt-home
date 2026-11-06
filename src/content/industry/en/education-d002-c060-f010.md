---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Checks
meta_description: Research Progress: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of annual progress and acceptance of research projects, materials are usually divided into three categories: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields mainly consisting of task name, planned quantity, completion date, and participant signatures; mid-term review materials are formed when the project is halfway through, focusing on stage indicators, fund execution, and signatures of the person in charge and the management department; acceptance reports are summarized at the project closing stage, emphasizing final quantity, completion date, acceptance opinions, and multi-party signatures. When the three types of materials enter the knowledge base retrieval node, each is split, vectorized, and associated as an independent source; after a retrieval hit, they are returned as citation snippets for subsequent field comparison, ledger writing, and discrepancy list generation. In terms of update rhythm, annual reports roll with the year, mid-term materials follow review batches, and acceptance reports follow closing batches; versions and signature statuses need to be traced back item by item in the citation sources.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the task name, planned quantity, completion date, and participant signatures are consistent with the ledger | Trace each field back to the original text in the citation snippets, and record the name, quantity, date, and whether signatures are present |
| Mid-term review materials | Whether the stage indicators, fund execution, and signatures of the person in charge and the management department are consistent with the annual report's standards | Compare the name, quantity, and date of the same record in the two materials, and mark the discrepant fields |
| Acceptance report | Whether the final quantity, completion date, acceptance opinions, and multi-party signatures connect with the mid-term materials | Verify the version number and receipt, and list separately the items missing signatures or receipts |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a trial with a question that matches no materials, see whether the array is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, and no field-level comparison has been done.
- Symptom: The version cited by the mid-term review materials is not synchronized with the annual report version. Cause: After the materials were updated, the ledger was not written back, and the citation still points to the old snippet.
- Symptom: The acceptance report is missing signatures or receipts, but the citation snippets appear complete. Cause: The signature page was not included in the knowledge base, and retrieval hit the main text while missing the attachment.

## How to verify the setup

This feature's acceptance: ask a question with textual support, and check whether the citation array and footnote markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use a real record to find fields inconsistent with the ledger, and check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier of the `quoteList` field.

- Turn on citation footnote markers, compare them one by one against the source documents, and confirm that the citation snippets are consistent with the original paragraphs
- Run a trial with a question that matches no materials, record whether the chain continues when the array is empty, and verify that the search parameters are consistent with the values in the knowledge base retrieval section

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
