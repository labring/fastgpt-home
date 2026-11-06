---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Review
meta_description: Continuing Education: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results

## What this category's data looks like

The materials for continuing education credit recognition include course filing forms, study certificates, and credit recognition forms. The course filing form records the course name, number of credit hours, filing date, and signature of the person in charge; the study certificate records the learner, course name, completion date, and institutional receipt; the credit recognition form records the recognized credit hours, recognition date, and signature of the reviewer. The three types of materials are updated by batch, with fields mainly consisting of names, quantities, dates, and signatures. When entering the knowledge base retrieval and recall function, the course filing form serves as the source basis for courses, the study certificate serves as the source of learning behavior, and the credit recognition form serves as the source of recognition results. Each provides traceable original fragments to support the generation of anomaly lists and review conclusions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The anomaly list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The course name, number of credit hours, and filing date must be consistent with the study certificate, and signatures and receipts must be complete | Search by course name in the search test, check the name, quantity, date, and signature fields in the candidate fragments, and record the number of candidates and scores |
| Study certificate | The learner, course name, and completion date must correspond to the credit recognition form, and the institutional receipt must not be missing | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates cover the name, quantity, date, and receipt fields |
| Credit recognition form | The recognized credit hours, recognition date, and reviewer signature must be supported by original records, and versions must be synchronized | Compare the top few rankings before and after enabling `usingReRank`, and check whether the recognition fields and signature come from the same version of the materials |
| Retrieval parameters | Key fragments are still retained after `similarity` filtering and `limit` trimming | Record the number of items in the returned array, separately check the referenced text tokens, and confirm that trimming has not lost name, quantity, date, or signature fragments |

## Three common errors

- Phenomenon: The course name, number of credit hours, or date of the same record do not match between the course filing form and the study certificate. Cause: The versions of the two materials are not synchronized, or they were not checked against the same batch during entry.
- Phenomenon: The credit recognition form lacks the reviewer's signature or the study certificate lacks the institutional receipt. Cause: The material circulation process did not collect all items, or the signature and receipt fields were not covered by the retrieval candidates.
- Phenomenon: The same question cannot be recalled when rephrased, and although there are many candidates, the top-ranked ones are irrelevant. Cause: The retrieval mode does not match the material form, or reranking and similarity filtering were not adjusted according to field characteristics.

## How to verify the setup

Acceptance of this function: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few; record the number of candidates and scores, switch `searchMode`, and adjust `similarity` and `limit` to observe the trimmed fragments.

Business test: Create an anomaly record and see whether the source material can be traced; check the name, quantity, date, and signature of the course filing form, study certificate, and credit recognition form to confirm that the anomaly is supported by original records and the reviewer's signature.

- In the knowledge base search test, switch retrieval modes and compare the candidate fragments and scores returned by semantic, full-text, and hybrid modes to confirm that the name, quantity, date, and signature fields are traceable.
- Query once before and after enabling reranking, and record the changes in the order of the top few; separately record the number of items in the reference array and the referenced text tokens to confirm that key fragments have not been lost due to trimming.
