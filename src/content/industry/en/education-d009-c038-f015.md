---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Multilingual
meta_description: Continuing Education: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data involves three types of materials: course filing forms, study certificates, and credit recognition forms, which often contain multilingual course names and terminology. The course filing form records the course name, number of credit hours, course start date, and the signature of the person in charge; the study certificate records the learner's name, course name, completion date, and the institution's seal; the credit recognition form summarizes the course name, recognized credit hours, recognition date, and review signature. Materials are updated by batch, and terminology is adjusted along with the course catalog and recognition criteria. When entering knowledge base retrieval, the three types of materials serve as candidate fragment sources, each providing field and date clues for subsequent nodes or manual comparison of terminology wording and record consistency.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "unified terminology glossary and comparison draft" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Course name, number of credit hours, course start date, and signature are complete | In the search test, use synonymous questions to retrieve the course name, check the candidate fragments and scores, and record `searchMode` and `similarity` |
| Study certificate | Learner's name, course name, completion date, and seal are consistent | Retrieve the same course name, check whether the name and date on the study certificate and the filing form match, and record the number of candidates and scores |
| Credit recognition form | Recognized credit hours, recognition date, and review signature can be traced back to the original text | Retrieve questions related to recognized credit hours, compare the top few rankings before and after enabling `usingReRank`, and check the tokens of the cited text after `limit` trimming |
| Unified terminology glossary and comparison draft | The same term is consistent throughout the entire document, and the translated name can be traced back to the original text | Sample three terms and check whether their wording is consistent throughout the entire document, and check whether the candidate fragments retain the key fragments of the original text |

## Three common errors

- Phenomenon: The name or date of the same course does not match between two materials. Cause: Versions are not synchronized, and an old course filing form is mixed with a new study certificate.
- Phenomenon: The credit recognition form lacks a review signature or receipt. Cause: The signature was not completed during the material circulation step, and retrieval only returns candidate fragments and does not add the signature.
- Phenomenon: The same question cannot be recalled when rephrased. Cause: The retrieval mode does not match the material form, or the similarity filter and citation limit trimming are too tight.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results.

Business test: sample three terms and check whether their wording is consistent throughout the entire document.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across the semantic, full-text, and hybrid modes.
- Compare the order of the top few results before and after enabling `usingReRank`, and check the tokens of the cited text after `limit` trimming; record the number of array items separately.
