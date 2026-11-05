---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Find Supporting Evidence
slug: /en/industry/education-d001-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Evidence
meta_description: Kindergarten Quality: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Find Supporting Evidence

## What this category's data looks like

The data for this category looks like this: kindergarten operation behavior and quality self-assessment involves three core types of materials: self-assessment reports, issue lists, and rectification plans, which respectively carry self-assessment conclusions, issue items, and rectification commitments. The materials come from texts and records formed at each stage of the kindergarten, and the update rhythm rolls forward with the self-assessment cycle and rectification progress. When entering the knowledge base retrieval node, the self-assessment report provides overall conclusions and supporting paragraphs, the issue list provides itemized facts and responsible persons, and the rectification plan provides time limits and acceptance arrangements; together, the three support basis queries. Field characteristics are concentrated in names, quantities, dates, and signature receipts: the same record may have mismatched names, quantities, or dates across two materials, unsynchronized versions, or missing signatures and receipts. These materials serve as retrieval objects for the associated knowledge base; after citation output, subsequent nodes or humans compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. "Basis items that can point back to the original text" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether names, quantities, dates, signatures match the issue list and rectification plan | Open the citation marker, compare against the original paragraphs of the self-assessment report, and check whether the fields are consistent |
| Issue list | Whether item names, quantities, dates, responsible person signatures are consistent with the rectification plan | Compare the fields of the issue list and rectification plan item by item, and record inconsistencies |
| Rectification plan | Whether time limits, acceptance arrangements, receipts, and self-assessment report conclusions are version-synchronized | Check the rectification plan version and signature receipts, and confirm they are from the same period as the self-assessment report |
| Citation content output | The number of returned items matches the hit materials; empty is also normal | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues |

## Three common errors

- Phenomenon: the same record has mismatched names, quantities, or dates in the self-assessment report and issue list. Cause: the two materials are maintained separately, without field comparison and version synchronization.
- Phenomenon: the rectification plan version is not synchronized, and citations point to old-version items. Cause: after updating, it was not re-ingested, and retrieval still hits historical paragraphs.
- Phenomenon: the issue list lacks signatures or receipts, and citation fragments cannot support responsibility. Cause: material archiving is incomplete, and signatures and receipts were not saved together with the items.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain runs through.

Business test: ask a basis question across materials, see whether the answer gives traceable sources, and check that the number of citations and the `quoteMaxToken` budget are recorded separately; citation details can be viewed in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled).

- In the node, check whether the selected knowledge base collections and their vector models use the same vector model.
- Open the search parameter panel and check the values item by item, confirming that the number of citations and the `quoteMaxToken` budget are recorded separately and are not compared for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
