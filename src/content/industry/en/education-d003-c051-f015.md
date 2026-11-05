---
title: Knowledge Base Retrieval for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c051-f015
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Retrieval | Intake
meta_description: Entrance Exam Eligibility: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up for general college entrance examination registration qualification review, and the materials come from three categories: the college entrance examination registration form, household registration and student status certificates, and accompanying children materials. When the three enter the knowledge base retrieval service, their roles differ: the registration form provides the candidate's basic information and examination category fields, the household registration and student status certificates provide the household registration address, the school where the student status is located, and the start and end dates of attendance, and the accompanying children materials provide the parents' residence permit, social insurance contribution, and stable residence information. Field characteristics are concentrated in name, ID number, household registration address, student status number, start and end dates of attendance, certificate issuance date, and signature and seal. The update rhythm follows the annual registration notices issued by the admissions and examination institutions, adjustments to the material checklist, and changes in review standards, and versions need to be synchronized by batch. When materials enter this function, they are first split into candidate chunks, then undergo recall, merging, reranking, and filtering and truncation, forming reference content that can be used by subsequent nodes or by humans to generate intake records and supplementary questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merging, reranking, filtering, and upper-limit truncation). The intake records and supplementary questions are then completed by subsequent nodes or by humans.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether the name, ID number, examination category, signature, and date fields are complete, and whether the name, quantity, and date of the same record are consistent across the two materials | In the knowledge base search test, switch `searchMode`, use question sentences based on registration form fields to retrieve, and record the number of candidates and the `similarity` score |
| Household registration and student status certificates | Whether the household registration address, student status number, start and end dates of attendance, certificate issuance date, and seal correspond, and whether the version is synchronized with the registration form | Compare the order of the first few candidates before and after enabling `usingReRank`, and check whether the returned references retain key chunks for dates and seals |
| Accompanying children materials | Whether the dates and signature receipts of the parents' residence permit, social insurance contribution, and stable residence certificate have missing items, and whether the name and quantity of the same record match | Use question sentences missing key information to retrieve, check whether candidates ask follow-up questions before answering, and record the number of references after `limit` truncation |
| Intake records and supplementary questions | Whether missing items are identified and followed up, whether answers have material basis, and whether they are transferred to the case handler | Check whether the follow-up items correspond to household registration, student status, or accompanying children material fields, and check whether the reference content supports the basis for the follow-up |

## Three common errors

- Phenomenon: The same candidate's name or ID number is written inconsistently in the registration form and the household registration and student status certificates, causing candidate chunks to be scattered. Cause: The versions of the two materials are not synchronized, and field alignment was not performed during entry.
- Phenomenon: The start and end dates of student status attendance do not match the residence permit dates in the accompanying children materials, and the follow-up items omit key times. Cause: The materials were issued at different times, and the update rhythm was not unified by batch.
- Phenomenon: The accompanying children materials lack a signature or receipt, but the answer still gives a complete intake conclusion. Cause: The retrieval candidates do not cover the signature page, and key chunks are truncated after similarity filtering.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten question sentences, compare candidates and scores, then toggle reranking on and off to observe the ordering of the first few items. Check the changes in the number of candidates and scores corresponding to the three identifiers `searchMode`, `similarity`, and `usingReRank`.

Business test: submit a question sentence missing key information and see whether it asks follow-up questions before answering. The follow-up items should cover household registration, student status, or accompanying children material fields, the answer must have material basis, and then it should be transferred to the case handler.

- In the knowledge base search test, switch `searchMode`, retrieve the same question sentence using semantic, full-text, and hybrid modes respectively, record the number of candidates and the `similarity` score, and compare whether the multi-route merged results include both semantic and full-text candidates.
- Enable and disable `usingReRank`, compare the order of the first few candidates; check the tokens and array length of the reference text after similarity filtering and `limit` truncation, and confirm that key paragraphs have not been truncated.
