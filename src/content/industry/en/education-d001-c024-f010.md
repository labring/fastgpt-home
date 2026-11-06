---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Find Supporting Evidence
slug: /en/industry/education-d001-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Evidence
meta_description: Graduate Admissions: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Find Supporting Evidence

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, the materials entering the knowledge base retrieval node usually include three types: the re-examination plan, the candidate score sheet, and the transfer list. The re-examination plan provides the process, weights, timing, and signature fields; the candidate score sheet carries the preliminary examination, re-examination, total score, and ranking; the transfer list records the transfer batch, candidate number, and confirmation status. The three types of materials each have different roles: the re-examination plan is the rule basis, the score sheet is the factual basis, and the transfer list is the roster basis. Materials are updated by admissions year, and the names, quantities, and dates of the same record in different materials must be aligned item by item; the version is based on the current year, and when a signature or receipt is missing, that entry cannot serve as the final basis. In terms of field characteristics, the plan leans toward clauses and dates, the score sheet leans toward values and subjects, and the transfer list leans toward numbers and statuses.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | The clauses, dates, and signature fields match the original text, and the version is the current year | Open the citation marker and check the clause number, date, and signature field against the original plan text; then check whether `quoteMaxToken` only affects the citation text budget |
| Candidate score sheet | The name, quantity, and date of the same candidate are consistent across the two materials | Use the candidate number to compare scores and rankings across materials, record the number of array entries, and check the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) against the original paragraphs |
| Transfer list | The transfer batch, candidate number, and confirmation status can be traced back to the original text, and no receipt is missing | Open the citation markers one by one and check the number and status in the original list text; mark entries missing a signature or receipt as pending supplementation |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal | Run a test with a question that has no matching materials and see whether the array is empty while the chain continues; then check the hit records in `quoteList` |

## Three common errors

- Phenomenon: The name, quantity, or date of the same candidate do not match between the score sheet and the transfer list. Cause: The two materials were entered in different steps, and no cross-material field comparison was performed.
- Phenomenon: The cited fragment points to the re-examination plan of an old year. Cause: The version was not synchronized, the current year's materials did not replace the old version, and retrieval still hit the historical version.
- Phenomenon: A transfer list entry is missing a signature or receipt. Cause: The confirmation step did not return the information, the materials were not closed-loop, and that entry cannot serve as the final basis.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a cross-material basis question and see whether the answer gives a traceable source.

- In the node, check the selected knowledge bases and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and verify that `quoteMaxToken` is only used as the citation content budget, while the number of array entries is recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
