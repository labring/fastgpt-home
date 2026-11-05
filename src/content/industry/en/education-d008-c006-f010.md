---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Access
meta_description: Kindergarten Quality: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Manage Authorized Access and External Services

## What this category's data looks like

The materials for kindergarten operation behavior and quality self-assessment consist mainly of three types: self-assessment reports, issue lists, and rectification plans, plus receipts, signature pages, and version records. The self-assessment report carries the achievement status of indicators and conclusions; the issue list itemizes pending corrections and responsible persons one by one; the rectification plan gives measures, completion dates, and acceptance methods. The three types of materials often come from different points in time, and the name, quantity, and date of the same record may be inconsistent between the report and the list, which is even more obvious when versions are not synchronized; missing signatures or receipts can also break the material chain. When materials enter the knowledge base retrieval node, each plays its own role of being retrieved and cited: the report provides conclusive original text, the list provides itemized original text, and the plan provides original text of measures and dates. The node is only responsible for returning an array of cited content by vector search, and does not perform field comparison or ledger generation.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. "Externally available entry points and authorization scope" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the name, quantity, date, and signature are consistent with the issue list | Retrieve the same record in both materials, and compare fields and signature pages item by item |
| Issue list | Whether the item names, quantities, and rectification dates match the rectification plan | Take one issue and check its name, quantity, and date against the corresponding item in the plan |
| Rectification plan | Whether measures, completion dates, acceptance methods, and receipts are complete | Check whether the dates and versions of plan items, receipts, and signature pages are synchronized |
| Knowledge base retrieval node | Whether the number of entries in the cited content array matches the hit materials, and whether an empty array also goes through | Check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled), and verify `quoteList` and the source identifier |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two materials were organized separately by different nodes or manually, without field-level comparison.
- Symptom: The rectification plan has been updated, but old-version items still appear in the citations. Cause: Versions are not synchronized, and old documents in the knowledge base have not been replaced or re-indexed.
- Symptom: The cited fragment can be opened, but the receipt or signature page is missing. Cause: Material collection is incomplete, and citations only cover the body text but not signatures and receipts.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still goes through.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting.

- In the node, check whether the selected knowledge base collections and their vector models are the same vector model.
- Open the search parameter panel and check the values item by item, and run a trial with a question that has no matching materials to see whether the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
