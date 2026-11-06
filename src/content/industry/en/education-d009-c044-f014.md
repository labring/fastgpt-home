---
title: Model Integration and Configuration for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c044-f014
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Model Setup | Multilingual
meta_description: Training Schedules: review model setup for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the scenario of course scheduling and course consumption in training institutions, materials include class schedules, course consumption records, course adjustment applications, as well as multilingual glossaries and comparison drafts. Class schedule fields include course name, class, teacher, classroom, week number, period, start and end dates, signature; course consumption records include student, course, consumption date, number of class hours, teacher confirmation, receipt; course adjustment applications include original session, target session, application date, approval signature. During multilingual materials and terminology processing, terminology and field names are first extracted from class schedules and course consumption records, and approval and date expressions are supplemented from course adjustment applications, forming a unified glossary and comparison draft. The update rhythm follows semesters and course adjustment batches, and the field characteristics are many dates, many signatures, and the same record appearing across materials. When materials enter model integration and configuration, class schedules, course consumption records, and course adjustment applications serve as corpus for retrieval and dialogue, while the glossary and comparison draft serve as generation references. The model is only responsible for binding relationships and channel responses, and does not sign or approve on behalf of others.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. The "unified glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work. Models are divided into five categories: language, indexing, reranking, speech synthesis, and speech recognition, and different stages bind different model types.

| Object | Check | Verification action |
| --- | --- | --- |
| Model type | Corresponds to the stage to be used; the indexing stage must use an indexing model, and the reranking stage must use a reranking model | Check the type label in the model configuration and compare it with the model name returned by the channel |
| Channel and key | Consistent with the connected service, and the key source is traceable | Check the channel configuration and key source, and confirm that authentication passes |
| Model identifier | Consistent with the name listed in the documentation, and the answer style after switching is traceable | Compare with the model name returned by the channel, and record `maxContext`, `maxTokens`, `toolChoice` |
| Class schedules, course consumption records, course adjustment applications | The name, quantity, and date of the same record match across the two materials, versions are synchronized, and signatures and receipts are complete | Sample three terms and check whether their spelling is consistent throughout the document, and verify dates, number of class hours, and signature fields |

## Three common errors

- Phenomenon: The course name and number of class hours for the same student do not match between the class schedule and the course consumption record. Cause: The two materials each maintain their own terminology and do not use the unified glossary and comparison draft.
- Phenomenon: The target session in the course adjustment application is inconsistent with the period and date in the class schedule. Cause: Versions are not synchronized, and the old class schedule is still hit by retrieval.
- Phenomenon: The course consumption record lacks teacher confirmation or a receipt. Cause: Signatures and receipts are not included in the material field verification, and retrieval only takes the main text.

## How to verify the setup

Acceptance for this feature: run one dialogue and one retrieval, check the model identifier in the response, confirm that the indexing stage uses an indexing model and the reranking stage uses a reranking model, and record the tokens of the quoted text corresponding to `quoteMaxToken`; record the number of array items separately.

Business test: sample three terms and check whether their spelling is consistent throughout the document, and whether the translated names can refer back to the original text.

- Check the channel configuration and key source, confirm that authentication passes, and compare the model name returned by the channel with the name listed in the documentation
- Check the type labels in the model configuration, and confirm that the five categories—language, indexing, reranking, speech synthesis, and speech recognition—are each in their proper place
