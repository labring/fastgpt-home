---
title: Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f005
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Conversation | Access
meta_description: Student Mental Health: review conversation for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, and the materials come from three types: psychological screening plans, interview records, and referral forms. The psychological screening plan provides the screening dimensions, scale names, administration dates, and the signature of the person in charge; the interview record carries the interview time, participants, observation points, and follow-up recommendations; the referral form records the referral target, referral reason, receiving party, and receipt signature. When these three types of materials enter the multi-turn dialogue and prompt features, the screening plan serves as the background constraint, the interview record serves as the basis for follow-up questions, and the referral form serves as the result evidence for external services. The update cadence is per semester or event-triggered, and the field characteristics are concentrated in four categories: names, quantities, dates, and signatures. After the materials enter this feature, their roles differ: the screening plan constrains the answer scope, the interview record supports continuous follow-up questions, and the referral form determines the visible scope of the external entry point.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. The externally available entry point and authorization scope must then be handled by the model, while the published service and file permissions handle identity and file authentication. The memory turns control how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the prior context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the screening dimensions, scale names, administration dates, and signatures are consistent with the interview record | Check the current memory turns value in the application settings, run a trial with two consecutive questions, and compare the names and dates in the plan and the interview record |
| Interview record | Whether the interview time, participants, observation points, and follow-up recommendations align with the referral form | Access once with a restricted identity, check whether the referral form receipt signature is complete, and verify the correspondence between `chatId` and `messages` |
| Referral form | Whether the referral target, referral reason, receiving party, and receipt signature are synchronized with the screening plan | Check the prompt constraints in the application settings, confirm that the `variables` values are consistent with the referral form fields, and check whether the version is synchronized |
| Multi-turn dialogue record | Whether the second-round follow-up question correctly inherits the reference from the first round | Run a trial with two consecutive questions, see whether the second question answers about the same object, and compare the usage records of the two runs |

## Three common errors

- Phenomenon: The names and dates of the same record do not match between the screening plan and the interview record. Cause: The two materials are maintained separately, versions are not synchronized, and there is no unified verification step.
- Phenomenon: The referral form lacks a signature or receipt, and the external service cannot confirm receipt. Cause: The referral process is not closed-loop, the receipt is not collected, and the signature field is left blank.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and responses become slower with increased consumption. Cause: The memory turns value is too large and brings in irrelevant content, and the opening message is treated as prior context.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions, see whether the second question inherits the reference from the first question, and verify the values of the three identifiers `chatId`, `messages`, and `variables` and the output constraints.

Business test: Access once with a restricted identity, see whether the visible scope matches the setting, and ensure unauthorized content is not visible.

- Check the current memory turns value in the application settings and match it with the prior context range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that usage changes accordingly after adjusting the turns.
