---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Multilingual
meta_description: National R&D Grants: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The sources are the formal texts and accompanying attachments submitted by each participating unit, and the update cadence advances with application rounds, budget adjustments, and agreement signing milestones. When the materials enter the knowledge base retrieval and recall function, the project application form plays the leading role for research content, indicators, and terminology definitions; the budget application form plays the cross-reference role for funding categories, calculation bases, and quantitative calibers; and the cooperation agreement plays the verification role for partner names, task division, dates, and signed receipts. Field characteristics center on project name, project number, undertaking unit, principal investigator, start and end dates, funding amounts, terminology translations, and parallel wording. The same record appears repeatedly across multiple materials, so it is necessary to locate the original text fragments through retrieval candidates and similarity scores, and then use them to form a unified terminology table and parallel text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, re-rank, filter, and upper-limit truncation). The "unified terminology table and parallel text" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The project name, project number, principal investigator, and start and end dates are written consistently across multilingual versions and the parallel text, and the translated names can refer back to the original text | In the knowledge base search test, search once each using different expressions of the same term, record the number of candidates and scores, and check whether the returned fragments cover the key sentences of the original text |
| Budget application form | The funding categories, quantities, and calculation dates match the same record in the project application form, the versions are synchronized, and no signatures or receipts are missing | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates include both semantic and full-text results, and check the tokens and array counts of the cited text one by one |
| Cooperation agreement | The partner names, task division, and signing dates are consistent with the other two materials, and the receipts are complete | Compare the order of the top few items before and after enabling `usingReRank`, and confirm that the candidates ranked earlier after re-ranking can still refer back to the corresponding paragraphs of the original text |
| Unified terminology table and parallel text | The same term is written consistently throughout, the translated names can refer back to the original text, and three terms are sampled to check whether the wording is consistent throughout | Adjust `similarity` and `limit` to observe changes in candidates, and record the key original text fragments retained after similarity filtering and citation upper-limit truncation |

## Three common errors

- Symptom: the same project name is written differently in the project application form and the cooperation agreement. Cause: the versions of the two materials are not synchronized, and the retrieval candidates do not cover the latest signed draft, resulting in terminology table term selection bias.
- Symptom: the funding amounts and start and end dates in the budget application form and the project application form do not match. Cause: the quantity and date fields of the same record are updated separately in the two materials, lacking cross-material consistency checks.
- Symptom: the cooperation agreement lacks signatures or receipts, yet the terminology parallel text has already entered the external release process. Cause: retrieval only returns candidate fragments and similarity scores, without verifying signing status and receipt completeness.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking to inspect the order of the top few items; at the same time switch `searchMode`, adjust `similarity` and `limit`, record the number of candidates and scores, and record the citation count separately according to array length.

Business testing: sample three terms to check whether the wording is consistent throughout, verify whether the translated names can refer back to the original text, and compare the fields, dates, and signatures of the project application form, budget application form, and cooperation agreement.

- In the knowledge base search test, search once each using different expressions of the same term, record the number of candidates and scores, and confirm that the returned fragments can refer back to the key sentences of the original text.
- Switch `searchMode` and toggle `usingReRank`, compare the order of the top few items before and after enabling re-ranking, and check whether the candidates include both semantic and full-text results.
