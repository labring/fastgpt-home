---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics
slug: /en/industry/education-d006-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Progress
meta_description: Research IP: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics

## What this category's data looks like

This category's data looks like
Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. The sources are paper or electronic files submitted by research groups, inventors, and handlers, with updates supplemented weekly and summarized monthly. Achievement registration form fields include achievement name, completers, registration date, and signature; patent disclosure documents include technical name, inventors, disclosure date, and receipt; software copyright materials include software name, copyright owner, version number, and seal. The three types of materials play different roles when entering knowledge base retrieval and recall: achievement registration forms serve as the primary registration record, patent disclosure documents serve as the basis of rights, and software copyright materials serve as evidence of version and ownership. Field characteristics center on names, quantities, dates, and signatures. The same record often has mismatched names, quantities, and dates across two materials, unsynchronized versions, or missing signature receipts, requiring item-by-item verification in the progress table and statistical scope description.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit truncation). The "progress table and statistical scope description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the patent disclosure document | In the search test, test once each with synonymous questions, record the number of candidates and scores, and verify whether hits change after switching `searchMode` |
| Patent disclosure document | Whether the disclosure date and receipt match the achievement registration form | Compare the ranking of the top few items before and after enabling `usingReRank`, and verify whether candidates retain key snippets under the `similarity` threshold |
| Software copyright materials | Whether the version number and ownership signature are synchronized with the registration record | Verify the totals weekly, and see whether unsynchronized versions or missing signature receipts are listed as exceptions in the scope description |
| Statistical scope description | Whether the header states the scope of record counts and statistical counts and exceptions | Use one week of records to verify the totals, and confirm that after `limit` truncation, the cited text tokens and array item counts are recorded separately |

## Three common errors

- Phenomenon: The same achievement has mismatched names and quantities in the registration form and disclosure document. Cause: The two are entered separately, versions are not synchronized, and there is no unified verification scope.
- Phenomenon: Software copyright materials lack a signature or receipt, but the registration form has already counted them as complete. Cause: Signatures and receipts were not updated with the version, and exceptions were not handled during statistics.
- Phenomenon: There are many candidates, but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking and similarity filtering are not properly tuned.

## How to verify the setup

Acceptance for this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking to observe the ranking of the top few items, and verify the actual behavior of `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and confirm that record counts and statistical counts match and that the scope is written in the header.

- In the search test, switch retrieval modes, compare the number of candidates and scores, and confirm that after multi-route merging, both semantic and full-text results are included.
- Verify the names, quantities, dates, and signatures of achievement registration forms, patent disclosure documents, and software copyright materials weekly, and write inconsistent items into the exceptions column of the statistical scope description.
