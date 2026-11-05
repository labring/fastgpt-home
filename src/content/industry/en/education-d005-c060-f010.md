---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Versions
meta_description: Research Progress: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes

## What this category's data looks like

In the scenario of annual progress and acceptance of research projects, three types of materials—annual progress reports, mid-term inspection materials, and acceptance reports—circulate in parallel, with fields, dates, and signatures being the key points of verification. Annual progress reports record the completion of phase tasks and fund execution; mid-term inspection materials focus on indicator achievement and problem rectification; acceptance reports summarize final results, test conclusions, and signed receipts. When these three types of materials enter the knowledge base retrieval node, each plays a different role: progress reports provide the phase baseline, mid-term materials provide deviation explanations, and acceptance reports provide the basis for conclusions. In terms of update rhythm, progress reports roll over quarterly or semi-annually, mid-term materials are revised intensively at inspection nodes, and acceptance reports are finalized before project closure. Common field characteristics include the same record having mismatched names, quantities, and dates across two materials, versions not synchronized, and missing signatures or receipts. After the materials enter this function, the retrieval node returns cited snippets and source identifiers for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text snippet and source identifier, and the length can be 0. The "version ledger and change records" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models |
| Annual progress report | Fields, dates, and signatures are complete, and the names, quantities, and dates are consistent with the mid-term inspection materials and acceptance report | Compare the same record across the three materials item by item, and verify signatures and receipts |
| Mid-term inspection materials | The version number is unique with the current version, old versions are traceable, and citations are synchronized | Change one piece of content and see whether the version number and citations are updated synchronously |
| Acceptance report | Cited snippets can point back to the original paragraphs, and the number of items in the citation array matches the hit materials | Use `quoteList` to open the citation marker and compare against the source document |

## Three common errors

- Symptom: The same record has mismatched names, quantities, and dates in the annual progress report and acceptance report. Cause: Versions are not synchronized, the old version is still hit by retrieval, and cited snippets come from different versions.
- Symptom: The answer has content but the citation array is empty, and the citation marker is missing. Cause: Treating an empty array as a retrieval failure, without checking whether materials were hit in this round, and without looking at the hit situation in `responseData` (non-streaming module results returned with detailed output enabled).
- Symptom: Cited snippets do not match the original text. Cause: Directly attributing it to length truncation, without first checking which material was hit in this round, and then looking at the citation content budget of `quoteMaxToken`.

## How to verify the setup

Acceptance of this function: Ask a question with original text evidence, and check whether the citation array and citation marker can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check `quoteList` within `responseData`.

Business test: Change one piece of content, see whether the version number and citations are updated synchronously, record the number of citations separately, and treat `quoteMaxToken` only as the citation content budget; do not compare the two for equality.

- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section
- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the number of citations

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
