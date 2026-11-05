---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics
slug: /en/industry/education-d006-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Progress
meta_description: Kindergarten Safety: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification for kindergarten safety protection and emergency drills. Materials include hazard ledgers, drill plans and sign-in sheets, access control and school bus inspection checklists, and responsible person signature records. Hazard ledgers are registered by inspection date and rectification deadline, serving as the original basis for closed-loop judgment; drill plans and sign-in sheets provide the basis for headcount and process standards, and are key to whether recorded numbers and statistical numbers match; access control and school bus inspection checklists leave traces item by item according to inspection items, used to verify missing items; signature records confirm responsibility attribution. Materials enter the knowledge base retrieval node on a weekly basis. Field characteristics are date, location, hazard item, rectification deadline, expected and actual attendance numbers, inspection item, and signature column. The update rhythm is record-as-inspected and weekly aggregation. After entering citation output, subsequent nodes compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "progress table and statistical standards explanation" is completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledger | Whether hazard items correspond one by one with rectification deadlines, and whether closed-loop status is marked | Compare inspection date, rectification deadline, and signature column item by item; list unclosed items separately |
| Drill plan and sign-in sheet | Whether drill headcount and sign-in are consistent, and whether records match the plan process | Use one week of records to verify totals, and verify sign-in headcount against the headcount set in the plan |
| Access control and school bus inspection checklist | Whether access control and school bus inspection items leave traces item by item, and whether there are missing items | Compare item by item against the inspection item list, and point missing items back to the original paragraph |
| Cited content array | Whether the number of returned entries matches the hit materials; empty is also normal | Check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, confirm the corner mark points back to the original text, and record the array length separately |

## Three common errors

- Phenomenon: hazard records show rectification completed, but the statistical total still has unclosed items. Cause: the rectification deadline and signature column were not updated synchronously, and the closed-loop judgment lacks original text basis.
- Phenomenon: drill record headcount does not match the sign-in sheet, and records do not match the plan process. Cause: the standards for expected and actual attendance were not written in the header, and exceptional situations were not explained separately.
- Phenomenon: access control and school bus inspection items are missing, and weekly totals do not match daily records. Cause: the inspection item list did not leave traces item by item, and missing items were not pointed back to the original paragraph.

## How to verify the setup

Acceptance for this feature: ask a question with original text basis, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching materials, and confirm the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: use one week of records to verify totals, see whether standards and exceptions are clearly written, and verify hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures.

- In the node, check the selected collections and their vector models, and confirm that knowledge bases with the same vector model are associated.
- Open the search parameter panel and check item by item, view `quoteList` and `responseData`, and confirm that cited fragments can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
