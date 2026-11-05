---
title: Multi-Turn Conversation and Prompts for Research Ethics Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c062-f005
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Conversation | Multilingual
meta_description: Research Ethics: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Ethics Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the research ethics review scenario, the category materials that enter the multilingual materials and terminology handling stage include ethics review applications, informed consent form templates, and risk assessment forms. These materials come from scattered sources: applications are filled in by researchers, consent form templates are uniformly maintained by the institutional ethics committee, and risk assessment forms are updated on a rolling basis as the project progresses, with the update cadence often tied to version numbers and effective dates. Field characteristics are concentrated in subject names, sample quantities, event dates, and signature and receipt columns, and the same record needs to be cross-referenced across multiple materials. When the materials enter this feature, the ethics review application takes on the role of the main thread, the informed consent form template takes on the role of translation-name cross-reference, and the risk assessment form takes on the role of cross-verification; together, the three support the generation of a unified terminology glossary and a comparison draft.

## Configuration and implementation checks

This step is executed by the memory turn count and prompt configuration in the app settings, which output the range of historical messages referenced and the answer constraints. The unified terminology glossary and comparison draft are then completed by the model, while the external entry point and authorization are handled by the publishing service and file permissions. The memory turn count controls how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Subject names, sample quantities, event dates, and signature columns must correspond item by item with the consent form template | In the app settings, check the current memory turn count value, run a trial with two consecutive question turns, and check whether the second turn can refer back to the fields mentioned in the first turn; compare against the historical range in `messages` to confirm whether the reference falls within valid turns |
| Informed consent form template | The same term is written consistently throughout, the translation name can refer back to the source text, and the version number and effective date are synchronized | Sample three terms and check whether their spelling is consistent throughout, and check for places in the template where the version is not synchronized; compare the fields recorded in `variables` item by item with the template body to confirm there are no missing signatures or receipts |
| Risk assessment form | When the name, quantity, or date of the same record does not match between the application and the risk form, it must be flagged | Compare the usage records of two runs to confirm that usage changes accordingly after the turn count is adjusted; check whether the name, quantity, and date in the risk form and the application in the session corresponding to `chatId` are consistent |
| Unified terminology glossary and comparison draft | Terminology entries can refer back to the source text, and the translation names are written consistently throughout | Sample three terms and check whether their spelling is consistent throughout, and confirm that each translation name in the comparison draft can refer back to its position in the source text |

## Three common errors

- Phenomenon: The same subject name is written differently in the ethics review application and the informed consent form template. Cause: The multilingual materials do not use a unified terminology glossary, and the translation names do not refer back to the source text, causing the two materials to fail to match.
- Phenomenon: The sample quantities and event dates in the risk assessment form and the application do not match. Cause: The versions are not synchronized, old-version materials are still in circulation, and the fields are not updated with the effective date.
- Phenomenon: The informed consent form template is missing signatures or receipts, yet the review application shows they have been received. Cause: Receipts are not archived in sync with the version, and the signature columns are not linked to the publishing service permissions.

## How to verify the setup

Feature acceptance: Run a trial with two consecutive follow-up questions, where the first question mentions a certain term and field, and the second question uses a reference to carry it forward; see whether the second question carries forward the reference from the first question, and check whether the range of historical messages referenced in `messages` matches.

Business test: Sample three terms and check whether their spelling is consistent throughout, confirm that the translation names can refer back to the source text, and check the names, quantities, dates, and signature receipts among the application, consent form template, and risk assessment form.

- In the app settings, check the current memory turn count value and match it with the range of preceding text required by the question; after adjusting, compare the usage records of two runs.
- Run a trial with two consecutive question turns, confirm that the second turn correctly carries forward the reference from the first turn, and check that the opening message is not treated as preceding text.
