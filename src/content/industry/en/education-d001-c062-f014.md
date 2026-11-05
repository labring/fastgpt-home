---
title: Model Integration and Configuration for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f014
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Model Setup | Evidence
meta_description: Research Ethics: review model setup for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

This category's data for research ethics review includes ethics review applications, informed consent form templates, and risk assessment forms. The source is the archiving of this park's ethics committee, and the update cadence is synchronized with versions after acceptance. Field characteristics cover applicant, project name, review date, risk level, signature, and receipt. When entering the model access and configuration function, the ethics review application serves as the primary basis record, the informed consent form template serves as the attachment reference, and the risk assessment form serves as the source for risk determination; together, the three support basis entries that can be traced back to the original text, for item-by-item citation when replying to parents or writing into a plan. Material versions are based on the current archive, and fields and signatures must be matched item by item.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. The basis entries that can be traced back to the original text are completed subsequently by AI nodes, code nodes, or manual work. Dialogue and retrieval use this model; the retrieval step is bound to the index model, the reranking step is bound to the rerank model, and the voice step is bound to speech synthesis and speech recognition.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include applicant, project name, review date, signature, and receipt; determine whether its name, quantity, and date are consistent with those of the informed consent form template | In the model configuration, check the type annotation, compare it with the model name returned by the channel, and check the `maxContext` and `quoteMaxToken` budgets |
| Informed consent form template | Fields include version number, signing date, signature, and receipt; determine whether its version is synchronized with that of the ethics review application | Check the channel configuration and key source, and check the values of `maxTokens` and `toolChoice` |
| Risk assessment form | Fields include risk level, assessment date, signature, and receipt; determine whether its risk level and date match those of the ethics review application | Compare with the model name returned by the channel, and check the upper limits of `maxContext` and `maxTokens` |
| Model type | Corresponds to the step to be used; determine whether the type annotation matches | In the model configuration, check the type annotation, and compare it with the model name returned by the channel |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials were not archived in synchronization with the current version, and the fields were not checked item by item.
- Symptom: The risk assessment form lacks a signature or receipt but is still cited as a basis entry. Cause: The signature and receipt fields were not checked before the material entered retrieval, and the version was not synchronized.
- Symptom: Retrieval reports an index model-related error, or the answer style changes abruptly after switching models. Cause: The model type is inconsistent with the step binding, and the model name returned by the channel is inconsistent with the name listed in the documentation.

## How to verify the setup

This function's acceptance: run one dialogue and one retrieval, check the model identifier in the response, confirm that the language model and the index model are respectively bound to the corresponding steps, and check the values of `maxContext`, `maxTokens`, and `quoteMaxToken`.

Business test: ask a basis question that spans materials, and see whether the answer gives a citable source that traces back to the original text entries of the ethics review application, informed consent form template, or risk assessment form.

- In the model configuration, check the type annotation, compare it with the model name returned by the channel, and confirm that the five types of models—language, index, rerank, speech synthesis, and speech recognition—are respectively bound to the corresponding steps.
- Check the channel configuration and key source, and compare item by item the name, quantity, date, signature, and receipt of the ethics review application, informed consent form template, and risk assessment form, with the version based on the current archive.
