---
title: Model Integration and Configuration for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f014
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Model Setup | Evidence
meta_description: National R&D Grants: review model setup for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

National Key R&D Program project application materials include three types: the project application form, the budget application form, and the cooperation agreement. The sources are formal texts submitted by the applicant unit and collaborating parties, and the update cadence is synchronized with application rounds and correction notices. Field characteristics center on names, quantities, dates, signatures, and receipts. When the three types of materials enter the model access and configuration stage, their roles differ: the project application form provides the task and indicator definitions, the budget application form provides the funding and budget category definitions, and the cooperation agreement provides the division of labor and seal definitions. Basis query requires aligning the fields of the same record across the three materials to form basis entries that can be traced back to the original text, for replying to parents or writing into a proposal. The material version is based on the currently effective version, and historical versions are for comparison only.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. Basis entries that can be traced back to the original text are completed subsequently by AI nodes, code nodes, or manual work. Models are divided into five categories: language, indexing, reranking, speech synthesis, and speech recognition, and different steps bind different model types.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Names, quantities, dates, and signatures must be aligned item by item with the budget application form and the cooperation agreement, and the version must be the currently effective version | In the model configuration, check the type annotations, confirm that the language model and the indexing model are bound to the dialogue and retrieval steps respectively, and compare the model names returned by the channel |
| Budget application form | Funding categories, quantities, and dates must be consistent with the project application form and the cooperation agreement; missing signatures or receipts are considered incomplete | Check the channel configuration and key source, confirm that the indexing model is used for text block indexing, and when retrieval reports an indexing-model-related error, recheck the type annotations |
| Cooperation agreement | Collaborating party names, division of labor, and seal dates must be consistent with the two application forms; when the version is not synchronized, the currently effective version prevails | Compare the model names returned by the channel, confirm that the reranking model is used for reranking retrieval results, and record the `quoteMaxToken` budget of the cited text |
| Model binding relationships | The five model categories—language, indexing, reranking, speech synthesis, and speech recognition—correspond to the steps in which they are to be used | In the model configuration, check the type annotations, and confirm that `maxContext`, `maxTokens`, `toolChoice`, and `quoteMaxToken` are set according to the step |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the project application form and the budget application form. Cause: the two materials were modified separately, without field-level alignment.
- Symptom: the cooperation agreement version is not synchronized, and the old division of labor and seal date are cited. Cause: after correction, the currently effective version was not replaced, and retrieval still hits historical text blocks.
- Symptom: retrieval reports an indexing-model-related error or authentication failure. Cause: the indexing model type annotation does not match the step, or the channel key is inconsistent with the accessed service.

## How to verify the setup

Acceptance for this feature: run one dialogue and one retrieval, check the model identifiers in the responses, confirm that the language model and the indexing model are bound to the corresponding steps respectively, and check that `maxContext`, `maxTokens`, `toolChoice`, and `quoteMaxToken` take effect according to the step.

Business test: ask a basis question that spans materials, and see whether the answer provides a traceable source and whether the basis entries can be matched to the original text of the project application form, the budget application form, or the cooperation agreement.

- In the model configuration, check the type annotations, and confirm that the five model categories—language, indexing, reranking, speech synthesis, and speech recognition—correspond to the steps in which they are to be used.
- Check the channel configuration and key source, compare the model names returned by the channel, and confirm that the model identifiers are consistent with the names listed in the documentation.
