---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Progress
meta_description: Research Progress: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated at annual milestones, with fields including project name, responsible person, start and end dates, tasks for the current year, completion status, fund usage, signature, and receipt; mid-term review materials are formed at the midpoint of the cycle, with fields including stage objectives, indicator completion amounts, supporting evidence list, expert opinions, and signature; acceptance reports are formed at project closure, with fields including final results, indicator comparison, audit basis, acceptance conclusion, signature, and receipt. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source: annual progress reports provide progress records and annual statistics, mid-term review materials provide the basis for stage verification, and acceptance reports provide the final basis and signature receipts. The names, quantities, and dates of the same record in different materials need to be compared item by item; when versions are not synchronized or signatures and receipts are missing, the correspondence between cited snippets and the original text becomes the starting point for verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original snippet and a source identifier, and the length can be 0. The progress table and statistical basis description are completed subsequently by AI nodes, code nodes, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the fields, dates, and signature are complete, and whether the names, quantities, and dates of the same record can match those in the mid-term review materials | In the citation array, refer back to the original paragraphs item by item, and check the project name, tasks for the current year, fund basis, and signature column; use `quoteList` to view the source document identifier |
| Mid-term review materials | Whether the stage objectives and indicator completion amounts are consistent with the annual progress report, and whether expert opinions and signature have missing items | Open the citation superscript to compare with the source document, and check the stage objectives, completion amounts, supporting evidence list, and receipt; record the array length, and do not compare it for equality with `quoteMaxToken` |
| Acceptance report | Whether the final results, indicator comparison, and audit basis are consistent with the annual progress report and mid-term review materials, and whether the signature and receipt are complete | Locate the acceptance conclusion paragraph and the indicator comparison paragraph in the cited content, and check the version number and date; `responseData` (non-streaming module results returned with detailed output enabled) is used to view the node return structure and confirm that the cited snippets can refer back to the original text |
| Search parameters | Consistent with the values set in the knowledge base retrieval section, and the associated knowledge base is the same vector model | Open the search parameter panel and check item by item, confirming the selected knowledge base collection and vector model; run a test question with no matching materials to see that the citation array is empty while the pipeline still works |

## Three common errors

- Symptom: the names, quantities, and dates of the same record in the annual progress report and the mid-term review materials do not match. Cause: the two materials are updated separately, versions are not synchronized, and the cited snippets each refer back to different versions.
- Symptom: the acceptance report lacks a signature or receipt, and the corresponding original paragraph cannot be found in the citation array. Cause: the signature page was not included in the knowledge base, or the scanned copy does not cover the signature column, so the hit material is incomplete.
- Symptom: there is no citation superscript in the answer, or the cited snippets do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still works.

Business test: use one week of records to check the totals, and see whether the basis and exceptions are clearly stated; compare the record count and statistical count item by item, and write the basis into the header.

- In the conversation, open the citation superscripts, compare the cited snippets with the original paragraphs item by item against the source document, and record the array length.
- Open the search parameter panel, check the associated knowledge base and vector model, and confirm that the values are consistent with the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
