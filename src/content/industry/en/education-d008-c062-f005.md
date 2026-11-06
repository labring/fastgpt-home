---
title: Multi-Turn Conversation and Prompts for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f005
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Conversation | Access
meta_description: Research Ethics: review conversation for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

In the research ethics review scenario, materials entering the authorized access and external services function mainly fall into three categories. Ethics review applications usually include the project name, researcher, review date, and signature field; informed consent form templates include the version number, template name, applicable project, and receipt field; risk assessment forms include risk items, quantity, assessment date, and signature confirmation. When entering multi-turn dialogue and prompt configuration, these materials each play different roles: applications are used to confirm project identity and review status, templates are used to verify version and signing requirements, and assessment forms are used to compare risk items and dates. Material sources are mostly institutional internal review systems or offline archives that are later entered into the system. The update cadence changes with review batches and template revisions, and field characteristics are mainly names, quantities, dates, signatures, and receipts. If the same record has inconsistent names, quantities, or dates across different materials, or if versions are not synchronized, or signatures and receipts are missing, it will affect the visible scope and judgments during external services.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The externally available entry points and authorization scope are determined by the publishing service and file permissions, and the model only processes filtered materials. The model answers accordingly, while external entry points and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the name, date, and signature are consistent with the informed consent form template | In the application settings, check the current memory turns, run a trial with two consecutive follow-up questions, check whether the second round inherits the references from the first round, and review the records in `messages` and `variables` |
| Informed consent form template | Whether the version number, template name, and receipt are synchronized | Compare the template version and receipt fields, confirm whether the name and date of the same record match between the application and the template, and if necessary record `chatId` for traceability |
| Risk assessment form | Whether the number of risk items, assessment date, and signature are consistent with the application | Compare the number of risk items and the assessment date, check whether signatures and receipts are complete, and confirm that when versions are not synchronized, the latest version prevails |
| Consecutive follow-up records | Whether the second round can correctly inherit the references from the first round | Run a trial with two consecutive follow-up questions, observe whether the answers are off-topic, and compare the usage records of the two runs |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the application and the template. Cause: The same version was not used as the basis during entry, and fields were not cross-checked.
- Phenomenon: The template version is not synchronized, and the old version is still referenced. Cause: After revision, the external entry points and authorization scope were not updated, and historical messages still reference the old content.
- Phenomenon: Signatures or receipts are missing, and the materials are incomplete. Cause: The review process was not closed-loop, and signature and receipt fields were not checked during archiving.

## How to verify the setup

Acceptance for this function: with two consecutive follow-up questions, see whether the second question inherits the references from the first question; at the same time, check the historical range and answer constraints corresponding to the three identifiers `messages`, `variables`, and `chatId`.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- In the application settings, check the current memory turns and confirm that they match the preceding context range required by the question.
- Compare the usage records of two runs and confirm that the consumption change after adjusting the turns is within expectations.
