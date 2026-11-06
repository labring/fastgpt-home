---
title: Model Integration and Configuration for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f014
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Model Setup | Handover
meta_description: Research Ethics: review model setup for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the research ethics review scenario, material drafting and responsibility handover revolve around three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Application materials contain fields such as research purpose, subject rights and interests, and risk-benefit analysis; informed consent form templates contain fields such as research procedures, compensation methods, withdrawal mechanisms, and contact information; risk assessment forms contain fields such as risk level, handling measures, and reviewer opinions. When these three types of materials enter the model access and configuration stage, their roles differ: applications and risk assessment forms serve as drafts to be drafted and to be verified, while informed consent form templates serve as reusable text skeletons, with dialogue and retrieval using bound models to complete draft generation and field comparison. Material sources are the institutional ethics committee template library and historical review records, and the update cadence keeps pace with regulatory revisions and project changes. Field characteristics require names, quantities, dates, versions, signatures, and receipts to correspond item by item.

## Configuration and implementation checks

This stage is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. Signable material drafts and handover records are completed subsequently by AI nodes, code nodes, or humans. Whether draft fields are complete, whether responsible persons are clear, and whether versions and dates are consistent depends on how subsequent dialogue and retrieval stages read and compare the materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Research name, number of subjects, review date, version number, and signature field must correspond item by item with the risk assessment form | Compare the two materials to verify name, quantity, and date, and check whether the version number and signature receipt are synchronized |
| Informed consent form template | The research procedures, compensation methods, and withdrawal mechanisms in the template are consistent with the descriptions in the application materials | Extract template fields and compare them with the application materials, and verify contact information and version date |
| Risk assessment form | Risk level, handling measures, reviewer signature, and receipt are complete | Verify that the risk level is consistent with the application materials, and check the reviewer signature and receipt date |
| Model type and binding relationship | The five model types—language, indexing, reranking, speech synthesis, and speech recognition—correspond to the stages in which they are used | Check the type labels in the model configuration, and run one dialogue and one retrieval to verify the model identifiers in the responses |

## Three common errors

- Symptom: The same number of subjects does not match between the application and the risk assessment form. Cause: The two materials were drafted separately, the quantity field was not cross-verified, and the versions were not synchronized.
- Symptom: The version of the informed consent form template is inconsistent with the version of the application materials. Cause: After the template was updated, it was not written back to the application materials, and the handover record lacks the version number and date.
- Symptom: The handover record lacks the reviewer signature or receipt. Cause: Responsibility handover was not signed off item by item according to the template, and missing items were not blocked before entering the next stage.

## How to verify the setup

Acceptance for this feature: run one dialogue and one retrieval, verify that the model identifiers in the responses are consistent with those returned by the channel, and verify whether the values of `maxContext`, `maxTokens`, and `quoteMaxToken` conform to the configuration.

Business test: draft one document according to the template and complete one handover, and see whether missing items are blocked.

- In the model configuration, verify the model type labels and the model names returned by the channel, and confirm that language, indexing, reranking, speech synthesis, and speech recognition are each bound to the corresponding stage.
- Verify item by item according to the template the names, quantities, dates, versions, signatures, and receipts of the ethics review application, informed consent form template, and risk assessment form; missing items must not proceed to the next stage.
