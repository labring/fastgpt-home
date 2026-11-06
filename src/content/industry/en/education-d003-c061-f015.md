---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Intake
meta_description: Research IP: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the research achievement registration and intellectual property management scenario; materials include achievement registration forms, patent disclosure documents, and software copyright materials. The achievement registration form records the achievement name, contributors, date, and signature, and is the entry point of the registration mainline; the patent disclosure document carries the technical solution, inventors, application milestones, and receipts; software copyright materials involve version numbers, development completion dates, and seals. The three types of materials often coexist as scanned copies, form exports, and revised drafts, and their update cadence advances with corrections, examination, and archiving. When materials enter Q&A intake and missing-item follow-up, each participates in recall as a retrievable source: the registration form is used to check achievement fields, the disclosure document is used to check technical information, and the copyright materials are used to check versions and dates. Field characteristics center on names, quantities, dates, signatures, and receipts, which must be compared item by item in the intake record.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The intake record and the follow-up questions to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the patent disclosure document | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare the number of candidates and the scores, and check the name, quantity, date, and signature fields item by item |
| Patent disclosure document | Whether the inventors, application milestones, and receipts match the registration form | Retrieve once each with synonym-rewritten questions, observe whether the candidates include both semantic and full-text results, and check whether the receipts and signatures are complete |
| Software copyright materials | Whether the version number, development completion date, and seal are in sync with the registration form | Turn rerank on and off, compare the order of the top few candidates, and check whether snippets with unsynchronized versions or mismatched dates are recalled |
| Intake record and follow-up questions to be completed | Whether missing items are identified and followed up, and whether answers have material evidence | View the candidate snippets and `similarity` scores, confirm that the follow-up items correspond to specific material fields, and record the number of candidates |

## Three common errors

- Symptom: the name or quantity of the same achievement does not match between two materials. Cause: the registration form and the disclosure document were revised separately, without field-level comparison.
- Symptom: the version is not in sync, and the date and seal are inconsistent. Cause: after the copyright materials were updated, the registration record was not written back, and retrieval still recalls old snippets.
- Symptom: a signature or receipt is missing, and the follow-up is not triggered. Cause: the candidate snippets do not cover the signature field, and key passages are trimmed after similarity filtering.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and `similarity` scores, then toggle rerank to see the ordering of the top few; switch `searchMode` to observe differences in recall channels, check `limit` and the number of citations, and record the tokens of the cited text separately.

Business test: ask a question missing key information and see whether it follows up before answering.

- In the knowledge base search test, fix the question, switch `searchMode` and the rerank toggle, and record the number of candidates, `similarity` scores, and the cited content after `limit` trimming.
- Check the achievement registration form, patent disclosure document, and software copyright materials item by item for name, quantity, date, signature, and receipt, write missing items into the intake record, and forward them to the handler.
