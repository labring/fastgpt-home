---
title: Multi-Turn Conversation and Prompts for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f005
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Conversation | Intake
meta_description: Journal Submissions: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

The intake materials for the preliminary review of academic journal submissions usually include three types: the submitted manuscript, the author information form, and the plagiarism check report. The sources are the author's submission attachments and the editorial office's internal routing records, and the update cadence advances with manuscript batches and supplementary-material receipts. The submitted manuscript carries the title, author order, affiliations, funding annotations, and body structure, and is the main text for identifying missing items; the author information form carries names, ordering, affiliations, contact details, and signatures, and is used for field-by-field matching against the manuscript title page; the plagiarism check report carries the detection date, duplication-rate range, and the testing agency's receipt, and is used to determine whether the version is in sync with the current manuscript. When these three types of materials enter the Q&A intake and missing-item follow-up function, each plays a different role: the manuscript provides the content basis for the items to be followed up on, the author information form provides the verification basis for signatures and receipts, and the plagiarism check report provides the basis for date and version synchronization. The intake record and the completed follow-up items are generated accordingly, and then forwarded to the handling staff.

## Configuration and implementation checks

This step is executed by the memory turn count and prompt configuration in the app settings, and outputs the reference range of historical messages and the answer constraints. The intake record and the completed follow-up items are then completed by the model. The memory turn count controls how many previous turns of dialogue can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Match field by field against the author information form on title, author order, affiliations, and funding annotations; for dates and signatures, the information form receipt prevails | In the app settings, check the current value of the memory turn count, run a trial with two consecutive question turns, confirm that the second turn can carry forward the references from the first turn, and check whether the preceding-text range in `messages` covers the manuscript fields |
| Author information form | Names, ordering, affiliations, contact details, and signatures are complete; if a signature or receipt is missing, identify it as a pending item and follow up | Compare item by item against the manuscript title page, record any inconsistencies in names, quantities, and dates, write the missing items into the intake record, and forward to the handling staff |
| Plagiarism check report | The detection date and duplication-rate range must be in sync with the current manuscript version; if the version is not in sync, follow up first before answering | Check the report date and manuscript version number, check whether the version change record is retained in the session corresponding to `chatId`, and confirm that the follow-up items have a material basis |
| Intake record and completed follow-up items | Missing items are identified and followed up on, answers have a material basis, and the destination is forwarding to the handling staff | Ask a question that lacks key information and see whether it follows up first before answering; use `variables` to record the completed follow-up items and the corresponding material sources |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the manuscript and the author information form. Cause: the fields in the two places were not matched item by item, and the inconsistencies were not listed as follow-up items during intake.
- Symptom: the plagiarism check report version is not in sync, yet judgment is still based on the old manuscript. Cause: the report date and manuscript version number were not checked, and the historical message range brought in old-version content.
- Symptom: the author information form lacks a signature or receipt, yet answering continues. Cause: the prompt did not list signatures and receipts as mandatory check constraints, and the missing items were not identified and followed up on.

## How to verify the setup

Acceptance for this feature: run a trial with two consecutive follow-up turns. The first question gives some fields from the manuscript and the author information form, and the second question uses references to carry them forward. See whether the second question carries forward the references from the first question; at the same time, check whether the referenced historical message range in `messages` matches the prompt constraints.

Business test: ask a question that lacks key information, see whether it follows up first before answering, and confirm that the answer has a material basis and that the follow-up items are written into the intake record before being forwarded to the handling staff.

- In the app settings, check the current value of the memory turn count and match it against the preceding-text range required by the question; after adjusting, compare the usage records of two runs to confirm the change in run consumption.
- Run a trial with two consecutive question turns and check whether the references in the second turn are carried forward correctly; check the records of `chatId`, `messages`, and `variables` in the session, and confirm that the opening message is not treated as preceding text.
