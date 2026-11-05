---
title: Multi-Turn Conversation and Prompts for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f005
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Conversation | Handover
meta_description: Degree Certificates: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The data for this category looks like this. Degree conferral and certificate information reporting involves three core types of materials: the degree application form, the thesis review form, and the defense resolution. The degree application form is filled out jointly by the student and the supervisor, with fields including student ID, major, thesis title, supervisor's comments, and signature; the thesis review form is issued by review experts, with fields including review conclusion, score, date, and expert signature; the defense resolution is formed by the defense committee, with fields including defense date, voting result, and signatures of committee members. Before submission, the three types of materials need to enter the same function for material drafting and handover of responsibility, with different roles for each: the degree application form provides basic identity and training information, the thesis review form provides the basis for academic evaluation, and the defense resolution provides the final voting conclusion. The update rhythm is usually centralized processing by batch, with each batch corresponding to one version and date. Field characteristics manifest as the same record needing cross-material comparison in name, quantity, and date, and signatures and receipts need to be verified item by item. When materials enter this function, a draft is first generated according to the template, then the responsible person is checked field by field, and finally a handover record is formed.

## Configuration and implementation checks

Configuration and implementation checks. This step is executed by the memory turns and prompt configuration in the application settings, outputting the historical message range and answer constraints for reference. The material drafts and handover records that can be issued are then completed by the model. Memory turns control how many previous rounds of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields are complete, the responsible person is clear, and the version and date are consistent; the name, quantity, and date must match those in the thesis review form and defense resolution | Check the current memory turns value in the application settings, run a trial with two consecutive follow-up questions, and check whether the second round can carry forward the references from the first round |
| Thesis review form | The review conclusion, score, date, and expert signature are complete; the name, quantity, and date of the same record must not conflict with the degree application form | Compare the usage records of two runs to confirm that the run consumption changes accordingly after adjusting the turns; check the reference scope of `messages` and `variables` |
| Defense resolution | The defense date, voting result, committee member signatures, and receipts are complete; the version must be synchronized with the degree application form and thesis review form | Check whether the historical message range corresponding to `chatId` covers the required preceding text; draft one according to the template and complete one handover to see whether missing items are blocked |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: During drafting, field-by-field comparison was not performed according to a unified template, and the responsible person did not verify before handover.
- Symptom: The version of the defense resolution is not synchronized and still references data from the old version of the degree application form. Cause: The version and date were not synchronized with material updates, and the handover record did not indicate the version number.
- Symptom: Materials lack signatures or receipts, and the next stage cannot sign for acceptance. Cause: During handover, signatures and receipts were not checked item by item, and the responsible person was not clear.

## How to verify the setup

How to verify the setup. Acceptance for this function: use two consecutive follow-up questions to see whether the second question carries forward the references from the first question; check whether the three identifiers `messages`, `variables`, and `chatId` are correctly referenced in the historical message range.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- Check the current memory turns value in the application settings and match it with the preceding text range required by the question; run a trial with two consecutive question sentences to confirm that the second round can correctly carry forward the references from the first round.
- Compare the usage records of two runs to confirm that the run consumption changes accordingly after adjusting the turns; check whether the opening message is treated as preceding text.
