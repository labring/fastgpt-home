---
title: Knowledge Base Retrieval for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Review
meta_description: Research Ethics: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

In research ethics review scenarios, ethics review applications, informed consent form templates, and risk assessment forms are three types of foundational materials. Applications are submitted by researchers and include project name, review category, submission date, and signature; informed consent form templates are drafted by the research team and include version number, version date, subject signature field, and receipt; risk assessment forms are jointly filled out by researchers and the ethics secretary and include risk level, quantity, assessment date, and review signature. These materials enter the knowledge base as documents, with update cadence changing along with protocol revisions and annual reviews, and field characteristics concentrated in names, quantities, dates, version numbers, and signature receipts. When entering the knowledge base retrieval and recall function, the three types of materials are each split and indexed as independent sources; during retrieval, dual-path recall by semantics and full text is performed, then merged, reranked, and filtered to form candidate chunks and similarity scores, for subsequent nodes or manual staff to trace exceptions and generate exception lists and review conclusions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The "exception list and review conclusions" are then completed by subsequent nodes or manual staff.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, review category, submission date, signature, and receipt are consistent with the informed consent form template and risk assessment form | In the search test, switch `searchMode`, use the same project name to retrieve the three types of materials separately, and compare the names, dates, and signature fields in the candidate chunks; record the number of candidates and the `similarity` score |
| Informed consent form template | Whether the version number, version date, subject signature field, and receipt are synchronized with the application and risk assessment form | Use synonymous rewritten questions to retrieve once each, and compare the order of the top few candidates before and after enabling `usingReRank`; check whether the version number and receipt appear in the cited chunks |
| Risk assessment form | Whether the risk level, quantity, assessment date, and review signature correspond to the application and template | Retrieve the risk level and assessment date, and check whether the candidate chunks retain the key original fields; record the number of returned items by `limit`, and separately record the tokens of the cited text |
| Knowledge base retrieval service | Whether the candidate chunks and similarity scores cover the three types of materials and are traceable | Use `similarity` to filter low-scoring candidates, check the number of citations and content completeness after truncation by `limit`, and confirm that the candidates include both semantic and full-text results |

## Three common errors

- Phenomenon: The name, quantity, and date of the same project do not match between the application and the template. Cause: Multi-source materials are not aligned by unified fields, and retrieval candidates return only chunks, requiring manual comparison with original records.
- Phenomenon: The informed consent form template version is not synchronized, and the old version is still recalled. Cause: The knowledge base update cadence is not synchronized with protocol revisions, and old chunks are not replaced in time, requiring verification of the version number and version date.
- Phenomenon: The risk assessment form lacks a review signature or receipt. Cause: Material archiving is incomplete, and retrieval can only return existing chunks and cannot supply missing signatures, requiring tracing back to the source materials for confirmation.

## How to verify the setup

Acceptance of this function: Use synonymous rewritten questions to test once each, and compare candidate chunks and `similarity` scores; then toggle `usingReRank` to observe changes in the ranking of the top few items, and record the number of candidates by `limit`.

Business test: Create an exception record and see whether it can be traced to the source material, confirming that the exception is supported by original records and the reviewer's signature.

- In the search test, switch `searchMode`, retrieve the same field using semantic, full-text, and hybrid modes respectively, and record the differences in the number of candidates and scores.
- After truncation by `limit`, check the tokens and array length of the cited text, confirm that key chunks have not been truncated, and then hand them to the responsible person for handling.
