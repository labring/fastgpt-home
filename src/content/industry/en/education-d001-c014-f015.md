---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Find Supporting Evidence
slug: /en/industry/education-d001-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Evidence
meta_description: Pastoral Education: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Find Supporting Evidence

## What this category's data looks like

In the school moral education and homeroom teacher work scenario, thematic class meeting plans, student comprehensive quality records, and home visit records are three core types of materials. Thematic class meeting plans contain activity objectives, process design, and date and signature; student comprehensive quality records contain fields such as ideological and moral character, academic level, and social practice, as well as semester dates and teacher signature; home visit records contain visit target, time, communication content, parent receipt, and teacher signature. These materials are updated by semester or monthly, and versions roll forward with revisions. When entering the knowledge base retrieval and recall function, the three types of materials serve as independent knowledge bases or different document collections under the same knowledge base, each assuming the role of a basis source: thematic class meeting plans provide the basis for activity design, comprehensive quality records provide the basis for student performance, and home visit records provide the basis for home-school communication. During retrieval, the retrieval mode must be selected according to the material form; candidate chunks and similarity scores are output after merging, reranking, filtering, and upper-limit trimming, for subsequent nodes or manual generation of basis entries that can point back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). Basis entries that can point back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Fields contain activity objectives, process design, date, and signature; the name, quantity, or date of the same activity in two materials must be consistent | In the search test, switch `searchMode` and compare whether semantic and full-text candidates simultaneously hit the original plan text, and check the date and signature fields |
| Student comprehensive quality record | Fields contain ideological and moral character, academic level, and social practice; semester dates and teacher signature are complete; the version is current | Search with synonymous questions, view the number of candidates and scores, confirm that the record name, quantity, and date match the original text, and check the signature |
| Home visit record | Fields contain visit target, time, communication content, parent receipt, and teacher signature; the receipt must not be missing | After retrieval, check whether the returned candidates include the receipt and signature passages, and compare the ordering of the top few items before and after enabling `usingReRank` |
| Knowledge base retrieval service | Candidate chunks and similarity scores are output after mode, merging, reranking, filtering, and upper-limit trimming | Adjust `similarity` and `limit`, record the number of candidates and scores, separately record the length of the citation array, and check the tokens budget of the citation text |

## Three common errors

- Symptom: the name, quantity, or date of the same activity in the thematic class meeting plan and the comprehensive quality record do not match. Cause: the two materials were revised separately, without cross-material field verification and version synchronization.
- Symptom: the home visit record lacks a parent receipt or teacher signature, but retrieval still returns that chunk. Cause: when the material was archived, the signature and receipt fields were not validated, and retrieval recalls only by text similarity.
- Symptom: the same question cannot be recalled when phrased differently, and although there are many candidates, the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, reranking is not enabled, or similarity filtering is too broad.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle reranking on and off to observe the ordering of the top few items, and check the values of `searchMode`, `similarity`, `limit`, and `usingReRank`.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and confirm that the basis comes from the relevant materials, that the version is current, and that the entries match the original text.

- In the search test, switch `searchMode` for the same question, record the number of candidates and scores, and check whether semantic and full-text results appear simultaneously.
- Enable and disable `usingReRank` and retrieve once each, compare the ordering of the top few items, and separately record the length of the citation array and the tokens budget of the citation text.
