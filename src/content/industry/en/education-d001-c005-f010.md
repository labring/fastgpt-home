---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Find Supporting Evidence
slug: /en/industry/education-d001-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Evidence
meta_description: Kindergarten Safety: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Find Supporting Evidence

## What this category's data looks like

This page addresses the category of kindergarten safety protection and emergency drills. Source materials include the kindergarten's safety management system, hazard inspection ledgers, emergency drill plans and sign-in records, access control and school bus checklists, rectification receipts, and responsible person signature pages. When these materials enter the knowledge base retrieval node, each plays a different role: systems and plans provide basis entries, ledgers and checklists provide hazard items, rectification deadlines, check items, and missing-item clues, and sign-in and signature pages provide headcounts, responsible persons, and closed-loop evidence. The update cadence follows semester inspections, drill batches, and rectification receipts, and the current effective version prevails. Field characteristics center on four categories: hazard items and rectification deadlines, drill headcounts and sign-ins, access control and school bus check items, and responsible person signatures, facilitating subsequent field-based comparison and ledger generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. Even if no content is found, the output chain still completes. "Basis entries that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledger and rectification receipt | Hazard items and rectification deadlines match the original text, and whether rectification is closed-loop is verifiable | Open the citation marker, compare hazard items, rectification deadlines, and responsible person signatures one by one, and check whether it is closed-loop |
| Drill plan and sign-in records | Drill headcounts and sign-ins match the original text, and the records do not conflict with the plan | Compare the plan with the sign-in pages, verify headcounts, batches, and responsible person signatures, and confirm the records are consistent with the plan |
| Access control and school bus checklist | Check items are complete, with no missing items, and check results can be traced back to the original text | Verify access control and school bus check items one by one, confirm there are no missing items, and trace back to the source documents |
| Knowledge base retrieval node | Cited content is output as an array, the length may be 0, and the chain continues | In the conversation, view the citation marker of `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled), and verify the number of array entries and the source identifiers |

## Three common errors

- Symptom: the hazard ledger has rectification deadlines but no receipts, so entries cannot be closed-loop. Cause: the materials are not traced back to the original text, and subsequent comparison lacks a basis; first verify the hit materials, then check the trimming.
- Symptom: drill records do not match the plan, and headcounts and sign-ins do not correspond. Cause: cited snippets are misaligned with the original text and are not traced back to the source documents one by one.
- Symptom: access control and school bus check items are missing, and the checklist is incomplete. Cause: an empty citation array is mistakenly judged as a retrieval failure, whereas being empty is actually a normal output.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain completes.

Business test: ask a basis question across materials and see whether the answer provides traceable sources.

- Open the search parameter panel and verify item by item, confirming that the number of citations and `quoteMaxToken` are recorded separately and not compared for equality.
- In the conversation, open the citation markers and, against the source documents, verify whether each citation can be traced back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
