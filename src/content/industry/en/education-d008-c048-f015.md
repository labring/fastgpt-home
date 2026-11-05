---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Access
meta_description: Joint Education: review retrieval for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the establishment and annual report materials of Chinese-foreign cooperative education institutions, including establishment applications, cooperation agreements, articles of association, and subsequent annual report receipts. When these materials enter the knowledge base retrieval service, each plays a different role: the establishment application provides the institution name, education level, and submission date; the cooperation agreement records the partner names, number, and signing date; the articles of association set out the governance structure, signature page, and version information; the annual report receipt is used to verify the annual update and acknowledgment status. The material source is the filing of applications and annual reports, the update cadence is synchronized with submission milestones, and the field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. During retrieval, the above materials are split into candidate chunks for subsequent nodes or manual generation of externally available entry points and authorization scope.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The name, date, and signature fields must correspond item by item with the cooperation agreement and articles of association; the same record must not have inconsistent names or dates in two places | In the search test, switch `searchMode` to hybrid, check whether the institution name and submission date in the candidate chunks are consistent, and record the number of candidates and the score |
| Cooperation agreement | The partner names, number, and signing date must be synchronized with the establishment application and the articles of association version; missing signatures or receipts are considered incomplete | Retrieve once each with synonymous questions, compare the top few rankings before and after enabling `usingReRank`, and check the agreement signing date and version number |
| Articles of association | The governance structure, signature page, and version number must be consistent with the latest annual report receipt; an old version must not overwrite a new version | Adjust the `similarity` threshold, check whether the candidate chunks retain the key paragraphs of the articles of association, and separately record the number of items in the citation array |
| Annual report receipt | The annual update record must correspond to the dates and quantities in the establishment application and cooperation agreement; if the receipt is missing, it cannot be made externally available | Access once with a restricted identity, check whether the visible scope contains only materials with receipts, and inspect the tokens budget of the cited text after `limit` trimming |

## Three common errors

- Symptom: the same institution name is written differently in the establishment application and the cooperation agreement. Cause: the two materials are entered separately and no name normalization is performed, so retrieval hits are scattered.
- Symptom: the articles of association version is not synchronized, and the old signature page is still recalled. Cause: the version number is not updated with the annual report, and candidate chunks are not filtered by the latest version.
- Symptom: the cooperation agreement lacks a signature or receipt but still appears in candidate chunks. Cause: the signature and receipt fields are not included in the filter conditions, and the similarity score is too high.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the top few rankings; check the changes in the number of candidates and scores corresponding to the three identifiers `searchMode`, `usingReRank`, and `similarity`.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and unauthorized content is not visible.

- In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidate chunks contain both semantic and full-text results, and record the number of candidates and the score.
- Compare the order of the top few items before and after enabling `usingReRank`, check the number of items in the citation array after adjusting the `similarity` threshold, and separately record the tokens budget of the cited text.
