---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Checks
meta_description: Kindergarten Quality: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences

## What this category's data looks like

In the kindergarten operation behavior and quality self-assessment scenario, the core materials include the self-assessment report, the problem list, and the rectification plan, which often enter the knowledge base as paper scans, electronic documents, or system-exported tables. The self-assessment report carries the overall conclusions and indicator scores, the problem list records specific problems, responsible persons, and deadlines item by item, and the rectification plan lists measures, completion dates, and signature fields. Material sources are mostly kindergarten submissions, responsible inspector feedback, and district/county consolidated versions, and the update rhythm follows the self-assessment cycle, rectification monthly reports, and review nodes. Field characteristics center on object names, quantities, dates, signatures, and receipts, and the same record often appears across different materials with inconsistent name spellings, different quantity calibers, misaligned dates, unsynchronized versions, or missing signatures. After entering the knowledge base retrieval node, the three types of materials are each cited as independent sources, and cited snippets point back to the original paragraphs, providing traceable original-text evidence for subsequent field comparison, ledger writing, and discrepancy list generation.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original snippet and a source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Check against the problem list and rectification plan whether the name, quantity, date, and signature of the same object are consistent | Open the citation superscript, compare against the original paragraphs of the self-assessment report, and record the original-text positions of the name spelling, quantity caliber, date, and signature field |
| Problem list | Check against the self-assessment report and rectification plan whether the name, quantity, date, and receipt of the same record are consistent | Search with one real record, view the number of returned items in the citation array and the materials hit, point back to the original text item by item, and mark the discrepancy fields |
| Rectification plan | Check against the self-assessment report and problem list whether the measures, completion date, signature, or receipt are consistent | Check the values in the search parameter panel, confirm that the cited content corresponds to the original text, and record items with unsynchronized versions or missing signatures |
| Cited content output | The number of returned items is consistent with the materials hit; empty is also normal, and the chain continues to run through | Run a trial with a question that has no matching materials, observe that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and separately record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the self-assessment report and the problem list. Cause: the two materials are submitted separately, and the caliber and spelling are not unified; although cited snippets can point back to the original text, the discrepancies require manual field comparison before being written into the discrepancy list.
- Symptom: the rectification plan and the self-assessment report versions are not synchronized, and cited snippets point to old-version content. Cause: the update rhythms differ, multiple versions exist simultaneously in the knowledge base, and which material is hit by retrieval must first be checked against the sources hit in this round, then clipping is examined.
- Symptom: the problem list lacks a signature or receipt, and the citation array is empty. Cause: the material was not uploaded or was not hit; an empty array is a normal output and does not mean retrieval failed, so it is necessary to check back whether the material is in the knowledge base and confirm whether the chain continues.

## How to verify the setup

This feature's acceptance: ask a question with original-text evidence and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the number of citations in `quoteList` within `responseData`.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, signature, or receipt, record the discrepancies, and after confirmation by the reviewer, write them back.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item, and confirm that the cited content corresponds to the original text.
- Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; the number of citations is the array length, `quoteMaxToken` is the cited content budget, and the two are not compared for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
