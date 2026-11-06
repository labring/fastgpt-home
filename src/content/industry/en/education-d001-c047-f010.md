---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Find Supporting Evidence
slug: /en/industry/education-d001-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Evidence
meta_description: Study Abroad Safety: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Find Supporting Evidence

## What this category's data looks like

For the category of pre-departure training and overseas safety reminders, commonly used materials include pre-departure training courseware, safety reminder checklists, and accommodation contact sheets. The courseware records training modules, instructors, and dates; the safety reminder checklist records risk items, handling wording, and versions; the accommodation contact sheet records accommodation names, contacts, addresses, and receipt signatures. When these three types of materials enter this feature, each serves as a retrievable knowledge base source: the courseware provides the training basis, the checklist provides the safety wording, and the contact sheet provides accommodation and contact fields. The update rhythm follows batches: the courseware is revised with the semester, the checklist is adjusted with risk reminders, and the contact sheet is updated with accommodation confirmations. Field characteristics center on names, quantities, dates, version numbers, and signature fields, and the same record must be able to match the original text across multiple materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "basis items that can point back to the original text" are completed afterward by subsequent AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, or generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | Check the training modules, instructors, dates, and version numbers in the courseware, and determine whether they can point back to specific paragraphs | Open the citation markers and compare them against the original courseware text; record the number of citations and the `quoteMaxToken` budget separately |
| Safety reminder checklist | Check the risk items, handling wording, and version dates in the checklist, and determine whether they are consistent with the current version | View the citation array in `responseData` (non-streaming module results returned with detailed output enabled) during the conversation, and compare each item against the original checklist text and version number |
| Accommodation contact sheet | Check the accommodation names, contacts, addresses, quantities, and receipt signatures, and determine whether the same record matches other materials | Expand `quoteList` to view the source identifier, and compare it against the original contact sheet text and signature field |
| Cross-material basis question | Determine whether the answer provides a traceable source, and do not settle for only a conclusion | Run a test with a cross-material question and see whether the citation array points to the corresponding material paragraphs |

## Three common errors

- Phenomenon: the same accommodation record does not match in name and quantity between the contact sheet and the courseware. Cause: the two materials are updated separately, and no field comparison was performed.
- Phenomenon: the safety reminder checklist version is not synchronized, and the answer cites old items. Cause: the old version in the knowledge base was not removed, and retrieval hit the old material.
- Phenomenon: the accommodation contact sheet lacks a signature or receipt, and the cited snippet cannot point back to the complete record. Cause: the signature field was not completed when the material was archived.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a cross-material basis question, and see whether the answer provides a traceable source.

- In the node, check whether the selected knowledge base uses the same vector model, and check the values in the search parameter panel item by item.
- Run a test with a question that has no matching material, confirm that the citation array is empty while the output pipeline continues, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
