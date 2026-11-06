---
title: Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f015
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Retrieval | Intake
meta_description: Training Schedules: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

Scheduling and class-hour deduction materials for training institutions come from class schedules, class-hour deduction records, and class-change applications, with updates synchronized on a weekly rolling basis and with ad hoc class changes. Class schedules contain course name, class, teacher, classroom, start and end dates, and a signature field; class-hour deduction records contain student, number of class hours, deduction date, signature, and receipt; class-change applications contain the original class session, the new class session, the reason for the change, and approval signature. When these three types of materials enter the retrieval node, class schedules provide scheduling time and teacher information, class-hour deduction records provide class-hour consumption and signature status, and class-change applications provide the basis for changes and approval traces. Field characteristics manifest as follows: the date and teacher name for the same class session may be inconsistent between the class schedule and the class-change application; the class-hour deduction record and the class schedule may not match in the number of class hours; when versions are not synchronized, the old class schedule is still recalled; class-change applications and class-hour deduction records missing signatures or receipts form missing items.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) outputs only candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming), and the acceptance record and the completed follow-up questions must be handled by subsequent nodes or manually. One retrieval consists of question optimization, semantic or full-text or hybrid recall, multi-route merging, rerank secondary sorting, similarity filtering, and quote limit trimming, and only then is the quoted content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Check whether course name, class, teacher, classroom, start and end dates, and signature field are consistent with the class-change application | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate snippets and similarity scores, and record the number of candidates |
| Class-hour deduction record | Check whether student, number of class hours, deduction date, signature, and receipt are consistent with the corresponding class session in the class schedule | Test once each with synonymous rewrites of the same question, see whether candidates include both semantic and full-text results, and observe the order of the top few items before and after enabling `usingReRank` |
| Class-change application | Check whether the original class session, new class session, reason for the change, and approval signature match the class schedule and class-hour deduction record | Adjust `similarity` and `limit`, observe the tokens and array length of the quoted text after similarity filtering and quote limit trimming, and record them separately |
| Acceptance record and completed follow-up questions | Check whether missing items are identified and followed up, and whether answers are supported by material evidence | Ask a question missing key information, see whether it follows up before answering, then route it to the person handling it |

## Three common errors

- Phenomenon: the date and teacher name for the same class session do not match between the class schedule and the class-change application. Cause: the two materials are updated separately, versions are not synchronized, and the old class schedule is still recalled during retrieval.
- Phenomenon: the class-hour deduction record and the class schedule are inconsistent in the number of class hours. Cause: the class-hour deduction record lacks a signature or receipt, it was not checked against the class schedule at entry, and the candidate snippets contradict each other.
- Phenomenon: there are many candidates, but the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, or rerank is not enabled, and key passages are squeezed out after similarity filtering and quote limit trimming.

## How to verify the setup

Feature acceptance: test once each with synonymous rewritten questions, compare candidate snippets and similarity scores, then toggle rerank on and off to observe the ordering of the top few items; switch `searchMode` and adjust `similarity` and `limit`, and record the number of candidates and the tokens of the quoted text.

Business test: ask a question missing key information, and see whether it follows up before answering.

- In the knowledge base search test, initiate retrieval separately for the class schedule, class-hour deduction record, and class-change application, record the number of candidates and similarity scores, and check whether the returned quotes retain the key snippets of the original text.
- Perform synonymous rewrites of the same question and retrieve again, compare whether candidates include both semantic and full-text results, and check whether missing items are followed up and whether answers are supported by material evidence.
