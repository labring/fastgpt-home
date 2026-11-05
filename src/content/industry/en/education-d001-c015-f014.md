---
title: Model Integration and Configuration for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f014
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Model Setup | Evidence
meta_description: Student Mental Health: review model setup for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This page addresses primary and secondary school mental health screening and referral scenarios; the materials include three types: psychological screening plans, interview records, and referral forms. A psychological screening plan contains the screening tool, schedule, organizational process, and result-handling criteria; an interview record contains the student's basic information, interview date, interviewer, observations and self-report, and preliminary judgment; a referral form contains the referral subject, referral reason, receiving party, receipt, and signature. When these three types of materials enter the model access and configuration stage, the screening plan serves as the source of basis, the interview record serves as process evidence, and the referral form serves as the destination voucher, each taking on a citation role in retrieval and dialogue. The material update cadence changes with semesters and screening rounds, and versions must stay in sync with the current plan. Field characteristics center on names, quantities, dates, signatures, and receipts; during cross-material verification, the name, quantity, or date of the same record in different materials can easily fail to match.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, which outputs model binding relationships and channel responses. Basis entries that can be traced back to the original text are completed afterward by subsequent AI nodes, code nodes, or manual work. Models fall into five categories: language, indexing, reranking, speech synthesis, and speech recognition. Different steps bind different model types, and the retrieval step requires checking the indexing model type label.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening tool, schedule, organizational process, and result-handling criteria must be consistent with the current version, and entries must be traceable back to the original plan text | Check whether the plan version date is in sync with the current plan, and check whether the screening tool name is consistent with the names in the interview records and referral forms; confirm that entries can be traced back to the original paragraphs |
| Interview record | The student's basic information, interview date, interviewer, observations and self-report, and preliminary judgment must correspond to the screening plan and referral form, and signatures and dates must be complete | Check whether the interview date matches the screening plan schedule, and whether the interviewer's signature and the receiving party's signature on the referral form are complete; check whether the quantity of the same record is consistent between the plan and the record |
| Referral form | The referral subject, referral reason, receiving party, receipt, and signature must correspond to the interview record and screening plan, and the receipt must be traceable | Check whether the referral subject's name is consistent with the interview record, and whether the referral reason corresponds to the screening plan's handling criteria; check whether the receipt and signature are missing, and whether the version is in sync with the current plan |
| Model configuration | The model type corresponds to the step in which it is used, the channel and key are consistent with the service being accessed, and the model identifier is consistent with the name listed in the documentation | In the model configuration, check the type label, check the channel configuration and key source, and compare against the model name returned by the channel; when retrieval reports an indexing-model-related error, check the indexing model binding; when authentication fails, check the channel key; when the answer style changes abruptly after switching models, check the model identifier |

## Three common errors

- Symptom: the name or quantity of the same student does not match between the screening plan and the interview record. Cause: the two materials are entered in different steps, and names and quantities were not cross-checked across materials.
- Symptom: the referral form lacks the receiving party's signature or receipt. Cause: the referral process did not sync the receipt requirements, and the signature and receipt fields were not included in verification.
- Symptom: the screening plan version is not in sync, and the old tool name still appears in the interview record. Cause: after the version update, the citation source was not replaced in sync, and entries cannot be traced back to the current original text.

## How to verify the setup

This feature's acceptance: run one dialogue and one retrieval, and check the model identifier in the response; check whether the indexing model type label corresponds to the retrieval step, and confirm the configuration of `maxContext`, `maxTokens`, and `quoteMaxToken` in the citation content budget; the number of cited entries is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; check the tokens of the cited text, and record the array entry count separately.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the original-text name, quantity, date, and signature pointed to by the source are consistent with the current materials.

- Check the names, quantities, dates, and signatures in the three materials: the psychological screening plan, the interview record, and the referral form; mark inconsistent items and trace them back to the original paragraphs.
- In the model configuration, check the model type label, channel and key source, and model identifier, and confirm that the retrieval step is bound to the indexing model type.
