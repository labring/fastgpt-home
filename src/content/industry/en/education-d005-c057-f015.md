---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Versions
meta_description: National R&D Grants: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

The category materials for National Key R&D Program project applications include the project application form, budget application form, cooperation agreement, and the accompanying signature pages and receipts. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the subject amounts, calculation basis, and annual disbursement; the cooperation agreement carries the division of labor among participating units, intellectual property ownership, and stamped signatures. These materials come from different sources and follow different revision rhythms: the application form undergoes multiple rounds of revision with the guidelines and review comments, the budget form changes with subject adjustments and financial evaluation comments, and the cooperation agreement is updated with the addition or removal of participating units and clause negotiations. Field characteristics center on names, quantities, dates, signatures, and version numbers. When the materials enter the knowledge base retrieval and recall function, the project application form and budget application form serve as the main sources for semantic and full-text recall, while the cooperation agreement and signature receipts serve as associated verification objects, jointly supporting the generation of the version ledger and change records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The names and quantities of research objectives, task breakdown, and assessment indicators must be aligned item by item with the budget application form and cooperation agreement | In the knowledge base search test, search by material name, check the names, quantities, and dates in the candidate chunks, record the number of candidates and similarity scores, and confirm that the current version is unique |
| Budget application form | Subject amounts, calculation basis, and annual disbursement dates must be consistent with the corresponding records in the project application form and cooperation agreement | Switch `searchMode` to semantic, full-text, or hybrid and compare candidate results; check date and quantity fields, and trace old versions via version numbers |
| Cooperation agreement | The division of labor among participating units, intellectual property ownership, stamped signatures, and receipts must be consistent with the application materials | Compare the ranking of the top few results before and after enabling `usingReRank`, check whether signature pages and receipts are recalled; use `similarity` and `limit` to observe the number of candidates after filtering and trimming |
| Version ledger | The current version is unique, old versions are traceable, and references are synchronized | After changing one piece of content, search and check whether the version number and references are updated synchronously; record the number of references by array length, and check the reference text tokens separately |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: The two materials were revised separately, without cross-checking and version synchronization.
- Symptom: The cooperation agreement has been updated, but the knowledge base still recalls the old clauses. Cause: The version was not synchronized, the old version was not marked invalid, and references were not updated with the content.
- Symptom: Signature pages or receipts are missing, but the retrieval candidates still show related paragraphs. Cause: The candidate and reference content are not authorization results, and missing signatures require manual verification.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ranking of the top few results.

Business test: change one piece of content and see whether the version number and references are updated synchronously.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and similarity scores across semantic, full-text, and hybrid modes.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and use `similarity` and `limit` to check the number of candidates after filtering and trimming.
