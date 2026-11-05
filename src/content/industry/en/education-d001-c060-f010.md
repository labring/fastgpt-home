---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Find Supporting Evidence
slug: /en/industry/education-d001-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Evidence
meta_description: Research Progress: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Find Supporting Evidence

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones and contain task completion status, budget execution, stage results, and the signature of the person in charge; mid-term review materials are produced in the middle of the project cycle and contain indicator comparisons, adjustment explanations, expert opinions, and receipts; acceptance reports are produced at project closure and contain indicator completion, budget final accounts, a results list, acceptance conclusions, and signatures. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source: annual progress reports provide the annual basis, mid-term review materials provide the basis for mid-term adjustments, and acceptance reports provide the basis for final conclusions. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts; the update rhythm rolls with project milestones; the same record may show inconsistent names, quantities, or dates across different materials, with versions not synchronized or signatures missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The basis items that can be traced back to the original text are completed by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, or generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields contain task completion status, budget execution, stage results, and the signature of the person in charge; the date should fall within the annual milestone | Check the names, quantities, dates, and signature fields in the report, and confirm they can be matched with the mid-term review materials and acceptance report |
| Mid-term review materials | Fields contain indicator comparisons, adjustment explanations, expert opinions, and receipts; the version should be current | Check whether the adjustment explanations are consistent with the same record in the annual progress report and acceptance report, and check whether the receipts are complete |
| Acceptance report | Fields contain indicator completion, budget final accounts, results list, acceptance conclusions, and signatures; the date should fall within the project closure milestone | Check the names and quantities in the results list against the annual progress report and mid-term review materials item by item, and confirm the signatures are complete |
| Knowledge base retrieval node | Cited content is output as an array, the length can be 0, and even if no content is found, the output chain still runs through | Open the citation superscript in the conversation and compare it with the source document; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure, use `quoteList` to view hit details, and use `quoteMaxToken` to check the cited content budget |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the annual progress report and the acceptance report. Cause: the two materials are filled in separately, no cross-material field comparison is performed, and the cited snippets each hold but point to different bases.
- Symptom: the adjustment explanations in the mid-term review materials are not synchronized to the acceptance report, and the versions are not synchronized. Cause: materials are updated independently by milestone, old versions remain in the knowledge base and participate in retrieval, and the citation source points to a historical version.
- Symptom: the acceptance report lacks signatures or the mid-term review materials lack receipts, yet the cited snippets can still be returned. Cause: the citation output is only responsible for returning the original text snippet and source identifier, and does not verify whether signatures and receipts are complete.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis and check whether the citation array and superscript can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and check the number of citations and `quoteMaxToken` separately, without making an equality comparison.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model; open the search parameter panel and check the values item by item.
- Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; then open the citation superscript and compare it with the source document to confirm that each citation can be traced back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
