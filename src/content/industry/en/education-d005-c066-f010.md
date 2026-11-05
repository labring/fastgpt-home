---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Versions
meta_description: Journal Submissions: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Maintain Document Versions and Changes

## What this category's data looks like

In the initial review stage of academic journal submissions, materials include the submitted manuscript, author information form, and plagiarism check report. The manuscript carries the title, authors, affiliations, abstract, and main text; the author information form records names, affiliations, author order, and contact details; the plagiarism check report provides the detection date, similarity rate, and comparison sources. When these three types of materials enter the knowledge base retrieval node, each exists as a citable source identifier, and manuscript paragraphs, information form fields, and report entries respectively become citation snippets. The update rhythm follows the initial review process: manuscript revisions, information form corrections, and plagiarism check report rechecks all generate new versions, and old versions must be retained and traceable. Field characteristics center on four categories: names, quantities, dates, and signatures. The same record often appears across two materials with inconsistent name spellings, mismatched quantities or dates, unsynchronized versions, or missing signatures or receipts, requiring item-by-item comparison before being written into the version ledger and change records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The title, authors, affiliations, date, and signature are consistent between the manuscript and the author information form, and the version number can be traced back to the current manuscript | Compare the manuscript cover page with the author information form field by field, record discrepancies, and mark the current version |
| Author information form | Names, affiliations, author order, and contact details are consistent with the manuscript, and receipts or signatures are complete | Check the information form fields line by line, verify whether signatures or receipts are missing, and register missing items for supplementation |
| Plagiarism check report | The detection date, similarity rate, and comparison sources correspond to the manuscript version; when the report version is not synchronized, mark it as an old version | Verify the report date and manuscript version number, and confirm that citation snippets can be traced back to the original report paragraphs |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues; then check the citation snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name or date of the same record does not match between the manuscript and the author information form. Cause: The two materials are updated separately, without field-level comparison and version synchronization.
- Phenomenon: The plagiarism check report date does not match the current manuscript version. Cause: After the report recheck, the version number was not written back, and the old version continued to be cited.
- Phenomenon: The author information form lacks a signature or receipt. Cause: The correction process is not closed-loop, and the materials lack verifiable confirmation traces when entering retrieval.

## How to verify the setup

Acceptance for this feature: ask a question with textual evidence, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously.

- Open the search parameter panel and check item by item, confirming that the number of citations and `quoteMaxToken` are recorded separately, without making an equality comparison
- Open the citation superscripts in the conversation, compare against the source documents, and verify that each citation snippet corresponds to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
