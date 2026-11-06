---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Review
meta_description: Research Progress: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results

## What this category's data looks like

Research project annual progress and acceptance materials usually include three types: annual progress reports, mid-term inspection materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields covering project name, responsible person, task milestones, fund usage, and output of results; mid-term inspection materials focus on the completion status of phase indicators and adjustment explanations; acceptance reports summarize all tasks, indicators, funds, results, and signature pages. The three types of materials connect sequentially in time, may be revised multiple times across versions, and signatures and receipts are scattered across different pages. When the materials enter the knowledge base retrieval node, each serves as a citation source candidate: annual progress reports provide annual tasks and progress descriptions, mid-term inspection materials provide the basis for phase verification and adjustments, and acceptance reports provide final conclusions and signature information. The name, quantity, and date of the same record may be inconsistent between two types of materials. When versions are not synchronized or signature receipts are missing, citation snippets can only point back to the original text and cannot directly serve as anomaly determinations.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text snippet and source identifier, and the length can be 0. Even if no content is found, the output pipeline still runs through. The anomaly list and review conclusions must be handled subsequently by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields cover project name, responsible person, task milestones, fund usage, and output of results; dates and signature pages need to be checked item by item | Open the citation marker, compare against the source document, and verify the original text snippet and source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Mid-term inspection materials | Completion status of phase indicators, adjustment explanations, version number, and signature receipt need to be aligned with the annual progress report | Verify whether the name, quantity, and date of the same record are consistent in the two materials, and record `quoteList` and the number of citations |
| Acceptance report | Final tasks, indicators, funds, results, and signature pages need to be complete, and the version must be the latest | Verify whether the citation snippet can point back to the original paragraph of the acceptance report, and check whether the citation text is truncated under the `quoteMaxToken` budget |
| Knowledge base retrieval node | Citation content is output as an array, and the length can be 0; even if no content is found, the output pipeline still runs through | Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the array length |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, no field-level comparison is performed, and citation snippets only point back to their respective original texts.
- Phenomenon: The version of the mid-term inspection materials is not synchronized, and the cited paragraph is still the old version. Cause: Multiple versions exist simultaneously in the knowledge base, retrieval hits the old version, and version differences are not marked.
- Phenomenon: The acceptance report lacks a signature or receipt, and the citation snippet cannot support the review conclusion. Cause: The signature page did not enter the knowledge base or was not hit by retrieval; when the citation array is empty, the pipeline still runs through.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and verify whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the number of citations and the `quoteMaxToken` budget separately.

Business test: create an anomaly record, see whether the source material can be traced, and verify whether the name, quantity, and date are consistent with the annual progress report, mid-term inspection materials, and acceptance report.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and verify that the number of citations in `responseData` is consistent with the hit materials.
- Open the citation marker in the conversation, compare against the source document to verify whether each citation can point back to the original paragraph, and check the `quoteList` and `quoteMaxToken` settings.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
