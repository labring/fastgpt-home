---
title: Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c009-f015
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Retrieval | Review
meta_description: Dropout Prevention: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results

## What this category's data looks like

In the compulsory education dropout prevention and control scenario, materials are mainly of three types: dropout risk ledgers, return-to-school persuasion records, and home visit records. The ledger provides students' basic information, risk levels, and responsible persons, and is the starting point for exception tracing; the persuasion records carry the time, method, participants, and receipt of each persuasion attempt, and are the key to determining whether handling is closed-loop; the home visit records supplement family background, guardianship status, and signed confirmation, and are used for cross-comparison. The three types of materials come from scattered sources and have inconsistent update rhythms: ledgers are summarized monthly, persuasion records are generated per attempt, and home visit records are kept per household. Field characteristics are concentrated in four items: name, quantity, date, and signature. The same record often shows differences across different materials in name spelling, quantity definition, date order, and missing signature receipts. When the materials enter the knowledge base retrieval and recall function, the ledger serves as the index layer for exception localization, while the persuasion records and home visit records serve as the evidence layer. Together, the three support the generation of exception lists and review conclusions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The "exception list and review conclusion" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the ledger fields, dates, and signatures match the persuasion records and home visit records | Use the same student name to search in the knowledge base search test, switch `searchMode` to compare the candidate chunks and similarity scores among semantic, full-text, and hybrid modes, and check whether the name, quantity, and date in the ledger can be traced back to the original records |
| Persuasion record | Whether the number of persuasion attempts, dates, and receipt signatures are consistent with the ledger registration | In the retrieval node, check whether the returned candidates include both semantic and full-text results, and confirm that multi-path merging has taken effect; check the differences between persuasion records and the ledger in name, quantity, and date, and check whether receipt signatures are missing |
| Home visit record | Whether the home visit date, participants, and signature are synchronized with the version of the persuasion record | Retrieve once each with `usingReRank` enabled and disabled, and compare the order of the first few candidates; combine the number of citations after `similarity` filtering and the key chunks of the original text to determine whether the home visit record and persuasion record are out of sync or missing signatures |
| Knowledge base retrieval service | Whether candidate chunks and similarity scores have undergone mode, merge, rerank, filter, and upper-limit trimming | In the search test, record the number of candidates and scores, separately record the length of the citation array, and check whether the tokens of the cited text are within the `limit` budget; confirm that the returned content is candidates and citations, not statistical tables or business documents |

## Three common errors

- Phenomenon: The same student's name spelling and number of persuasion attempts do not match between the ledger and the persuasion records. Cause: The two materials are filled in by different steps, the name and quantity definitions are not unified, and the candidate chunks hit by retrieval each say something different.
- Phenomenon: The dates of home visit records and persuasion records contradict each other in order, and the versions are not synchronized. Cause: The materials have different update rhythms, the old version still participates in recall in the knowledge base, and after reranking both old and new chunks enter the citations at the same time.
- Phenomenon: Persuasion records lack receipt signatures, and home visit records lack parent signatures. Cause: The signature step was not returned or the scanned copy was omitted, retrieval can only return unsigned chunks, and the review conclusion lacks support from the original records.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidate chunks and similarity scores, then toggle rerank on and off to observe the order of the first few results; switch `searchMode` to observe the candidate differences among semantic, full-text, and hybrid, record the number of candidates and scores, and separately record the length of the citation array and the tokens of the cited text.

Business test: create an exception record and see whether it can be traced back to the source material; check whether the ledger, persuasion records, and home visit records are consistent in name, quantity, date, and signature, and after confirming the reviewer's signature, hand it over to the responsible person for handling.

- In the knowledge base search test, search once each for the same exception record using different phrasings, compare candidate chunks and similarity scores, and confirm whether referent resolution and question expansion make the candidates more complete.
- Run once each with `usingReRank` enabled and disabled, and compare the order of the first few candidates; then adjust `similarity` and `limit`, and check whether the number of citations, the tokens of the cited text, and the key chunks of the original text are retained.
