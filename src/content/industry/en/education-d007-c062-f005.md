---
title: Multi-Turn Conversation and Prompts for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f005
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Conversation | Review
meta_description: Research Ethics: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

In the research ethics review scenario, the category materials include ethics review applications, informed consent form templates, and risk assessment forms. The ethics review application records the research project name, researcher, review date, and signature field; the informed consent form template carries the participant notification content, version number, and receipt signature; the risk assessment form lists the risk level, quantity, and assessment date. The three types of materials enter by project batch, and the update cadence follows protocol revisions and annual re-review. When entering the multi-turn dialogue feature, the ethics review application serves as the main thread to locate the project, while the informed consent form template and risk assessment form serve as cross-check bases, respectively providing the participant notification version and risk quantity, to trace whether the name, quantity, date, and signature of the same record are consistent across different materials.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The anomaly list and review conclusions are then completed by the model, and the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The project name, review date, and signature field must be aligned item by item with the informed consent form template and risk assessment form | Check the memory turns in the application settings, use two consecutive follow-up questions to confirm the preceding reference; compare the project name, date, and signature in `chatId` and `messages` |
| Informed consent form template | The version number and receipt signature must be synchronized with the ethics review application and risk assessment form | Check the template version number and receipt signature, and inspect whether historical turns in `messages` carry in an old version |
| Risk assessment form | The risk quantity and assessment date must be consistent with the ethics review application and informed consent form template | Check the risk quantity and assessment date, use `variables` to record field differences and trace back to the original materials |

## Three common errors

- Symptom: The name and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The materials are updated separately by project, and cross-comparison is not performed before entering review.
- Symptom: The informed consent form template version is not synchronized, and the receipt signature is missing. Cause: After the version update, the review application was not re-associated, and the signature field was not backfilled with the version.
- Symptom: During consecutive follow-up questions, the second question uses a reference but answers off-topic, increasing consumption. Cause: The memory turns are too large and bring in irrelevant content, or too small and cannot use the preceding text.

## How to verify the setup

Acceptance for this feature: ask two consecutive follow-up questions, see whether the second question inherits the reference from the first question, and check the referenced historical message range and answer constraints in the output.

Business test: create an anomaly record, see whether it can be traced to the source material, and confirm that the name, quantity, date, and signature are traceable.

- In the application settings, check the current memory turns value and match it with the preceding text range required by the question.
- Run a trial with two consecutive question sentences, compare the usage records of the two runs, and confirm that consumption changes accordingly after adjusting the turns.
