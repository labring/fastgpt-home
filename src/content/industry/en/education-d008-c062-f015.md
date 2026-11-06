---
title: Knowledge Base Retrieval for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Access
meta_description: Research Ethics: review retrieval for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses authorized access and external services in research ethics review scenarios, with core materials consisting of ethics review applications, informed consent form templates, and risk assessment forms. The three types of materials respectively serve the roles of application basis, informed consent, and risk determination: after the application enters the knowledge base, it serves as the main record; the informed consent form template serves as an attachment and source of receipts; and the risk assessment form serves as an independent basis for determination. The sources of materials are internal institutional archives and external service windows, and the update cadence keeps pace with review batches and template revisions. Field characteristics are concentrated in subject names, sample quantities, review dates, and signature fields; when entering knowledge base retrieval, they are recalled in the form of fragments, for subsequent nodes or manual generation of externally accessible entry points and authorization scopes.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The externally accessible entry points and authorization scopes are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Subject names, sample quantities, review dates, and signature fields must match the informed consent form template item by item | In the knowledge base search test, use synonymous questions for retrieval, check whether the names, quantities, and dates of the application and template in the candidate fragments match, and record the number of candidates and scores |
| Informed consent form template | The version number and receipt signature must be synchronized with the same record in the risk assessment form | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates simultaneously contain the template body and receipt fragments, and check for missing signatures or receipts |
| Risk assessment form | The risk level, assessment date, and signature must be consistent with the application record | Compare the order of the top few candidates before and after enabling `usingReRank`, confirm that the risk assessment form fragments are not crowded out by irrelevant content, and separately record the number of items in the citation array |
| Authorized access entry point | The visitor's identity matches the visible scope, and unauthorized content is not visible | Access once with a restricted identity, check whether the `similarity` and `limit` of the returned candidates conform to the set scope, and unauthorized content should not appear in the candidates |

## Three common errors

- Phenomenon: The same subject's name or quantity does not match between the application and the consent form. Cause: The two materials were entered separately, without field-level association verification.
- Phenomenon: The template version is not synchronized, and the old version of the consent form is still recalled. Cause: The update cadence is not aligned with the knowledge base index, and the old fragments have not been replaced.
- Phenomenon: The risk assessment form lacks a signature or receipt but still appears at the top of the candidates. Cause: Retrieval only recalls by semantic similarity and does not filter by signature status.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ordering of the top few.

Business test: access once with a restricted identity and see whether the visible scope conforms to the setting.

- In the knowledge base search test, retrieve the same question using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and confirm that after multi-path merging the candidates simultaneously contain semantic and full-text results.
- Retrieve once each with reranking enabled and disabled, compare the ordering of the top few, and separately record the number of items in the citation array, verifying whether the tokens of the cited text are within budget.
