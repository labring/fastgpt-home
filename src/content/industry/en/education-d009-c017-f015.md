---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Multilingual
meta_description: Undergraduate Programs: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. Sources are the university's academic affairs office, departments, and expert groups. The update cadence follows the application, review, and publication milestones. Fields include program name, code, degree-granting category, length of study, course credits, review date, and signature fields. Multilingual materials and terminology processing require that the same term be consistent throughout the entire document and that translated names can refer back to the source text. The three types of materials play different roles when entering knowledge base retrieval and recall: the program setup application form provides basic fields such as program name and code, the talent cultivation plan provides the course system and credit structure, and the expert review opinions provide review conclusions and signature information. Within the materials, the name, quantity, and date of the same record must be aligned across materials, versions must be synchronized, and signatures and receipts must be complete; otherwise, the unified terminology glossary and the comparison draft will suffer broken back-references at the time of external publication.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The unified terminology glossary and comparison draft are then completed by subsequent nodes or manually. Retrieval only provides candidates and cited content; it does not produce statistical tables, business documents, or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the name, code, degree-granting category, length of study, date, and signature fields are aligned item by item with the talent cultivation plan and expert review opinions | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, test once each with different phrasings of the same term, and record the number of candidate entries and the score |
| Talent cultivation plan | Whether the course names, credits, total class hours, and semester offered are consistent with the quantities and dates in the application form and review opinions | Turn `usingReRank` on and off to compare the ranking of the top few entries, and check whether the returned candidates include both semantic and full-text results |
| Expert review opinions | Whether the review conclusions, expert signatures, and receipt dates match the records in the application form and cultivation plan, and whether the versions are synchronized | Adjust the `similarity` threshold to observe the number of cited entries and content completeness after trimming, and confirm that key passages have not been trimmed away |
| Unified terminology glossary and comparison draft | Whether the same term is written consistently throughout the entire document and whether translated names can refer back to the source text | Sample three terms to check whether their writing is consistent throughout the entire document, and check the tokens and array entry count of the cited text and record them separately |

## Three common errors

- Symptom: The same program name is written differently in the application form and the cultivation plan. Cause: The versions of the two materials are not synchronized, the terminology glossary was not unified first, and retrieval candidates each take a different version.
- Symptom: The course quantity or review date does not match between the two materials. Cause: After modification, only one material was updated while the other remained an old draft, and both versions are hit simultaneously during recall.
- Symptom: The expert review opinions lack signatures or receipts. Cause: The material circulation step was not closed-loop; although retrieval returns candidate snippets, a comparison draft for external publication cannot be generated from them.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten question sentences, compare the number of candidate entries and the score, then turn re-ranking on and off to observe the ranking of the top few entries.

Business test: sample three terms to check whether their writing is consistent throughout the entire document.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, test once each with different phrasings of the same term, and record the number of candidate entries and the score.
- Turn `usingReRank` on and off to compare the ranking of the top few entries, and adjust the `similarity` threshold to observe the number of cited entries and content completeness after trimming.
