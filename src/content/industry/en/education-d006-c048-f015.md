---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics
slug: /en/industry/education-d006-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Progress
meta_description: Joint Education: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics

## What this category's data looks like

For progress records and statistical verification of the establishment and annual reports of Chinese-foreign cooperative education institutions, the materials include the establishment application, cooperation agreement, articles of association, receipt, and annual report draft. The establishment application carries fields such as the institution name, education level, programs, and enrollment scale; the cooperation agreement carries the names of both parties, signing date, validity period, and signature page; the articles of association carry the governance structure, rules of procedure, and version number. Materials are usually updated by batch or year, and the same record appears repeatedly across multiple materials, with field forms mainly consisting of names, quantities, dates, signatures, and version numbers. When materials enter knowledge base retrieval, the establishment application, cooperation agreement, and articles of association are each recalled as independent fragment sources, used to compare whether the fields, dates, and signatures of the same record are consistent, and whether the versions are synchronized.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The progress table and statistical scope explanation are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The institution name, education level, programs, enrollment scale, application date, and signature page must be aligned item by item with the cooperation agreement and articles of association | In the knowledge base search test, search by institution name and application date, and check whether the field values, dates, and signatures in the candidate fragments are consistent with the other two materials |
| Cooperation agreement | The names of both parties, signing date, validity period, signature, and receipt must be aligned item by item with the establishment application and articles of association | Switch `searchMode` to hybrid, search the same institution name, and compare whether the names, quantities, dates, and signature pages in the candidate fragments are consistent |
| Articles of association | The governance structure, rules of procedure, version number, and effective date must be aligned item by item with the establishment application and cooperation agreement | Search by version number and effective date, check whether the versions in the candidate fragments are synchronized, and record the number of candidates and scores |
| Receipt and annual report draft | The number of records and the statistical totals must be consistent, the scope must be written in the header, and exceptions must be listed separately | Use one week of records to verify the totals, search the fields of the receipt and annual report draft, and check whether the names, quantities, and dates match |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the establishment application and the cooperation agreement. Cause: The versions of the two materials are not synchronized, or they were not checked against a unified scope during entry.
- Phenomenon: The version number and effective date of the articles of association are inconsistent in the candidate fragments. Cause: The old version was not archived, multiple versions are recalled at the same time during retrieval, and filtering by version was not applied.
- Phenomenon: The cooperation agreement lacks a signature or receipt, but the candidate fragments are still cited. Cause: Retrieval returns candidate and cited content without judging whether the signature and receipt are complete, so manual verification is required.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; record the number of candidates and scores, and check the values of `similarity`, `limit`, `usingReRank`, and `searchMode`.

Business test: use one week of records to verify the totals, check whether the scope and exceptions are clearly written, and confirm that the number of records matches the statistical totals.

- In the knowledge base search test, search separately by institution name, application date, and version number, compare the candidate fragments and similarity scores, and record the number of candidates.
- Check the fields, dates, and signatures of the establishment application, cooperation agreement, and articles of association, confirm that the versions are synchronized, and write the scope into the header of the progress table.
