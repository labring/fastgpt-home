---
title: Knowledge Base Retrieval for Professional Qualification Exam Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c036-f015
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Retrieval | Checks
meta_description: Professional Exams: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Professional Qualification Exam Applications: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of professional and technical personnel qualification examination registration review, the materials entering the knowledge base retrieval service are mainly of three types: registration form, education certificate, and work experience certificate. The registration form is filled in by the candidate and stamped by the employer or archive institution, with fields including name, ID number, examination level, work unit, start and end dates, and signature; the education certificate comes from the graduating institution or CHSI, with fields including name, major, education level, graduation date, and certificate number; the work experience certificate is issued by the human resources department of the current employer, with fields including name, position, employment start and end dates, cumulative years, and handler's signature. The three types of materials have different update rhythms: the registration form is submitted with each batch, the education certificate is stable over the long term but occasionally supplemented, and the work experience certificate is reissued as personnel move. When entering retrieval, the registration form often serves as the main record, while the education certificate and work experience certificate serve as comparison sources; each is split into candidate chunks and carries a similarity score.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Name, ID number, examination level, work unit, start and end dates, and signature must be aligned item by item with the education certificate and work experience certificate | In the search test, search with the same name and ID number, switch `searchMode` to compare candidate chunks, and record the hit fields and scores |
| Education certificate | Name, major, education level, graduation date, and certificate number must be consistent with the registration form; missing receipt or stamp is regarded as pending supplementation | Search with graduation date and certificate number as keywords, check whether the candidates cover the key paragraphs of the original document, and verify the top chunks by `similarity` |
| Work experience certificate | Name, position, employment start and end dates, cumulative years, and handler's signature must match the start and end dates on the registration form | Search with the unit name plus start and end year-month, view the top few rankings once before and after enabling `usingReRank`, and confirm the date and signature fields |
| Retrieval parameters and citations | The number of candidate items and the citation text tokens are recorded separately; `limit` controls the array length, and the citation budget is verified separately | Adjust `limit` to observe changes in the number of candidate items, count citation text tokens separately, and do not compare the two as equal |

## Three common errors

- Symptom: the name or graduation date of the same record does not match between the registration form and the education certificate. Cause: the versions of the two materials are not synchronized; after one is updated, the other remains an old draft.
- Symptom: the work experience certificate lacks the handler's signature or receipt, while the registration form has already been stamped. Cause: a step in the material circulation was omitted, and the signature and receipt were not archived together with the certificate.
- Symptom: changing the wording of the query fails to recall the same material; there are many candidates, but the ones ranked at the top are irrelevant. Cause: the retrieval mode does not match the material form, and rerank is not enabled.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidate chunks and `similarity` scores, then toggle rerank on and off to observe changes in the ranking of the top few items.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write back.

- In the search test, switch `searchMode` to compare differences in candidate chunks and scores among the semantic, full-text, and hybrid modes.
- View the order of the top few items once before and after enabling `usingReRank`, and separately record the number of citations and citation text tokens.
