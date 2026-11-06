---
title: Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence
slug: /en/industry/education-d001-c027-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Retrieval | Evidence
meta_description: Graduate Destinations: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in university employment signing and graduation destination statistics. The materials include three types: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements carry the signing parties, position, and date; graduation destination registration forms carry the destination category, employer name, and registration time; employer certificates carry the hiring intention, signature, and receipt. The three types of materials are updated by graduating class and batch, and differ in field names, quantities, dates, and signature conventions. When the materials enter knowledge base retrieval and recall, each participates as an independent candidate source in semantic, full-text, or hybrid recall, and after merging, reranking, filtering, and top-limit truncation, candidate snippets and similarity scores are formed, for subsequent nodes or humans to generate basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merging, reranking, filtering, and top-limit truncation). The "basis entries that can be traced back to the original text" are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing parties, position, date, and signature fields must match the registration form item by item | In the search test, search with synonymous questions, check whether the returned candidate snippets hit the original agreement fields, and record the number of candidates and scores |
| Graduation destination registration form | The destination category, employer name, and registration time must be consistent with the agreement or certificate | Switch `searchMode` to compare semantic, full-text, and hybrid candidates, and see whether the name, quantity, and date of the same record match |
| Employer certificate | The hiring intention, signature, and receipt fields must be complete and the version must be current | Compare the top few rankings before and after enabling `usingReRank`, and check whether the signature and receipt paragraphs of the original certificate are recalled |
| Knowledge base retrieval service | Candidates come from multiple recall paths and have been merged, reranked, filtered, and top-limit truncated | Use `similarity` to observe the number of candidates and scores before and after filtering, and separately record the reference array length and reference text tokens |

## Three common errors

- Symptom: The employer name, quantity, or date of the same record does not match between the agreement and the registration form. Cause: The two materials are entered separately without field-level comparison; although candidates are recalled, the original text conventions are inconsistent.
- Symptom: A certificate lacks a signature or receipt but is still cited as current basis. Cause: Material versions are not synchronized; old-version certificates and new registration forms are mixed in the same knowledge base and participate in recall.
- Symptom: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, or reranking and similarity filtering are not enabled, so candidates are not secondarily sorted by relevance.

## How to verify the setup

Feature acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to see the top few rankings; check whether the candidate sources change after switching `searchMode`, observe the number of items and scores before and after `similarity` filtering, and record the reference array length and reference text tokens.

Business testing: Ask a cross-material basis question and see whether the answer gives traceable sources; check whether the sources can be traced back to the original paragraphs of the agreement, registration form, or certificate, and confirm that the version is current and the signature and receipt fields are complete.

- In the knowledge base search test, retrieve the same basis question once each with synonymous questions, record the number of candidates, scores, and reference array length, and confirm that the returned content can be traced back to the original text.
- Check the name, quantity, date, signature, and receipt fields of the employment agreement, graduation destination registration form, and employer certificate one by one, and confirm that the version is current before writing it into a plan or replying to parents.
