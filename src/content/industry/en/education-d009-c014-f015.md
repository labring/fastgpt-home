---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Multilingual
meta_description: Pastoral Education: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the category of school moral education and homeroom teacher work. The materials come from three types of daily documents: thematic class meeting plans, student comprehensive quality records, and home visit records, updated by semester and activity milestones. Thematic class meeting plans contain activity objectives, procedures, dates, and a homeroom teacher signature field; student comprehensive quality records contain fields such as ideological and moral character, academic level, and social practice, along with evaluation dates and multiple signatures; home visit records contain visit time, location, student performance, parent receipt, and teacher signature. When these three types of materials enter knowledge base retrieval and recall, each plays a different role: thematic class meeting plans provide activity terminology and procedural expressions, student comprehensive quality records provide evaluation dimensions and grade wording, and home visit records provide communication scenario wording and receipt fields. Multilingual materials and terminology processing require that the same term be written consistently throughout the entire text and that translated names can refer back to the original text. The retrieval step needs to stably recall these fields and terminology contexts from candidate snippets, so that subsequent nodes or manual work can generate a unified terminology list and comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The unified terminology list and comparison draft are then completed by subsequent nodes or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | The activity name, date, and homeroom teacher signature field are written consistently across the three types of materials, and the translated term can refer back to the original text | In the knowledge base search test, use synonymous questions to retrieve the activity name, check the date and signature fields in the candidate snippets, and record the number of candidates and scores |
| Student comprehensive quality record | Dimension names such as ideological and moral character and academic level, as well as evaluation dates, match between the two materials, and versions are synchronized | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates cover both dimension names and dates, and check the ranking of the top few entries before and after enabling `usingReRank` |
| Home visit record | Visit time, parent receipt, and teacher signature are complete, and the same record name and quantity do not appear in two different written forms | Test once each with synonymous rewritten questions, check the field completeness of the returned candidates, record the number of candidates after filtering by `similarity`, and look separately at the tokens of the quoted text |
| Unified terminology list and comparison draft | The same term is consistent throughout the entire text, the translated name can refer back to the original text, and three terms are sampled to check whether the writing is consistent throughout | Retrieve terms in the search test, check the candidate snippets and scores, and confirm that key original text snippets are still retained after `limit` trimming |

## Three common errors

- Phenomenon: The name and date of the same record do not match between the thematic class meeting plan and the home visit record. Cause: The versions of the two materials are not synchronized, the retrieval candidates only hit one version, and hits and associations were not checked.
- Phenomenon: The student comprehensive quality record lacks a parent receipt or teacher signature. Cause: The signature fields were not completed when the materials were archived, and the candidate snippets returned by retrieval lack the corresponding fields.
- Phenomenon: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the similarity filter settings are inappropriate.

## How to verify the setup

Acceptance for this feature: test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few entries.

Business test: sample three terms to check whether the writing is consistent throughout the entire text.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Check the order of the top few entries before and after enabling `usingReRank`, and check the tokens and array length of the quoted text according to `similarity` and `limit`.
