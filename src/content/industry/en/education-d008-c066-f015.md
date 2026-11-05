---
title: Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c066-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Retrieval | Access
meta_description: Journal Submissions: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Manage Authorized Access and External Services

## What this category's data looks like

The category materials for preliminary review of academic journal submissions include three types: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts carry the main text and attachments and are the primary source for knowledge base retrieval and recall; author information forms record the order of authorship, affiliations, and contact details, and are used to compare against the information on the first page of the manuscript; plagiarism check reports provide similarity rates and source fragments, and are used to verify citations and originality. The three types of materials enter the system in batches, with an update cadence that advances along with manuscript receipt and supplementary submissions, and field characteristics concentrated in names, quantities, dates, and signed receipts. When materials enter the knowledge base retrieval and recall function, the manuscript main text and plagiarism check report fragments are split and recalled as candidate sources, while author information forms participate in association verification as structured fields. For external services, visitor identity and visible scope must match, and unauthorized access must not be visible.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the name, quantity, date, and signature are consistent with the author information form and plagiarism check report | Extract the title, author count, and date from the first page of the manuscript, and compare them item by item with the author information form; verify the signature on the plagiarism check report receipt |
| Author information form | Whether the order of authorship, affiliations, and contact details are consistent with the manuscript | Compare against the first page of the manuscript and the submission record, and check whether the versions are synchronized and whether any signatures or receipts are missing |
| Plagiarism check report | Whether the source fragments of the similarity rate correspond to the manuscript citations | Verify the report date and manuscript version, and confirm that the source fragments can be recalled and that the similarity scores are reasonable |
| Knowledge base retrieval service | Whether the candidate fragments and similarity scores cover the key fields of the three types of materials | In the search test, switch `searchMode` and observe the impact of `similarity` and `usingReRank` on the number of candidates and their ranking |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the manuscript and the author information form. Cause: The versions of the two materials are not synchronized, and only one place was changed after supplementary submission.
- Symptom: The plagiarism check report lacks a signature or receipt, making it impossible to confirm report ownership. Cause: No trace was left during the submission and return process, and the material circulation record is incomplete.
- Symptom: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking and similarity filtering were not performed.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to see the ranking of the top few; check the effects of `searchMode`, `similarity`, `usingReRank`, and `limit`, and record the number of candidates and scores.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; unauthorized access must not be visible, and when opening to parents or superiors, verify the entry point and authorization scope.

- In the search test, switch `searchMode` and compare the number of candidates and similarity scores across the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank` and compare the order of the top few candidates; after adjusting `limit`, separately record the number of cited items and the tokens of the cited text.
