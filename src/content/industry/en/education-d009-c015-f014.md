---
title: Model Integration and Configuration for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c015-f014
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Model Setup | Multilingual
meta_description: Student Mental Health: review model setup for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the category of primary and secondary school mental health screening and referral. Materials include three types: psychological screening plans, interview records, and referral forms. Fields cover student identifiers, screening dimensions, interview times, referral destinations, dates, and signed receipts. In the multilingual materials and terminology handling scenario, the same term must maintain a consistent translated name across all three material types and must be able to refer back to the original wording. Screening plans provide the scales and determination criteria, interview records carry process descriptions, and referral forms carry conclusions and receiving-party information. When these three enter the model access and configuration stage, they respectively serve as terminology sources, terminology usage contexts, and terminology implementation evidence. Sources are school internal psychological work archives and externally published drafts. The update cadence follows semester screening batches and referral process progress. Field characteristics are four item-by-item comparable categories: names, quantities, dates, and signatures.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. The unified terminology table and comparison draft are completed subsequently by AI nodes, code nodes, or manual work. The model type must correspond to the step in which it will be used.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields include screening dimensions, determination criteria, date, and signature column. The translated name of the same term must be consistent with the wording in interview records and referral forms. | In the model configuration, check the type annotations, confirm that the language model and the index model are respectively bound to the dialogue step and the retrieval step, and compare against the model name returned by the channel. |
| Interview record | Fields include interview time, recorder, and original term wording. The name and date in the same record must match those in the screening plan and referral form. | Check the channel configuration and key source, confirm that the index model used for retrieval is available, and check whether the `maxContext` and `maxTokens` settings cover the record length. |
| Referral form | Fields include referral destination, receiving party, receipt, and signature. The translated term name must be able to refer back to the original text, and quantities and dates must not conflict with the other two materials. | Compare against the model name returned by the channel to verify the model identifier, confirm that the rerank model is used to optimize retrieval ranking, check the tokens of quoted text against `quoteMaxToken`, and record the array item count separately. |
| Unified terminology table and comparison draft | The same term is written consistently throughout, the translated name can refer back to the original text, and three terms are sampled to check whether they are consistent throughout. | Run one dialogue and one retrieval, check the model identifier in the response, and confirm that the `toolChoice`-related configuration has not mistakenly changed the answer style. |

## Three common errors

- Symptom: The name and date of the same record do not match between the interview record and the referral form. Cause: The two materials' versions were not synchronized, and the terminology table was not updated with the screening batch.
- Symptom: The referral form lacks a signature or receipt, yet the externally published draft still includes that entry. Cause: Field completeness was not checked before the material entered retrieval, and an empty signature column was still indexed.
- Symptom: Retrieval reports an index-model-related error, or the answer style changes abruptly after switching models. Cause: The index model was not bound to the retrieval step, and the model identifier is inconsistent with the model name returned by the channel.

## How to verify the setup

Acceptance for this feature: run one dialogue and one retrieval, check the model identifier in the response, and confirm that `maxContext`, `maxTokens`, `quoteMaxToken`, and `toolChoice` are consistent with the channel response

Business test: sample three terms and check whether their wording is consistent throughout

- In the model configuration, check the type annotations and confirm that the language model, index model, and rerank model are respectively bound to the dialogue, retrieval, and rerank steps
- Check the channel configuration and key source, compare against the model name returned by the channel to confirm the model identifier, and check that the tokens of quoted text and the array item count are recorded separately
