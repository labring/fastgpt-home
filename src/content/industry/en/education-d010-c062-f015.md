---
title: Knowledge Base Retrieval for Research Ethics Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Operations
meta_description: Research Ethics: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Coordinate Operations and Application Handover

## What this category's data looks like

Research ethics review materials typically include ethics review applications, informed consent form templates, and risk assessment forms, all of which have field, date, and signature requirements. After application materials enter the knowledge base retrieval and recall function, they serve as auxiliary data to be retrieved, used to generate candidate chunks and similarity scores; informed consent form templates and risk assessment forms serve as reference materials, used to check whether the name, quantity, and date of the same record are consistent. The update cadence of materials varies with review batches. When versions are not synchronized or signatures are missing, retrieval results may still return old chunks. This function does not directly produce review conclusions; it is only responsible for recalling candidate and cited content, for subsequent nodes or humans to use as a basis for generating handover-ready deployment status and operation records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit truncation). Handover-ready deployment status and operation records are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are complete, and consistent with the same-name records in the informed consent form template and risk assessment form | In the search test, switch `searchMode`, check candidate chunks and scores, and compare item by item the name, quantity, date, and signature receipt of the three materials |
| Informed consent form template | Version is synchronized with the ethics review application, with no missing signatures or receipts | Test once each with synonymous questions, record the number of candidates and scores, check whether the returned citations retain key chunks of the original text, and check the results after `similarity` filtering |
| Risk assessment form | Dates and signatures are complete, and the name and quantity of the same record match across the three materials | Turn `usingReRank` on and off, compare the ranking of the top few results, confirm that secondary ranking has been performed after hybrid retrieval, and check the number of citations after `limit` truncation |
| Retrieval node and search test | The number of candidates and scores can be recorded, and key chunks are still retained after citation limit truncation | In the search test, view the number of candidates and scores, separately record the length of the citation array, and check the tokens budget of the citation text |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: Material versions are not synchronized, and retrieval still returns old chunks.
- Symptom: The risk assessment form lacks a signature or receipt, but the handover form shows it as complete. Cause: Signature status was not updated with the material, and candidate and cited content do not reflect the latest version.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked at the top are irrelevant. Cause: The retrieval mode does not match the material form, or rerank and similarity filtering did not take effect as expected.

## How to verify the setup

Acceptance of this function: Test once each with synonymously rewritten questions, compare candidates and scores, then turn rerank on and off to observe the ranking of the top few results; at the same time, check the number of candidates and scores under `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business testing: Check item by item according to the handover form to see which record is missing; confirm that version, connection, and task records are consistent, and check the fields, dates, and signatures of the ethics review application, informed consent form template, and risk assessment form.

- In the knowledge base search test, switch the retrieval mode, record the number of candidates and scores, and check whether the returned citations retain key chunks of the original text.
- Check item by item according to the handover form the fields, dates, and signatures of the ethics review application, informed consent form template, and risk assessment form, and mark entries with missing signatures or receipts.
