---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Handover
meta_description: Kindergarten Safety: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the kindergarten safety protection and emergency drill scenario. Materials include hazard rectification ledgers, drill plans and sign-in sheets, access control and school bus inspection records, and responsibility handover forms. When these materials enter the citation output of the knowledge base retrieval node, each plays a traceable role: hazard items and rectification deadlines provide the basis for closure, drill headcount and sign-in provide the basis for plan consistency, access control and school bus inspection items provide the basis for item-by-item verification, and responsible person signatures provide the basis for handover destination. Sources are mainly kindergarten safety policies, drill records, inspection checklists, and handover forms, with an update cadence that advances with each drill, weekly inspection, and handover round. Field characteristics center on hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, responsible person signatures, as well as version and date. After materials enter this feature, the cited content array is only responsible for pointing back to the original paragraphs; field comparison, ledger filling, and report generation are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text snippet and a source identifier, and its length can be 0. Even if no content is found, the output pipeline still completes. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification ledger | Whether hazard items correspond one by one to rectification deadlines, and whether they are closed | Open the citation marker to point back to the original paragraph, and verify the hazard items, rectification deadlines, and closure markers; the number of citations is recorded separately, and `quoteMaxToken` is only the citation content budget |
| Drill plan and sign-in sheet | Whether the drill headcount and sign-in are consistent with the plan, and whether any items are missing | Check the headcount and sign-in item by item against the plan, and confirm that the cited snippets match the original text; view the source identifier in `quoteList` |
| Access control and school bus inspection records | Whether access control and school bus inspection items are missing, and whether responsible person signatures are complete | Check the inspection items and signatures item by item, and confirm that each citation can point back to the original text; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure |
| Responsibility handover form | Whether the responsible person is clear, and whether the version and date are consistent | Check the handover form fields and signatures, confirm the version and date are consistent, and then pass it to the next step for sign-off |

## Three common errors

- Phenomenon: The hazard rectification ledger shows rectified, but the cited snippet only reaches the registration item. Cause: The hazard is not closed, and the rectification deadline and closure marker are not written into the same material.
- Phenomenon: The drill record headcount does not match the plan headcount. Cause: The drill record does not match the plan, and the sign-in sheet was not checked item by item against the plan.
- Phenomenon: Access control and school bus inspection records contain blank items. Cause: Inspection items are missing, responsible person signatures are absent, and the template was not used to block this during handover.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the cited content array and citation markers can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the pipeline completes. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a query that has no matching materials, see that the output is empty while the pipeline continues, and open the citation markers to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
