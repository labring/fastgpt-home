---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Versions
meta_description: Apprenticeships: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like
Modern apprenticeship and order class management involves three types of core materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. School-enterprise cooperation agreements contain the cooperation period, positions, number of people, and signing and sealing dates; training plans contain course modules, rotation cycles, assessment methods, and signatures from both the school and the enterprise; master-apprentice mentoring records contain the mentoring master, apprentice name, work hours, task items, and receipts from both parties. The three types of materials often enter the knowledge base in the form of revised drafts, supplementary agreements, and monthly ledgers, and the update rhythm follows semesters, batches, and agreement changes. After entering the knowledge base retrieval node, agreements and plans assume the role of institutional basis, while mentoring records assume the role of process evidence, and each is cited as an independent document or in segmented form. Field verification focuses on names, quantities, dates, and signature fields. The wording of the same record in different materials must remain consistent. After a version change, the old version retains a traceable identifier, and the citation source points to the current version.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the cooperation period, position names, number of people, and signing and sealing dates correspond consistently with the order class training plan | At the knowledge base retrieval node, check the selected collection and vector model, open the citation marker to compare against the original agreement paragraphs, and compare the dates and signature fields item by item |
| Order class training plan | Whether the course modules, rotation cycles, and assessment methods match the positions, number of people, and batch dates in the agreement | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues; then compare the original plan text with the cited fragments |
| Master-apprentice mentoring record | Whether the names of the master and apprentice, work hours, task items, and receipt signatures match the batches and positions in the training plan | Check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the hit materials; `quoteMaxToken` is only a content budget, and the number of items is recorded separately |
| Cited content output | Whether each citation can point back to the original paragraph, whether the source identifier points to the current version, and whether the old version is traceable | Open `quoteList` to view the cited fragments and source documents, and confirm that the citations correspond to the original text; if there is no citation marker, first check whether materials were hit |

## Three common errors

- Phenomenon: The position names, number of people, and dates for the same record do not match between the agreement and the training plan. Cause: The two materials were revised separately, and the version number and citation source were not updated in sync.
- Phenomenon: The mentoring record lacks the master's or apprentice's signature, or lacks a receipt. Cause: Process materials entered the knowledge base first, the signature fields were not completed, and the cited fragment only captured the task items.
- Phenomenon: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether there was a hit in this round and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content, and see whether the version number and citations are updated in sync.

- At the knowledge base retrieval node, check the selected collections and their vector models, and confirm that knowledge bases with the same vector model are associated.
- Open the search parameter panel and check the values item by item, confirming they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
