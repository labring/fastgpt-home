---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Handover
meta_description: Research Progress: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in the scenarios of annual progress and acceptance of research projects, covering three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated periodically, and their fields include project name, phase objectives, completion status, funding execution, and signature; mid-term review materials' fields include indicator comparison, supporting evidence list, review conclusion, and signature; acceptance reports' fields include task completion, results list, funding final accounts, acceptance opinion, and signature. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source, and the cited snippets are used to refer back to the project name, quantities, dates, and signature fields; the node outputs only the citation array, and subsequent steps use it to compare fields, write ledgers, and generate signable drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and its length can be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields complete: project name, phase objectives, completion status, funding execution, and signature field can each be traced back in the cited snippets | Open the citation markers and compare against the original paragraphs of the annual progress report to verify whether the name, quantities, dates, and signature field are consistent |
| Mid-term review materials | Dates and signatures: review date, indicator comparison date, signature or receipt can be traced back in the cited snippets | Expand the citations one by one and verify the dates and signature fields in the original mid-term review materials; record missing items in the handover record |
| Acceptance report | Version and dates consistent: the acceptance report version number, acceptance date, and results list quantity match the annual progress report and mid-term review materials | Compare the cited snippets of the three materials side by side to verify whether the name, quantities, and dates of the same record are consistent |
| Knowledge base retrieval node | Cited content is output as an array, and its length can be 0; even if no content is found, the output chain still runs through | Run a test with a question that has no matching materials and see that the output is empty while the chain continues; then verify the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteList` field |

## Three common errors

- Symptom: the name, quantities, and dates of the same record do not match between the annual progress report and the acceptance report. Cause: the two materials are written separately, and the same record was not compared side by side in the cited snippets.
- Symptom: the mid-term review materials have been revised, but the annual progress report still cites the old version. Cause: the version was not synchronized, and the handover record did not record the version number and date.
- Symptom: the acceptance report lacks a signature or receipt, but the draft is still treated as signable. Cause: the field check did not block the missing item, and the handover step did not sign off item by item according to the template.

## How to verify the setup

Acceptance of this feature: ask a question with source evidence and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If a citation upper limit is involved, verify the tokens of the cited text, and record the array count separately.

Business test: draft one document according to the template and complete one handover to see whether missing items are blocked.

- In the node, verify the selected knowledge base collections and their vector models; open the search parameter panel and verify the values item by item.
- In the conversation, open the citation markers and compare against the source documents; run a test with a question that has no matching materials and see that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
