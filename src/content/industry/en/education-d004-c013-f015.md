---
title: Knowledge Base Retrieval for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Handover
meta_description: Teacher Credits: review retrieval for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the category of credit management for primary and secondary school teacher training. Materials include training notices, credit recognition forms, and participant lists. The training notice determines the training name, start and end dates, organizing unit, and signature/seal; the credit recognition form records teacher name, subject, class hours, credits, and recognition conclusion; the participant list carries registration serial number, participation status, and receipt. The three types of materials come from different sources: the notice comes from the organizer, the recognition form comes from the academic affairs or teacher training department, and the list comes from registration and sign-in summaries. The update rhythm advances by training batch. Within the same batch, the notice comes first, the list rolls with sign-in, and the recognition form is filled in centrally after training ends. Field characteristics are concentrated in four categories: name, quantity, date, and signature. When the same record is referenced across materials, inconsistencies easily arise in name spelling, headcount basis, date format, and version number. After the materials enter the knowledge base retrieval service, each serves as a candidate fragment source for recall and comparison by subsequent nodes or manual drafting and handover.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The issuable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Check whether the training name, start and end dates, organizing unit, and signature/seal are consistent with the recognition form | In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, recall notice fragments respectively, record the number of candidates and scores, and compare the name and date fields |
| Credit recognition form | Check whether teacher name, subject, class hours, credits, and recognition conclusion correspond one by one with the participant list | Use teacher name plus batch as the query to recall recognition form and list candidates, compare the order of the first few items before and after enabling `usingReRank`, and check whether names and class hour quantities match |
| Participant list | Check whether registration serial number, participation status, and receipt are complete, and whether version number and date are synchronized | Recall list fragments by batch and date, adjust `limit` to observe changes in the number of candidates, and check whether receipt signatures and version numbers fall within the same batch record |
| Handover record | Check whether the transferor, receiver, handover date, and material list are signed for item by item | Use handover as the query to recall related fragments, check whether the reference text retained after `similarity` filtering contains the transferor and receiver fields, and whether missing items are blocked before signing |

## Three common errors

- Phenomenon: The same teacher's name spelling or class hour quantity does not match between the recognition form and the participant list. Cause: The two materials are entered separately, and field-level verification against the same record is not performed.
- Phenomenon: The start and end dates of the training notice are inconsistent with the batch dates of the recognition form, and the version number is not synchronized. Cause: After the notice is revised, it is not written back to the recognition form, and the retrieved fragments are from the old version.
- Phenomenon: The participant list lacks a receipt signature, but the handover record is still circulated as issuable material. Cause: The handover step does not block based on complete fields and clear responsible persons.

## How to verify the setup

In the knowledge base search test, paraphrase the same query and record the number of candidates and scores respectively, observing whether the same batch of fragments is recalled.

Run hybrid retrieval once with `usingReRank` enabled and once disabled, compare the order of the first few items, and check whether key passages are still retained.

- Acceptance of this function: test once each with synonym-rewritten queries, compare candidates and scores, then toggle rerank on and off to observe the ordering of the first few items; at the same time switch `searchMode` and adjust `limit`, record the number of candidates and scores, and record the tokens and array counts of the reference text separately.
- Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.
