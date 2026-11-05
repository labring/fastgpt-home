---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Handover
meta_description: Dropout Prevention: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In compulsory education dropout prevention and school retention work, the dropout risk ledger, return-to-school persuasion records, and home visit records are three basic types of materials. Their fields include student name, student status number, risk level, persuasion date, home visit date, responsible person's signature, and receipt status. The update cadence rolls with the semester and persuasion milestones, and the same record often appears in multiple materials. When materials enter the knowledge base retrieval node, the ledger, persuasion records, and home visit records each serve as retrieved original-text sources; the node only outputs an array of cited content and does not handle ledger comparison, discrepancy lists, or report generation. The field characteristics require that names, quantities, dates, and signatures remain consistent across materials, that versions and dates stay synchronized, and that missing items be blocked.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, where each entry contains an original-text snippet and a source identifier. Its length can be 0. Material drafts and handover records that can be issued must be completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the ledger fields are complete, and whether the risk level, student status number, responsible person's signature, and date are consistent | In the node, check the selected collections and their vector models, open the citation markers to compare against the source documents, compare fields and dates item by item, and record the number of array entries |
| Return-to-school persuasion records | Whether the persuasion date, number of persuasion attempts, and receipt status match the same record in the ledger | Run a test with a question that has no matching materials, and see whether the cited content output is empty while the chain continues; then verify that when there is a match, the number of entries is consistent with the hit materials, and check the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |
| Home visit records | Whether the home visit date, signature, and receipt are consistent with the persuasion records and the ledger in name, quantity, and date | Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section; when the citation limit is involved, check the tokens of the cited text, record the number of array entries separately, and do not perform an equality comparison on `quoteMaxToken` |

## Three common errors

- Symptom: The name or student status number of the same student does not match between the ledger and the persuasion records. Cause: The two entries came from different input sources, and no field comparison was performed before proceeding to the next step.
- Symptom: The dates and counts in the home visit records and the persuasion records are inconsistent. Cause: The versions were not synchronized, and old-version materials were still retrieved and entered the draft.
- Symptom: The handover record lacks a signature or receipt but is still circulated as an issuable material. Cause: Missing items were not blocked, and the responsible person did not confirm item by item during handover.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, check whether the cited content array and citation markers can point back to the original paragraphs, and check the `quoteList` in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one document according to the template and complete one handover, and see whether missing items are blocked.

- In the conversation, open the citation markers, compare against the source documents, verify that each citation can point back to the original paragraphs, and record the number of array entries.
- Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section; when the citation limit is involved, check the tokens of the cited text, record the number of array entries separately, and do not perform an equality comparison on `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
